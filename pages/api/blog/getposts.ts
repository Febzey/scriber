import { NextApiRequest, NextApiResponse } from "next";
import { getUserBlogPosts } from "../../../utils/database/typeorm";

export default async function GetBlogPostsHandler(req: NextApiRequest, res: NextApiResponse) {
    const { nameOrId } = req.body;

    const posts = await getUserBlogPosts(nameOrId);
    if (!posts) {
        res.status(500).json({ success: false, message: "No posts found or api error."})        
        return
    }

    res.status(201).json({success: true, posts: posts });
    return
}