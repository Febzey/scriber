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

type Tag = {
    color: string | undefined | null,
    text: string
}



type UserShown = {
    id: string,
    name: string | null | undefined,
    image: string | null | undefined,
    liked_posts: string[]|null|undefined|string,
    description: string|null,
    realname: string|null,
    followers: string|null|string[],
    following: string|null|string[],
    links: string|null|string[],
}

type BlogPostModelType = {
    id: string;
    url: string;
    like_count: number;
    view_count: number;
    title: string;
    content: string;
    summary: string;
    tags: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    isRoughDraft: boolean;
    authorId: string;
};

interface BlogPostCreationAttributes extends Optional<BlogPostModelType, 'id'> {}


type UserModelType = {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    liked_posts?: string;
    description: string;
    realname: string;
    links: string
    followers: string
    following: string
}

interface UserContextProps {
    user: UserShown | null;
    setUser: React.Dispatch<React.SetStateAction<UserShown|null>>;
}
