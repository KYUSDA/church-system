import Member from "../Models/authModel";
import { NextFunction, Request, Response } from "express";
import authModel from "../Models/authModel";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";



// get all members with profiles
export const getAll = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await authModel.find().select("-password").populate({
      path: "profile",
      model: "Profile",
    });

    if (!users || users.length === 0) {
      return next(new ErrorHandler("No users found", 404));
    }

    res.status(200).json({
      status: "success",
      users,
      message: "All registered users with profiles retrieved successfully",
    });
  },
);


// get one member wih profile
export const getOne = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authModel
      .findById(req.params.id)
      .select("-password")
      .populate({
        path: "profile",
        model: "Profile",
      });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      status: "success",
      user,
    });
  },
);
