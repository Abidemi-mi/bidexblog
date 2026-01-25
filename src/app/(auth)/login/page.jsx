"use client";

import styles from "./login.module.css";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";



const Loginpage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      redirect: false, // 👈 IMPORTANT for catching errors
      username,
      password,
      callbackUrl: "/",
    });

    setLoading(false);

    if (res?.error) {
      if (res.error === " Wrong credentials!") {
        setError("Invalid username or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return;
    }

    // Successful login
    window.location.href = "/";
  };
 



  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.login} onClick={() => signIn("google")}>
          Sign in with Google
        </button>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            name="username"
            placeholder="Username"
            required
            disabled={loading}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            disabled={loading}
          />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login with Credentials"}
          </button>

          {error && <p className={styles.error}>{error}</p>}

          <Link href="/register">
            Don&apos;t have an account? <b>Register</b>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
