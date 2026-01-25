import React, { Suspense } from "react";
import styles from "./admin.module.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div className={styles.loading}>Loadin...</div>}>
            <AdminPosts />
          </Suspense>
        </div>

        <div className={styles.col}>
          <AdminPostForm userId={session?.id} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div className={styles.loading}>Loadin...</div>}>
            <AdminUsers />
          </Suspense>
        </div>

        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
