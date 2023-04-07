import { Session } from "next-auth";
import BlogPostForm from "./components/blogForm/blogForm";
import SignInErr from "./components/signInErr";
import { getPost } from "../../u/[user]/[blogurl]/postBuilder";
import { notFound } from "next/navigation";
//TODO: we need to get the session server side and dertermine if theyre logged in before content is shipped.

export default async function CreateBlogPostContent({ session, blogid, username }: { session: Session, blogid: string, username: string }) {
    if (!session) {
        return <SignInErr />
    }

    const post = blogid && blogid.length > 1 ? await getPost(blogid, "no-store") : null;
    console.log(post," hello ther")

    if (post && (session.user?.name !== username)) notFound();
    
    return (
        <>
            <div className="w-full flex flex-col">
                <BlogPostForm props={{
                    email: session.user?.email,
                    session: session,
                    roughDraftPost: post?.post??null
                }} />
            </div>
        </>
    )
}