import type { BlogPostEntity } from "../../../../utils/database/typeorm/entities/blogEntities";
import { notFound } from 'next/navigation';
import BlogContent from "./components/blogContent";


async function getPost(blogurl: string) {
    try {
        const res = await fetch("http://localhost:3000/api/blog/getpost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: blogurl
            })
        });
        if (!res.ok) return
        return res.json()
    } catch { return }
}

interface UserPostBuilderParams {
    user: string,
    blogurl: string
}
export default async function UserPostBuilder({ user, blogurl }: UserPostBuilderParams) {
    console.log(user, blogurl);

    const blogPost = await getPost(blogurl) as { success: boolean, post: BlogPostEntity }

    if (!blogPost || !blogPost.post) {
        notFound()
    }

    const post = blogPost.post;
    const tags = post.tags && JSON.parse(post.tags) as Tag[];
    console.log(post)

    return (
        <div className="w-full min-h-3/4 h-auto my-32 px-4 py-12 lg:px-12 flex bg-gray-800/30 rounded-xl flex-col ">
            <div className="mx-auto w-full  items-center justify-center flex flex-col">
                <h1 className="text-5xl font-bakbak text-neutral-100 text-center lg:w-2/3 mb-32">{post.title}</h1>

                <div className="lg:w-11/12 flex flex-col">


                    <div className="text-neutral-300 leading-relaxed text-md h-auto min-h-[30vh]">
                        <BlogContent content={post.content} />
                    </div>

                    {/*Tags, Published at etc. */}
                    <div className="flex flex-col mt-20">
                        {
                            tags && (
                                <div className="w-full mt-10 gap-4 flex flex-row flex-wrap border-b-2 border-t-2 border-gray-600/30 py-4">
                                    <h2 className="text-neutral-500 text-2xl font-bakbak w-full">Tags</h2>
                                    {
                                        tags.map((tag, index) => (
                                            <BlogTag tag={tag} key={index} />
                                        ))
                                    }
                                </div>
                            )
                        }

                        <div className="">
                            <p className="text-xs text-neutral-400 py-4">Published at: <span>{`${post.updatedAt}`}</span></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const BlogTag = ({ tag, key }: { tag: Tag, key: number }) => {
    return (
        <div className={`${tag.color ? `${tag.color}` : "bg-gray-700/50"} text-xs text-center px-4 py-2 rounded  text-white`}>
            <p>{tag.text}</p>
        </div>
    )
}