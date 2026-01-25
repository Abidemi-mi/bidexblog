import React from "react";
import Links from "./links/Links";
import styles from "./navbar.module.css"
import Link from "next/link";


const Navbar = async() => {
   
   console.log()
  return (
    <div className={styles.container }>
      <Link href="/" className={styles.logo}>
        <div className={styles.logoIcon}>
          <span className={styles.iconText}>BX</span>
          <div className={styles.iconGlow}></div>
        </div>
        <div className={styles.logoText}>
          Bide<span className={styles.highlight}>X</span>blog
        </div>
      </Link>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
