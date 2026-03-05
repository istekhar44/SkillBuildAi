import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  getUserProfile,
  changePassword,
  updateNotificationPrefs,
  addEducation,
  deleteEducation,
  addProject,
  deleteProject,
  saveJob,
  unsaveJob,
  getSavedJobs,
  googleLogin,
} from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

// Auth routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/google-login").post(googleLogin);
router.route("/logout").post(logout);

// Profile routes
router.route("/profile").get(authenticateToken, getUserProfile);
router.route("/profile/update").post(authenticateToken, singleUpload, updateProfile);
router.route("/change-password").post(authenticateToken, changePassword);

// Notification preferences
router.route("/notifications").put(authenticateToken, updateNotificationPrefs);

// Education CRUD
router.route("/education").post(authenticateToken, addEducation);
router.route("/education/:id").delete(authenticateToken, deleteEducation);

// Projects CRUD
router.route("/projects").post(authenticateToken, addProject);
router.route("/projects/:id").delete(authenticateToken, deleteProject);

// Saved Jobs
router.route("/saved-jobs").get(authenticateToken, getSavedJobs);
router.route("/saved-jobs/:id").post(authenticateToken, saveJob);
router.route("/saved-jobs/:id").delete(authenticateToken, unsaveJob);

export default router;
