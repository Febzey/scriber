"use client";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Image from "next/image";
import { signIn } from "next-auth/react";
import squareload from "../../../../public/images/squareload.svg";
import googlebutton from "../../../../public/images/googlebutton.png";
import { useSearchParams } from "next/navigation";

export default function LoginForm({ providers }: any) {
    const callBackUrl = useSearchParams()?.get("callbackUrl")??"/";
    
    const [email, setEmail] = useState("")
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (type: string, args: any) => {
        try {
            if (type === "email") {
                if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) || !email) {
                    return setInvalidEmail(true);
                }
            }
            setLoading(true);
            const result = await signIn(type, {...args, redirect: true, callbackUrl: callBackUrl})
            setLoading(false);
            if (result && result.error) {
                console.log(result.error);
            } else if (result && result.ok) {
                console.log(result, " success")
            }

        } catch (err) {
            console.log(err, " Error performing sign-in.")
            return;
        }
    }

    return (
        <>
            {
                isLoading
                ? <Image src={squareload} alt="square loader" className="mx-auto"/>
                : <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit("email", {
                            email: email,
                        })
                    }} className="w-full flex flex-col items-center justify-center gap-2">
                        <input
                            className={`p-2 w-3/4 bg-zinc-700 rounded text-neutral-100 focus:bg-zinc-600 ${invalidEmail ? "border-red-500 border-2" : ""}`}
                            id="email"
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value); setInvalidEmail(false) }}
                            spellCheck={false}
                            required
                            autoComplete="off"
                            autoSave="off"

                        />
                        <button type="submit" className="w-3/4 bg-emerald-500 bg-opacity-70 rounded p-2 text-neutral-200 flex flex-row gap-2 items-center justify-center">
                            Login <FaSignInAlt />
                        </button>
                    </form>
            }

            <div className="text-neutral-500 flex flex-col items-center justify-center">
                <p className="mb-8">Other sign-in options.</p>

                <button onClick={() => handleSubmit(providers.google.id, {
                    email: email,
                })} className="outline-none">
                    <Image src={googlebutton} alt="GoogleSignIn" />
                </button>
            </div>

        </>
    )
}