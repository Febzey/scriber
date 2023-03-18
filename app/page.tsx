import { FaPlus, FaTwitter, FaDiscord, FaEdit, FaPen, FaSignInAlt, FaSign } from "react-icons/fa";
import BlogPreview from "./components/blogPreview/blogPreview"
import Link from "next/link"
import NavBar from "../components/nav/Nav";

import arrow1 from "../public/images/arrows/arrow1.svg";
import arrow2 from "../public/images/arrows/arrow2.svg";

import Image from "next/image";

export default async function Page() {
    return (
        <>
            <NavBar />
            <div className="flex flex-col gap-20 items-center justify-center pb-32 mx-auto">
                <div className="min-h-[30vh] mb-24 mt-32 w-full flex items-center justify-center flex-col">
                    <h1 className="text-7xl font-bakbak bg-gradient-to-r from-orange-400 to-rose-400 text-transparent bg-clip-text">SCRIBER</h1>
                    <p className="text-xs text-neutral-500">(skrī-bər)</p>
                    <p className="text-lg text-white text-center px-4">Easily create and share blog posts with the help of AI.</p>

                    <div className="flex lg:flex-row flex-col w-full gap-4 items-center justify-center">
                        <Link href="/blog/post" className="text-lg mt-8 inline-flex items-center gap-3 font-bakbak py-2 px-4 rounded shadow-md text-neutral-200 bg-gray-500/20">
                            Start writing <FaPen className="" />
                        </Link>

                        <Link href="/auth/" className="text-lg mt-8 inline-flex items-center gap-3 font-bakbak py-2 px-4 rounded shadow-md text-neutral-200 bg-emerald-500/70">
                            Sign up for free <FaSignInAlt />
                        </Link>
                    </div>

                </div>
                {/* <BlogPreview /> */}
                <InfoCallouts />
            </div>
        </>
    )
}

function InfoCallouts() {
    return (
        <div className=" min-h-screen flex flex-col gap-32 w-5/6 items-start justify-center">

            {/* First callout card */}
            <div className="flex flex-row w-full h-auto relative">
                <div className="lg:w-[60%] w-full mr-auto min-h-56 h-56 bg-gray-800/50 rounded-xl shadow-xl p-7">
                    <h1 className="font-bakbak text-white text-2xl mb-4">
                        Effortlessly Create Blog Posts
                    </h1>
                    <p className="text-neutral-200">
                        Our blog service uses cutting-edge technology to guide you through the process of writing high-quality blog posts with ease.
                    </p>
                </div>
                <Image src={arrow1} alt="arrow1" width={260} className="right-0 left-[70%] lg:block absolute hidden" />
            </div>

            {/* Second Callout Card */}
            <div className="flex flex-row w-full h-auto relative">
                <div className="lg:w-[60%] w-full ml-auto min-h-56 h-56 bg-gray-800/50 rounded-xl shadow-xl p-7">
                    <h1 className="font-bakbak text-white text-2xl mb-4">
                        Share Your Ideas with the World
                    </h1>
                    <p className="text-neutral-200">
                        Easily share your thoughts and ideas with a global audience through our streamlined blog app                    </p>
                </div>
                <Image src={arrow2} alt="arrow1" width={260} className="right-[70%] left-0 lg:block absolute hidden" />
            </div>

            {/* Third Callout Card */}
            <div className="flex flex-row w-full h-auto relative">
                <div className="lg:w-[60%] w-full mr-auto min-h-56 h-56 bg-gray-800/50 rounded-xl shadow-xl p-7">
                    <h1 className="font-bakbak text-white text-2xl mb-4">
                        Personalized Blogging Experience
                    </h1>
                    <p className="text-neutral-200">
                        Our blog app/service is tailored to your unique needs and preferences, allowing you to create and share blog posts that truly reflect your individual style and voice.                    </p>
                </div>
            </div>


            <Link href="/blog/post" className="mx-auto text-lg mt-8 inline-flex items-center gap-3 font-bakbak py-2 px-4 rounded shadow-md text-neutral-200 bg-sky-500/80">
                Start writing <FaPen className="" />
            </Link>


        </div>
    )
}