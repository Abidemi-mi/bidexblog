"use client";
import React, { useState, useEffect } from "react";
import styles from "./links.module.css";
import NavLink from "../navLinks/navLinks";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },

  {
    title: "Blog",
    path: "/blog",
  },

  {
    title: "Contact",
    path: "/contact",
  },
];

const Links = () => {
  const [open, setOpen] = useState(false);

  const isAdmin = true;
  const { data: session } = useSession();
  const profileImage = session?.user?.image;

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}{" "}
        {session ? (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <button onClick={() => signOut()} className={styles.logout}>Log Out</button>

            <Image src={profileImage || '/noavatar.png'} alt="" width={40} height={40} />
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  className={styles.login}
                  key={index}
                  onClick={() => signIn(provider.id)}
                >
                  {" "}
                  Login
                </button>
              ))}
          </>
        )}
      </div>
      <Image
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
          {session ? (
            <>
              {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
              <button onClick={() => signOut()} className={styles.logout}>Log Out</button>
              <Image src={profileImage || '/noavatar.png'} alt="" width={40} height={40} />
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider, index) => (
                  <button
                    className={styles.login}
                    key={index}
                    onClick={() => signIn(provider.id)}
                  >
                    {" "}
                    Login
                  </button>
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Links;
