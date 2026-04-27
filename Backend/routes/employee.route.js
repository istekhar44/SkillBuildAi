import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
} from "../controllers/employee.controller.js";

const router = express.Router();

// GET /api/employee — List all employees
router.get("/", getAllEmployees);

// GET /api/employee/:id — Get single employee by employeeId
router.get("/:id", getEmployeeById);

export default router;
