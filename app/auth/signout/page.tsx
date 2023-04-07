"use client";

import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
    return (
        <div className="w-full h-screen flex items-center justify-center flex-col relative">
            <Link href="/" className="z-40">
                <FaArrowLeft className="absolute left-16 top-16 text-6xl text-neutral-400 duration-150 hover:text-neutral-100" />
            </Link>
            <div className="lg:w-5/12 lg:h-[60vh] w-full border-dashed rounded border-gray-700/20 lg:border-2 p-11 gap-10 flex flex-col">
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="mx-auto bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-red-600 font-bakbak text-5xl">Sign Out</h1>
                    <p className="text-neutral-200 text-lg mt-5">Are you sure you want to sign out?</p>
                </div>

                <div className="flex flex-col gap-2 items-center justify-center text-center">
                    <button onClick={()=>signOut({redirect: true, callbackUrl:"/"})} className="w-2/4 text-white text-sm bg-red-500/60 px-4 py-2 rounded border-b-[5px] border-b-red-500 duration-150 hover:bg-red-500">
                        Yes, Sign me out.
                    </button>

                    <Link href="/" className="w-2/4 text-white text-sm px-4 py-2 underline underline-offset-2 duration-150 hover:text-emerald-500">
                        No, Take me back.
                    </Link>
                </div>

            </div>

        </div>
    )
}