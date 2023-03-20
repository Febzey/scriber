import type { UserEntity } from "../../../utils/database/typeorm/entities/userEntities";
import type { BlogPostEntity } from "../../../utils/database/typeorm/entities/blogEntities";
import Image from "next/image";
import fourofour from "../../../public/images/errors/404-error.png";
import ProfileContent from "./profileContent";
import { headers } from "next/headers";
import { getSession } from "../../layout";

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
    const sessionPromise = getSession(headers().get('cookie') ?? '');
    const userPromise = getUser(username);
    const postsPromise = getPosts(username);
  
    const [session, userObj, posts] = await Promise.all([
      sessionPromise,
      userPromise,
      postsPromise,
    ]);
  
    if (!userObj || userObj.success === false) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <Image src={fourofour} alt="fourofour" />
        </div>
      );
    }
  
    return (
      <ProfileContent
        params={{
          user: userObj.user,
          posts: posts && posts.posts,
          userOwnsProfile: session?.user?.name === userObj.user.name ? true : false,
        }}
      />
    );
  }