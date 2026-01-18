import React from "react";
import styles from "./about.module.css";
import Image from "next/image";


export const metadata = {
  title: "About Page",
  description: "Learn more about our blog, the people behind it, and the ideas that shape our posts. Built with Next.js for speed and accessibility.",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subTitle}>About Agency</h2>
        <h1 className={styles.title}>
          we create digital idea that are bigger, bolder, braver and better.
        </h1>
        <p className={styles.desc}>
          Known for creating digital ideas that are bigger, bolder, braver and
          better. We beleieve in good ideas flexibility and precision. We are a
          force to reckon with and our special Team are best in consulting &
          finance solution provider, wide range of web and software development
          services.
        </p>

        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Years of experience</p>
          </div>

          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Years of experience</p>
          </div>

          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Years of experience</p>
          </div>
        </div>
      </div>

      <div className={styles.imgContainer}>
        <div className={styles.imgCover}>
          <Image
            src="/profile.jpg"
            alt="Picture of the author"
            fill
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
