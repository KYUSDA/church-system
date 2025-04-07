import mongoose from 'mongoose'


interface notification {
    title: string;
    decription: string;
    
}

export const notifySchema = new mongoose.Schema<notification>({
    title: {
        type: String,
        required: true,
    },
    decription: {
        type: String,
        required: true,
    }

},{timestamps: true})


// model
export const NotificationModel = mongoose.model<notification>('Notification', notifySchema)
