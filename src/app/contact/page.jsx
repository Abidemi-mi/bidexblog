import React from "react";
import styles from "./contact.module.css";
import Image from "next/image";
import ContactForm from "@/components/contactForm/contactForm";

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
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
