import Member from "../Models/authModel";
import { Request, Response } from "express";
import cloudinary from "cloudinary";
import authModel from "../Models/authModel";
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
export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body;
    const { id } = req.params; // Get user ID from params

    const user = await authModel.findById(id);
    if (!user) {
     res.status(404).json({ success: false, message: "User not found. Please login again" });
    }

    if (avatar && user) {
      // Delete the old avatar from Cloudinary (if exists)
      if (user.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id.toString());
      }

      // Upload new avatar to Cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(avatar, { folder: "Avatars" });

      // Update user's avatar data
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      await user.save();
    }

    res.status(200).json({ success: true, user, message: "User profile updated" });
  } catch (err) {
    console.error(err);
   res.status(500).json({ success: false, messsage:"Internal Server Error" });
  }
};
