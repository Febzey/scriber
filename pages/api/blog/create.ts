import { NextApiRequest, NextApiResponse } from 'next';
import { createBlogPost } from '../../../utils/database/typeorm';

export default async function BlogCreateHandler(req: NextApiRequest, res: NextApiResponse) {
    const { title, content, summary, tags, userEmail, isRoughDraft } = req.body as BlogPost;

    const blogPost: BlogPost = {
        title: title,
        content: content,
        summary: summary,
        tags: JSON.stringify(tags),
        isRoughDraft: isRoughDraft,
        userEmail: userEmail,
    }

    const url = await createBlogPost(blogPost);
    if (!url) {
        res.status(500).json({ success: false, message: "Failed to create blog post" });
        return
    }

    console.log(url, " Response from saving post.")

    res.status(201).json({ success: true, url: url });
    return
}