import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

import authRoutes from "./routes/authRoutes";
import employeeRoutes from "./routes/employeeRoute";
import { authMiddleware } from "./middleware/authMiddleware";

config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employees", employeeRoutes);

app.get("/api/v1/protected", authMiddleware, (req: Request, res: Response) => {
  const userId = req.user?.userId;
  return res.json({
    message: `Hello User ${userId}`,
  });
});

export default app;
