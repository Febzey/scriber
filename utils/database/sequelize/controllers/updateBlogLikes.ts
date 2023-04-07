import getManager from "../conn";

export default async function UpdateBlogLikes(action: "update"|"remove", blogid: string, userWhoLiked: string) {
    try {
        const { BlogPosts, User } = await getManager();

        if (!BlogPosts||!User) throw new Error("BlogPosts or user model not defined.")

        const b = await BlogPosts.findOne({ where: { id: blogid } });
        const u = await User.findOne({ where: { name: userWhoLiked }});
        if (!b||!u) throw new Error("Blog or user not found.");
        
        const postId = b.dataValues.id
        const likedPosts = JSON.parse(u.dataValues.liked_posts || "[]") as string[];

        switch (action) {
            case "remove":
              await b.decrement(["like_count"], { by: 1 });
              const updatedLikedPosts = likedPosts.filter((postIdStr) => postIdStr !== postId.toString());
              await User.update({ liked_posts: JSON.stringify(updatedLikedPosts) }, { where: { name: userWhoLiked }});
              break;
          
            case "update":
              await b.increment(["like_count"], { by: 1 });
              if (!likedPosts.includes(postId.toString())) {
                likedPosts.push(postId.toString());
                await User.update({ liked_posts: JSON.stringify(likedPosts) }, { where: { name: userWhoLiked }});
              }
              break;
          }

    } catch (err) {
        console.error(err, " error in updateBlogLikes.ts");
        return null;
    }
}