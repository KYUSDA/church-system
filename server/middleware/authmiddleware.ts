import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { redis } from "../utils/redis.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { Roles } from '../Models/authModel.js';


export const requireAuth = catchAsyncErrors(
  async (req: Request, _res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;
    console.log("Access token", access_token);
    if (!access_token) {
      throw new ErrorHandler("Session not found. Please log in again…", 401);
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        throw new ErrorHandler("TokenExpiredError", 401);
      }
      throw new ErrorHandler("Authentication failed", 401);
    }


    if (!decoded) {
      throw new ErrorHandler("Authentication failed", 401);
    }

    // Look user up in Redis; `decoded.id` must exist
    const user = await redis.get(decoded.id);
    if (!user) {
      throw new ErrorHandler("User session not found. Please log in", 404);
    }

    req.user = JSON.parse(user);
    next();
  }
);


// middleware/authorizeRoles.ts
export const authorizeRoles = (...allowedRoles: Roles[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user; // populated by your auth middleware

    if (!user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    if (!allowedRoles.includes(user.role as Roles)) {
      return next(new ErrorHandler("Access Denied", 403));
    }

    next();
  };
}


export default requireAuth;