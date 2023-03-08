import { BlogPostCardPreview } from "./blogPreviewCard";

//-q5ZB10-Irmkl9my75BA9BzWru4yPCBSrzJnt1M3I9U
async function getLatestBlog() {
    const res = await fetch(
        "https://api.newscatcherapi.com/v2/search?q=Tesla&lang=en",
        {
            headers: {
                "x-api-key": "-q5ZB10-Irmkl9my75BA9BzWru4yPCBSrzJnt1M3I9U",
            },
        }
    );
    if (!res.ok) throw new Error("Error fetching blog");
    return res.json();
}


export default async function BlogPreviewContent() {
    const blog: BlogPosts = await getLatestBlog();

    let blogPosts = blog.articles
    blogPosts = blogPosts.slice(0, 5)

    return (
        <div className="flex flex-col gap-11 w-full">
            {
                blogPosts.map((val, index) => (
                    <BlogPostCardPreview blogData={val} />
                ))
            }
        </div>
    )
}
