import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import express, { Request, Response } from "express";

import authRoutes from "./routes/authRoutes";
import employeeRoutes from "./routes/employeeRoute";
import { authMiddleware } from "./middleware/authMiddleware";

config();

const app = express();

const corsOptions = {
  origin: "https://empowerhub-weld.vercel.app", // or '*' for allowing all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Middleware
app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/employees", employeeRoutes);

export default app;
