import { NextApiRequest, NextApiResponse } from 'next';
import getManager from "../../../../utils/database/sequelize/conn";
import { Op } from "sequelize";


export default async function UpdateUserProfile(req: NextApiRequest, res: NextApiResponse) {
    const { id, description, links } = req.body;

    console.log(id, description, links);

    try {
        const { User } = await getManager();
        if (!User) throw new Error("User model not defined");

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: id },
                    { id: id },
                    { name: id }
                ]
            }
        })
        if (!user) throw new Error("user not found.");

        //let existingLinks = JSON.parse(user.dataValues.links && user.dataValues.links.length ? user.dataValues.links : "[]");
        let newLinks = links;

        console.log(newLinks);

        if (description !== user.dataValues.description) {
            user.set("description", description);
        }

        //if (!Array.isArray(existingLinks) || !existingLinks) existingLinks = [];
        if (!Array.isArray(newLinks) || !newLinks) newLinks = [];

        user.set("links", JSON.stringify(newLinks));

        await user.save();

        res.status(200).json({ success: true });
        return;

    } catch (err) {
        console.error(err, "Getting updating user profile.");
        res.status(200).json({ success: false, message: "Error updating user profile." })
        return;
    }


}