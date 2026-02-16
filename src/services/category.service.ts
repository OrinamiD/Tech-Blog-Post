import type { Types } from "mongoose";
import type { ICategory } from "../models/category.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";

// create
export const categoryCreation = async (data: ICategory) => {
  const { title } = data;

  const exisitingCategory = await Category.findOne({ title });

  if (exisitingCategory) {
    throw new Error("Category already exist");
  }

  const newCategory = new Category({
    ...data,
  });

  await newCategory.save();

  return { item: newCategory };
};

// update
export const handleUpdateCatogory = async (data: ICategory, id: string) => {
  const user = await User.findById(id);

  if (!user) throw new Error("User does not exist");

  if (user.role != "admin") throw new Error("You are not allowed");

  const existCategory = await Category.findById(id);

  if (!existCategory) throw new Error("Category does not exist");

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { ...data },
    { new: true },
  );

  await updatedCategory?.save();

  return { updated: updatedCategory };
};

//get category

export const getACategory = async (id: string) => {
  const exisitingCategory = await Category.findById(id);

  if (!exisitingCategory) throw new Error("category does not exist");

  return { category: exisitingCategory };
};

// get all category

export const allCategory = async () => {
  const category = await Category.find();

  if (!category) throw new Error("No category");

  return { all: category };
};
