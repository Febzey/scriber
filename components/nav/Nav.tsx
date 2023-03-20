import Link from "next/link"
import scriberlogo from "../../public/images/scriberlogo.png"
import Image from "next/image";
import { FaSearch, FaPlus } from "react-icons/fa";
import SignInButtons from "./loginButton";

export default function NavBar() {
    return (
        <nav className="w-full absolute right-0 left-0 h-[4.3rem] top-0  flex items-center justify-evenly px-24 border-b-2 border-gray-700/20">
            <ul className="flex flex-row gap-4 items-center justify-center text-neutral-400 z-10 text-sm">
                <Link href="/">
                    <Image src={scriberlogo} alt="logo" className="object-fit w-11 rounded-full border-gray-700/20 border-2" />
                </Link>
                <Link href="/" className="flex flex-row items-center justify-center gap-1 text-white font-semibold">
                    Home
                </Link>
                <Link href="/blog/post" className="flex flex-row items-center justify-center gap-1 text-white font-semibold">
                    Create Blog <FaPlus />
                </Link>
                <Link href="/blog/post" className="flex flex-row items-center justify-center gap-1 text-white font-semibold">
                    <FaSearch/>
                </Link>
            </ul>


            <ul className="text-sm z-10 flex items-center justify-center gap-4">
                <SignInButtons />
            </ul>
        </nav>
    )
}
