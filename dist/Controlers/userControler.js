"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpcomingBirthdays = exports.sendBirthdayWishes = exports.updateTriviaNumbers = exports.getAllScores = exports.updateScore = exports.updateUserAvatar = exports.updateUser = exports.getOne = exports.getAll = void 0;
exports.deleteUser = deleteUser;
exports.createUser = createUser;
const authModel_1 = __importDefault(require("../Models/authModel"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const authModel_2 = __importDefault(require("../Models/authModel"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const mail_1 = require("../utils/mail");
// get all members
exports.getAll = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const users = await authModel_2.default.find().select("-password"); // Exclude password for security
    if (!users) {
        return next(new ErrorHandler_1.default("No users found", 404));
    }
    res.status(200).json({
        status: "success",
        users,
        message: "All registered users retrieved successfully",
    });
});
exports.getOne = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp, next) => {
    try {
        const id = req.params.id;
        const getOneUser = await authModel_1.default.findById(id).select("-password"); // Exclude password for security
        if (!getOneUser) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        resp.status(200).json(getOneUser);
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 400));
    }
});
exports.updateUser = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, resp, next) => {
    try {
        const id = req.params.id;
        const updatedUser = await authModel_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        resp.status(200).json({
            status: "success",
            user: updatedUser,
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 400));
    }
});
async function deleteUser(req, resp) {
    try {
        const id = req.params.id;
        const deletedUser = await authModel_1.default.findByIdAndDelete(id);
        resp.status(204).json({
            status: "deleted",
            data: [],
        });
    }
    catch (err) {
        resp.status(404).json(err);
    }
}
async function createUser(req, resp) {
    try {
        const user = await authModel_1.default.create(req.body);
        resp.status(200).json(user);
    }
    catch (err) {
        resp.status(404).json(err);
    }
}
// update user avatar
exports.updateUserAvatar = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await authModel_2.default.findById(id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found. Please login again", 404));
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        // Delete old avatar from Cloudinary (if exists)
        if (user.avatar?.public_id) {
            await cloudinary_1.default.v2.uploader.destroy(user.avatar.public_id.toString());
        }
        // Upload new avatar to Cloudinary
        const myCloud = await cloudinary_1.default.v2.uploader.upload(req.file.path, {
            folder: "Avatars",
        });
        // Update user's avatar
        user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
        await user.save();
        res.status(200).json({ success: true, user, message: "User profile updated" });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// update user score
exports.updateScore = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { scores } = req.body;
        if (!scores) {
            return next(new ErrorHandler_1.default("Please enter your score", 400));
        }
        // check user  id
        const userId = req.user?.id;
        if (!userId) {
            return next(new ErrorHandler_1.default("Please login to update your score", 401));
        }
        // check user
        const user = await authModel_2.default.findById(userId);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found. Please login again", 404));
        }
        // update user score
        user.scores = scores;
        await user.save();
        res.status(200).json({ success: true, user, message: "Score updated" });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// get all scores
exports.getAllScores = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const users = await authModel_2.default
            .find({}, "firstName scores _id") // Select only needed fields
            .sort({ scores: -1 })
            .limit(10);
        res.status(200).json({ success: true, users });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// update trivia numbers
exports.updateTriviaNumbers = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { level, number } = req.body;
        if (!level || !number) {
            return next(new ErrorHandler_1.default("Please enter level and number", 400));
        }
        // check user id
        const userId = req.user?.id;
        if (!userId) {
            return next(new ErrorHandler_1.default("Please login to update trivia numbers", 401));
        }
        const user = await authModel_2.default.findById(userId);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found. Please login again", 404));
        }
        // check level and update fields
        if (level === "easy") {
            user.easyNumber = number;
        }
        else if (level === "medium") {
            user.mediumNumber = number;
        }
        else if (level === "hard") {
            user.hardNumber = number;
        }
        await user.save();
        res.status(200).json({ success: true, user, message: "Trivia numbers updated" });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.sendBirthdayWishes = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email || (Array.isArray(email) && email.length === 0)) {
            return next(new ErrorHandler_1.default("Please provide at least one email address", 400));
        }
        // check if user is admin and is logged in
        const userId = req.user?.id;
        if (!userId) {
            return next(new ErrorHandler_1.default("Please login to send birthday wishes", 401));
        }
        // Normalize to array (supports single email or multiple)
        const emails = Array.isArray(email) ? email : [email];
        const users = await authModel_2.default.find({ email: { $in: emails } });
        if (users.length === 0) {
            return next(new ErrorHandler_1.default("No users found for the provided emails", 404));
        }
        // Loop through each user and send personalized email
        for (const user of users) {
            const data = {
                name: user.firstName,
                birthday: user.birthday,
                email: user.email,
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s',
                dashboardUrl: `${process.env.FRONTEND_URL}/member/dashboard`,
            };
            await (0, mail_1.sendMail)({
                email: user.email,
                subject: "Happy Birthday! 🎉",
                template: "birthdayWishes.ejs",
                data,
            });
        }
        res.status(200).json({ success: true, message: "Birthday wishes sent successfully" });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// get all users with birthday from today to next 7 days
exports.getUpcomingBirthdays = (0, catchAsyncErrors_1.catchAsyncErrors)(async (_req, res, next) => {
    try {
        const today = new Date(); // e.g. 2025‑06‑18
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7); // e.g. 2025‑06‑25
        /*  aggregation pipeline
            1. Build `nextBirthday` = birthday with THIS year's YYYY
            2. If that day already passed, push it to next year
            3. Keep docs whose `nextBirthday` is in [today … today+7]
        */
        const users = await authModel_2.default.aggregate([
            {
                $addFields: {
                    nextBirthday: {
                        $dateFromParts: {
                            year: today.getFullYear(),
                            month: { $month: "$birthday" },
                            day: { $dayOfMonth: "$birthday" },
                        },
                    },
                },
            },
            {
                $addFields: {
                    nextBirthday: {
                        $cond: [
                            { $lt: ["$nextBirthday", today] },
                            {
                                $dateAdd: { startDate: "$nextBirthday", unit: "year", amount: 1 },
                            },
                            "$nextBirthday",
                        ],
                    },
                },
            },
            {
                $match: {
                    nextBirthday: { $gte: today, $lte: nextWeek },
                },
            },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    avatar: 1,
                    nextBirthday: 1,
                },
            },
            { $sort: { nextBirthday: 1 } },
        ]);
        // if (users.length === 0)
        //   return res
        //     .status(404)
        //     .json({ success: false, message: "No upcoming birthdays" });
        res.status(200).json({ success: true, users });
    }
    catch (err) {
        next(new ErrorHandler_1.default(err.message, 500));
    }
});
