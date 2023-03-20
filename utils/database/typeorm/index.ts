import { DataSourceOptions, DataSource, EntityManager } from "typeorm";
import { AccountEntity, SessionEntity, UserEntity, VerificationTokenEntity } from "./entities/userEntities";
import { BlogPostEntity } from "./entities/blogEntities";

const entities = [AccountEntity, SessionEntity, UserEntity, VerificationTokenEntity, BlogPostEntity];
export const dbOptions: DataSourceOptions = {
    type: "mariadb",
    host: process.env.db_host,
    port: 3306,
    username: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    logging: false,
    entities: entities,
}

let _dataSource: DataSource | undefined;

export async function getManager(options: {
    dataSourceOptions: DataSourceOptions
}): Promise<EntityManager> {

    const { dataSourceOptions } = options;

    if (!_dataSource) _dataSource = new DataSource(dataSourceOptions);

    const manager = _dataSource?.manager;

    if (!manager.connection.isInitialized) {
        await manager.connection.initialize();
    }
    // if (process.env.NODE_ENV !== "production") {

    // }
    return manager;
}


export async function createBlogPost(blogPost: BlogPost): Promise<boolean | string> {

    const manager = await getManager({ dataSourceOptions: dbOptions });

    const {
        title,
        content,
        summary,
        tags,
        isRoughDraft,
        userEmail
    } = blogPost as BlogPost;

    try {
        const blogPostTable = manager.getRepository(BlogPostEntity);
        const userTable = manager.getRepository(UserEntity);
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
    }

}

function generatePostUrlFromTitle(title: string) {
    const url = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    return `${url}`;
}


export async function getUserByEmailOrUsername(emailOrUsername: string): Promise<UserEntity | null> {
    try {
        const manager = await getManager({ dataSourceOptions: dbOptions });

        const user = await manager.getRepository(UserEntity)
            .createQueryBuilder("user")
            .where("user.email = :emailOrUsername OR user.name = :emailOrUsername", { emailOrUsername })
            .getOne()

        return user;
    } catch (err) {
        console.log(err, "error in get user by email or username")
        return null
    }
}

export async function getUserBlogPosts(identifier: string): Promise<BlogPostEntity[] | null> {
    try {
        const manager = await getManager({ dataSourceOptions: dbOptions });


        const blogPostRepo = manager.getRepository(BlogPostEntity);
        const userRepo = manager.getRepository(UserEntity);

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
        console.log(err, " error in getUserBlogPost")
        return null;
    }
}

export async function getUserBlogPostByUrl(url: string): Promise<BlogPostEntity|null> {
    try {
        const manager = await getManager({ dataSourceOptions: dbOptions });

        const blogPostRepo = manager.getRepository(BlogPostEntity);
        
        const blogPost = await blogPostRepo.findOne({ where: { url: url }});
        return blogPost;

    } catch (err) {
        console.log(err, " Error from 'getUserBlogPostByUrl'")
        return null;
    }
}

function isUUID(str: string): boolean {
    // This is a very basic check for UUID format, you may want to use a library like `uuid` for more comprehensive validation
    const uuidRegex = /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i;
    return uuidRegex.test(str);
}