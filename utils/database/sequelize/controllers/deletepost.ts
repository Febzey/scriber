import getManager from "../conn";

export default async function DeleteBlogPostById(id: string): Promise<boolean> {
    const { BlogPosts } = await getManager();
  
    if (!BlogPosts) {
      throw new Error("BlogPosts table issue.")
    }
  
    const result = await BlogPosts.destroy({ where: { id: id } });
  
    if (result === 0) {
      return false;
    }
  
    return true;
  }
  