"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourcesByType = exports.uploadResource = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const resourceModel_1 = require("../Models/resourceModel");
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
exports.uploadResource = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res) => {
    try {
        const { title, description, type, timeToRead } = req.body;
        const file = req.files?.file?.[0];
        const thumbFile = req.files?.thumbnail?.[0];
        console.log(file, title, type);
        if (!file || !title || !type)
            return res
                .status(400)
                .json({ message: "title, type and file are required" });
        const folder = `resources/${type}s`; // songs, books, lessons…
        /* ---- 1. Upload main file ---- */
        const uploadedFile = await cloudinary_1.default.v2.uploader.upload(file.path, {
            resource_type: "auto",
            folder,
        });
        /* ---- 2. Optional thumbnail ---- */
        let thumbnail;
        if (thumbFile) {
            const uploadedThumb = await cloudinary_1.default.v2.uploader.upload(thumbFile.path, {
                resource_type: "image",
                folder: `${folder}/thumbnails`,
            });
            thumbnail = {
                url: uploadedThumb.secure_url,
                public_id: uploadedThumb.public_id,
            };
        }
        /* ---- 3. Save to MongoDB ---- */
        const newResource = await resourceModel_1.resourceModel.create({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});
exports.getResourcesByType = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res) => {
    try {
        const { type } = req.query;
        if (!type || typeof type !== "string") {
            return res.status(400).json({ message: "Type query is required." });
        }
        const resources = await resourceModel_1.resourceModel.find({ type }).sort({ createdAt: -1 });
        return res.status(200).json({ data: resources });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});
