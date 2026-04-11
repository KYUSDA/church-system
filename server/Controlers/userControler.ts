import { NextFunction, Request, Response } from "express";
import authModel from "../Models/authModel";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
// import { getCache, setCache } from "../utils/redis";

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
      data: users,
      message: "All registered users with profiles retrieved successfully",
    });
  },
);

// get one member wih profile
export const getOne = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authModel.findById(req.params.id).select("-password");
    // .populate({
    //   path: "profile",
    //   model: "Profile",
    // });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      status: "success",
      user,
    });
  },
);

let cachedVerse = null;
let lastFetchedDate = null;

// verse of the day
export const verseOfTheDay = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const API_URL = "https://holybible.dev/api/votd";
    const API_KEY = process.env.HOLYBIBLE_API_KEY;

    const today = new Date().toISOString().split("T")[0];
    const cacheKey = `votd:${today}`;

    if (cachedVerse && lastFetchedDate === today) {
      return res.json(cachedVerse);
    }

    // ✅ 1. Check Redis first
    // const cachedVerse = await getCache(cacheKey);

    // if (cachedVerse) {
    //   return res.status(200).json({
    //     status: "success",
    //     verse: cachedVerse,
    //     cached: true,
    //   });
    // }

    // ✅ 2. Fetch from HolyBible
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      return next(new ErrorHandler("Failed to fetch verse of the day", 500));
    }

    const data = await response.json();

    console.log("Fetched VOTD from API:", data);

    const verse = {
      text: data.text,
      reference: data.reference,
    };

    cachedVerse = verse;
    lastFetchedDate = today;

    // ✅ 3. Store in Redis for 24 hours
    // await setCache(cacheKey, verse, 86400);

    res.status(200).json({
      status: "success",
      verse,
      cached: false,
    });
  },
);
