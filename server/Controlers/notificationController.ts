import { NextFunction,Request,Response } from "express";
import { NotificationModel } from "../Models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";
import authModel from "../Models/authModel";
import { UserNotificationModel } from "../Models/notificationstates";



// Create notification (for all users)
export const createNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return next(new ErrorHandler("Please provide all fields", 400));
    }

    const notification = await NotificationModel.create({ title, description });

    // Add notification to all users
    const users = await authModel.find();
    const userNotifications = users.map((user) => ({
      userId: user._id,
      notificationId: notification._id,
      isRead: false,
    }));
    await UserNotificationModel.insertMany(userNotifications);

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
};

// Get all notifications for a specific user
export const getAllNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(new ErrorHandler("User ID is required", 400));
    }

    const userNotifications = await UserNotificationModel.find({ userId })
    .populate({
        path: "notificationId",
        select: "title description createdAt"
      })
      .sort({ "notificationId.createdAt": -1 });

      const notifications = userNotifications.map((un) => {
        const notification = un.notificationId as any; // Cast to any to access populated fields
        return {
          id: notification._id,
          title: notification.title,
          description: notification.description,
          createdAt: notification.createdAt,
          isRead: un.isRead,
        };
      });

      const unreadCount = userNotifications.filter((un) => !un.isRead).length;

    res.status(200).json({ success: true, notifications,unreadCount });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
};

// Update notification state for a user
export const updateNotificationState = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { notificationId, userId } = req.body;
    if (!notificationId || !userId) {
      return next(new ErrorHandler("Please provide all fields", 400));
    }

    const notificationState = await UserNotificationModel.findOneAndUpdate(
      { notificationId, userId },
      { $set: { isRead: true } },
      { new: true }
    );

    if (!notificationState) {
      return next(new ErrorHandler("Notification state not found", 404));
    }

    res.status(200).json({ success: true, notificationState });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
};