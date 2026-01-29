import React, { Suspense } from "react";
import styles from "./admin.module.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";

const AdminPage = async () => {
  let session;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session fetch error in AdminPage:", error);
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div className={styles.loading}>Loading Posts...</div>}>
            <AdminPosts />
          </Suspense>
        </div>

        <div className={styles.col}>
          {/* Ensure userId is at least an empty string if session is missing */}
          <AdminPostForm userId={session?.user?.id || ""} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div className={styles.loading}>Loading Users...</div>}>
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
