import React from "react";
import styles from "./adminPosts.module.css";
import { getPosts } from "@/app/lib/data";
import Image from "next/image";
import { deletePost } from "@/app/lib/action";

const AdminPosts = async () => {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.details}>
            <Image
              src={post.img || "/noavatar.png"}
              width={50}
              height={50}
              alt={post.title}
              className={styles.postImage}
              style={{ objectFit: 'cover' }}
            />
            <span className={styles.postTitle}>{post.title}</span>
          </div>

          <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />

            <button className={styles.postButon}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
