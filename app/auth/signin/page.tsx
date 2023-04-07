import { getProviders } from "next-auth/react"
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import { FaArrowLeft } from "react-icons/fa";

export default async function SignInPage() {
    const providers = await getProviders();
    return (
        <div className="w-full h-screen flex items-start justify-center">
            <div className="w-2/4 h-[60%] bg-main-second/20 rounded-xl mt-[15%] shadow-2xl relative flex flex-col items-start justify-center px-5 py-10">
                <Link href="/" className="bg-white duration-150 hover:bg-white/50 p-3 rounded-full absolute left-10 top-10">
                    <FaArrowLeft className="text-black text-lg" />
                </Link>

                <div className="mx-auto text-center mb-auto">
                    <h1 className="font-bakbak text-white text-5xl">Sign in</h1>
                    <p className="text-neutral-300">Or create an account</p>
                </div>

                <LoginForm providers={providers}/>

            </div>
        </div>
    )
}