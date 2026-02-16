import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  phoneNumber: string;
  otp: string;
  gender: string;
  otpExpiresAt: Date;
  isVerified: boolean;
  isDeleted: boolean[];
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      default: "Joe",
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
      default: "Big",
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      default: "E126uis379892222gdy",
    },
    age: {
      type: Number,
      required: [true, "age is required"],
      default: 18,
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required"],
    },
    otp: {
      type: String,
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
      enum: ["male", "famale"],
      default: "male",
    },
    otpExpiresAt: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: [
      {
        type: Boolean,
        default: false,
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
