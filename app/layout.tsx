import "./../styles/globals.css"
import Providers from "./providers";
import { Session } from "next-auth";

export async function getSession(cookie: string): Promise<Session> {
    const response = await fetch(`http://localhost:3000/api/auth/session`, {
        headers: {
            cookie
        }
    })    
    const session = await response.json();
    return Object.keys(session).length > 0 ? session : null;
}


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <html lang="en">
            <body className="font-inter bg-gray-900">
                <div className="w-full bg-cover bg-no-repeat">
                    <div className="lg:w-[60%]  min-h-screen mx-auto">
                        <Providers>
                            {children}
                        </Providers>
                    </div>
                </div>
            </body>
        </html>
    )
}