import { FaPen, FaSignInAlt } from "react-icons/fa";
import Link from "next/link"
import NavBar from "../components/nav/Nav";

import mascot from "../public/images/mascot.png";
import arrow1 from "../public/images/arrows/arrow1.svg";
import arrow2 from "../public/images/arrows/arrow2.svg";

import TextEffect from "../components/texteffect";

import Image from "next/image";

export default async function Page() {
    return (
        <>
            <NavBar />
            <div className="flex flex-col gap-20 items-center justify-center pb-32 mx-auto z-40">
                <div className="mb-24 mt-40 w-full flex items-center justify-center flex-col">
                    <div className=" text-white bg-clip-text text-center">
                        <TextEffect t={"SCRIBER"} className="text-7xl font-bakbak" />
                        <p className="text-xs text-[#C4BDCB]">(skrī-bər)</p>
                        <p className="text-lg  text-center px-4">Easily create and share blog posts with the help of AI.</p>
                    </div>

                    <div className="flex lg:flex-row flex-col w-full lg:gap-4 items-center justify-center mt-8 gap-2">
                        <Link href="/blog/post" className="text-lg lg:mt-8 inline-flex items-center gap-3 font-bakbak py-2 px-4 rounded shadow-md text-white bg-main-highlight-dark duration-150 hover:bg-main-highlight-dark/50">
                            Start writing <FaPen className="" />
                        </Link>

                        <Link href="/auth/signin" className="text-lg lg:mt-8 inline-flex items-center gap-3 font-bakbak py-2 px-4 rounded shadow-md text-white bg-main-purple duration-150 hover:bg-main-purple/50">
                            Sign up for free <FaSignInAlt />
                        </Link>
                    </div>

                </div>

                <InfoCallouts />
            </div>
        </>
    )
}

function InfoCallouts() {
    return (
        <div className="h-auto min-h-screen flex flex-col gap-32 w-5/6 items-start justify-center border-t-2 border-b-2 border-indigo-200/10  py-24">

            {/* First callout card */}
            <div className="flex flex-row w-full h-auto relative items-center justify-center">
                <div className="lg:w-[60%] w-full mr-auto min-h-56 h-56  p-7">
                    <h1 className="font-bakbak text-white text-2xl mb-4">
                        Effortlessly Create Blog Posts:
                    </h1>
                    <p className="text-neutral-200">
                        Our minimalist and lightweight editor ensures that you can focus solely on your writing, without any distractions. The clean interface and intuitive design make it easy for anyone to create beautiful blog posts effortlessly.
                    </p>
                </div>
                <Image src={arrow1} alt="arrow1" width={260} className="right-0 left-[70%] lg:block absolute hidden" />
            </div>

            {/* Second Callout Card */}
            <div className="flex flex-row w-full h-auto relative items-center justify-center">
                <div className="lg:w-[60%] w-full ml-auto min-h-56 h-56  p-7">
                    <h1 className="font-bakbak text-white text-2xl mb-4">
                        Share Your Ideas with the World:
                    </h1>
                    <p className="text-neutral-200">With our streamlined blog platform, sharing your posts has never been easier. Simply publish your content, and our platform will automatically optimize it for search engines and social media, ensuring that your posts reach a wider audience in no time.</p>

                </div>
                <Image src={arrow2} alt="arrow1" width={260} className="right-[70%] left-0 lg:block absolute hidden" />
            </div>

            {/* Third Callout Card */}
            <div className="flex flex-row w-full h-auto relative items-center justify-center">
                <div className="lg:w-[60%] w-full mr-auto min-h-56 h-56 p-7">
                    <h1 className="font-bakbak text-white text-2xl mb-4">
                        Fast and Intuitive:
                    </h1>
                    <p className="text-neutral-200">
                        Our minimalist approach not only ensures a clean and uncluttered writing experience but also guarantees lightning-fast load times. Our intuitive platform makes it easy to write, format, and publish your blog posts with just a few clicks. With Scriber, you can focus on what really matters - creating content that resonates with your audience.    </p>
                </div>

                <Image src={mascot} alt="mascot" width={275} className="lg:block hidden rotate-6 opacity-70 absolute right-0" />

            </div>


            <Link href="/blog/post" className="text-lg lg:mt-8 mx-auto inline-flex items-center gap-3 font-bakbak py-2 px-4 rounded shadow-md text-white bg-main-highlight-dark duration-150 hover:bg-main-highlight-dark/50">
                Start writing <FaPen className="" />
            </Link>

        </div>
    )
}