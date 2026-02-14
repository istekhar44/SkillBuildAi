import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";
import { seedJobs } from "../controllers/seed.controller.js";

const router = express.Router();

router.route("/post").post(authenticateToken, postJob);
router.route("/get").get(getAllJobs); // Making job listing public
router.route("/getadminjobs").get(authenticateToken, getAdminJobs);
router.route("/get/:id").get(authenticateToken, getJobById);
router.route("/seed").post(authenticateToken, seedJobs);
export default router;
