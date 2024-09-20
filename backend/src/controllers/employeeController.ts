import { Request, Response } from "express";
import Employee from "../models/Employee";

// Create an Employee
export const createEmployee = async (req: Request, res: Response) => {
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
    !f_course
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newEmployee = new Employee({
      f_image,
      f_name,
      f_email,
      f_mobile_no,
      f_designation,
      f_gender,
      f_course,
    });
    await newEmployee.save();
    return res
      .status(201)
      .json({
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
    !f_course
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
