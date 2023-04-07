 import getManager from "../conn";
import { Op } from "sequelize";
export default async function SaveBlogPost(post: BlogPost): Promise<BlogPostModelType | null | unknown> {
    const { BlogPosts, User } = await getManager();

    if (!BlogPosts || !User) {
        throw new Error("BlogPosts or Users table issue.")
    }

    const u = await User.findOne({ where: { email: post.userEmail } });
    if (!u) throw new Error("No user found.");

    const user = u.toJSON();

    const existingPost = await BlogPosts.findOne({
        where: {
            [Op.or]: [
                {
                    title: post.title,
                    authorId: user.id,
                    isRoughDraft: true
                },
                {
                    authorId: user.id,
                    isRoughDraft: true
                }
            ]
        }
    
    });
    const now = Date.now();
    if (existingPost) {
        console.log(`Found existing rough draft post with id ${existingPost.getDataValue('id')}`);

        // Update the existing post with the new content
        existingPost.set('content', post.content);
        existingPost.set('summary', post.summary);
        existingPost.set('tags', post.tags);
        existingPost.set('isPublished', post.isRoughDraft ? false : true)
        existingPost.set('url', generatePostUrlFromTitle(post.title))
        existingPost.set('title', post.title)
        existingPost.set('isRoughDraft', post.isRoughDraft)
        existingPost.set('updatedAt', new Date(now));

        await existingPost.save();
        console.log(`Updated post with id ${existingPost.getDataValue('id')}`);


        return existingPost.toJSON();
    }

    else {
        // Create a new post
        const blogPost = await BlogPosts.create({
            title: post.title,
            content: post.content,
            summary: post.summary,
            tags: post.tags,
            isRoughDraft: post.isRoughDraft,
            isPublished: post.isRoughDraft ? false : true,
            authorId: user.id,
            url: generatePostUrlFromTitle(post.title),
            createdAt: now,
            updatedAt: now,
        });
        return blogPost.toJSON();
    }
}



function generatePostUrlFromTitle(title: string) {
    const url = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    return `${url}`;
}