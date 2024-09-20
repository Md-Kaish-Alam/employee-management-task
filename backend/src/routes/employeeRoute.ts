import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authMiddleware to protect routes
router.use(authMiddleware);

// Create Employee
router.post("/", createEmployee);

// Get all Employees
router.get("/", getAllEmployees);

// Get Employee by ID
router.get("/:id", getEmployeeById);

// Update Employee
router.put("/:id", updateEmployee);

// Delete Employee
router.delete("/:id", deleteEmployee);

export default router;
