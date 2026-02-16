import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  authorsId: [Types.ObjectId];
  categoryId: Types.ObjectId[];
  images: [string];
  views: number;
  isDeleted: boolean;
}

const blogScehma: Schema<IBlog> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  content: {
    type: String,
    required: [true, "content is required"],
  },
  authorsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  ],
  categoryId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],

  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Blog = mongoose.model<IBlog>("Blog", blogScehma);

export default Blog;
