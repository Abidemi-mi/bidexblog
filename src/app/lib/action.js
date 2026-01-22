"use server";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcrypt";

export const sayHello = async (formData) => {
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
  } catch (error) {
    console.log(error);
    throw new Error("failed to Save new post");
  }

  console.log("Action works");
};

export const handleRegister = async (formData) => {
  "use server";

  const { username, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return "Password do not match";
  }

  try {
    await connectToDb();

    let user = await User.findOne({username});

    if (user) {
      return "User already exist";
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      
    });

    await newUser.save();
    console.log("saved to Db");
  } catch (error) {
    console.log(error)
    throw new Error(error, "Failed to register");
  }
};
