import NavBar from "../components/nav/Nav";
import "./../styles/globals.css"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-neutral-900 font-inter">
                <NavBar/>
                {children}
            </body>
        </html>
    )
}