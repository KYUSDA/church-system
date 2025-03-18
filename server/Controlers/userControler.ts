import Member from "../Models/authModel";
import { NextFunction, Request, Response } from "express";
import { Multer } from "multer";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

import cloudinary from "cloudinary";
import authModel from "../Models/authModel";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
export async function getAll(req: Request, resp: Response) {
  try {
    const query = req.query.new;
    const users = query
      ? await Member.find().sort({ _id: -1 }).limit(5)
      : await Member.find();
    resp.status(200).json({
      status: "success",
      users,
      message: "All registered users",
    });
  } catch (err) {
    resp.status(404).json({
      status: "failure",
      error: err,
    });
  }
}

export async function getOne(req:Request, resp: Response) {
  try {
    const id = req.params.id;
    console.log(id);
    const getOneUser = await Member.findById(id);
    resp.status(200).json(getOneUser);
  } catch (err) {
    resp.status(404).json(err);
  }
}

export async function updateUser(req:Request, resp:Response) {
  console.log(req.body);
  try {
    const id = req.params.id;
    const updatedUser = await Member.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    resp.status(201).json({
      status: "success",
      user: {
        updatedUser,
      },
    });
  } catch (err) {
    resp.status(404).json({
      status: "failure",
      error: err,
    });
  }
}

export async function deleteUser(req:Request, resp:Response) {
  try {
    const id = req.params.id;
    const deletedUser = await Member.findByIdAndDelete(id);
    resp.status(204).json({
      status: "deleted",
      data: [],
    });
  } catch (err) {
    resp.status(404).json(err);
  }
}

export async function createUser(req:Request, resp:Response) {
  try {
    const user = await Member.create(req.body);
    resp.status(200).json(user);
  } catch (err) {
    resp.status(404).json(err);
  }
}

//update user avatar
// export const updateUserAvatar = async (req: Request, res: Response) => {
//   try {
//     const { avatar } = req.body;
//     const { id } = req.params; // Get user ID from params
//     console.log(avatar);
//     const user = await authModel.findById(id);
//     if (!user) {
//      res.status(404).json({ success: false, message: "User not found. Please login again" });
//     }

//     if (avatar && user) {
//       // Delete the old avatar from Cloudinary (if exists)
//       if (user.avatar?.public_id) {
//         await cloudinary.v2.uploader.destroy(user.avatar.public_id.toString());
//       }

//       // Upload new avatar to Cloudinary
//       const myCloud = await cloudinary.v2.uploader.upload(avatar, { folder: "Avatars" });

//       // Update user's avatar data
//       user.avatar = {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       };

//       await user.save();
//     }

//     res.status(200).json({ success: true, user, message: "User profile updated" });
//   } catch (err) {
//     console.error(err);
//    res.status(500).json({ success: false, messsage:"Internal Server Error" });
// };


export const updateUserAvatar =catchAsyncErrors (async (req: MulterRequest, res: Response, next:NextFunction) => {

  try {
    const { id } = req.params;
    const user = await authModel.findById(id);

    if (!user) {
      return next(new ErrorHandler("User not found. Please login again",404));
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Delete old avatar from Cloudinary (if exists)
    if (user.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id.toString());
    }

    // Upload new avatar to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "Avatars",
    });

    // Update user's avatar
    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    await user.save();

    res.status(200).json({ success: true, user, message: "User profile updated" });
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400));
  }
});



// update user score
export const updateScore = catchAsyncErrors(async(req:Request, res:Response, next:NextFunction) => {
  try {

    const {scores} = req.body;

    if(!scores) {
      return next(new ErrorHandler("Please enter your score", 400));
    }

    // check user  id
    const userId = req.user?.id;
    if(!userId) {
      return next(new ErrorHandler("Please login to update your score", 401));
    }

    // check user
    const user = await authModel.findById(userId);
    if(!user) {
      return next(new ErrorHandler("User not found. Please login again", 404));
    }

    // update user score
    user.scores = scores;
    await user.save();

    res.status(200).json({ success: true, user, message: "Score updated" });
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400));
    
  }
})

// get all scores
export const getAllScores = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await authModel
      .find({}, "firstName scores _id") // Select only needed fields
      .sort({ scores: -1 })
      .limit(10);

    res.status(200).json({ success: true, users });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});



// update trivia numbers
export const updateTriviaNumbers = catchAsyncErrors(async(req:Request, res:Response, next:NextFunction) => {
  try {

    const { level, number } = req.body;
    if(!level || !number){
      return next(new ErrorHandler("Please enter level and number", 400));
    }

    // check user id
    const userId = req.user?.id;
    if(!userId){
      return next(new ErrorHandler("Please login to update trivia numbers", 401));
    }

    const user = await authModel.findById(userId);
    if(!user){
      return next(new ErrorHandler("User not found. Please login again", 404));
    }

    // check level and update fields
    if(level === "easy"){
      user.easyNumber = number;
    } else if(level === "medium"){
      user.mediumNumber = number;
    } else if(level === "hard"){
      user.hardNumber = number;
    }

    await user.save();
    res.status(200).json({ success: true, user, message: "Trivia numbers updated" });
    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400)); 
  }
})