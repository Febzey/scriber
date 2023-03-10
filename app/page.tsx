import { FaPlus, FaTwitter, FaDiscord } from "react-icons/fa";
import BlogPreview from "./components/blogPreview/blogPreview"
import Link from "next/link"

export default async function Page() {
    return (
        <div className="flex flex-col gap-20 items-center justify-center pb-32 mx-auto">
            <div className="h-[40vh] w-full flex items-center justify-center flex-col ">
                <h1 className="text-5xl font-bakbak bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text">SCRIBER</h1>
                <p className="text-xs text-neutral-500">(skrī-bər)</p>
                <p className="text-sm text-neutral-400">Easily create and share blog posts.</p>
                <div className="gap-3 flex flex-row items-center justify-center p-3 text-neutral-600">
                    <FaDiscord className="rounded-full p-2 bg-zinc-800 text-4xl"/>
                    <FaTwitter className="rounded-full p-2 bg-zinc-800 text-4xl"/>
                </div>
                <Link href="/create" className="py-1 px-3 rounded-sm flex items-center gap-1 bg-slate-600 border-b-[5px] border-b-slate-500 duration-150 hover:bg-slate-500 text-neutral-200 text-sm  mt-4">
                    Create Post <FaPlus />
                </Link>
            </div>
            <BlogPreview />
        </div>
    )
}