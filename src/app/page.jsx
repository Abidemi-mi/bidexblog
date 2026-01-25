import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

const Home = () => {
 
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.desc}>
          We turn your ideas into digital reality. From concept to code, we build
          immersive web experiences that captivate and convert.
        </p>

        <div className={styles.buttons}>
          <Link href="/about" className={styles.button}>Learn More</Link>
          <Link href="/contact" className={styles.button}>Contact Us</Link>
        </div>

        <div className={styles.brands}>
          <Image fill className={styles.brandImg} src="/brands.png" alt="" />
        </div>
      </div>

      <div className={styles.imageContainer}>
        <Image fill className={styles.heroImg} src="/hero.gif" alt="" />
      </div>
    </div>
  );
};

export default Home;
