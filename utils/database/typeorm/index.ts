import { DataSourceOptions, DataSource } from "typeorm";
import { AccountEntity, SessionEntity, UserEntity, VerificationTokenEntity } from "./entities/userEntities";
import { BlogPostEntity } from "./entities/blogEntities";

export const dbOptions: DataSourceOptions = {
    type: "mariadb",
    host: process.env.db_host,
    port: 3306,
    username: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    synchronize: true,
    logging: false,
    entities: [AccountEntity, SessionEntity, UserEntity, VerificationTokenEntity, BlogPostEntity]
}

export const appDataSource = new DataSource(dbOptions);

export async function createBlogPost(blogPost: BlogPost): Promise<boolean | string> {

    const {
        title,
        content,
        summary,
        tags,
        isRoughDraft,
        userEmail
    } = blogPost as BlogPost;

    const conn = await appDataSource.initialize()

    try {
        const blogPostTable = conn.getRepository(BlogPostEntity);
        const userTable = conn.getRepository(UserEntity);
        const author = await userTable.findOne({ where: { email: userEmail } })

        if (!author) {
            throw new Error(`Author with email ${userEmail} not found.`)
        }

        const blogPost = new BlogPostEntity();
        let url = generatePostUrlFromTitle(title);

        blogPost.title = title;
        blogPost.content = content;
        blogPost.summary = summary;
        blogPost.tags = tags;
        blogPost.isRoughDraft = isRoughDraft
        blogPost.isPublished = false;
        blogPost.author = author;
        blogPost.url = url

        const blogFromDb = await blogPostTable.save(blogPost);

        return url

    } catch (err) {
        console.error(err, " Error while saving blog post.")
        return false;
    } finally {
        conn.destroy();
    }

}

function generatePostUrlFromTitle(title: string) {
    const url = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    return `${url}`;
}



export async function getUserByEDmailOrUsername(emailOrUsername: string): Promise<UserEntity | null> {
    const conn = await appDataSource.initialize()
    try {

        const user = await conn.getRepository(UserEntity)
            .createQueryBuilder("user")
            .where("user.email = :emailOrUsername OR user.name = :emailOrUsername", { emailOrUsername })
            .getOne()

        return user;
    } catch (err) {
        return null;
    } finally {
        conn.destroy();
    }
}

export async function getUserBlogPosts(identifier: string): Promise<BlogPostEntity[] | null> {
    const conn = await appDataSource.initialize();

    try {
        const blogPostRepo = conn.getRepository(BlogPostEntity);
        const userRepo = conn.getRepository(UserEntity);

        let user: UserEntity | null;
        if (isUUID(identifier)) {
            user = await userRepo.findOne({ where: { id: identifier } });
        } else {
            user = await userRepo.findOne({ where: { name: identifier } });
        }

        if (!user) {
            throw new Error(`User with identifier ${identifier} not found`);
        }

        const blogPosts = await blogPostRepo.find({ where: { authorId: user.id } });
        return blogPosts;
    } catch (err) {
        return null;
    } finally {
        conn.destroy();
    }
}

function isUUID(str: string): boolean {
    // This is a very basic check for UUID format, you may want to use a library like `uuid` for more comprehensive validation
    const uuidRegex = /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i;
    return uuidRegex.test(str);
}