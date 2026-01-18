import React from "react";
import styles from "./contact.module.css";
import Image from "next/image";

export const metadata = {
  title: "Contact Page",
  description: "You can contact us through the various social media platforms or by simply writing us Message",
};


const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img}/>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional" />
          <textarea cols="30" rows="10" placeholder="Message" name="" id="" />

          <button className={styles.button}>Sent</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
