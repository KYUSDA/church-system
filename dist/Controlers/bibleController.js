"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertUserStreak = exports.getUserStreak = exports.toggleChapter = exports.getReadingProgress = void 0;
const bibleModel_1 = require("../Models/bibleModel");
const bibleModel_2 = require("../Models/bibleModel");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
// get reading progress
exports.getReadingProgress = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new ErrorHandler_1.default("User not authenticated", 401));
        }
        const userId = user.id;
        const progress = await bibleModel_1.ReadingProgress.find({ userId })
            .select("bookName chapterNumber -_id")
            .lean();
        res.json({ success: true, data: progress });
    }
    catch (err) {
        next(err);
    }
});
// // toggle chapter read status
exports.toggleChapter = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { bookName, chapterNumber } = req.body;
        const user = req.user;
        if (!user) {
            return next(new ErrorHandler_1.default("User not authenticated", 401));
        }
        const userId = user.id;
        if (!bookName || chapterNumber == null) {
            return next(new ErrorHandler_1.default("bookName and chapterNumber required", 400));
        }
        const existing = await bibleModel_1.ReadingProgress.findOne({
            user: userId,
            bookName,
            chapterNumber,
        });
        let toggledToRead = false;
        if (existing) {
            // remove
            await existing.deleteOne();
        }
        else {
            // add
            await bibleModel_1.ReadingProgress.create({
                user: userId,
                bookName,
                chapterNumber,
            });
            toggledToRead = true;
        }
        res.json({ success: true, toggledToRead });
    }
    catch (err) {
        if (err.code === 11000)
            return res.json({ success: true, toggledToRead: true });
        next(err);
    }
});
// get userstreak
exports.getUserStreak = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new ErrorHandler_1.default("User not authenticated", 401));
        }
        const userId = user.id;
        const streak = await bibleModel_2.UserStreak.findOne({ userId }).lean();
        res.json({ success: true, data: streak });
    }
    catch (err) {
        next(err);
    }
});
// update user streak
exports.upsertUserStreak = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { currentStreak, lastReadDate } = req.body;
        const user = req.user;
        if (!user) {
            return next(new ErrorHandler_1.default("User not authenticated", 401));
        }
        const userId = user.id;
        const streak = await bibleModel_2.UserStreak.findOneAndUpdate({ user: userId }, {
            currentStreak,
            lastReadDate,
        }, { upsert: true, new: true, setDefaultsOnInsert: true }).lean();
        res.json({ success: true, data: streak });
    }
    catch (err) {
        next(err);
    }
});
