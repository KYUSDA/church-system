import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { redis } from "../utils/redis.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";


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


// export const requireRefreshToken = catchAsyncErrors(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const refresh_token = req.cookies.refresh_token;

//     console.log("Refresh Token", refresh_token);

//     if (!refresh_token) {
//       throw new ErrorHandler(
//         "Refresh token not found. Please log in again.",
//         401
//       );
//     }

//     try {
//       const decoded = jwt.verify(
//         refresh_token,
//         process.env.REFRESH_TOKEN as string
//       ) as JwtPayload;

//       if (!decoded?.id) {
//         throw new ErrorHandler("Invalid refresh token payload", 401);
//       }

//       const session = await redis.get(decoded.id);
//       if (!session) {
//         throw new ErrorHandler("Session expired. Please log in again.", 401);
//       }

//       req.user = JSON.parse(session);
//       next();
//     } catch (error: any) {
//       // Handle specific JWT errors
//       if (error.name === "TokenExpiredError") {
//         throw new ErrorHandler(
//           "Refresh token expired. Please log in again.",
//           401
//         );
//       }
//       if (error.name === "JsonWebTokenError") {
//         throw new ErrorHandler(
//           "Invalid refresh token. Please log in again.",
//           401
//         );
//       }
//       // Re-throw ErrorHandler instances
//       if (error instanceof ErrorHandler) {
//         throw error;
//       }
//       // Unknown errors
//       throw new ErrorHandler("Authentication failed", 401);
//     }
//   }
// );


//authorize middleware
export const authorizeRoles = (...roles: string[]) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        if(!req.user || !roles.includes(req.user.role)) {
            return next(new ErrorHandler(`The role: ${req.user?.role} is not allowed`, 403));
        }
        next();
    }
}


export default requireAuth;