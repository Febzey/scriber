import Image from "next/image";
import React from "react";
import BlogCardWrapper from "./components/blogCardWrapper";
import FollowUserButton from "./components/followbutton";
import { Session } from "next-auth";
import Link from "next/link";

import { FaLink, FaHeart, } from "react-icons/fa";
import ProfileCard from "./components/profileCard";

interface ProfileContentParams {
    params: {
        user: UserShown
        posts: BlogPostModelType[] | void,
        session: Session | null
    }
}
export default function ProfileContent({ params }: ProfileContentParams) {
    const { user, posts, session } = params;

    const userOwnsProfile = session?.user?.name === user.name ? true : false;

    const publishedPosts = posts && posts.filter(posts => posts.isPublished === true);
    const roughDrafts = posts && posts.filter(posts => posts.isRoughDraft === true);

    return (
        <>
            <div className="w-full min-h-screen h-auto mb-52">

                <div className="w-full flex flex-col items-start h-full pt-12 p-3 mt-[11%] gap-5">

                    <div className="ml-auto pb-5">
                        {
                            !userOwnsProfile
                                ? null
                                : <FollowUserButton />
                        }
                    </div>

                    <div className="flex lg:flex-row flex-col">
                        <ProfileCard props={{ user, userOwnsProfile, publishedPostsCount: publishedPosts ? publishedPosts.length : 0 }} />
                        <BlogCardWrapper props={{ publishedPosts, roughDrafts, userOwnsProfile, user }} />
                    </div>

                </div>
            </div>
        </>
    )
}