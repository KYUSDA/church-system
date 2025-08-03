// models/resourceModel.ts 
import mongoose, { Schema, Document } from "mongoose";

export interface IResource extends Document {
  title: string;
  description?: string;
  url: string;
  public_id: string; // Cloudinary public ID for deleting
  thumbnail?: {
    url: string;
    public_id: string;
  };
  type: "song" | "book" | "lesson" | "discoverguide";
  folder: string; // e.g., songs, books...
  fileSize: number; // in bytes
  timeToRead?: string; // e.g., "5 mins"
  uploadedAt: Date;
}

const resourceSchema: Schema<IResource> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    url: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },

    thumbnail: {
      url: { type: String },
      public_id: { type: String },
    },

    type: {
      type: String,
      enum: ["song", "book", "lesson", "discoverguide"],
      required: true,
    },

    folder: {
      type: String,
      required: true,
      enum: ["songs", "books", "lessons", "discoverguides"],
    },

    fileSize: {
      type: Number,
      required: true,
    },

    timeToRead: {
      type: String, // optional e.g. "10 mins"
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const resourceModel = mongoose.model<IResource>("Resource", resourceSchema);
