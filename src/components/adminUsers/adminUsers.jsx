import React from "react";
import styles from "./adminUsers.module.css";
import {  getUsers } from "@/app/lib/data";
import Image from "next/image";
import { deleteUser } from "@/app/lib/action";

const AdminUsers = async () => {
  const users = await getUsers();
  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users.map((user) => (
        <div className={styles.user} key={user.id}>
          <div className={styles.details}>
            <Image
              src={user.img || "/noavatar.png"}
              width={50}
              height={50}
              alt={user.username}
              className={styles.userImage}
              style={{ objectFit: 'cover' }}
            />

            <span className={styles.postTitle}>{user.username}</span>
          </div>

          <form action={deleteUser}>
            <input type="hidden" name="id" value={user.id} />

            <button className={styles.postButon}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
