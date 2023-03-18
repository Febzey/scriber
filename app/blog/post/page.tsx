"use client";

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import BlogPostForm from "./components/blogForm/blogForm";

export default function CreateBlogPostPage() {
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
        router.push("/auth/signin")
    }

}