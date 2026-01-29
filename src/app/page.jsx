import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";

const Home = () => {
 
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Exploring the Frontier of Digital Innovation.</h1>
        <p className={styles.desc}>
          Welcome to BideXblog—your premium destination for insights into the
          future of technology, design, and productivity. We dive deep into the
          ideas that shape our digital world.
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
