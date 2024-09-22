import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import express, {Request, Response } from "express";

import authRoutes from "./routes/authRoutes";
import employeeRoutes from "./routes/employeeRoute";
config();

const app = express();

const corsOptions = {
  origin: ["https://empowerhub-weld.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to EmpowerHub API",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employees", employeeRoutes);

export default app;
