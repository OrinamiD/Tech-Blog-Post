import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
  description: string;
}

const categoryScehma: Schema<ICategory> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, " description is required"],
  },
});

const Category = mongoose.model<ICategory>("Blog", categoryScehma);

export default Category;
