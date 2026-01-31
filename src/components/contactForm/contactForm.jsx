"use client";

import { useFormState } from "react-dom";
import { addContact } from "@/app/lib/action";
import styles from "./contactForm.module.css";
import { useEffect, useRef } from "react";

const ContactForm = () => {
  const [state, formAction] = useFormState(addContact, undefined);
  const formRef = useRef();

  useEffect(() => {
    if (state?.success) {
      formRef.current.reset();
    }
  }, [state?.success]);

  return (
    <form action={formAction} className={styles.form} ref={formRef}>
      <input type="text" placeholder="Name and Surname" name="name" required />
      <input type="email" placeholder="Email Address" name="email" required />
      <input type="text" placeholder="Phone Number (Optional)" name="phone" />
      <textarea
        cols="30"
        rows="10"
        placeholder="Message"
        name="message"
        required
      />
      <button className={styles.button}>Send</button>
      {state?.error && <p className={styles.error}>{state.error}</p>}
      {state?.success && <p className={styles.success}>Message sent successfully!</p>}
    </form>
  );
};

export default ContactForm;
