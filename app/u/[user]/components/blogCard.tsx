"use client";
import Link from "next/link";
import { FaTimes, FaEye, FaHeart } from "react-icons/fa";
import { fromNow, humanFormat } from "../../../../utils/time/moment";
import Tooltip from "../../../../components/tooltips/tooltip";
interface BlogCardParams {
    params: {
        post: BlogPostModelType,
        index: number,
        user: UserShown,
        setDeletePopup: React.Dispatch<{
            postToDelete: null | BlogPostModelType,
            confirmDelete: boolean
        }>,
        userOwnsProfile: boolean,
    }
}
export default function BlogCard({ params }: BlogCardParams) {
    const { post, index, user, setDeletePopup, userOwnsProfile } = params;
    return (
        <>
            <div className={`hover:bg-second-dark/50 rounded flex  ${post.isRoughDraft ? "border-l-card" : "border-l-main-dark"}  mb-14 flex-col lg:flex-row justify-between gap-3 w-full h-auto min-h-16 p-4 relative duration-150`} key={index}>
                {
                    post.authorId === user.id && userOwnsProfile &&
                    <div className="absolute right-1 top-1 flex flex-row gap-2">
                        <Tooltip text="Delete Post" tooltipId="delete">
                            <button onClick={() => setDeletePopup({ confirmDelete: false, postToDelete: post })}>
                                <FaTimes className="text-sm text-neutral-400 duration-150 hover:text-[#C4BDCB]" />
                            </button>
                        </Tooltip>
                    </div>
                }
                <div className="flex flex-col gap-3 max-w-[80.333333%] w-auto mr-5">
                    <h1 className="text-2xl font-bakbak text-white">{post.title}</h1>
                    <p className="text-sm text-main-dark">{post.summary.length > 400 ? `${post.summary.slice(0, 400)}...` : post.summary}</p>

                    {post.isPublished &&
                        <div className="flex flex-row gap-3 mr-auto text-xs text-card text-main-dark/40">
                            <p>Published at: {humanFormat(post.createdAt)} ({fromNow(post.createdAt)})</p>
                            <p className="inline-flex items-center justify-center gap-1"><FaEye /> {post.view_count}</p>
                            <p className="inline-flex items-center justify-center gap-1"><FaHeart /> {post.like_count}</p>
                        </div>
                    }
                </div>

                <div className="w-auto my-auto ml-auto">
                    {
                        post.isPublished
                            ?
                            <Link href={`/u/${user.name}/${post.url}`}>
                                <span className="px-3 py-1 rounded-full text-sm ring-1 ring-main-purple text-main-purple hover:text-white duration-100 hover:bg-main-purple">Read More</span>
                            </Link>
                            :
                            <Link href={`/blog/post?blogid=${post.id}&username=${user.name}`}>
                                <span className="px-3 py-1 rounded-full text-sm ring-1 ring-main-purple text-main-purple hover:text-white duration-100 hover:bg-main-purple">Edit</span>
                            </Link>
                    }
                </div>

            </div>
        </>
    )
}