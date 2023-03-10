"use client";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import Image from "next/image";
import googlebutton from "../../public/images/googlebutton.png"
import { FaSignOutAlt } from "react-icons/fa";

export default function GoogleSignin() {
    const router = useRouter();
    const { data: session } = useSession();

    if (session) {
        const name = session.user?.name
        const profilePic = session.user?.image
        return (
            <div className="flex flex-row gap-4 items-center justify-center">
                <Image
                    className="rounded-full border-neutral-800 border-2 shadow-xl"
                    width={40}
                    height={40}
                    src={profilePic ?? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAr0lEQVR4nO2SMQrCQBBFH1h4BQVT5xzeySvoXSKBIOniIbTyBulUTCxSriyMzaCDkhGbffBhYWf/K2Yh4UQGlEAvqYDcs/wCBJWr3I2mfFH+zNZD0BuC7teCm4egMgSFhyCXheryM7DAiUwW2kkKz/LEWybAEtgAe+AE3CXx3ABrmYmzHzMFVkBrfE+dVt7EtyZz4PhFcVA5ADNLUI8oD5KdJRgcBIMlCE75nyCB5gGsu5uXA8ZadAAAAABJRU5ErkJggg=="}
                    alt="User picture"
                />

                <button onClick={()=>signOut()} className="duration-150 hover:text-neutral-300 flex flex-row items-center justify-center gap-1 text-neutral-400"><FaSignOutAlt/> Sign out</button>
            </div>
        )
    }

    return (
        <>
            <button onClick={()=>router.push("/signin")} className="shadow-lg shadow-zinc-700 text-white px-4 py-1 bg-slate-600 border-b-[5px] border-b-slate-500 rounded-sm cursor-pointer duration-150 hover:bg-slate-500">
                Sign in
            </button>
        </>
    )



}