"use server";

import { revalidatePath } from "next/cache";
// import { signIn } from "next-auth/react";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import * as bcrypt from "bcryptjs";

export const addPost = async (previousState, formData) => {
  const { title, slug, desc, userId } = Object.fromEntries(formData);

  console.log(title, desc, slug);
  try {
    await connectToDb();
    const newPost = new Post({
      title,
      slug,
      desc,
      userId,
    });
    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("Post deleted from db");
    revalidatePath("/admin");
    revalidatePath("/blog");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const register = async (previousState, formData) => {
  "use server";

  const { username, email, password, passwordRepeat, image } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Password do not match" };
  }

  try {
    await connectToDb();

    let user = await User.findOne({ username });

    if (user) {
      return { error: "User already exist" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      image,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("saved to Db");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Email already exists for another user" };
  }
};

export const addUser = async (previousState, formData) => {
  const { username, email, password, image } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      image,
    });

    await newUser.save();
    console.log("User saved db");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("User deleted from db");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
