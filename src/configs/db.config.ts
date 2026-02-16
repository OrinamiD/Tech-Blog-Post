import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 5000;

export const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    error;
    process.exit(1);
  }
};
