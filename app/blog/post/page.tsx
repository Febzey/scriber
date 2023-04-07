import CreateBlogPostContent from "./Main";
import { getSession } from "../../layout";

interface CreateBlogPostPageProps {
    params: {},
    searchParams: {
        blogid: string,
        username: string
    }
}

export default async function CreateBlogPostPage({  searchParams  }: CreateBlogPostPageProps) {
    const session = await getSession()
    
    //@ts-expect-error
    return <CreateBlogPostContent session={session} blogid={searchParams.blogid??""} username={searchParams.username??""}/>
}