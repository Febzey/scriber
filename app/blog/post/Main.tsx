"use client";

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import BlogPostForm from "./components/blogForm/blogForm";

export default function CreateBlogPostContent() {
    const { data: session } = useSession()
    const router = useRouter();
    if (session) {
        return (
            <>
                <div className="w-full flex flex-col">
                    <BlogPostForm email={session.user?.email} />
                </div>
            </>
        )
    } else {
        setTimeout(() => { router.push("/auth/signin") }, 5000);
        
        return (
            <h1>
                <p>Not signed in..</p>
            </h1>
        )
    }

}