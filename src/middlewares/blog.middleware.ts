import type { NextFunction, Request, Response } from "express";

export const validateBlogCreation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content, image } = req.body;

  const errors = [];

  if (!title) errors.push("title is required");
  if (!content) errors.push("content is required");
  if (!image) errors.push("title is required");

  if (errors.length > 0) {
    return res.status(401).json({ success: false, message: errors });
  }

  next();
};

export const validateUpdateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content, image } = req.body;

  const { id } = req.params;

  const errors = [];

  if (!id) errors.push("id is required");

  if (!title && !content && !image) errors.push("fill the required field");

  if (errors.length > 0) {
    return res.status(401).json({ success: false, message: errors });
  }

  next();
};
