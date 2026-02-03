

// create user profile
// update user profile
// update avatar 
// get upcoming users with birthdays in the current month
// send birthday wishes[on that date] to users via email

import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import profileModel from "../Models/profileModel";
import ErrorHandler from "../utils/ErrorHandler";
import { sendMail } from "../utils/mail";
import cron from "node-cron";
import authModel from "../Models/authModel";
import cloudinary from "cloudinary";


// create user profile
export const createProfile = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { birthday, family, department } = req.body;

    const user = req.user;
    const id = user?.id;
    if (!id) {
      return next(new ErrorHandler("User ID not found in request", 400));
    }

  const userId = id;

  const existingProfile = await profileModel.findOne({ userId });
  if (existingProfile) {
    return next(new ErrorHandler("Profile already exists for this user", 400));
  }

  const profile = await profileModel.create({
    userId,
    birthday,
    family,
    department,
  });

  res.status(201).json({
    status: "success",
    profile,
    message: "Profile created successfully",
  });
});

// update user profile
export const updateProfile = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const profileId = req.params.id;

  const updatedProfile = await profileModel.findByIdAndUpdate(profileId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProfile) {
    return next(new ErrorHandler("Profile not found", 404));
  }

  res.status(200).json({
    status: "success",
    profile: updatedProfile,
    message: "Profile updated successfully",
  });
});

// update user avatar
export const updateAvatar = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
         const { avatar } = req.body;
         const userId = req.user?._id as string;
         const user = await profileModel.findById(userId);
         if (!user) {
           return next(
             new ErrorHandler("User not found. Please login again", 404),
           );
         }
        if (avatar && user) {
          if (user.avatar?.public_id) {
            await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
              folder: "profiles",
            });

            user.avatar = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
          } else {
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
              folder: "profiles",
            });

            user.avatar = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
          }
        }

        await user.save();
        res
          .status(200)
          .json({ success: true, user, message: "User profile updated" });
    } catch (error:any) {
          return next(
            new ErrorHandler(error.message || "Error updating avatar", 400),
          );
    }
 })


// get upcoming users with birthdays in the current month
export const getUpcomingBirthdays = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed

  const profiles = await profileModel.find({
    birthday: {
      $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1),
      $lt: new Date(new Date().getFullYear(), currentMonth, 1),
    },
  }).populate('userId', 'firstName lastName email');

  res.status(200).json({
    status: "success",
    profiles,
    message: "Upcoming birthdays retrieved successfully",
  });
});


export const sendBirthdayWishes = () => {
  // Runs every day at 8:00 AM
  cron.schedule("0 8 * * *", async () => {
    try {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      // Get profiles with birthdays today
      const profiles = await profileModel.find({
        $expr: {
          $and: [
            { $eq: [{ $month: "$birthday" }, month] },
            { $eq: [{ $dayOfMonth: "$birthday" }, day] },
          ],
        },
      });

      for (const profile of profiles) {
        const user = await authModel.findById(profile.userId);

        if (!user || !user.email) continue;

        await sendMail({
          subject: "Happy Birthday 🎉",
          email: user.email,
          template: "birthday.ejs",
          data: {
            name: `${user.firstName} ${user.lastName}`,
          },
        });
      }

      console.log(`🎂 Birthday wishes sent to ${profiles.length} users`);
    } catch (error) {
      console.error("Birthday cron failed:", error);
    }
  });
};
