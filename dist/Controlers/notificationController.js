"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationState = exports.getAllNotifications = exports.createNotification = void 0;
const notificationModel_1 = require("../Models/notificationModel");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const authModel_1 = __importDefault(require("../Models/authModel"));
const notificationstates_1 = require("../Models/notificationstates");
// Create notification (for all users)
const createNotification = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return next(new ErrorHandler_1.default("Please provide all fields", 400));
        }
        const notification = await notificationModel_1.NotificationModel.create({ title, description });
        // Add notification to all users
        const users = await authModel_1.default.find();
        const userNotifications = users.map((user) => ({
            userId: user._id,
            notificationId: notification._id,
            isRead: false,
        }));
        await notificationstates_1.UserNotificationModel.insertMany(userNotifications);
        res.status(201).json({ success: true, notification });
    }
    catch (error) {
        console.error(error);
        return next(new ErrorHandler_1.default("Internal server error", 500));
    }
};
exports.createNotification = createNotification;
// Get all notifications for a specific user
const getAllNotifications = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return next(new ErrorHandler_1.default("User ID is required", 400));
        }
        const userNotifications = await notificationstates_1.UserNotificationModel.find({ userId })
            .populate({
            path: "notificationId",
            select: "title description createdAt"
        })
            .sort({ "notificationId.createdAt": -1 });
        const notifications = userNotifications.map((un) => {
            const notification = un.notificationId; // Cast to any to access populated fields
            return {
                id: notification._id,
                title: notification.title,
                description: notification.description,
                createdAt: notification.createdAt,
                isRead: un.isRead,
            };
        });
        const unreadCount = userNotifications.filter((un) => !un.isRead).length;
        res.status(200).json({ success: true, notifications, unreadCount });
    }
    catch (error) {
        console.error(error);
        return next(new ErrorHandler_1.default("Internal server error", 500));
    }
};
exports.getAllNotifications = getAllNotifications;
// Update notification state for a user
const updateNotificationState = async (req, res, next) => {
    try {
        const { notificationId, userId } = req.body;
        if (!notificationId || !userId) {
            return next(new ErrorHandler_1.default("Please provide all fields", 400));
        }
        const notificationState = await notificationstates_1.UserNotificationModel.findOneAndUpdate({ notificationId, userId }, { $set: { isRead: true } }, { new: true });
        if (!notificationState) {
            return next(new ErrorHandler_1.default("Notification state not found", 404));
        }
        res.status(200).json({ success: true, notificationState });
    }
    catch (error) {
        console.error(error);
        return next(new ErrorHandler_1.default("Internal server error", 500));
    }
};
exports.updateNotificationState = updateNotificationState;
