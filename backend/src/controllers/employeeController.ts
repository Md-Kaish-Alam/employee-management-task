import multer from "multer";
import cloudinary from "cloudinary";
import { Request, Response } from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import Employee from "../models/Employee";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    return {
      folder: "employee_images",
      allowed_formats: ["jpg", "png", "jpeg"],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

// Initialize multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// Create an Employee
export const createEmployee = async (req: Request, res: Response) => {
  const { f_name, f_email, f_mobile_no, f_designation, f_gender, f_course } =
    req.body;

  // Validate input
  if (
    !f_name ||
    !f_email ||
    !f_mobile_no ||
    !f_designation ||
    !f_gender ||
    !f_course ||
    !Array.isArray(f_course)
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for duplicate email
    const existingEmployee = await Employee.findOne({ f_email });
    if (existingEmployee) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Validate courses as an array
    if (!Array.isArray(f_course) || f_course.length === 0) {
      return res.status(400).json({ message: "Course is required" });
    }

    // Handle image upload if present
    let imageUrl = null;
    if (req.file && req.file.path) {
      imageUrl = req.file.path;
    }

    const newEmployee = new Employee({
      f_name,
      f_email,
      f_mobile_no,
      f_designation,
      f_gender,
      f_course,
      f_image: imageUrl,
    });
    await newEmployee.save();
    return res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
};

// Get all Employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json(employees);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
};

// Get Employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne({ f_Id: id });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
};

// Update Employee
export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { f_name, f_email, f_mobile_no, f_designation, f_gender, f_course } =
    req.body;

  // Validate input
  if (
    !f_name ||
    !f_email ||
    !f_mobile_no ||
    !f_designation ||
    !f_gender ||
    !f_course ||
    !Array.isArray(f_course)
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Handle image upload if present
    let imageUrl = null;
    if (req.file && req.file.path) {
      imageUrl = req.file.path;
    }

    // Update the employee record
    const updatedEmployee = await Employee.findOneAndUpdate(
      { f_Id: id },
      {
        f_name,
        f_email,
        f_mobile_no,
        f_designation,
        f_gender,
        f_course,
        f_image: imageUrl ? imageUrl : undefined, // Only update the image if provided
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
};

// Delete Employee
export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findOneAndDelete({ f_Id: id });

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error. Please try again later." });
  }
};

// Middleware to handle file upload
export const uploadImage = upload.single("f_image");
