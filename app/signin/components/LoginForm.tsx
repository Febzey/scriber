"use client";
import { useState } from "react";
import { FaMinus, FaCircle, FaSignInAlt } from "react-icons/fa";
import Image from "next/image";
import googlebutton from "../../../public/images/googlebutton.png";
import { signIn, getSession } from "next-auth/react";

export default function LoginForm({providers}:any) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    console.log(providers.google, "google prov")

    return (
        <form className="w-full flex flex-col items-center justify-center gap-2">
            <input
                className="p-2 w-3/4 bg-zinc-700 rounded text-neutral-100 focus:bg-zinc-600"
                id="username"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                spellCheck={false}
                required
            />

            <input
                className="p-2 w-3/4 bg-zinc-700 rounded text-neutral-100 focus:bg-zinc-600"
                id="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                spellCheck={false}
                required
            />

            <div className="py-4 flex flex-row gap-1 items-center justify-center text-sm text-neutral-500">
                <FaCircle className="text-[0.4rem]" />
                <p className="underline">Forgot Password</p>
                <FaMinus />
                <p className="underline">Create account</p>
                <FaCircle className="text-[0.4rem]" />

            </div>

            <button type="submit" className="w-3/4 bg-emerald-500 bg-opacity-70 rounded p-2 text-neutral-200 flex flex-row gap-2 items-center justify-center">
                Login <FaSignInAlt/>
            </button>

            <div className="text-neutral-500 flex flex-col items-center justify-center mt-16">
                    <p className="mb-8">Other sign-in options.</p>
                
                    <button onClick={()=>signIn("google")} className="outline-none">
                        <Image src={googlebutton} alt="GoogleSignIn"/>
                    </button>
                </div>

        </form>
    )
}