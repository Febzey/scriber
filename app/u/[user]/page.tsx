import { Suspense } from "react";
import ProfilePageLoadingSkeleton from "./components/profileSkeleton";
import Image from "next/image";
import fourofour from "../../../public/images/errors/404-error.png";
import { getSession } from "../../layout";
import ProfileContent from "./profileContent";

interface ProfilePageProps {
    params: {
        user: string
    }
}
export default function ProfilePage({ params }: ProfilePageProps) {

    return (
        <>
            <Suspense fallback={<ProfilePageLoadingSkeleton />}>
                {/* @ts-expect-error */}
                <ProfilePageBuilder username={params.user} />
            </Suspense>
        </>
    )
}




/**
 * Getting user profile info.
 * @param username 
 * @returns Promise<UserEntity|void>
 */
async function getUser(username: string): Promise<{ success: boolean, user: UserShown } | void> {
    const res = await fetch(`http://localhost:3000/api/user/get/${username}`, { cache: "no-store" });
    if (!res.ok) return;
    return res.json();
}

/**
 * Gettings the users posts.
 * @param userOrId 
 * @returns Promise<BlogPostEntity|void>
 */
async function getPosts(user: string): Promise<{ success: boolean, posts: BlogPostModelType[] } | void> {
    const res = await fetch(`http://localhost:3000/api/blog/get/${user}?multiple=true`, { cache: "no-store" })
    if (!res.ok) return;
    return res.json();
}

async function ProfilePageBuilder({ username }: { username: string }) {
    const userObj = await getUser(username);
    if (!userObj || userObj.success === false) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Image src={fourofour} alt="fourofour" />
            </div>
        )
    }

    const sessionPromise = getSession();
    const postsPromise = getPosts(userObj.user.id);

    const [session, posts] = await Promise.all([
        sessionPromise,
        postsPromise,
    ]);

    return (
        <ProfileContent
            params={{
                user: userObj.user,
                posts: posts ? posts.posts : undefined,
                session
            }}
        />
    );
}