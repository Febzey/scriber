"use client";

import { SessionProvider } from "next-auth/react"

export default function Providers({
    children
}: {
    children: React.ReactNode
}) {

    // const props = await getServerSideProps()
    // console.log(Props)
    return (
        <>
            <SessionProvider>
                {children}
            </SessionProvider>
        </>
    )
}