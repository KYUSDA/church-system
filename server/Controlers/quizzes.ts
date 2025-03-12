
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


export const createQuiz = async (req: Request, res: Response) : Promise<void> => {
    try {
        let { title, image, description, questions, week, completed } = req.body;

        // Basic validation
        if (!title || !description || !questions || !week || !image ) {
             res.status(400).json({ error: "Title is required and must be a string." });
        }else{
       
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
        const redisData = await redis.set("quizzes", JSON.stringify(result));
        if (!redisData) {
            console.error("Error setting quiz data on Redis");
        }

         res.status(201).json({ message: "Quiz created successfully", data: result });
    }
    } catch (error) {
        console.error("Error creating quiz:", error);
         res.status(500).json({ error: "Internal Server Error" });
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


// return  quizzes
export const getCompletedQuizzes = async (req: Request, res: Response) : Promise<void> => {
    try {
        const quizzes = await quizModel.find();
         res.status(200).json({ data: quizzes });
    } catch (error) {
        console.error("Error fetching completed quizzes:", error);
         res.status(500).json({ error: "Internal Server Error" });
    }
};


// send results to user
export const sendQuizResults =catchAsyncErrors(async (req: Request, res: Response , next:NextFunction) => {
    try {
        const { quizId, correctAnswers, userAnswers } = req.body;

        // Check if user is logged in
        const userId = req?.user?._id;

        if (!userId) {
            return next(new ErrorHandler("Unauthorized: User not logged in",401));
        }

        const user = await authModel.findById(userId).select("email");

        if (!user) {
             return next(new ErrorHandler("User not found",404));
        }

        // Fetch quiz details (Assuming a Quiz model exists)
        const quiz = await quizModel.findById(quizId);
        if (!quiz) {
            return next(new ErrorHandler("Quiz not found",404 ));
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
        if(user)
        await sendMail({
            email: user.email,
            subject: "Your Quiz Results",
            template: "quizResults.ejs",
            data: emailData,
        });

        // update complete to true
        await quizModel.findByIdAndUpdate(quizId, { completed: true });

    res.status(200).json({ message: "Quiz results saved and emailed successfully", data: result });
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400)); 
    }
});
