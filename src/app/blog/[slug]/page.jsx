import React from "react";
import styles from "./singlePost.module.css";
import Image from "next/image";

const SinglePostPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/19457037/pexels-photo-19457037/free-photo-of-the-view-from-the-top-of-a-building-in-paris.jpeg?auto=compress&cs=tinysrgb6w=1260&h=750&dpr=2"
          alt=""
          fill
          className={styles.img}
        />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.title}>Title</h1>
        <div className={styles.detail}>
          <Image
            src="https://images.pexels.com/photos/19457037/pexels-photo-19457037/free-photo-of-the-view-from-the-top-of-a-building-in-paris.jpeg?auto=compress&cs=tinysrgb6w=1260&h=750&dpr=2"
            alt=""
            width={50}
            height={50}
            className={styles.avatar}
          />
          
          <div className={styles.DetailTextWrapper}>
            <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>Bashir Abidemi</span>
          </div>

          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2026</span>
          </div>

          </div>
          
        </div>

        <div className={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam mollitia
          voluptate provident accusamus enim fugiat ullam fugit suscipit laborum
          ipsum, molestias ut rem reiciendis deserunt. Quos modi reiciendis
          soluta saepe.
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
