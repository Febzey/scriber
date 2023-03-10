import NavBar from "../components/nav/Nav";
import "./../styles/globals.css"
import Providers from "./providers";

import { getSession } from "next-auth/react"

async function getServerProps() {
    return getSession()
}

export default function RootLayout({
    children,
    props
}: {
    children: React.ReactNode,
    props: any
}) {
    console.log(props)
    return (
        <html lang="en">
            <body className="bg-neutral-900 font-inter">
                <NavBar />
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}