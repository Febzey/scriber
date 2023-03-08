// 'use client';

import { Suspense } from "react";
import BlogPreviewContent from "./blogPreviewContent";

// async function getExampleBlog() {
//     return await new Promise(r => setTimeout(r, 10000));
// }
//we will fetch data inside a child component of this one instead,
export default function BlogPreview() {

    // await getExampleBlog();

    return (
        <div className="w-full h-full flex">
            <Suspense fallback={
                <div className="lg:w-[50%] mx-auto lg:max-w-[50%] w-[95%] max-w-[95%] p-10 rounded-xl bg-zinc-700 bg-opacity-30 h-[80vh] max-h-[80vh] overflow-auto">
                    <p>Loading...</p>
                </div>
            }>
                {/* @ts-expect-error Server Component */}
                <BlogPreviewContent />
            </Suspense>
        </div>
    )
}