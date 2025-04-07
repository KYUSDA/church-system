import mongoose, { model } from 'mongoose';

export interface NotificationState {
    notificationId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    isRead: boolean;
}


export const UserNotificationSchema = new mongoose.Schema<NotificationState>({
    notificationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


// model
export const UserNotificationModel = model("UserNotification", UserNotificationSchema);

