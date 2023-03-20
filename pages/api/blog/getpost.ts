import { NextApiRequest, NextApiResponse } from "next";;
import { getUserBlogPostByUrl } from "../../../utils/database/typeorm";

export default async function getSingleBlogPostHandler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.body;

    const blogPost = await getUserBlogPostByUrl(url);
    
    if (!blogPost) {
        res.status(500).json({ success: false, message: "No post with this url found or api error."})        
        return
    }

    res.status(201).json({success: true, post: blogPost });
    return;

}