// 'use client';

import { Suspense } from "react";
import BlogPreviewContent from "./blogPreviewContent";

export default function BlogPreview() {
    // await getExampleBlog();
    return (
        <div className="flex min-h-[90vh] lg:w-[60%] w-full bg-black bg-opacity-20 p-6">
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