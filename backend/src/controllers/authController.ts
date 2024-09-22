import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Request, Response } from "express";

import User from "../models/User";

config();

const JWT_SECRET = process.env.JWT_SECRET_KEY!;

// Register User
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // check if username already exists or not
  const existingUser = await User.findOne({ f_username: username });

  if (existingUser) {
    return res.status(409).json({
      error: "Username already exists",
    });
  }

  // Hash password and save user
  try {
    const hanshedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      f_username: username,
      f_password: hanshedPassword,
    });
    await newUser.save();

    return res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error. Please try again later.",
    });
  }
};

// Login user by username and password
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    // Find user by username and exclude the password field
    const user = await User.findOne({ f_username: username }).select('-f_password');

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Compare password (retrieve the password separately just for comparison)
    const userWithPassword = await User.findOne({ f_username: username });
    const isMatch = await bcrypt.compare(password, userWithPassword!.f_password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return token and user (without password)
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
};

