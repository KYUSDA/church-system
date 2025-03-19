import { NextFunction,Request,Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { IssueModel } from "../Models/issuesModel";
import { sendMail } from "../utils/mail";
import authModel from "../Models/authModel";

interface Issue{
    user: string;
    title: string;
    description: string;
}

// create issues
export const createIssue = catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const userId = req?.user?.id;
        if (!userId) {
            return next(new ErrorHandler("Unauthorized: User not logged in", 401));
        }

        const {title, description} = req.body as Issue;

        if(!title ||!description) {
            return next(new ErrorHandler("Please provide title and description", 400));
        }

        const Issuedata = {
            user: userId,
            title,
            description
        }

        // create new issue
        const issue = await IssueModel.create(Issuedata);

        const user = await authModel.findById(userId);
        if(!user){
            return next(new ErrorHandler(`User: ${userId} not found`, 404));
        }

        const data ={
            name: user.firstName,
            title,
            adminDashboardUrl: `${process.env.CLIENT_URL}/issues/${issue._id}`,
            email: user.email,
            description,
        }

        // send email to user
        await sendMail({
            email: user.email,
            subject: "Issue Received",
            template: "issue.ejs",
            data,
        })

        // send email to admin
        await sendMail({
            email: process.env.ADMIN_EMAIL as string,
            subject: "New Issue Created",
            template: "issue.ejs",
            data,
        })

        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: issue
        });
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
    }
})