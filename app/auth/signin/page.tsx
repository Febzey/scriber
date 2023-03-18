import { getProviders } from "next-auth/react"
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import { FaArrowLeft } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default async function SignInPage() {
    const providers = await getProviders();
    return (
        <>
            <div className="w-full h-screen flex items-center justify-center flex-col relative">
                <Link href="/" className="z-40">
                    <FaArrowLeft className="absolute left-16 top-16 text-6xl text-neutral-400 duration-150 hover:text-neutral-100" />
                </Link>
                <div className="lg:w-3/6 lg:h-[60vh] w-full border-dashed rounded border-gray-700/20 lg:border-2 p-11 gap-10 flex flex-col">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="mx-auto bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 font-bakbak text-5xl">Sign in</h1>
                        <p className="text-neutral-400 text-sm">Or create an account</p>
                    </div>
                    <LoginForm providers={providers} />
                </div>
                <div className="mx-auto text-center lg:w-1/3 p-4">
                    <p className="text-neutral-500 text-xs">By creating an account or signing in you agree to our <Link href="/privacy" className="text-sky-400/60 duration-150 hover:text-sky-400 underline">Privacy Policy</Link> and our <Link href="terms-of-service" className="text-sky-400/60 duration-150 hover:text-sky-400 underline">Terms of Service</Link></p>
                </div>
            </div>
        </>
    )
}