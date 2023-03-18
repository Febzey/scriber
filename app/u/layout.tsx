import NavBar from "../../components/nav/Nav";

export default function ProfileLayout({ children }: { children: React.ReactNode} ) {
    return (
        <>
            <NavBar/>
            {children}
        </>
    )
}