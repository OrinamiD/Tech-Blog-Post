import type { Request, Response } from "express";
import {
  allCategory,
  categoryCreation,
  getACategory,
  handleUpdateCatogory,
} from "../services/category.service.js";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const { item } = await categoryCreation(req.body);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: {
        title: item?.title,
        description: item?.description,
      },
    });
  } catch (error: any) {
    if (error.message === "Category already exist") {
      return res.status(400).json({ success: false, message: error.message });
    } else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

// update

export const updateCatogory = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { title, description } = req.body;

    const { id } = req.params;

    const { updated } = await handleUpdateCatogory(req.body, id);

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: {
        id: updated?._id,
        title: updated?.title,
        description: updated?.description,
      },
    });
  } catch (error: any) {
    if (error.message === "User does not exist") {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message === "You are not allowed") {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (error.message === "Category does not exist") {
      return res.status(404).json({ success: false, message: error.message });
    } else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

//get category

export const getCategory = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const { category } = await getACategory(id);

    return res.status(200).json({
      success: true,
      message: "fetched category successfully",
      category: {
        id: category?._id,
        title: category?.title,
        description: category?.description,
      },
    });
  } catch (error: any) {
    if (error.message === "category does not exist") {
      return res.status(404).json({ success: false, message: error.message });
    } else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

// get all category

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const { all } = await allCategory();

    return res.status(200).json({
      success: true,
      message: "fetched category successfully",
      category: {
        all,
      },
    });
  } catch (error: any) {
    if (error.message === "No category") {
      return res.status(404).json({ success: false, message: error.message });
    } else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
