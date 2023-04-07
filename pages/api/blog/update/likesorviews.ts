import { NextApiRequest, NextApiResponse } from "next";
import getManager from "../../../../utils/database/sequelize/conn";

type BodyArgs = {
    action: "update" | "remove",
    type: "likes" | "views",
    blogId: string
    userWhoLiked: string,
}

export default async function BlogPostInteractionsHandler(req: NextApiRequest, res: NextApiResponse) {
    const { action, blogId, type, userWhoLiked } = req.body as BodyArgs;

    try {
        const { BlogPosts, User } = await getManager();
        if (!BlogPosts || !User) throw new Error("User or BlogPosts model is not defined.");

        const blog = await BlogPosts.findOne({ where: { id: blogId } });
        const userwholiked = await User.findOne({ where: { name: userWhoLiked } });

        if (!blog || !userwholiked) throw new Error("blog or user who liked or viewed not found.");

        switch (type) {
            case "views":
                await blog.increment(["view_count"], { by: 1 });
                res.status(201).json({ success: true });
                return;

            case "likes":
                const usersLikedPosts = JSON.parse(userwholiked.dataValues.liked_posts ?? "[]") as string[];

                switch (action) {
                    case "remove":
                        await blog.decrement(["like_count"], { by: 1 });
                        const updatedLikedPosts = usersLikedPosts.filter(postId => postId !== blog.dataValues.id);
                        await userwholiked.update({ liked_posts: JSON.stringify(updatedLikedPosts) });
                        res.status(201).json({ success: true, message: "Like removed." })
                        return;

                    case "update":
                        await blog.increment(["like_count"], { by: 1 });
                        if (!usersLikedPosts.includes(blog.dataValues.id)) {
                            usersLikedPosts.push(blog.dataValues.id);
                            await userwholiked.update({ liked_posts: JSON.stringify(usersLikedPosts) });
                            res.status(201).json({ success: true, message: "Like added" })
                            return;
                        }
                }

        }


    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal error, or wrong arguments." });
        return;
    }


}