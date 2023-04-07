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
export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req;
    const id = query.id;

    try {
        const { User } = await getManager();
        if (!User) throw new Error("User model not defined.");

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: id },
                    { name: id },
                    { id: id },
                ]
            }
        })

        if (!user) throw new Error("User not found.");
        res.status(200).json({ success: true, user: user.toJSON() })
        return;

    } catch (err) {
        console.error(err, "Getting user error.");
        res.status(200).json({ success: false, message: "Error with database or user not found." })
        return;
    }

}