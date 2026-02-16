import type { NextFunction, Request, Response } from "express";

export const validateCategory = async (
  req: Request<{ title: string; description: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { title, description } = req.body;

  const errors = [];

  if (!title) {
    errors.push("title is required");
  }
  if (!description) {
    errors.push("description is required");
  }

  if (errors.length > 0) {
    return res.status(401).json({ success: false, message: errors });
  }

  next();
};

export const validateUpdateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description } = req.body;

  const { id } = req.params;

  const errors = [];

  if (!id) errors.push("id is required");

  if (!title && !description) throw new Error("fill the required field");

  if (errors.length > 0) {
    return res.status(401).json({ success: false, message: errors });
  }

  next();
};

export const validateID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const errors = [];

  if (!id) errors.push("id is required");

  if (errors.length > 0) {
    return res.status(401).json({ success: false, message: errors });
  }

  next();
};
