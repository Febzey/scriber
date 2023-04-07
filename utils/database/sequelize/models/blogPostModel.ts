import { DataTypes } from "sequelize";


export const BlogPostModel = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    url: { type: DataTypes.STRING, allowNull: false },
    like_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    view_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    title: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    content: { type: DataTypes.TEXT, allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: false },
    tags: { type: DataTypes.TEXT, allowNull: false },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.BIGINT, defaultValue: Date.now() },
    updatedAt: { type: DataTypes.BIGINT, defaultValue: Date.now(), onUpdate: "CASCADE" },
    isRoughDraft: { type: DataTypes.BOOLEAN, defaultValue: false },
    authorId: { type: DataTypes.UUID, allowNull: false },
    // indexes: [
    //     {
    //         unique: true,
    //         fields: ["title", "authorId"]
    //     }
    // ],
}
