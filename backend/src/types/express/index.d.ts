import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
      file?: Express.Multer.File;
    }
  }
}
