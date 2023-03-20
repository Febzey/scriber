import UserPostBuilder from "./postBuilder";
import { Suspense } from "react";



interface UserBlogPostPageParams {
    params: {
        user: string
        blogurl: string
    }
}
export default async function UserBlogPostPage({ params }: UserBlogPostPageParams) {
    const { user, blogurl } = params;


    return (
        <Suspense fallback={<h1>Loading blog....</h1>}>

        {/*@ts-expect-error */}
        <UserPostBuilder user={user} blogurl={blogurl} />
    </Suspense>
    )

}