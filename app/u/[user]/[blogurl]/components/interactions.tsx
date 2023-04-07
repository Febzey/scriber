"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../../providers";

async function updateLikes(action: "update" | "remove", blogId: string, userWhoLiked: string): Promise<{ success: boolean, message?: string } | null> {
    const res = await fetch("http://localhost:3000/api/blog/update/likesorviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            action: action,
            type: "likes",
            blogId: blogId,
            userWhoLiked: userWhoLiked
        })
    })
    if (!res.ok) return null;
    return res.json();
}

export default function InteractionButtons({ blogid }: { blogid: string }) {

    const { user, setUser } = useUserContext();
    const [liked, setLike] = useState(false);

    const addLike = () => {
        if (!user?.name) return;
        if (!Array.isArray(user.liked_posts)) return;
        setLike(true);
        const updatedLikesList = user?.liked_posts ? [...user.liked_posts, blogid] : [blogid];
        updateLikes("update", blogid, user?.name).then(() => {
            setUser(oldUser => ({
                ...oldUser,
                liked_posts: updatedLikesList
            }));
        });
   
        return
    };

    const removeLike = () => {

        if (!user?.name) return;
        if (!Array.isArray(user.liked_posts)) return;
        setLike(false);
        const updatedLikesList = user?.liked_posts?.filter((postId) => postId !== blogid);
        updateLikes("remove", blogid, user?.name).then(() => {
            setUser(oldUser => ({
                ...oldUser,
                liked_posts: updatedLikesList
            }));
        });

        return
    };

    
    useEffect(() => {
        if (user && user.liked_posts && user.liked_posts.includes(blogid)) {
            setLike(true);
        }    
    },[user])

    return (
        <div className="">
            <div className="flex flex-row items-center justify-start gap-4">
            {
                !liked
                    ? <FaRegHeart onClick={() => addLike()} className="cursor-pointer text-red-500/60 text-2xl duration-200 motion-safe:hover:scale-125 hover:text-red-500" />

                    : <FaHeart onClick={() => removeLike()} className="cursor-pointer text-red-500 text-2xl duration-200 motion-safe:hover:scale-125 " />
            }
            </div>
        </div>
    )
}