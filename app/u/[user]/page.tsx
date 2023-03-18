import { Suspense } from "react";
import UserProfilePageBuilder from "./profileContentBuilder";
import ProfilePageLoadingSkeleton from "./components/profileSkeleton";

interface ProfilePageProps {
    params: {
        user: string
    }
}
export default function ProfilePage({ params }: ProfilePageProps) {

    return (
        <>
            <Suspense fallback={<ProfilePageLoadingSkeleton/>}>
                {/* @ts-expect-error */}
                <UserProfilePageBuilder username={params.user} />
            </Suspense>
        </>
    )
}