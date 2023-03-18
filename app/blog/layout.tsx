import NavBar from "../../components/nav/Nav";

export default function BlogPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar/>
            {children}
        </>
    )
}