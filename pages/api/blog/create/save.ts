import { NextApiRequest, NextApiResponse } from 'next';
import { Op } from "sequelize";

import getManager from '../../../../utils/database/sequelize/conn';
export default async function BlogSaveHandler(req: NextApiRequest, res: NextApiResponse) {
    const { title, content, summary, tags, userEmail, isRoughDraft } = req.body as BlogPost;

    const blogPost: BlogPost = {
        title: title,
        content: content,
        summary: summary,
        tags: JSON.stringify(tags),
        isRoughDraft: isRoughDraft,
        userEmail: userEmail,
    }

    try {
        const { BlogPosts, User } = await getManager();
        if (!BlogPosts || !User) throw new Error("User or BlogPosts model not defined.");

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: userEmail },
                    { id: userEmail }
                ]
            }
        })
        if (!user) throw new Error("Not user found.");


        const existingPost = await BlogPosts.findOne({
            where: {
                [Op.or]: [
                    {
                        title: blogPost.title,
                        authorId: user.dataValues.id,
                        isRoughDraft: true
                    },
                    {
                        authorId: user.dataValues.id,
                        isRoughDraft: true
                    }
                ]
            }
        });

        const now = Date.now();
        const url = generatePostUrlFromTitle(blogPost.title)

        if (existingPost) {
            existingPost.set('content', blogPost.content);
            existingPost.set('summary', blogPost.summary);
            existingPost.set('tags', blogPost.tags);
            existingPost.set('isPublished', blogPost.isRoughDraft ? false : true)
            existingPost.set('url', url)
            existingPost.set('title', blogPost.title)
            existingPost.set('isRoughDraft', blogPost.isRoughDraft)
            existingPost.set('updatedAt', new Date(now));

            await existingPost.save();

            res.status(201).send({ success: true, url: url });
            return;
        }

        const newBlogPost = await BlogPosts.create({
            title: blogPost.title,
            content: blogPost.content,
            summary: blogPost.summary,
            tags: blogPost.tags,
            isRoughDraft: blogPost.isRoughDraft,
            isPublished: blogPost.isRoughDraft ? false : true,
            authorId: user.dataValues.id,
            url: url,
            createdAt: now,
            updatedAt: now,
        })

        res.status(201).json({ success: true, post: newBlogPost.toJSON() });
        return;

    } catch (err: any) {
        let errMsg = "Error while updating or saving blogpost."
        if (err?.name === "SequelizeUniqueConstraintError") errMsg = "exists";
        res.status(200).json({ success: false, message: errMsg })
        return
    }
}

function generatePostUrlFromTitle(title: string) {
    const url = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    return `${url}`;
}