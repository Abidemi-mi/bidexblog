"use client"

import React from "react";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import { addPost } from "@/app/lib/action";

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId || ""} />
      <input type="text" name="title" placeholder="title" required />
      <input type="text" name="slug" placeholder="slug" required />
      <input type="text" name="img" placeholder="img" />
      <textarea name="desc" id="desc" placeholder="desc" rows={10} required />
      <button>Add</button>
      {state?.error && <p style={{color: "red"}}>{state.error}</p>}
      {state?.success && <p style={{color: "green"}}>Post added successfully!</p>}
    </form>
  );
};

export default AdminPostForm;
