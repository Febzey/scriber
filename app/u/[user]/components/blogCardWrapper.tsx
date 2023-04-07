"use client";

import React, { useState } from "react";
import BlogCard from "./blogCard";
import fire from "../../../../public/images/loaders/fire.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface BlogCardWrapperProps {
    props: {
        publishedPosts: void | BlogPostModelType[],
        roughDrafts: void | BlogPostModelType[],
        userOwnsProfile: boolean,
        user: UserShown
    }

}

export default function BlogCardWrapper({ props }: BlogCardWrapperProps) {
    const { publishedPosts, roughDrafts, userOwnsProfile, user } = props;

    const [deletePopup, setDeletePopup] = useState<{
        postToDelete: null | BlogPostModelType,
        confirmDelete: boolean
    }>({
        postToDelete: null,
        confirmDelete: false
    });

    return (

        <>
            {
                deletePopup.postToDelete && <ConfirmDeletePopup props={{ deletePopup, setDeletePopup }} />
            }
            <div className="lg:ml-auto w-full min-h-[45rem] h-auto flex flex-col gap-14 rounded-none lg:rounded-2xl lg:px-8 pb-10 scrollbar-thin scrollbar-thumb-[#6464FB] scrollbar-track-[#C4BDCB]">
                {/* Rough draft Articles */}
                <>
                    {userOwnsProfile && roughDrafts && roughDrafts.length > 0 && (
                        <div className="w-full h-full flex gap-11 flex-col items-center justify-start p-4 border-b-2 border-b-main-accent-dark/20 pb-12">
                            <div className="w-full">
                                <h1 className="mr-auto text-main-dark font-bakbak mb-5">Rough Drafts</h1>
                                {roughDrafts.map((post, index) => (
                                    post.title && (
                                        <React.Fragment key={index}>
                                            <BlogCard params={{ post, index, user: user, setDeletePopup, userOwnsProfile }} />
                                        </React.Fragment>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </>


                {/* Published draft Articles */}
                <div className="w-full h-full gap-11 flex flex-col items-center justify-start p-4 border-b-main-accent-dark/20 border-b-2 pb-12">
                    <div className="w-full">
                        <h1 className="mr-auto text-main-dark font-bakbak mb-5">Published Posts</h1>

                        {publishedPosts && publishedPosts.length > 0 ? (
                            publishedPosts.map((post, index) => (
                                <React.Fragment key={index}>
                                    <BlogCard params={{ post, index, user: user, setDeletePopup, userOwnsProfile }} />
                                </React.Fragment>
                            ))
                        ) : (
                            <div className="mx-auto h-1/3 w-full flex items-center justify-center">
                                <h1 className="text-neutral-300">Seems this user has not published anything yet..</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}


interface ConfirmDeletePopupProps {
    props: {
        deletePopup: {
            postToDelete: null | BlogPostModelType,
            confirmDelete: boolean
        },
        setDeletePopup: React.Dispatch<{
            postToDelete: null | BlogPostModelType,
            confirmDelete: boolean
        }>
    }
}
function ConfirmDeletePopup({ props }: ConfirmDeletePopupProps) {
    const { deletePopup, setDeletePopup } = props;
    const { postToDelete } = deletePopup;

    const router = useRouter();

    const [redirectCountdown, setRedirectCountdown] = useState(10);
    const [titlesDontMatch, setTitlesDontMatch] = useState(false);
    const [typedTitle, setTypedTitle] = useState("");
    const [isLoading, setLoading] = useState({
        isDone: null as null | boolean,
        success: null as null | boolean,
    });

    const handleDelete = async () => {
        if (postToDelete?.title !== typedTitle) {
            setTitlesDontMatch(true);
            return;
        }

        try {
            setLoading({ isDone: false, success: null });

            const res = await fetch(`http://localhost:3000/api/blog/delete/${postToDelete.id}`);
            if (!res.ok) throw new Error("Failed to delete post.");

            setLoading({ isDone: null, success: true });
            handleRedirectToProfile();


        } catch {
            setLoading({ isDone: null, success: false });
            handleRedirectToProfile();
        }

    }

    const handleRedirectToProfile = async () => {
        const intervalId = setInterval(() => {
            setRedirectCountdown(countdown => countdown - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalId);
            // Perform the redirect here
            router.refresh()
            setDeletePopup({
                postToDelete: null,
                confirmDelete: false,
            });
        }, redirectCountdown * 1000);
    }

    return postToDelete && (
        <div
            className="fixed text-center w-full z-50 top-0 right-0 bottom-0 left-0 bg-black/95"
        >
            <div className="flex flex-col w-full h-full items-center justify-center p-4">
                {
                    isLoading.isDone === null
                        ?
                        isLoading.success
                            ?
                            <div>
                                <h1 className="font-bakbak text-2xl text-white">Your post has been deleted.</h1>
                                <p className="text-neutral-400 text-xs">Returning back to profile... {redirectCountdown}</p>
                            </div>
                            : isLoading.success === false && isLoading.isDone === null
                                ?
                                <div>
                                    <h1 className="font-bakbak text-2xl text-white">There was a problem deleting your post.</h1>
                                    <p className="text-neutral-400 text-xs">Returning back to profile... {redirectCountdown}</p>
                                </div>
                                :
                                <div>

                                    <h1 className="text-neutral-300 mb-4 text-xl font-semibold">{postToDelete.title}</h1>
                                    <h1 className="font-bakbak text-2xl text-neutral-100">Are you 100% <span className="text-indigo-400 uppercase text-3xl">sure</span> you want to <span className="text-red-500 uppercase text-3xl">delete</span> this post?</h1>
                                    <p></p>

                                    <div className="flex flex-col w-full items-center justify-center">
                                        <input
                                            onChange={(e) => { setTypedTitle(e.target.value); setTitlesDontMatch(false) }}
                                            value={typedTitle}
                                            autoCorrect="off"
                                            autoComplete="off"
                                            autoSave="off"
                                            type="text"
                                            placeholder="Blog Post Title"
                                            className={`p-2 text-sm w-[80%] lg:w-1/3 text-white mt-8 rounded bg-gray-700 placeholder-neutral-300 ${titlesDontMatch ? "ring-1 ring-red-500" : ""}`}
                                        />

                                        <div className="flex flex-row mt-12 items-center justify-center gap-8">
                                            <button onClick={() => handleDelete()} className="text-red-500 font-bakbak text-2xl active:text-red-300 px-2 py-1 duration-200 rounded hover:bg-red-500 hover:text-white">DELETE</button>
                                            <button onClick={() => setDeletePopup({ confirmDelete: false, postToDelete: null })} className="text-neutral-300 font-bakbak text-2xl active:text-emerald-300 px-2 py-1 duration-200 rounded hover:bg-emerald-500 hover:text-white">KEEP</button>

                                        </div>
                                    </div>
                                </div>

                        :
                        <div className="flex flex-col">
                            <Image src={fire} alt="fireloader" width={200} />
                            <p className="text-neutral-400 text-sm mt-9 animate-pulse">Deleting post...</p>
                        </div>

                }
            </div>
        </div>
    );
}


