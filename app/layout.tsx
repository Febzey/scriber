import "./../styles/globals.css"
import Providers from "./providers";
import { Session } from "next-auth";
import { headers } from "next/headers";

export async function getSession(cookie?: string): Promise<Session> {
    const response = await fetch(`http://localhost:3000/api/auth/session`, {
        headers: {
            cookie: cookie ?? headers().get('cookie') ?? ''
        }
    })
    const session = await response.json();
    return Object.keys(session).length > 0 ? session : null;
}


export default async function RootLayout({
    children
}: {
    children: React.ReactNode,
}) {

    const session = await getSession();
    console.log(" uhhh we getting the sessions ")

    return (
        <html lang="en" className="scrollbar-thin scrollbar-thumb-[#6464FB] scrollbar-track-[#C4BDCB]">
            <body className="font-inter bg-main-dark">

                <div className="lg:w-[60%] h-auto min-h-screen mx-auto">
                    <Providers session={session}>
                        {children}
                    </Providers>
                </div>
            </body>
        </html>
    )
}