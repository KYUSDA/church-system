"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStreak = exports.ReadingProgress = void 0;
const mongoose_1 = require("mongoose");
// user reading progress
const readingProgressSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "member", required: true },
    bookName: { type: String, required: true },
    chapterNumber: { type: Number, required: true },
    readAt: { type: Date, default: Date.now },
}, { timestamps: true });
// Prevent duplicate rows per user-book-chapter
readingProgressSchema.index({ user: 1, bookName: 1, chapterNumber: 1 }, { unique: true });
exports.ReadingProgress = (0, mongoose_1.model)("ReadingProgress", readingProgressSchema);
const userStreakSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "member", unique: true },
    currentStreak: { type: Number, default: 0 },
    lastReadDate: { type: Date, default: null },
}, { timestamps: true });
exports.UserStreak = (0, mongoose_1.model)("UserStreak", userStreakSchema);
