import type { Request, Response } from "express";
import {
  allBlog,
  getABlog,
  handleBlogCreation,
  handleDeleteBlog,
  handleUpdate,
} from "../services/blog.service.js";

export const craeteBlog = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { title, content } = req.body;

    const { id } = req.params;

    if (!req.files || !Array.isArray(req.files)) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const { blogPost } = await handleBlogCreation(req.body, id, req.files);

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blogPost,
    });
  } catch (error: any) {
    if (error.message === "user does not exist") {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message === "Catgory does not exist") {
      return res.status(400).json({ success: false, message: error.message });
    } else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

// update blog

export const updateBlog = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { title, content, image } = req.body;

    const { id } = req.params;

    const { product } = await handleUpdate(req.body, id);

    return res.status(200).json({
      success: true,
      messsage: "Blog updated successfully",
      product,
    });
  } catch (error: any) {
    if (error.message === "user does not exist") {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message === "post does not exist") {
      return res.status(404).json({ success: false, message: error.message });
    } else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

export const getBlog = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const { post } = await getABlog(id);

    return res.status(200).json({
      success: true,
      messsage: "Blog updated successfully",
      post,
    });
  } catch (error: any) {
    if (error.message === "Blog post does not exist") {
      return res.status(404).json({ success: false, message: error.message });
    } else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

export const getAllBlog = async (req: Request, res: Response) => {
  try {
    const { blog } = await allBlog();

    return res.status(200).json({
      success: true,
      messsage: "Blog updated successfully",
      updatedBlog: { blog },
    });
  } catch (error: any) {
    if (error.message === "No available blog") {
      return res.status(404).json({ success: false, message: error.message });
    } else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

export const deleteBlog = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const { deletedBlog } = await handleDeleteBlog(id);

    return res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error: any) {
    if (error.message === "blog does not exist") {
      return res.status(404).json({ success: false, message: error.message });
    } else {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
