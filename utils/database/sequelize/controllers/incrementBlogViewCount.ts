import getManager from "../conn";

export default async function IncrementBlogViewCount(blogId: string) {
    try {
        const { BlogPosts } = await getManager();
        if (!BlogPosts) throw new Error("Blog posts model not defined.");

        const b = await BlogPosts.findOne({ where: { id: blogId } })
        if (!b) throw new Error("Blog not found while trying to increment view count.");

        await b.increment(["view_count"], { by: 1 });
        return true;

    } catch (err) {
        console.error(err, "Error inside of IncrementBlogViewCount.ts");
        return null;
    }
}