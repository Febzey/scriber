import { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmailOrUsername } from "../../../utils/database/typeorm";

// import { options } from "../auth/[...nextauth]";
// import { getServerSession } from "next-auth";

export default async function GetUser(req: NextApiRequest, res: NextApiResponse) {
    const { nameOrEmail } = req.body;

    const user = await getUserByEmailOrUsername(nameOrEmail);
    if (!user) {
        res.status(500).json({ success: false, message: "User not found" });
        return;
    };

    res.status(201).json({ success: true, user: user });
    return
}