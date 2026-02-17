import jwt, { type JwtPayload } from "jsonwebtoken";

import joi from "joi";
import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";

import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

export const validateSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { firstName, lastName, email, password, phoneNumber, age, gender } =
    req.body;

  const errors = [];

  if (!firstName) {
    errors.push("firstName is required");
  }
  if (!lastName) {
    errors.push("lastName is required");
  }
  if (!email) {
    errors.push("email is required");
  }
  if (!password) {
    errors.push("password is required");
  }
  if (!phoneNumber) {
    errors.push("phone is required");
  }
  if (!age) {
    errors.push("age is required");
  }
  if (!gender) {
    errors.push("gender is required");
  }

  if (errors.length > 0) {
    return res.status(200).json({ success: false, message: errors });
  }

  const signupSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi
      .string()
      .required()
      .min(4)
      .max(60)
      .pattern(new RegExp("^[^@]+@[^@]+.[^@]+$"))
      .messages({
        "string.pattern.base":
          "Please enter a valid email address (e.g., name@example.com).",
        "string.email": "Please enter a valid email address.",
      }),
    password: joi.string().required(),

    phoneNumber: joi.string().required().min(8).max(15),
  });

  const { error } = signupSchema.validate({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

export const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, phoneNumber, password } = req.body;

  const errors = [];

  if (!email && !phoneNumber) errors.push("fill the required field");

  if (!password) errors.push("password is required");

  if (errors.length > 0) {
    return res.status(401).json({ success: false, message: errors });
  }

  next();
};

interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid response" });
    }

    const splitToken = token.split(" ");

    const realToken = splitToken[1];

    if (!realToken) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect credentials" });
    }

    const decoded = jwt.verify(
      realToken,
      process.env.ACCESS_TOKEN as string,
    ) as JwtPayload;

    if (!decoded) {
      return res.status(401).json({ success: false, Message: "Forbidden!" });
    }

    req.role = decoded.role;
    req.user = await User.findById(decoded.id);

    const user = await User.findById(decoded?.id);
    const admin = await Admin.findById(decoded.id);

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "user not found" });
    }

    req.user = user;

    next();
  } catch (error: any) {
    console.error(error.message);
    return res.status(401).json({ success: false, message: error.message });
  }
};

interface AuthRequest extends Request {
  role?: "admin";
}

export const isAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { role } = req;

  if (req.role != "admin") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  } else {
    next();
  }
};
