import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import * as bcrypt from "bcryptjs";

const login = async (credentials) => {
  try {
    await connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login");
  }
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user ? user.toObject() : null;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        // Handle initial login
        if (account.provider === "google") {
          try {
            await connectToDb();
            const dbUser = await User.findOne({ email: user.email });
            if (dbUser) {
              token.id = dbUser._id.toString();
              token.isAdmin = dbUser.isAdmin;
            } else {
              // Should not happen as signIn callback creates the user
              token.id = user.id;
              token.isAdmin = false;
            }
          } catch (err) {
            console.log("JWT Init error:", err);
            token.id = user.id;
          }
        } else {
          token.id = user._id ? user._id.toString() : user.id;
          token.isAdmin = user.isAdmin;
        }
      } else if (token.id && typeof token.id === "string" && token.id.length === 24) {
        // Handle subsequent Hits - Sync isAdmin status
        try {
          await connectToDb();
          const dbUser = await User.findById(token.id).select("isAdmin");
          if (dbUser) {
            token.isAdmin = dbUser.isAdmin;
          }
        } catch (error) {
          console.log("Admin sync error:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectToDb();
          const userExist = await User.findOne({ email: profile.email });

          if (!userExist) {
            await User.create({
              email: profile.email,
              username: profile.name?.slice(0, 20),
              image: profile.picture,
              isAdmin: false,
            });
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
  },
};
