// adminAuth.route.ts
import express, { Router } from "express";
import {
  isAdmin,
  loginValidation,
  validateSignup,
} from "../middlewares/auth.middleware.js";
import {
  handleForgotPassword,
  handleLogin,
  otpVerification,
  registration,
} from "../controllers/adminAuth.controller.js";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Auth
 *   description: Admin authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register-admin:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                - role
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - age
 *               - phoneNumber
 *               - gender
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123!
 *               age:
 *                 type: number
 *                 example: 30
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: male
 *     responses:
 *       201:
 *         description: Registration successful, check your email
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
 *                   example: Registration successful, check your email
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     role:
 *                       type: string
 *                     age:
 *                       type: number
 *                     verified:
 *                       type: boolean
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register-admin", isAdmin, validateSignup, registration);

/**
 * @swagger
 * /api/auth/admin/verify-otp:
 *   post:
 *     summary: Verify admin OTP
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Account verified successfully
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
 *                   example: Account verified successfully. Login to your account
 *       400:
 *         description: Invalid or expired OTP
 */
router.post("/admin/verify-otp", otpVerification);

/**
 * @swagger
 * /api/auth/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123!
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   example: Login successful
 *                 user:
 *                   type: object
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Incorrect credentials
 *       404:
 *         description: User not found
 */
router.post("/admin/login", isAdmin, loginValidation, handleLogin);

/**
 * @swagger
 * /api/auth/admin/forgot-password:
 *   post:
 *     summary: Request admin password reset
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *     responses:
 *       200:
 *         description: Forgot password email sent successfully
 *       404:
 *         description: User not found
 */
router.post("/admin/forgot-password", isAdmin, handleForgotPassword);

export default router;
