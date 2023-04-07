import type { NextApiRequest, NextApiResponse } from 'next'
import getManager from '../../../../utils/database/sequelize/conn';
import { Op } from 'sequelize';

/**
 * 
 * @method GET
 * @param req 
 * @param res 
 * @returns 
 */

export default async function blogGetHandler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req;
    const id = query.id;
    const multiple = query.multiple;

    try {
        const { BlogPosts } = await getManager()
        if (!BlogPosts) throw new Error("BlogPosts model is not defined.");

        switch (multiple) {
            case "true":
                const blogposts = await BlogPosts.findAll({
                    where: { authorId: id }
                })
                if (!blogposts || blogposts.length <= 1) throw new Error("Could not find multiple blog posts.")

                const blogArr: BlogPostModelType[] = [];
                blogposts.map(post => blogArr.push(post.toJSON()));

                res.status(201).json({ success: true, posts: blogArr })
                return;

            default:
                const blogpost = await BlogPosts.findOne({
                    where: {
                        [Op.or]: [
                            { id: id },
                            { url: id },
                            { authorId: id }
                        ]
                    }
                })


                if (!blogpost) throw new Error("no blog post found.");
                res.status(201).json({ success: true, post: blogpost.toJSON() });
                return;
        }

    } catch (err) {
        console.error(err, "Getting blog post error.");
        res.status(200).json({ success: false, message: "Error with database or blog not found." })
        return;
    }

}