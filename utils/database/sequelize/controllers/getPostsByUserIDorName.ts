import getManager from "../conn";
import { Op } from 'sequelize';

export default async function GetPostsByUserIdOrName(userIdorName: string) {

    try {
        const { BlogPosts } = await getManager();
        if (!BlogPosts) throw new Error("Blog posts model not defined.");

        const b = await BlogPosts.findAll({ where: {  
            [Op.or]: [
                { authorId: userIdorName },
                { }
            ]
        }})
        if (!b) throw new Error("Blog posts not found by user " + userIdorName)

        const blogsArray: BlogPostModelType[] = [];
        b.map(post => blogsArray.push(post.toJSON()));

        return blogsArray;

    } catch (err) {
        console.error(err, "error in getPostsByUserID.ts")
        return null;
    }

}