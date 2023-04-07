import getManager from "../conn";
import { Op } from 'sequelize';

export default async function getUserByEmailOrUsernameOrId(arg: string) {
    
    try { 
        const { User } = await getManager();
        if (!User) throw new Error("No user model defined.");

        const u = await User.findOne({
            where: {
                [Op.or]: [
                    { email: arg },
                    { name: arg },
                    { id: arg },
                ]
            }
        })

        if (!u) throw new Error("No user found");
        return u.toJSON();


    } catch (err) { 
        console.error(err, "Error in getUserByEmailOrUsernameOrId.ts")
        return null;
    }

}