import mongoose, { model } from 'mongoose'

interface TIssue {
    user: string;
    title: string;
    description: string;
    isRead: boolean;
}

export const issuesSchema = new mongoose.Schema<TIssue>({
    user:{
        type: String,
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    isRead:{
        type: Boolean,
        default: false
    }
},{timestamps:true});


// model
export const IssueModel = model("Issue",issuesSchema);