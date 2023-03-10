import Link from "next/link"
import scriberlogo from "../../public/images/scriberlogo.png"
import Image from "next/image";
import { FaSearch, FaPlus } from "react-icons/fa";

export default function NavBar() {
    return (
        <nav className="w-full h-16 lg:px-72 flex items-center justify-between px-8 relative border-b-2 border-neutral-800">
            <ul className="flex flex-row gap-3 items-center justify-center text-neutral-400 z-10">
                <Link href="/">
                    <Image src={scriberlogo} alt="logo" className="object-fit w-11" />
                </Link>
                <Link href="/newpost" className="text-sm bg-neutral-800 border-b-[5px] border-b-neutral-700  py-1 px-2 rounded-sm flex flex-row gap-1 items-center justify-center">Create Post <FaPlus /></Link>

            </ul>

            <ul className="text-sm z-10 flex items-center justify-center">
                <Link href={"/signin"} className=" text-white px-3 py-1 bg-slate-600 border-b-[5px] border-b-slate-500 rounded-sm cursor-pointer duration-150 hover:bg-slate-500">Sign in</Link>
            </ul>


            <NavSearch />
        </nav>
    )
}

const NavSearch = () => {
    return (
        <div className="absolute text-center right-0 left-0 z-0">
            <div className="flex items-center justify-center gap-2 h-8">
                <input
                    type="text"
                    id="searchbar"
                    placeholder="Search for a post or user."
                    className="bg-neutral-700 px-3 py-1 text-sm text-center h-full placeholder-neutral-400 rounded text-neutral-100"
                />
                <Link href={"/search/paramshere"} className="px-4 py-2 h-full bg-slate-600 border-b-[5px] border-b-slate-500 rounded-sm text-neutral-100 duration-150 hover:bg-slate-500">
                    <FaSearch />
                </Link>
            </div>
        </div>
    )
}