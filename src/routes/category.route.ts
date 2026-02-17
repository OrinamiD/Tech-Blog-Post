// category.route.ts
import express, { Router } from "express";
import {
  createCategory,
  getAllCategory,
  getCategory,
  updateCatogory,
} from "../controllers/category.controller.js";
import {
  validateCategory,
  validateID,
} from "../middlewares/category.middleare.js";
import { auth, isAdmin } from "../middlewares/auth.middleware.js";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated category ID
 *         title:
 *           type: string
 *           description: Category title
 *         description:
 *           type: string
 *           description: Category description
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Technology
 *               description:
 *                 type: string
 *                 example: All tech-related blog posts
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *       400:
 *         description: Category already exists
 *       500:
 *         description: Internal server error
 */
router.post(
  "/create-category",
  auth,
  isAdmin,
  validateCategory,
  createCategory,
);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: 64f9c8a12b34567890abcdef
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: fetched category successfully
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *       404:
 *         description: Category does not exist
 *       500:
 *         description: Internal server error
 */
router.get("/get-category/:id", auth, validateID, getCategory);

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: fetched category successfully
 *                 category:
 *                   type: object
 *                   properties:
 *                     all:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Category'
 *       404:
 *         description: No category found
 *       500:
 *         description: Internal server error
 */
router.get("/get-all-category", auth, getAllCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Technology
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 category:
 *                   type: object
 *       400:
 *         description: You are not allowed
 *       404:
 *         description: User or Category does not exist
 *       500:
 *         description: Internal server error
 */
router.put("/update-category/:id", auth, isAdmin, validateID, updateCatogory);

export default router;
