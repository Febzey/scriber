"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
export default function SignInErr() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-main-second/30 lg:rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-4 text-neutral-100">Please sign in to create a post</h1>
                <p className="text-gray-300">You need to be signed in to create a post. Click the button below to sign in.</p>

                <div className="flex flex-row gap-4 items-center justify-start">
                    <button
                        onClick={() => signIn(undefined, { callbackUrl: "/blog/post" })}
                        className="mt-4 bg-blue-accent text-white py-2 px-4 rounded hover:bg-blue-accent/50 duration-150">
                        Sign in
                    </button>

                    <Link href="/"
                        className="mt-4 bg-black/20 text-white py-2 px-4 rounded hover:bg-black/40 duration-150">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    )
}