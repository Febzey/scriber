// 'use client';

import { Suspense } from "react";
import BlogPreviewContent from "./blogPreviewContent";

export default function BlogPreview() {
    // await getExampleBlog();
    return (
        <div className="flex min-h-[90vh] lg:w-[70%] w-full bg-zinc-600 bg-opacity-20 p-6 shadow-2xl">
            <Suspense fallback={
                <div className="text-wnite">
                    <p>Loading...</p>
                </div>
            }>
                {/*@ts-expect-error */}
                <BlogPreviewContent />
            </Suspense>
        </div>
    )
}