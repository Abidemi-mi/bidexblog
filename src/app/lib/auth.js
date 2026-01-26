import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import * as bcrypt from "bcryptjs";


const login = async (credentials) => {
  try {
    connectToDb();
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

    
    
    return user 
    

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
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: { label: "password", type: "password"},
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
    async jwt({token, user}){
      if(user){
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },

    async session({session, token}){
      if(token){
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      await connectToDb();

      // ONLY run this logic for Google
      if (account?.provider === "google") {
        const userExist = await User.findOne({ email: profile.email });

        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name?.slice(0, 20),
            image: profile.picture,
            isAdmin: false,
          });
        }
      }

      return user;
    },
   
    //Session callback function that modifies the session object
    // async session({ session }) {
    //   // 1. Get the user from database
    //   const user = await User.findOne({ email: session.user.email });
    //   // 2. Assign user id from the sesssion
    //   session.user.id = user._id.toString();
    //   // 3. Return the session
    //   return session;
    // },
  },
};
