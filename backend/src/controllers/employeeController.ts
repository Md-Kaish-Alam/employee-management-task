import { Request, Response } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import Employee from "../models/Employee";
import { uploadToCloudinary } from "../utils/cloudinaryUtils";

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
const upload = multer({ storage });

// Create an Employee
export const createEmployee = async (req: Request, res: Response) => {
  const {
    f_name,
    f_email,
    f_mobile_no,
    f_designation,
    f_gender,
    f_course,
  } = req.body;

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
      imageUrl = req.file.path; // Cloudinary returns the URL in the 'path' field
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

// Duplicate email check endpoint
export const checkDuplicateEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existingEmployee = await Employee.findOne({ f_email: email });
  return res.status(200).json({ isDuplicate: !!existingEmployee });
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
  const {
    f_image,
    f_name,
    f_email,
    f_mobile_no,
    f_designation,
    f_gender,
    f_course,
  } = req.body;

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
    const updatedEmployee = await Employee.findOneAndUpdate(
      { f_Id: id },
      {
        f_image,
        f_name,
        f_email,
        f_mobile_no,
        f_designation,
        f_gender,
        f_course,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res
      .status(200)
      .json({
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
export const uploadImage = upload.single('f_image');