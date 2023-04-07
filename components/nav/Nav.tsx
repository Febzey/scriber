"use client"

import Link from "next/link"
import scriberlogo from "../../public/images/scriberlogo.png"
import Image from "next/image";
import { FaSearch, FaPlus, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import SignInButtons from "./loginButton";

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMenuButtonClick = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <nav className="w-full absolute right-0 left-0 h-[4.3rem] top-0 flex items-center justify-evenly px-20 bottom-full">
            <ul className="lg:flex flex-row gap-4 items-center justify-center text-neutral-400 z-10 text-sm hidden">
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
                    <FaSearch />
                </Link>
            </ul>

            <ul className="text-sm z-10 hidden md:flex items-center justify-center gap-4">
                <SignInButtons />
            </ul>

            <div className="md:hidden">
                <button onClick={handleMenuButtonClick} className="flex items-center justify-center text-white text-3xl">
                    <FaBars />
                </button>
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-20 bg-gray-800/95 backdrop-blur-sm">
                        <div className="flex flex-col items-center justify-center h-full gap-4 relative">
                            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-4xl text-neutral-200 duration-150 hover:text-neutral-400"><FaTimes /></button>
                            <Link href="/" className="flex flex-row items-center justify-center gap-1 text-white font-semibold">
                                Home
                            </Link>
                            <Link href="/blog/post" className="flex flex-row items-center justify-center gap-1 text-white font-semibold">
                                Create Blog <FaPlus />
                            </Link>
                            <Link href="/blog/post" className="flex flex-row items-center justify-center gap-1 text-white font-semibold">
                                <FaSearch />
                            </Link>
                            <SignInButtons />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
