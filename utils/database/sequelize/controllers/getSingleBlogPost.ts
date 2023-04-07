import getManager from "../conn";
import { Op } from 'sequelize';


export default async function GetSingleBlogPost(arg: string) {

    try {
        const { BlogPosts } = await getManager(); 
        if (!BlogPosts) throw new Error("No blogPosts model defined.");

        const b = await BlogPosts.findOne({
            where: {
                [Op.or]: [
                    { id: arg },
                    { url: arg },
                    { authorId: arg },
                ]
            }
        })

        if (!b) throw new Error("Blog post not found.");

        return b.toJSON();

    } catch (err) {
        console.error(err, "Error in getSingleBlogPost.ts");
        return null;
    }

}