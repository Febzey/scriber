import type { UserEntity } from "../../../utils/database/typeorm/entities/userEntities";
import type { BlogPostEntity } from "../../../utils/database/typeorm/entities/blogEntities";
import Image from "next/image";
import fourofour from "../../../public/images/errors/404-error.png";
import ProfileContent from "./profileContent";

/**
 * Getting user profile info.
 * @param username 
 * @returns Promise<UserEntity|void>
 */
async function getUser(username: string): Promise<{ success: boolean, user: UserEntity } | void> {
    const res = await fetch("http://localhost:3000/api/user/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nameOrEmail: username
        }),
        cache: "no-store"
    })
    if (!res.ok) return;
    return res.json();
}

/**
 * Gettings the users posts.
 * @param userOrId 
 * @returns Promise<BlogPostEntity|void>
 */
async function getPosts(userOrId: string): Promise<{ success: boolean, posts: BlogPostEntity[] } | void> {
    const res = await fetch("http://localhost:3000/api/blog/getposts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userOrId
        }),
        cache: "no-store"
    })
    if (!res.ok) return;
    return res.json();
}


export default async function UserProfilePageBuilder({ username }: { username: string }) {
    console.log(username, " username");
    const userObj = await getUser(username);

    if (!userObj || userObj.success === false) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Image src={fourofour} alt="fourofour" />
            </div>
        )
    }

    const posts = await getPosts(userObj.user.id);

    await new Promise(r => setTimeout(r, 5000))

    return (
        <ProfileContent params={{ user: userObj.user, posts: posts && posts.posts }} />
    )
}