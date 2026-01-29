import React from 'react'
import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>bideXblog by abidemibashir.dev@gmail.com</div>
      <div className={styles.text}>Bidex creative thoughts agency &copy; All right reserved.</div>

    </div>
  )
}

export default Footer