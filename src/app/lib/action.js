"use server";

import { revalidatePath } from "next/cache";
import { Post, User, Contact } from "./models";
import { connectToDb } from "./utils";

export const addPost = async (previousState, formData) => {
  const { title, slug, desc, userId, img } = Object.fromEntries(formData);

  console.log("Adding post with data:", { title, slug, userId });

  if (!userId || userId === "") {
    return { error: "Authorization error: Your session ID is missing. Please log out and back in." };
  }

  if (!title || !slug || !desc) {
    return { error: "Validation error: Title, Slug, and Description are required." };
  }

  try {
    await connectToDb();
    
    // Check if slug already exists to provide a friendly error before Mongoose throws
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return { error: "Error: This slug is already in use. Please choose a unique slug." };
    }

    const newPost = new Post({
      title,
      slug,
      desc,
      userId,
      img,
    });
    
    await newPost.save();
    console.log("Post successfully saved to database.");
    
    // Attempt revalidation
    try {
      revalidatePath("/blog");
      revalidatePath("/admin");
    } catch (revalError) {
      console.error("Revalidation error (non-fatal):", revalError);
      // We don't return an error here because the post WAS saved successfully
    }

    return { success: true };
  } catch (error) {
    console.error("CRITICAL ERROR in addPost action:", error);
    return { error: `Database Error: ${error.message || "Something went wrong while saving the post."}` };
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
    console.error("Delete post error:", error);
    return { error: "Failed to delete post." };
  }
};

export const register = async (previousState, formData) => {
  const { username, email, password, passwordRepeat, image } = Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match." };
  }

  try {
    await connectToDb();
    const { User } = await import("./models");
    let user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists." };
    }

    const bcrypt = await import("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      image,
      password: hashedPassword,
    });

    await newUser.save();
    return { success: true };
  } catch (error) {
    console.error("Register error:", error);
    return { error: "Something went wrong during registration." };
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
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Add user error:", error);
    return { error: "Failed to add user." };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDb();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (error) {
    console.error("Delete user error:", error);
    return { error: "Failed to delete user." };
  }
};

export const addContact = async (previousState, formData) => {
  const { name, email, phone, message } = Object.fromEntries(formData);

  console.log("Adding contact message from:", { name, email });

  if (!name || !email || !message) {
    return { error: "Validation error: Name, email, and message are required." };
  }

  try {
    await connectToDb();
    const { Contact } = await import("./models");
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });
    await newContact.save();
    console.log("Contact message successfully saved to database.");
    return { success: true };
  } catch (error) {
    console.error("CRITICAL ERROR in addContact action:", error);
    return { error: "Something went wrong. Please try again later." };
  }
};
