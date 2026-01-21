import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState === 1;

    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
