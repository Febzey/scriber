import NavBar from "../components/nav/Nav";
import "./../styles/globals.css"
import Providers from "./providers";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {



    return (
        <html lang="en">
            <body className="bg-neutral-900 font-inter">
                <Providers>
                    <NavBar />
                    <div className="lg:w-[80%] border-l-2 border-r-2 border-neutral-800 min-h-screen mx-auto">

                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    )
}