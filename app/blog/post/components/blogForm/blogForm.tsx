"use client";

import { useState, useRef, useEffect } from "react";
import BlogContentInput from "./contentInput";
import BlogTags from "./tags";
import Link from "next/link";

import { useAlert } from "../../../../../providers/alertProvider";

import { FaArrowLeft, FaEnvelope, FaFacebookF, FaLinkedinIn, FaSpinner, FaTimes, FaTwitter } from "react-icons/fa";
import { Session } from "next-auth";

interface BlogPostFormProps {
    props: {
        email: string | null | undefined,
        session: Session,
        roughDraftPost: BlogPostModelType | null,
    }
}
export default function BlogPostForm({ props }: BlogPostFormProps) {
    const { email, session, roughDraftPost } = props;
    const titleRef = useRef<HTMLInputElement>(null);

    const [err, setErr] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState<string | null>(null);
    const [summary, setSummary] = useState("");
    const [tags, setTags] = useState<Tag[] | null>([]);
    const [isLoading, setLoading] = useState(false);

    const [successPopup, setSuccessPopUp] = useState(false);
    const [confirmPublishPopup, setConfirmPublishPopup] = useState(false);

    const [isRoughDraft, setIsRoughDraft] = useState(true);

    const [url, setUrl] = useState("testurl");

    const { showAlert } = useAlert();

    useEffect(() => {
        if (roughDraftPost) {
            const { title, content, summary, tags } = roughDraftPost;
            setTitle(title);
            setContent(content);
            setSummary(summary);
            setTags(JSON.parse(tags))
        } else {
            setContent("")
            setTitle("")
            setSummary("")
            setTags([])
        }

    }, [roughDraftPost]);

    const handleSubmit = async (type: "draft" | "publish") => {
        if (confirmPublishPopup) setConfirmPublishPopup(false);

        if (!content || !summary || !title) {
            showAlert({
                type: "info",
                title: "Missing inputs.",
                text: "Seems you have missed some fields. No point in submitting an empty post.",
                timeout: 15000,
            })
            return;
        }

        type === "publish" && setIsRoughDraft(false);

        setLoading(true);

        try {
            await new Promise(r => setTimeout(r, 5000))
            const res = await fetch("/api/blog/create/save", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    summary: summary,
                    tags: tags,
                    userEmail: email,
                    isRoughDraft: type === "draft" ? true : false
                })
            })

            if (!res.ok) {
                throw new Error(`Failed to submit blog post. Status code: ${res.status}`);
            }

            const data = await res.json();

            if (data.success) {
                data.url && setUrl(data.url);
                setLoading(false);
                setSuccessPopUp(true);
            } else {
                setErr(data.message);
                if (data.message === "exists") {
                    titleRef.current?.scrollIntoView({ behavior: "smooth" });

                    showAlert({
                        type: "error",
                        title: "Slight issue.",
                        text: "You already have a post with this exact title.",
                        timeout: 10000
                    })
                }
                setLoading(false);
            }

        } catch (error: any) {
            setErr(error?.message ?? "unknown");
            setLoading(false);
            showAlert({
                type: "error",
                title: "Unexpected Error.",
                text: "An unexpected error occured. Try again later and if this continues please contact support.",
                timeout: 10000
            })
        }
    };

    return (
        <>
            {
                //when the user has successfully submitted a rough draft, or published their post.
                successPopup
                    ? <SavedPopup props={{ setSuccessPopUp, url, isRoughDraft, username: session.user?.name }} />
                    : null
            }
            {
                //When the user hits publish, we set this value to true.
                confirmPublishPopup
                    ? <PublishConfirmPopup handleSubmit={handleSubmit} setConfirmPublishPopup={setConfirmPublishPopup} />
                    : null
            }
            <div className="w-full min-h-screen h-auto flex items-start justify-center lg:mt-20 my-44 ">
                <div className="w-full mx-auto flex flex-row  p-4 mt-20 h-auto  py-12">
                    <form className="w-3/4 h-full mx-auto flex items-center justify-center flex-col gap-8">

                        {/*Blog Title*/}
                        <div className="flex flex-col w-full">
                            {
                                err === "exists"
                                    ? <p className="text-red-400 text-sm">You already have a blog post with this title.</p>
                                    : null
                            }
                            <input
                                ref={titleRef}
                                required
                                type="text"
                                placeholder="Lets start with a title..."
                                onChange={(e) => { setTitle(e.target.value); setErr("") }}
                                value={title}
                                spellCheck={false}

                                className={` w-full h-16 rounded-lg bg-transparent border-transparent border-2 placeholder-white px-4 text-white text-xl font-semibold ${err === "exists" ? "border-red-500 border-1 text-red-400 placeholder-red-400" : ""}`}
                            />
                        </div>

                        {/*Blog Main Content Input*/}
                        {
                            content !== null
                                ? <BlogContentInput props={{ content, setContent, isRoughDraft: roughDraftPost ? true : false }} />
                                : <div className="w-full min-h-[60vh] h-auto  bg-gray-800/80 rounded-lg"></div>


                        }
                        {/*Blog Summary Input*/}
                        <textarea
                            required
                            placeholder="Summarize your post"
                            onChange={(e) => setSummary(e.target.value)}
                            value={summary}
                            spellCheck={false}
                            className="w-full p-3 min-h-[9rem] h-auto rounded-lg bg-transparent border-card/30 border-2 placeholder-neutral-300 px-4 text-white"
                        />

                        {/*Blog Tags*/}
                        {
                            <BlogTags props={{ tags, setTags }} />
                        }

                        {/*Blog Save Rough Draft Or Publish Buttons*/}
                        <div className="flex flex-row gap-4 items-center justify-center ml-auto mr-4">
                            {
                                isLoading
                                    ? <FaSpinner className="mr-10 animate-spin text-white text-3xl" />
                                    :
                                    <>
                                        <button type="button" onClick={() => handleSubmit("draft")} className="text-white text-sm duration-150  rounded px-4 py-2 hover:bg-card/40">
                                            Save Draft
                                        </button>

                                        <button type="button" onClick={() => setConfirmPublishPopup(true)} className="text-white text-sm bg-indigo-main duration-150 hover:bg-indigo-main/50 rounded px-4 py-2">
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
        isRoughDraft: boolean,
        username: string | null | undefined
    }
}
const SavedPopup = ({ props }: SavedPopupProps) => {
    const { setSuccessPopUp, url, isRoughDraft, username } = props;


    return (

        <div className="absolute inset-0  z-50" onClick={() => setSuccessPopUp(false)}>
            <div className="flex flex-col gap-1  p-12 w-full h-full text-neutral-200 bg-black/70 backdrop-blur-md fixed">
                <div className="">
                    {
                        isRoughDraft
                            ? <div className="flex mr-auto text-start flex-col">
                                <h1 className="text-white text-6xl font-bakbak">Draft Saved.</h1>
                                <p className="text-xl text-neutral-300">Your rough drafts can be found at your profile.</p>

                                <div className="flex flex-row gap-2 mr-auto mt-8">
                                    <button onClick={() => setSuccessPopUp(false)} className="px-4 py-3 rounded bg-main/60 text-white w-24 text-center duration hover:bg-main/30">Back</button>

                                    <Link href={`/u/${username}`} className="px-4 py-3 rounded bg-indigo-main text-white w-24 text-center duration hover:bg-indigo-main/50">Profile</Link>
                                </div>
                            </div>

                            :
                            <div className="bg-[#262745] lg:w-1/3 min-h-[25rem] mx-auto mt-[10%] rounded-xl p-10 flex flex-col text-center shadow-2xl relative">
                                <Link href={`/u/${username}`} className="rounded-full p-3 bg-white text-black absolute left-5 top-12 duration-150 hover:bg-white/60">
                                    <FaArrowLeft />
                                </Link>

                                <h1 className="font-bakbak text-white text-5xl mx-auto mt-7">Post Published.</h1>
                                <p className="mx-auto">Start sharing your post with others.</p>


                                <div className="min-w-[66%] text-center p-3 text-sm mx-auto mt-10 rounded bg-black/20 text-[#8c8eb4] duration-100 hover:text-[#8c8eb4]/50">
                                    <Link href={`/u/${username}/${url}`} className="">scriber.app/u/{username}/{url}</Link>
                                </div>

                                <div className="mt-10 flex flex-row gap-4 items-center justify-center">
                                    <a href="" className="bg-black/30 rounded-full p-3">
                                        <FaTwitter className="text-lg text-white" />
                                    </a>
                                    <a href="" className="bg-black/30 rounded-full p-3">
                                        <FaFacebookF className="text-lg text-white" />
                                    </a>
                                    <a href="" className="bg-black/30 rounded-full p-3">
                                        <FaLinkedinIn className="text-lg text-white" />
                                    </a>
                                    <a href="" className="bg-black/30 rounded-full p-3">
                                        <FaEnvelope className="text-lg text-white" />
                                    </a>
                                </div>


                                <Link href={`/u/${username}`} className="text-[#8E94EE] mt-8 underline-offset-4 decoration-2 underline-[#8E94EE] underline hover:text-indigo-500">
                                    Profile
                                </Link>
                            </div>


                    }
                </div>
            </div>
        </div>
    )
}


interface PublishConfirmPopupProps {
    handleSubmit: (type: "draft" | "publish") => void;
    setConfirmPublishPopup: React.Dispatch<boolean>
}
const PublishConfirmPopup = ({ handleSubmit, setConfirmPublishPopup }: PublishConfirmPopupProps) => {

    return (
        <div className="inset-0 absolute overflow-none z-50">
            <div className="fixed w-full h-full bg-main justify-start">
                <div className="mt-[10%] bg-card/20 lg:w-[44%] lg:rounded-2xl shadow-xl h-96 mx-auto p-10 flex flex-col">

                    <h1 className="font-bakbak text-3xl text-white">
                        Are you sure you want to Publish ?
                    </h1>

                    <p className="mt-5 text-neutral-200">
                        Once you hit the "Publish" button, your post will be live on your blog and accessible to readers around the world. Are you sure you're ready to share your thoughts and ideas with the world? Double-check your spelling, grammar, and formatting, and make sure your post is exactly the way you want it.
                    </p>

                    <div className="flex flex-row gap-2 mt-auto mr-auto ">
                        <button onClick={() => setConfirmPublishPopup(false)} className="px-4 py-3 rounded bg-main/60 text-white w-24 text-center duration hover:bg-main/30">Back</button>

                        <button onClick={() => handleSubmit("publish")} className="px-4 py-3 rounded bg-indigo-main text-white w-24 text-center duration hover:bg-indigo-main/50">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}