import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.route("/stats").get(authenticateToken, getDashboardStats);

export default router;
