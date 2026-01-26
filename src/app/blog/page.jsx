import React from "react";
export const dynamic = "force-dynamic";
import styles from "./blog.module.css";
import PostCard from "@/components/postCard/postCard";
import { Post } from "@/app/lib/models";
import { connectToDb } from "@/app/lib/utils";

const getData = async () => {
  await connectToDb();
  const posts = await Post.find();
  return posts;
};

const BlogPage = async () => {
  const posts = await getData();

  console.log(posts)
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id.toString()}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
