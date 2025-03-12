import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { redis } from "../utils/redis.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";

const requireAuth = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  // Verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    if (!process.env.SECRET) {
      throw new Error("SECRET environment variable is not defined");
    }

    const decoded = jwt.verify(token, process.env.SECRET) as jwt.JwtPayload; // ✅ Correct way to use it
    const userId = decoded._id;

    const user = await redis.get(userId);
    if (!user) {
      return next(new ErrorHandler("User session not found. Please log in", 404));
    }

    req.user = JSON.parse(user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
});

export default requireAuth;
