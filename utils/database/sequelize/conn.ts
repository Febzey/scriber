import { Model, ModelCtor, Sequelize } from "sequelize"
import { BlogPostModel } from "./models/blogPostModel";
import { UserModel } from "./models/userModel";

export const sequelize = new Sequelize("scriber_sequel_test" as string, process.env.db_user as string, process.env.db_password, {
    host: process.env.db_host,
    dialect: "mariadb",
    logging: false,
});

export let BlogPosts: ModelCtor<Model<BlogPostModelType, BlogPostCreationAttributes>> | undefined;
export let User: ModelCtor<Model<UserModelType, any>> | undefined;

export default async function getManager(): Promise<{sequelize: Sequelize, BlogPosts: typeof BlogPosts, User: typeof User}> {
    if (!BlogPosts) {
        BlogPosts = sequelize.define("BlogPosts", BlogPostModel);
    }
    if (!User) {
        User = sequelize.define("users", UserModel);
    }

    return { sequelize, BlogPosts, User };
};