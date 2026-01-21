import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "./utils";
import { User } from "./models";


export const authOptions = {
   providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
  ],
  callbacks: {
    //Invoked on successful sign in
    async signIn({ profile }) {
      // 1. Connect to the database
      await connectToDb();
      // 2. Check if user exist
      const userExist = await User.findOne({ email: profile.email });
      // 3. If not, create user
      if (!userExist) {
        //Truncate username if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    //Session callback function that modifies the session object
    async session({ session}) {
      // 1. Get the user from database
      const user = await User.findOne({ email: session.user.email })
      // 2. Assign user id from the sesssion
      session.user.id = user._id.toString();
      // 3. Return the session
      return session;
    },
  },
};
