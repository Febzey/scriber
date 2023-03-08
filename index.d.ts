type BlogPostData = {
    title: string,
    author: string,
    published_date: string,
    summary: string
    link: string
}
interface BlogPosts {
    articles: BlogPostData[]
}

interface BlogPostCardPreviewParams {
    blogData: BlogPostData
}