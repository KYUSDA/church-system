import { Request, Response, NextFunction } from "express";
import { ReadingProgress } from "../Models/bibleModel";
import { UserStreak } from "../Models/bibleModel";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";

// get reading progress
export const getReadingProgress =catchAsyncErrors( async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }
    const userId = user.id;
    const progress = await ReadingProgress.find({ userId })
      .select("bookName chapterNumber -_id")
      .lean();

    res.json({ success: true, data: progress });
  } catch (err) {
    next(err);
  }
});


// // toggle chapter read status
export const toggleChapter = catchAsyncErrors (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookName, chapterNumber } = req.body;
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }
    const userId = user.id;

    if (!bookName || chapterNumber == null) {
      return next(new ErrorHandler("bookName and chapterNumber required", 400));
    }

    const existing = await ReadingProgress.findOne({
      user: userId,
      bookName,
      chapterNumber,
    });

    let toggledToRead = false;

    if (existing) {
      // remove
      await existing.deleteOne();
    } else {
      // add
      await ReadingProgress.create({
        user:userId,
        bookName,
        chapterNumber,
      });
      toggledToRead = true;
    }

    res.json({ success: true, toggledToRead });
  } catch (err:any) {
    if (err.code === 11000)
      return res.json({ success: true, toggledToRead: true });
    next(err);
  }
});



// get userstreak
export const getUserStreak = catchAsyncErrors( async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }
    const userId = user.id;
    const streak = await UserStreak.findOne({ userId }).lean();
    res.json({ success: true, data: streak });
  } catch (err) {
    next(err);
  }
});


// update user streak
export const upsertUserStreak = catchAsyncErrors( async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentStreak, lastReadDate } = req.body;
    const user = req.user;
    if (!user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }
    const userId = user.id;

    const streak = await UserStreak.findOneAndUpdate(
      { user: userId },
      {
        currentStreak,
        lastReadDate,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    res.json({ success: true, data: streak });
  } catch (err) {
    next(err);
  }
});
