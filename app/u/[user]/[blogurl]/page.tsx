import UserPostBuilder from "./postBuilder";
import { Suspense } from "react";
import BlogPostLoadingSkeleton from "./components/blogPostLoadingSkeleton";

interface UserBlogPostPageParams {
    params: {
        user: string
        blogurl: string
    }
}
export default async function UserBlogPostPage({ params }: UserBlogPostPageParams) {
    const { user, blogurl } = params;

    return (
        <Suspense fallback={<BlogPostLoadingSkeleton />}>
            {/*@ts-expect-error */}
            <UserPostBuilder user={user} blogurl={blogurl} />
        </Suspense>
    )

}