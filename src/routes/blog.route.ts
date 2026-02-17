// blog.route.ts
import express, { Router } from "express";
import {
  craeteBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import {
  validateBlogCreation,
  validateUpdateBlog,
} from "../middlewares/blog.middleware.js";
import { auth, isAdmin } from "../middlewares/auth.middleware.js";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - authorsId
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         authorsId:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               public_id:
 *                 type: string
 *               url:
 *                 type: string
 *         isDeleted:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/blog/create-blog/{id}:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Admin ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - authorsId
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Blog Post
 *               content:
 *                 type: string
 *                 example: This is the content of my blog post
 *               authorsId:
 *                 type: string
 *                 example: 64f9c8a12b34567890abcdef
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
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
 *                   example: Blog created successfully
 *                 blogPost:
 *                   $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Image is required or Category does not exist
 *       404:
 *         description: User does not exist
 *       500:
 *         description: Internal server error
 */
router.post(
  "/create-blog/:id",
  validateBlogCreation,
  auth,
  isAdmin,
  craeteBlog,
);

/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of all blogs
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
 *                 updatedBlog:
 *                   type: object
 *                   properties:
 *                     blog:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Blog'
 *       404:
 *         description: No available blog
 *       500:
 *         description: Internal server error
 */
router.get("/get-all-blog", auth, getAllBlog);

/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Get blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 post:
 *                   $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog post does not exist
 *       500:
 *         description: Internal server error
 */
router.get("/get-blog/:id", auth,  getBlog);

/**
 * @swagger
 * /api/blog/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: User or post does not exist
 *       500:
 *         description: Internal server error
 */
router.patch("/update-blog/:id", auth, validateUpdateBlog, isAdmin, updateBlog);

/**
 * @swagger
 * /api/blog/{id}:
 *   delete:
 *     summary: Soft delete blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
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
 *                   example: Blog deleted
 *       404:
 *         description: Blog does not exist
 *       500:
 *         description: Internal server error
 */
router.patch("/delete-blog/:id", auth, isAdmin, deleteBlog);

export default router;
