type BlogPostData = {
    title: string,
    author: string,
    published_date: string,
    summary: string
    link: string
}

type BlogPost = {
    title: string,
    content: string,
    summary: string,
    tags: string,
    isRoughDraft: boolean,
    userEmail: string,
}


interface BlogPosts {
    articles: BlogPostData[]
}

interface BlogPostCardPreviewParams {
    blogData: BlogPostData
}

type Tag = {
    color: string | undefined | null,
    text: string
}



type User = {
    status: boolean,
    userData: {
        id: string,
        name: string | null,
        email: string | null,
        image: string | null
    }
}