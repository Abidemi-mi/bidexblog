import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
 
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thought Agency</h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
          dolores inventore ad culpa hghodit fugit dolor non?
        </p>

        <div className={styles.buttons}>
          <button className={styles.button}>Learn more</button>
          <button className={styles.button}>Contact</button>
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
