import mongoose, { model } from 'mongoose'

interface TIssue {
    user: string;
    title: string;
    description: string;
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
    }
},{timestamps:true});


// model
export const IssueModel = model("Issue",issuesSchema);