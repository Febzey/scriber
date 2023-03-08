
export function BlogPostCardPreview({ blogData }: BlogPostCardPreviewParams) {
    const { title, author, published_date, summary, link } = blogData;
    return (
        <div className="w-full min-h-56 border-b-neutral-700 border-b-2 p-4 flex flex-col items-center justify-start gap-3 duration-150 hover:bg-neutral-800 cursor-pointer">
            <div className="flex w-full flex-row items-center justify-between">
                <h1 className="text-3xl text-neutral-200 font-bakbak">{title.length > 60 ? title.substring(0, 60) + "..." : title}</h1>
            </div>
            
            <div className="text-neutral-300 leading-relaxed">
                <p>{summary}</p>
            </div>

            <div className="flex flex-row gap-3 items-center justify-start w-full">
                <span className="bg-neutral-800 text-neutral-400 px-3 py-1 text-xs">Author: {author}</span>
                <span className="bg-neutral-800 text-neutral-400 px-3 py-1 text-xs">Published on: {published_date}</span>
            </div>
        </div>
    )
}