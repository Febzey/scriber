"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from "next/navigation";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
export default function SignInButtons() {
    const pathname = usePathname();
    const { data: session } = useSession();
    if (session) {
        console.log(session, "session from login")
        const name = session.user?.name
        const profilePic = session.user?.image
        return (
            <div className="flex flex-row gap-2 items-center justify-center">
                <Link href={`/u/${name}`}>
                    <Image
                        className="rounded-full border-neutral-800 border-2 shadow-xl"
                        width={40}
                        height={40}
                        src={profilePic ?? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAr0lEQVR4nO2SMQrCQBBFH1h4BQVT5xzeySvoXSKBIOniIbTyBulUTCxSriyMzaCDkhGbffBhYWf/K2Yh4UQGlEAvqYDcs/wCBJWr3I2mfFH+zNZD0BuC7teCm4egMgSFhyCXheryM7DAiUwW2kkKz/LEWybAEtgAe+AE3CXx3ABrmYmzHzMFVkBrfE+dVt7EtyZz4PhFcVA5ADNLUI8oD5KdJRgcBIMlCE75nyCB5gGsu5uXA8ZadAAAAABJRU5ErkJggg=="}
                        alt="User picture"
                    />
                </Link>

                <button onClick={() => signOut()} className="duration-150 hover:text-neutral-300 flex flex-row items-center justify-center gap-1 text-[#C4BDCB]">
                    <FaSignOutAlt /> Sign out
                </button>
            </div>
        )
    }

    return (
        <>
            <button onClick={() => signIn(undefined, { callbackUrl: pathname ? pathname : "/", redirect: false })} className="text-white bg-gradient-to-r p-0.5 flex flex-row gap-1 items-center justify-center">
                <span className="w-full h-full font-semibold">
                    Sign In
                </span>
                <FaSignInAlt className="text-2xl"/>
            </button>
        </>
    )



}