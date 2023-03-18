"use client";

import { useState } from "react";
import BlogContentInput from "./contentInput";
import BlogTags from "./tags";
import Link from "next/link";

import { FaSpinner, FaTimes } from "react-icons/fa";

export default function BlogPostForm({ email }: { email: string | null | undefined }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [summary, setSummary] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setLoading] = useState(false);

    const [successPopup, setSuccessPopUp] = useState(false);
    const [isRoughDraft, setIsRoughDraft] = useState(true);

    const [url, setUrl] = useState("testurl");

    const handleSubmit = async (type: "draft" | "publish") => {
        // e.preventDefault();
        if (!content || !summary) return;

        type === "publish" && setIsRoughDraft(false);

        setLoading(true);

        await new Promise(r => setTimeout(r, 5000));

        const res = await fetch("/api/blog/create", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                title: title,
                content: content,
                summary: summary,
                tags: tags,
                userEmail: email,
                isRoughDraft: true
            })
        })
        if (!res.ok) return;

        const data = await res.json();
        //still need to check for error "success: false"

        data.url && setUrl(data.url);


        setLoading(false);
        setSuccessPopUp(true);
    }

    return (
        <>
            {
                successPopup
                    ? <SavedPopup props={{ setSuccessPopUp, url, isRoughDraft }} />
                    : null
            }
            <div className="w-full min-h-screen h-auto  flex flex-col items-start justify-center lg:mt-20 my-44">
                <div className="w-full mx-auto bg-gray-800/50 p-4 mt-20 h-auto shadow-2xl rounded-2xl py-12">
                    <form className="w-3/4 h-full mx-auto flex items-center justify-center flex-col gap-8">
                        <input
                            required
                            type="text"
                            placeholder="Lets start with a title..."
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            spellCheck={false}
                            className="w-full h-16 rounded-lg bg-transparent border-gray-700/50 border-2 placeholder-white px-4 text-white text-xl font-semibold"
                        />
                        <BlogContentInput props={{ content, setContent }} />
                        <textarea
                            required
                            placeholder="Summarize your post"
                            onChange={(e) => setSummary(e.target.value)}
                            value={summary}
                            spellCheck={false}
                            className="w-full p-3 min-h-[9rem] h-auto rounded-lg bg-transparent border-gray-700/50 border-2 placeholder-neutral-300 px-4 text-white font-semibold"
                        />

                        <BlogTags props={{ tags, setTags }} />

                        <div className="flex flex-row gap-4 items-center justify-center ml-auto mr-4">
                            {
                                isLoading
                                    ? <FaSpinner className="mr-10 animate-spin text-white text-3xl" />
                                    :
                                    <>
                                        <button type="button" onClick={() => handleSubmit("draft")} className="text-neutral-300 text-xs duration-150 hover:text-sky-500  rounded px-4 py-2 underline-offset-4 decoration-sky-500 underline">
                                            Save Draft
                                        </button>

                                        <button type="button" onClick={() => handleSubmit("publish")} className="text-neutral-200 text-sm bg-emerald-700/90 duration-150 hover:bg-emerald-600 rounded px-4 py-2">
                                            Publish
                                        </button>
                                    </>
                            }

                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}


interface SavedPopupProps {
    props: {
        setSuccessPopUp: React.Dispatch<boolean>,
        url: string,
        isRoughDraft: boolean
    }
}
const SavedPopup = ({ props }: SavedPopupProps) => {
    const { setSuccessPopUp, url, isRoughDraft } = props;

    return isRoughDraft
        ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-40">
                <div className="w-full max-w-lg mx-auto p-6 lg:rounded-lg bg-gray-800">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Rough Draft Saved</h2>
                        <button className="text-white hover:text-gray-400 focus:outline-none" onClick={() => setSuccessPopUp(false)} type="button">
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                    <p className="text-white mb-4">Your rough draft has been saved successfully.</p>
                    <p className="text-white mb-6">You can continue editing your draft at a later time by visiting your profile page.</p>
                    <div className="flex justify-between items-center">
                        <Link href={`/u/}`} className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 focus:outline-none" type="button">Go to Profile</Link>
                        <button className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 focus:outline-none" type="button" onClick={()=>setSuccessPopUp(false)}>Continue Editing</button>
                    </div>
                </div>
            </div>

        )
        : (
            <div>

            </div>
        )
}