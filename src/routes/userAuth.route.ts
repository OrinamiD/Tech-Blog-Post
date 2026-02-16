// userAuth.route.ts
import express, { Router } from "express";
import {
  loginValidation,
  validateSignup,
} from "../middlewares/auth.middleware.js";
import {
  handleForgotPassword,
  handleLogin,
  handleResendOtp,
  handleResetPassword,
  otpVerification,
  registration,
} from "../controllers/userAuth.controller.js";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Auth
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - age
 *         - phoneNumber
 *         - gender
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated user ID
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         phoneNumber:
 *           type: string
 *           description: User's phone number
 *         age:
 *           type: number
 *           description: User's age
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: User's gender
 *         role:
 *           type: string
 *           description: User's role
 *         isVerified:
 *           type: boolean
 *           description: Account verification status
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/auth/register-user:
 *   post:
 *     summary: Register a new user
 *     tags: [User Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
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
 *                 example: Jane
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 example: Smith
 *                 description: User's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane.smith@example.com
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123!
 *                 description: User's password (min 8 characters)
 *               age:
 *                 type: number
 *                 example: 25
 *                 description: User's age
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: User's phone number
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: female
 *                 description: User's gender
 *     responses:
 *       201:
 *         description: Registration successful, check your email for OTP
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
 *                     firstName:
 *                       type: string
 *                       example: Jane
 *                     lastName:
 *                       type: string
 *                       example: Smith
 *                     email:
 *                       type: string
 *                       example: jane.smith@example.com
 *                     phoneNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     gender:
 *                       type: string
 *                       example: female
 *                     id:
 *                       type: string
 *                       example: 64f9c8a12b34567890abcdef
 *                     role:
 *                       type: string
 *                       example: user
 *                     age:
 *                       type: number
 *                       example: 25
 *                     verified:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: User already exists or validation error
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
 *                   example: Internal server error
 */
router.post("/register-user", validateSignup, registration);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP for user account
 *     tags: [User Auth]
 *     description: Verify the OTP sent to user's email during registration
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
 *                 example: jane.smith@example.com
 *                 description: User's email address
 *               otp:
 *                 type: string
 *                 example: "123456"
 *                 description: 6-digit OTP code sent to email
 *     responses:
 *       200:
 *         description: OTP verified successfully
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
 *         description: Invalid OTP, OTP expired, or other validation error
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
 *                   example: Invalid OTP
 */
router.post("/verify-otp", otpVerification);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [User Auth]
 *     description: Login with email/phone and password. Returns access token and sets refresh token in httpOnly cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane.smith@example.com
 *                 description: User's email (provide either email or phone)
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: User's phone number (provide either email or phone)
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123!
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token stored in httpOnly cookie
 *             schema:
 *               type: string
 *               example: refreshToken=eyJhbGc...; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
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
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: Jane
 *                     lastName:
 *                       type: string
 *                       example: Smith
 *                     email:
 *                       type: string
 *                       example: jane.smith@example.com
 *                     id:
 *                       type: string
 *                       example: 64f9c8a12b34567890abcdef
 *                     role:
 *                       type: string
 *                       example: user
 *                     verified:
 *                       type: boolean
 *                       example: true
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                   description: JWT access token (expires in 5 minutes)
 *       400:
 *         description: Incorrect email or password, or account not verified
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
 *                   example: Incorrect email or password
 *       404:
 *         description: User not found
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
 *                   example: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/login", loginValidation, handleLogin);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset email
 *     tags: [User Auth]
 *     description: Send OTP to user's email for password reset
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
 *                 example: jane.smith@example.com
 *                 description: User's registered email address
 *     responses:
 *       200:
 *         description: Forgot password email sent successfully
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
 *                   example: Forgot password email sent successfully
 *                 forgottenPassword:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: jane.smith@example.com
 *                     fullName:
 *                       type: string
 *                       example: Jane Smith
 *       404:
 *         description: User not found
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
 *                   example: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/forgot-password", handleForgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [User Auth]
 *     description: Reset password using OTP received via email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - otp
 *               - password
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "123456"
 *                 description: OTP received via email
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewSecurePass123!
 *                 description: New password (min 8 characters)
 *     responses:
 *       200:
 *         description: Password reset successful
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
 *                   example: Password reset successful
 *                 resetPassword:
 *                   type: object
 *       400:
 *         description: Invalid OTP or missing credentials
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
 *                   example: Invalid OTP
 *       404:
 *         description: User not found
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
 *                   example: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/reset-password", handleResetPassword);

/**
 * @swagger
 * /api/auth/resend-otp:
 *   post:
 *     summary: Resend OTP to user email
 *     tags: [User Auth]
 *     description: Resend verification OTP to user's email (OTP valid for 5 minutes)
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
 *                 example: jane.smith@example.com
 *                 description: User's registered email address
 *     responses:
 *       200:
 *         description: New OTP sent successfully
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
 *                   example: New OTP sent successfully
 *       400:
 *         description: Email is required, user already verified, or invalid request
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
 *                   example: Email is required
 *       404:
 *         description: User not found
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
 *                   example: User not found
 */
router.post("/resend-otp", handleResendOtp);

export default router;
