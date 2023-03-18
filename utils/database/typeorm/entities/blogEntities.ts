import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./userEntities";


@Entity({ name: "blog_posts" })
export class BlogPostEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  url!: string;

  @Column({ type: "varchar", nullable: false })
  title!: string;

  @Column({ type: "text", nullable: false })
  content!: string;

  @Column({ type: "text", nullable: false })
  summary!: string;

  @Column({ type: "text", nullable: false })
  tags!: string;

  @Column({ type: "boolean", default: false })
  isPublished!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  @Column({ type: "boolean", default: false })
  isRoughDraft!: boolean;

  @Column({ type: "uuid", nullable: false })
  authorId!: string;

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: "authorId" })
  author!: UserEntity;
}