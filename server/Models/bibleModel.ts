import { Schema, model, Types } from "mongoose";

interface IReadingProgress {
  user: Types.ObjectId; // ref to authModel
  bookName: string;
  chapterNumber: number;
  readAt: Date;
}

// user reading progress
const readingProgressSchema = new Schema<IReadingProgress>(
  {
    user: { type: Schema.Types.ObjectId, ref: "member", required: true },
    bookName: { type: String, required: true },
    chapterNumber: { type: Number, required: true },
    readAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent duplicate rows per user-book-chapter
readingProgressSchema.index(
  { user: 1, bookName: 1, chapterNumber: 1 },
  { unique: true }
);

export const ReadingProgress = model<IReadingProgress>(
  "ReadingProgress",
  readingProgressSchema
);


// user streak
interface IUserStreak {
  user: Types.ObjectId;     // ref to authModel
  currentStreak: number;
  lastReadDate: Date | null;
}

const userStreakSchema = new Schema<IUserStreak>(
  {
    user:         { type: Schema.Types.ObjectId, ref: "member", unique: true },
    currentStreak:{ type: Number, default: 0 },
    lastReadDate: { type: Date, default: null },
  },
  { timestamps: true }
);

export const UserStreak = model<IUserStreak>("UserStreak", userStreakSchema);
