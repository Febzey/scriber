import { NextApiRequest, NextApiResponse } from 'next';
import getManager from '../../../../utils/database/sequelize/conn';

/**
 * 
 * @method DELETE
 * @param req 
 * @param res 
 * @returns 
 */
export default async function BlogDeleteHandler(req: NextApiRequest, res: NextApiResponse) { 
    const { query } = req;
    const id = query.id;

    try { 
        const { BlogPosts } = await getManager();
        if (!BlogPosts) throw new Error("Blog Posts model not defined.");

        const result = await BlogPosts.destroy({ where: { id: id } });
        if (!result || result === 0) throw new Error("Blog post not found to delete.")

        res.status(200).json({ success: true });
        return;
         
    } catch (err) {
        console.error(err, "Getting blog post error.");
        res.status(200).json({ success: false, message: "Error with database or blog not found." })
        return;
    }

}