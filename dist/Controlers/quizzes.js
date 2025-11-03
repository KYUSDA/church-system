"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserResults = exports.sendQuizResults = exports.getQuizzes = exports.getAvailableQuiz = exports.getAllQuizzes = exports.getQuiz = exports.createQuiz = void 0;
require("dotenv/config");
const mail_1 = require("../utils/mail");
const authModel_1 = __importDefault(require("../Models/authModel"));
const quizModel_1 = __importDefault(require("../Models/quizModel"));
const ResultsModel_1 = require("../Models/ResultsModel");
const cloudinary_1 = __importDefault(require("cloudinary"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const userQuizModel_1 = require("../Models/userQuizModel");
const createQuiz = async (req, res, next) => {
    try {
        let { title, image, description, questions, week, completed } = req.body;
        // Basic validation
        if (!title || !description || !questions || !week || !image) {
            return next(new ErrorHandler_1.default("Title is required and must be a string.", 400));
        }
        // upload image to cloudinary
        if (image) {
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, { folder: "quizzes", resource_type: "auto" });
            // Update  quiz image
            image = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
            console.log("image uploaded to cloudinary");
        }
        // Prepare data for Sanity
        const quizData = {
            title,
            image,
            description,
            questions,
            week,
            completed: completed || false
        };
        // Save to db
        const result = await quizModel_1.default.create(quizData);
        // Get user emails
        const userEmails = await authModel_1.default.find({ role: "member" }).select("email");
        const emailList = userEmails.map((user) => user.email);
        const data = {
            title,
            imageUrl: image.url || "https://i.pinimg.com/736x/33/16/10/331610141886c70b54639b700b697487.jpg",
            dashboardUrl: `${process.env.CLIENT_URL}/member/dashboard/defend-your-faith`,
        };
        // Send email to users (handle multiple recipients)
        for (const email of emailList) {
            await (0, mail_1.sendMail)({
                email,
                subject: "New Quiz Created",
                template: "newQuiz.ejs",
                data,
            });
        }
        res.status(201).json({ message: "Quiz created successfully", data: result });
    }
    catch (error) {
        console.error("Error creating quiz:", error);
        return next(new ErrorHandler_1.default("Internal Server Error", 500));
    }
};
exports.createQuiz = createQuiz;
// get one quizzes using id
exports.getQuiz = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return next(new ErrorHandler_1.default("Id is required", 400));
        }
        const quiz = await quizModel_1.default.findById(id);
        if (!quiz) {
            return next(new ErrorHandler_1.default("Quiz not found", 404));
        }
        res.status(200).json({ data: quiz });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
const getAllQuizzes = async (req, res, next) => {
    try {
        // Fetch all quizzes from the database
        const quizzes = await quizModel_1.default.find();
        res.status(200).json({ quizzes });
    }
    catch (error) {
        return next(new ErrorHandler_1.default("Error fetching quizzes", 500));
    }
};
exports.getAllQuizzes = getAllQuizzes;
const getAvailableQuiz = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return next(new ErrorHandler_1.default("Unauthorized: User not logged in", 401));
        }
        // Fetch the latest active quiz
        const quiz = await quizModel_1.default.findOne({ completed: false });
        if (!quiz) {
            return next(new ErrorHandler_1.default("No active quiz available.", 404));
        }
        // Check if user has completed this quiz
        const userProgress = await userQuizModel_1.userQuizProgressModel.findOne({
            user: userId,
            quizId: quiz._id,
            completed: true,
        });
        if (userProgress) {
            return next(new ErrorHandler_1.default("Quiz already completed", 200));
        }
        // Return the quiz if the user hasn't completed it
        res.status(200).json({ quiz });
    }
    catch (error) {
        return next(new ErrorHandler_1.default("Error fetching quizzes", 500));
    }
};
exports.getAvailableQuiz = getAvailableQuiz;
// return quizzes
const getQuizzes = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return next(new ErrorHandler_1.default("Unauthorized: User not logged in", 401));
        }
        // Get all quizzes
        const quizzes = await quizModel_1.default.find();
        // Get quizzes user has completed
        const completedQuizzes = await userQuizModel_1.userQuizProgressModel.find({ user: userId }).select("quiz");
        // Filter out completed quizzes
        const completedQuizIds = completedQuizzes.map((q) => q.quiz.toString());
        const availableQuizzes = quizzes.filter(q => !completedQuizIds.includes(q._id.toString()));
        res.status(200).json({ quizzes: availableQuizzes });
    }
    catch (error) {
        return next(new ErrorHandler_1.default("Error fetching quizzes", 500));
    }
};
exports.getQuizzes = getQuizzes;
// send results to user
exports.sendQuizResults = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const { quizId, correctAnswers, userAnswers } = req.body;
        // Check if user is logged in
        const userId = req.user?.id;
        if (!userId) {
            return next(new ErrorHandler_1.default("Unauthorized: User not logged in", 401));
        }
        const user = await authModel_1.default.findById(userId).select("-password");
        if (!user) {
            return next(new ErrorHandler_1.default(`User: ${userId} not found`, 404));
        }
        // Fetch quiz details
        const quiz = await quizModel_1.default.findById(quizId);
        if (!quiz) {
            return next(new ErrorHandler_1.default("Quiz not found", 404));
        }
        // Calculate score
        let correctCount = 0;
        correctAnswers.forEach((answer, index) => {
            if (answer === userAnswers[index])
                correctCount++;
        });
        const totalQuestions = correctAnswers.length;
        const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
        // Save results to DB
        const result = await ResultsModel_1.quizResultModel.create({
            user: userId,
            quiz: quizId,
            correctAnswers,
            userAnswers,
            scorePercentage,
            correctCount,
            totalQuestions,
            createdAt: new Date(),
        });
        // Save user quiz progress
        await userQuizModel_1.userQuizProgressModel.findOneAndUpdate({ user: userId, quiz: quizId }, { completed: true }, { upsert: true, new: true } // Create if not exists
        );
        // Prepare email data
        const emailData = {
            quizTitle: quiz?.title,
            correctCount,
            totalQuestions,
            scorePercentage,
            userAnswers,
            correctAnswers,
            questions: quiz?.questions,
            reviewLink: `${process.env.CLIENT_URL}/quiz-results/${result._id}`,
        };
        // Send email with results
        if (user) {
            await (0, mail_1.sendMail)({
                email: user.email,
                subject: "Your Quiz Results",
                template: "quizResults.ejs",
                data: emailData,
            });
        }
        res.status(200).json({ message: "Quiz results saved and emailed successfully", data: result });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// get results
exports.getUserResults = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return next(new ErrorHandler_1.default("User not authenticated", 401));
        }
        const results = await ResultsModel_1.quizResultModel.find({ user: userId })
            .populate({
            path: "quiz",
            select: "title description week" // Fetch only quiz title & description
        })
            .select("scorePercentage quiz"); // Select necessary fields
        if (!results.length) {
            return next(new ErrorHandler_1.default("No results found for this user", 404));
        }
        res.status(200).json({
            message: "User results found",
            results
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
