import { notFound } from 'next/navigation';
import BlogContent from "./components/blogContent";
import InteractionButtons from "./components/interactions";
import Image from "next/image";
import Link from "next/link";
import { humanFormat } from '../../../../utils/time/moment';
import { FaHeart, FaEye } from "react-icons/fa";
import { getSession } from '../../../layout';

type getPostArgs = {
    success: boolean,
    message?: string,
    post?: BlogPostModelType
} | void

export async function getPost(blogurl: string, cacheOpt?: RequestCache | undefined): Promise<getPostArgs> {
    try {
        const res = await fetch(`http://localhost:3000/api/blog/get/${blogurl}?multiple=false`, { cache: cacheOpt ?? "no-store" });
        if (!res.ok) return
        return res.json()
    } catch { return }
}

async function getBlogOwner(username: string): Promise<{ success: boolean, user: UserShown } | void> {
    const res = await fetch(`http://localhost:3000/api/user/get/${username}`, { cache: "no-store" });
    if (!res.ok) return;
    return res.json();
}

async function updateInteraction(blogId: string, userWhoLiked: string) {
    const res = await fetch("http://localhost:3000/api/blog/update/likesorviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            action: "update",
            type: "views",
            blogId: blogId,
            userWhoLiked
        }),
        cache: "no-store",
    })
    if (!res.ok) return null;
    return res.json();
}

interface UserPostBuilderParams {
    user: string,
    blogurl: string
}

//TODO! need to check if the post is a rough draft, if it is. only let the user who owns it see it, and or somehow find a way to redirect them and the blog content to editor page.

export default async function UserPostBuilder({ user, blogurl }: UserPostBuilderParams) {
    const blogPost = await getPost(blogurl) as { success: boolean, post: BlogPostModelType }

    const session = await getSession();

    if (!blogPost || !blogPost.post) notFound()

    const blogOwner = await getBlogOwner(user);
    await updateInteraction(blogPost.post.id, session.user?.name??"")

    const post = blogPost.post;
    const tags = post.tags && JSON.parse(post.tags) as Tag[];

    if (!blogOwner || post.isRoughDraft) notFound();

    return (
        <div className="w-full min-h-3/4 h-auto my-32 flex-col px-4 py-12 lg:px-12 flex rounded-xl lg:flex-row-reverse relative">

            <div className="hidden lg:block w-40 mb-8 lg:mb-0 mt-[11%] mx-auto lg:mr-auto">

                <div className="flex flex-row gap-3 mr-auto text-sm text-[#8E94EE]/60 mb-5">
                    <span className="inline-flex items-center gap-1"><FaEye />{post.view_count}</span>
                    <span className="inline-flex items-center gap-1"><FaHeart />{post.like_count}</span>
                </div>

                <div className="bg-card/20 h-auto w-56 rounded-xl p-4 flex flex-col gap-4">
                    <p className="text-xs text-neutral-300">Tags:</p>
                    <ul className="flex flex-row flex-wrap break-words text-xs text-neutral-400 gap-2">
                        {
                            tags && tags.map((val, index) => (
                                <li key={index} className="p-1 px-2 bg-main rounded">{val.text}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>



            <div className="mx-auto w-full lg:w-[70%] justify-start flex flex-col  mr-auto">

                <div className="w-full flex flex-row items-center justify-between mb-14 pr-8">

                    <Link href={`/u/${blogOwner.user.name}`} className="flex flex-row gap-3 items-center mr-auto">
                        <Image src={blogOwner.user.image ?? ""} alt="pfp" width="65" height="65" className="rounded-full" />
                        <h1 className="text-[#8E94EE]/80">Febzey</h1>
                    </Link>

                    <div className="ml-auto">
                        <InteractionButtons blogid={blogPost.post.id}/>
                    </div>

                </div>

                <h1 className="text-5xl font-bakbak text-neutral-100  mr-auto lg:w-3/4 w-full lg:text-left text-center">{post.title}</h1>
                <p className="text-[#535886] mt-2 text-sm lg:text-left text-center">
                    {humanFormat(post.createdAt)}
                </p>

                <div className="flex flex-col mr-auto mt-32">


                    <div className="text-neutral-100 leading-relaxed text-md h-auto min-h-[30vh]">
                        <BlogContent content={post.content} />
                    </div>

                    {/*Tags, Published at etc. */}
                    <div className="flex flex-col mt-20">
                        {
                            tags && (
                                <ul className="w-full mt-10 gap-4 flex flex-row flex-wrap border-b-2 border-t-2 border-gray-600/30 py-4">
                                    <h2 className="text-neutral-400 text-2xl font-bakbak w-full">Tags</h2>
                                    {
                                        tags.map((tag, key) => (
                                            <li key={key}>
                                                <BlogTag props={{ tag, key }} />
                                            </li>
                                        ))
                                    }
                                </ul>
                            )
                        }

                        <div className="flex flex-col gap-5">
                            <p className="text-xs text-neutral-400 py-4">Published at: <span>{`${humanFormat(post.createdAt)}`}</span></p>
                            {
                                blogOwner && blogOwner.user
                                    ?
                                    <div className="flex flex-row items-center justify-between w-full">
                                        <Link href={`/u/${blogOwner.user.name}`}>
                                            <Image className="rounded-full" src={blogOwner.user.image ?? ""} alt="profilePicForBlogOwner" height={50} width={50} />

                                        </Link>
                                        <Link href={`/u/${blogOwner.user.name}`}>
                                            <p className="text-neutral-400 text-sm">{blogOwner.user.name}</p>
                                        </Link>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

interface BlogTagProps {
    props: {
        tag: Tag,
        key: number
    }
}
const BlogTag = ({ props }: BlogTagProps) => {
    const { tag, key } = props;
    return (
        <li key={key} className={`${tag.color ? `${tag.color}` : "bg-gray-700/50"} text-xs text-center px-4 py-2 rounded  text-white`}>
            <p>{tag.text}</p>
        </li>
    )
}