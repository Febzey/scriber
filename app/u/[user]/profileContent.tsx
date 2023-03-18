"use client";

import type { UserEntity } from "../../../utils/database/typeorm/entities/userEntities";
import type { BlogPostEntity } from "../../../utils/database/typeorm/entities/blogEntities";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTimes } from "react-icons/fa";
import React from "react";

interface ProfileContentParams {
    params: {
        user: UserEntity
        posts: BlogPostEntity[] | void
    }
}
export default function ProfileContent({ params }: ProfileContentParams) {
    const { data: session } = useSession();

    const [userOwnsProfile, setUserOwnsProfile] = useState(false);

    const { user, posts } = params;

    const publishedPosts = posts && posts.filter(posts => posts.isPublished === true);
    const roughDrafts = posts && posts.filter(posts => posts.isRoughDraft === true);
    console.log(publishedPosts, " published")

    useEffect(() => {
        if (session?.user?.name === user.name) {
            setUserOwnsProfile(true);
        }
    }, [session]);


    return (
        <div className="w-full min-h-screen h-auto mb-52">
            <div className="flex lg:flex-row flex-col w-full h-full translate-y-20 pt-12">

                <div className="flex flex-col gap-2 lg:mr-auto mx-auto lg:mx-0 p-4">
                    <Image src={user.image ?? ""} alt="userprofileimg" width={170} height={170} className="rounded-full" />

                    <div className="mx-auto flex flex-col items-center justify-center">
                        <h1 className="font-bakbak text-4xl text-cetner text-white">{user.name}</h1>
                        <p className="text-neutral-400 text-sm">Rank: <span>1000</span></p>
                        <p className="text-neutral-400 text-sm">Blogs Published: {publishedPosts ? publishedPosts.length : "0"}</p>
                    </div>

                </div>


                <div className="w-full lg:w-3/4 h-full flex flex-col gap-14">
                    {/* Rough draft Articles */}
                    <>
                    {userOwnsProfile && roughDrafts && roughDrafts.length > 0 && (
                        <div className="w-full h-full flex gap-11 flex-col items-center justify-start p-4 border-b-2 border-b-gray-700/30 pb-12">
                            <div>
                                <h1 className="ml-7 mr-auto text-neutral-400 font-bakbak mb-5">Rough Drafts</h1>
                                {roughDrafts.map((post, index) => (
                                    post.title && (
                                        <React.Fragment key={index}>
                                            <BlogCard params={{ post, index, user: user.name }} />
                                        </React.Fragment>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                    </>


                    {/* Published draft Articles */}
                    <div className="w-full h-full gap-11 flex flex-col items-center justify-start p-4 border-b-gray-700/30 border-b-2 pb-12">
                        <h1 className="ml-7 mr-auto text-neutral-400 font-bakbak mb-5">Published Posts</h1>

                        {publishedPosts && publishedPosts.length > 0 ? (
                            publishedPosts.map((post, index) => (
                                <BlogCard params={{ post, index, user: user.name }} key={index} />
                            ))
                        ) : (
                            <div className="mx-auto h-1/3 w-full flex items-center justify-center">
                                <h1 className="text-neutral-300">Seems this user has not published anything yet..</h1>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </div>
    )
}


interface BlogCardParams {
    params: {
        post: BlogPostEntity,
        index: number,
        user: string | null
    }
}
function BlogCard({ params }: BlogCardParams) {
    const { post, index, user } = params;
    return (
        <Link href={`/u/${user}/${post.url}`} className="flex mb-14 flex-row gap-3 w-full h-auto min-h-16 p-4 bg-gray-700/30 shadow-xl rounded-lg relative duration-150 hover:bg-gray-700/50 cursor-pointer" key={index}>
            {
                post.isRoughDraft &&
                <div className="absolute right-3 top-3 flex flex-row gap-2">
                    <Link href=""><FaEdit className="text-lg text-neutral-200 duration-150 hover:text-neutral-500" /></Link>
                    <Link href=""><FaTimes className="text-lg text-neutral-200 duration-150 hover:text-neutral-500" /></Link>
                </div>
            }
            <div className="flex flex-col gap-3 w-5/6">
                <h1 className="text-2xl font-bakbak text-white">{post.title}</h1>
                <p className="text-md text-neutral-300">{post.summary} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem impedit quaerat at reprehenderit hic eius facere similique asperiores, fuga pariatur laboriosam consequuntur repellat ut distinctio sit debitis eligendi tempore. Corrupti?</p>

                <p className="text-xs text-neutral-500">Published at: {`${post.updatedAt}`}</p>
            </div>
        </Link>
    )

}