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
        <h2 className={styles.subTitle}>Our Story & Mission</h2>
        <h1 className={styles.title}>
          We believe in digital ideas that are bigger, bolder, and better designed.
        </h1>
        <p className={styles.desc}>
          BideXblog was born out of a passion for storytelling and technological
          excellence. We are dedicated to providing high-quality content that
          bridges the gap between complex digital concepts and real-world
          application. Our mission is to inspire, educate, and empower the next
          generation of digital creators.
        </p>

        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>500+</h1>
            <p>Articles Published</p>
          </div>

          <div className={styles.box}>
            <h1>50 K+</h1>
            <p>Monthly Readers</p>
          </div>

          <div className={styles.box}>
            <h1>10+</h1>
            <p>Expert Contributors</p>
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
