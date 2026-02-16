import express, { Router } from "express";

const router: Router = express.Router();

import adminRoute from "./adminAuth.route.js";

import userRoute from "./userAuth.route.js";
import categoryRoute from "./userAuth.route.js";

import blogRoute from "./blog.route.js";

router.use("/auth", adminRoute);
router.use("/auth", userRoute);
router.use("/category", categoryRoute);
router.use("/blog", blogRoute);

export default router;
