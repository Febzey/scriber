import "./../styles/globals.css"
import Providers from "./providers";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {



    return (
        <html lang="en">
            <body className="font-inter bg-gray-900">
                <Providers>
                    <div className="w-full bg-cover bg-no-repeat">
                        <div className="lg:w-[60%]  min-h-screen mx-auto">
                            {children}
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    )
}