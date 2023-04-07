

export default function BlogPostLoadingSkeleton() {
    return (
        <div className="w-full min-h-screen h-auto mb-52">
            <div className="flex lg:flex-row flex-col w-full h-full translate-y-20 pt-12">
                <div className="w-full lg:w-[80%] mx-auto h-full flex flex-col gap-14">
                    <div className="w-full h-full flex gap-11 flex-col items-center justify-start p-4  pb-12">
                        <div className="w-full">
                            <h1 className="text-3xl font-bold text-gray-300 mx-auto animate-pulse w-1/2 h-8 bg-gray-400/50 rounded-md"></h1>
                            <div className="space-y-4 mt-8">
                            <div className="w-full h-10 bg-gray-400/50 animate-pulse rounded-md"></div>

                            <div className="w-full h-10 bg-gray-400/50 animate-pulse rounded-md"></div>
                            <div className="w-full h-10 bg-gray-400/50 animate-pulse rounded-md"></div>
                            <div className="w-full h-10 bg-gray-400/50 animate-pulse rounded-md"></div>
                            <div className="w-full h-10 bg-gray-400/50 animate-pulse rounded-md"></div>
                            <div className="w-full h-10 bg-gray-400/50 animate-pulse rounded-md"></div>
                            <div className="w-full h-10 bg-gray-400/50 animate-pulse rounded-md"></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}