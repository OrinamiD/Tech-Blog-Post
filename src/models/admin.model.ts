import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
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
  isAdmin: boolean;
}

const adminSchema: Schema<IAdmin> = new mongoose.Schema({
  role: {
    type: String,
    enum: ["admin", "superAdmin"],
    default: "admin",
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
