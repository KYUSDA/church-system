
import { NextFunction, Request,Response } from "express";
import 'dotenv/config'
import { sendMail } from "../utils/mail";
import authModel from "../Models/authModel";
import { redis } from "../utils/redis";
import quizModel from "../Models/quizModel";
import { quizResultModel } from "../Models/ResultsModel";
import cloudinary from "cloudinary";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { userQuizProgressModel } from "../Models/userQuizModel";


export const createQuiz = async (req: Request, res: Response, next: NextFunction)  => {
    try {
        let { title, image, description, questions, week, completed } = req.body;

        // Basic validation
        if (!title || !description || !questions || !week || !image ) {
             return next(new ErrorHandler("Title is required and must be a string.",400));
        }
       
        // upload image to cloudinary
        if(image){
             const myCloud = await cloudinary.v2.uploader.upload(image, { folder: "quizzes", resource_type: "auto"  });
            
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
        const result = await quizModel.create(quizData);

        // Get user emails
        const userEmails = await authModel.find({ role: "member" }).select("email");
        const emailList = userEmails.map((user: { email: string }) => user.email);

        const data = {
            title,
            imageUrl: image.url || "https://i.pinimg.com/736x/33/16/10/331610141886c70b54639b700b697487.jpg", 
            dashboardUrl: `${process.env.CLIENT_URL}/member/dashboard/defend-your-faith`,
        };

        // Send email to users (handle multiple recipients)
        for (const email of emailList) {
            await sendMail({
                email,
                subject: "New Quiz Created",
                template: "newQuiz.ejs",
                data,
            });
        }

        // set on redis
        const redisData = await redis.set(result._id.toString(), JSON.stringify(result));
        if (!redisData) {
            return next(new ErrorHandler("Error setting quiz data on Redis",400));
        }

         res.status(201).json({ message: "Quiz created successfully", data: result });
    
    } catch (error) {
        console.error("Error creating quiz:", error);
        return next(new ErrorHandler("Internal Server Error",500));
    }
};

// get one quizzes using id
export const getQuiz = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    const id = req.params.id;

    if (!id) {
        return next(new ErrorHandler("Id is required", 400));
    }

    const quiz = await quizModel.findById(id);

    if (!quiz) {
        return next(new ErrorHandler("Quiz not found", 404));
    }

    res.status(200).json({ data: quiz });
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));   
    }
});



// return quizzes
export const getQuizzes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req?.user?.id;
        if (!userId) {
            return next(new ErrorHandler("Unauthorized: User not logged in", 401));
        }

        // Get all quizzes
        const quizzes = await quizModel.find();

        // Get quizzes user has completed
        const completedQuizzes = await userQuizProgressModel.find({ user: userId }).select("quiz");

        // Filter out completed quizzes
        const completedQuizIds = completedQuizzes.map((q) => q.quiz.toString());
        const availableQuizzes = quizzes.filter(q => !completedQuizIds.includes(q._id.toString()));

        res.status(200).json({ quizzes: availableQuizzes });
    } catch (error) {
        return next(new ErrorHandler("Error fetching quizzes", 500));
    }
};



// send results to user
export const sendQuizResults = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { quizId, correctAnswers, userAnswers } = req.body;

        // Check if user is logged in
        const userId = req?.user?.id;
        if (!userId) {
            return next(new ErrorHandler("Unauthorized: User not logged in", 401));
        }

        const user = await authModel.findById(userId).select("-password");

        if (!user) {
            return next(new ErrorHandler(`User: ${userId} not found`, 404));
        }

        // Fetch quiz details
        const quiz = await quizModel.findById(quizId);
        if (!quiz) {
            return next(new ErrorHandler("Quiz not found", 404));
        }

        // Calculate score
        let correctCount = 0;
        correctAnswers.forEach((answer: string, index: number) => {
            if (answer === userAnswers[index]) correctCount++;
        });

        const totalQuestions = correctAnswers.length;
        const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

        // Save results to DB
        const result = await quizResultModel.create({
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
        await userQuizProgressModel.findOneAndUpdate(
            { user: userId, quiz: quizId }, 
            { completed: true },
            { upsert: true, new: true } // Create if not exists
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
            await sendMail({
                email: user.email,
                subject: "Your Quiz Results",
                template: "quizResults.ejs",
                data: emailData,
            });
        }

        res.status(200).json({ message: "Quiz results saved and emailed successfully", data: result });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});



// send results to user
// export const sendQuizResults =catchAsyncErrors(async (req: Request, res: Response , next:NextFunction) => {
//     try {
//         const { quizId, correctAnswers, userAnswers } = req.body;

//        // Check if user is logged in
//        const userId = req?.user?.id;
//        if (!userId) {
//            return next(new ErrorHandler("Unauthorized: User not logged in", 401));
//        }

//        const user = await authModel.findById(userId).select("-password");
  
//        if (!user) {
//          return next(new ErrorHandler(`user: ${userId} not found`, 404));
//        }

//         // Fetch quiz details (Assuming a Quiz model exists)
//         const quiz = await quizModel.findById(quizId);
//         if (!quiz) {
//             return next(new ErrorHandler("Quiz not found",404 ));
//         }

//         // Calculate score
//         let correctCount = 0;
//         correctAnswers.forEach((answer: string, index: number) => {
//             if (answer === userAnswers[index]) correctCount++;
//         });

//         const totalQuestions = correctAnswers.length;
//         const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

//         // Save results to DB
//         const result = await quizResultModel.create({
//             user: userId,
//             quiz: quizId,
//             correctAnswers,
//             userAnswers,
//             scorePercentage,
//             correctCount,
//             totalQuestions,
//             createdAt: new Date(),
//         });

//         // Prepare email data
//         const emailData = {
//             quizTitle: quiz?.title,
//             correctCount,
//             totalQuestions,
//             scorePercentage,
//             userAnswers,
//             correctAnswers,
//             questions: quiz?.questions,
//             reviewLink: `${process.env.CLIENT_URL}/quiz-results/${result._id}`,
//         };

//         // Send email with results
//         if(user)
//         await sendMail({
//             email: user.email,
//             subject: "Your Quiz Results",
//             template: "quizResults.ejs",
//             data: emailData,
//         });

//         // update complete to true
//         await quizModel.findByIdAndUpdate(quizId, { completed: true });

//     res.status(200).json({ message: "Quiz results saved and emailed successfully", data: result });
//     } catch (error:any) {
//         return next(new ErrorHandler(error.message, 400)); 
//     }
// });


// get results
export const getUserResults = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user?.id; 

        if (!userId) {
            return next(new ErrorHandler("User not authenticated", 401));
        }

        const results = await quizResultModel.find({ user: userId })
            .populate({
                path: "quiz",
                select: "title description week" // Fetch only quiz title & description
            })
            .select("scorePercentage quiz"); // Select necessary fields

        if (!results.length) {
            return next(new ErrorHandler("No results found for this user", 404));
        }

        res.status(200).json({
            message: "User results found",
            results
        });
        
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

