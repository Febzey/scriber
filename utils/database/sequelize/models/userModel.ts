import { DataTypes } from "sequelize";

export const UserModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: "email" },
  emailVerified: { type: DataTypes.DATE },
  image: { type: DataTypes.STRING },
  liked_posts: {
    type: DataTypes.TEXT,
    defaultValue: "[]"
  },
  description: { type: DataTypes.STRING },
  realname: { type: DataTypes.STRING },
  links: { type: DataTypes.TEXT },
  followers: { type: DataTypes.TEXT },
  following: { type: DataTypes.TEXT }
};
