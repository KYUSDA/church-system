"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIssue = exports.getIssue = exports.getIssues = exports.createIssue = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const issuesModel_1 = require("../Models/issuesModel");
const mail_1 = require("../utils/mail");
const authModel_1 = __importDefault(require("../Models/authModel"));
// create issues
exports.createIssue = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        if (!userId) {
            return next(new ErrorHandler_1.default("Unauthorized: User not logged in", 401));
        }
        const { title, description } = req.body;
        if (!title || !description) {
            return next(new ErrorHandler_1.default("Please provide title and description", 400));
        }
        const Issuedata = {
            user: userId,
            title,
            description
        };
        // create new issue
        const issue = await issuesModel_1.IssueModel.create(Issuedata);
        const user = await authModel_1.default.findById(userId);
        if (!user) {
            return next(new ErrorHandler_1.default(`User: ${userId} not found`, 404));
        }
        const data = {
            name: user.firstName,
            title,
            adminDashboardUrl: `${process.env.CLIENT_URL}/issues/${issue._id}`,
            email: user.email,
            description,
        };
        // send email to user
        await (0, mail_1.sendMail)({
            email: user.email,
            subject: "Issue Received",
            template: "issue.ejs",
            data,
        });
        // send email to admin
        await (0, mail_1.sendMail)({
            email: process.env.ADMIN_EMAIL,
            subject: "New Issue Created",
            template: "issue.ejs",
            data,
        });
        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: issue
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// get all issues
exports.getIssues = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const data = await issuesModel_1.IssueModel.find();
    if (!data) {
        return next(new ErrorHandler_1.default("Issues not found", 404));
    }
    res.status(200).json({ success: true, data, message: "issues found" });
});
// get one issue
exports.getIssue = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return next(new ErrorHandler_1.default("Please provide isRead parameter", 400));
    }
    const issue = await issuesModel_1.IssueModel.findById(id);
    if (!issue) {
        return next(new ErrorHandler_1.default("Issue not found", 404));
    }
    res.status(200).json(issue);
});
// update issue as read 
exports.updateIssue = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return next(new ErrorHandler_1.default("Please provide isRead parameter", 400));
    }
    // check the issue using id
    const issue = await issuesModel_1.IssueModel.findById(id);
    if (!issue) {
        return next(new ErrorHandler_1.default("Issue not found", 404));
    }
    // update field
    const response = await issuesModel_1.IssueModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
    res.status(200).json({ success: true, message: "Issue updated successfully", response });
});
