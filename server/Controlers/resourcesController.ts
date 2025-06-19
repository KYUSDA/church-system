// controllers/resourceController.ts
import { Request, Response } from "express";
import cloudinary from "cloudinary";
import { resourceModel } from "../Models/resourceModel";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: {
    thumbnail?: Express.Multer.File[];
  };
}

export const uploadResource =catchAsyncErrors(async (req: MulterRequest, res: Response) => {
  try {
    const { title, description, type, timeToRead } = req.body;
    const file = req.file; // main file
    const thumbFile = req.files?.thumbnail?.[0]; // optional thumbnail

    if (!file || !title || !type)
      return res
        .status(400)
        .json({ message: "title, type and file are required" });

    const folder = `resources/${type}s`; // songs, books, lessons…

    /* ---- 1. Upload main file ---- */
    const uploadedFile = await cloudinary.v2.uploader.upload(file.path, {
      resource_type: "auto",
      folder,
    });

    /* ---- 2. Optional thumbnail ---- */
    let thumbnail;
    if (thumbFile) {
      const uploadedThumb = await cloudinary.v2.uploader.upload(thumbFile.path, {
        resource_type: "image",
        folder: `${folder}/thumbnails`,
      });
      thumbnail = {
        url: uploadedThumb.secure_url,
        public_id: uploadedThumb.public_id,
      };
    }

    /* ---- 3. Save to MongoDB ---- */
    const newResource = await resourceModel.create({
      title,
      description,
      url: uploadedFile.secure_url,
      public_id: uploadedFile.public_id,
      type,
      folder: `${type}s`,
      fileSize: uploadedFile.bytes,
      timeToRead,
      thumbnail,
    });

    return res
      .status(201)
      .json({ message: "Resource uploaded successfully", data: newResource });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



export const getResourcesByType = catchAsyncErrors (async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    if (!type || typeof type !== "string") {
      return res.status(400).json({ message: "Type query is required." });
    }

    const resources = await resourceModel.find({ type }).sort({ createdAt: -1 });

    return res.status(200).json({ data: resources });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

