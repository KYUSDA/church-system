"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPrayerRequests = exports.createPrayerRequest = void 0;
const prayerRequestModel_1 = require("../Models/prayerRequestModel");
const mail_1 = require("../utils/mail");
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
// create prayer request
exports.createPrayerRequest = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { prayerRequest } = req.body;
        if (!prayerRequest) {
            return next(new ErrorHandler_1.default("Prayer request is required", 400));
        }
        const name = req.user?.firstName;
        const body = { prayerRequest, name };
        const newPrayerRequest = await prayerRequestModel_1.prayerModel.create(body);
        if (!newPrayerRequest) {
            return next(new ErrorHandler_1.default("Failed to create prayer request", 500));
        }
        const data = {
            name,
            prayerRequest,
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
            dashboardLink: `${process.env.CLIENT_URL}/member/submit-prayer-request`,
        };
        const PrayerDepartmentEmail = process.env.PRAYER_DEPARTMENT_EMAIL;
        // send email to prayer department
        await (0, mail_1.sendMail)({
            email: PrayerDepartmentEmail,
            subject: "New Prayer Request",
            template: "newPrayerRequest.ejs",
            data,
        });
        res.status(201).json({ status: "success", message: "Prayer request created successfully" });
    }
    catch (error) {
        console.error("❌ Error resubscribing:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// get all prayer requests
const getAllPrayerRequests = async (req, res) => {
    try {
        const prayerRequests = await prayerRequestModel_1.prayerModel.find({});
        res.status(200).json(prayerRequests);
    }
    catch (error) {
        console.error("❌ Error getting all prayer requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllPrayerRequests = getAllPrayerRequests;
