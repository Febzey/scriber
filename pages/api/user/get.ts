import { NextApiRequest, NextApiResponse } from "next";
import { getUserByEDmailOrUsername } from "../../../utils/database/typeorm";
export default async function GetUser(req: NextApiRequest, res: NextApiResponse) {
    const { nameOrEmail } = req.body;

    const user = await getUserByEDmailOrUsername(nameOrEmail);
    if (!user) {
        return res.status(500).json({ success: false, message: "User not found"});
    };

    res.status(201).json({ success: true, user: user});
    return
}