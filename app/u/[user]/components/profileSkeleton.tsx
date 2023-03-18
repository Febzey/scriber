
export default function ProfilePageLoadingSkeleton() {
    return (
        <div className="w-full min-h-screen h-auto mb-52">
            <div className="flex lg:flex-row flex-col w-full h-full translate-y-20 pt-12">

                <div className="flex flex-col gap-2 lg:mr-auto mx-auto lg:mx-0 p-4">
                    <div className="rounded-full bg-gray-400/50 w-44 h-44 animate-pulse"></div>
                    <div className="mx-auto flex flex-col items-center justify-center">
                        <h1 className="font-bakbak text-4xl text-cetner text-white animate-pulse w-40 h-6 bg-gray-400/50 rounded-md"></h1>
                        <p className="text-neutral-400 text-sm w-28 h-4 bg-gray-400/50 rounded-md mt-1 animate-pulse"></p>
                        <p className="text-neutral-400 text-sm w-36 h-4 bg-gray-400/50 rounded-md mt-1 animate-pulse"></p>
                    </div>
                </div>

                <div className="w-full lg:w-3/4 h-full flex flex-col gap-14">
                    <div className="w-full h-full flex gap-11 flex-col items-center justify-start p-4 border-b-2 border-b-gray-700/30 pb-12">
                        <div className="w-full">
                            <h1 className=" text-neutral-400 font-bakbak mb-5 animate-pulse w-fu h-6 bg-gray-400/50 rounded-md"></h1>
                            <div className="space-y-4">
                                <div className="w-full h-16 bg-gray-400/50 animate-pulse rounded-md"></div>
                                <div className="w-full h-16 bg-gray-400/50 animate-pulse rounded-md"></div>
                                <div className="w-full h-16 bg-gray-400/50 animate-pulse rounded-md"></div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full gap-11 flex flex-col items-center justify-start p-4 border-b-gray-700/30 border-b-2 pb-12">
                        <h1 className="ml-7 mr-auto text-neutral-400 font-bakbak mb-5 animate-pulse w-40 h-6 bg-gray-400/50 rounded-md"></h1>
                        <div className="space-y-4">
                            <div className="w-full h-16 bg-gray-400/50 animate-pulse rounded-md"></div>
                            <div className="w-full h-16 bg-gray-400/50 animate-pulse rounded-md"></div>
                            <div className="w-full h-16 bg-gray-400/50 animate-pulse rounded-md"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}