"use server"


import { Post } from "./models";
import { connectToDb } from "./utils";


export const sayHello = async (formData ) => {


  const { title, slug, desc, userId } = Object.fromEntries(formData);

   console.log(title,desc,slug)
  try {
    await connectToDb();
    const newPost = new Post({
      title,
      slug,
      desc,
      userId,
    });
    await newPost.save();
    console.log("saved to db")
  } catch (error) {
    console.log(error);
    throw new Error("failed to Save new post");
  }

  console.log("Action works");
};


 

  //  export const handleGithubLogOut = async () => {
  //    "use server"
  //    await signOut("github");
  // };