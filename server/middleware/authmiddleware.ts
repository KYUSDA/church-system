import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import authModel, { Roles } from "../Models/authModel.js";

export const requireAuth = catchAsyncErrors(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const access_token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : null;

    console.log("Access token present:", !!access_token);

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
      console.log("JWT verification error:", err.name, err.message);
      if (err.name === "TokenExpiredError") {
        throw new ErrorHandler("Session expired. Please log in again.", 401);
      }
      throw new ErrorHandler("Invalid session. Please log in again.", 401);
    }

    if (!decoded || !decoded.id) {
      throw new ErrorHandler("Invalid token payload", 401);
    }

    // Fetch the full user object from the database using the decoded id
    const user = await authModel.findById(decoded.id);
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }
    req.user = user;

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
};

export default requireAuth;
