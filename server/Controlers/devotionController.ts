import { devotionModel } from "../Models/devotionModel";
import {sendMail} from "../utils/mail";
import cron from "node-cron";
import fs from 'fs'
import path from "path";
// import { getDevotionalForDate } from "../utils/extractDevotional";
import { NextFunction, Request,Response } from "express";
import { fileURLToPath } from "url";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import authModel from "../Models/authModel";


// Subscribe to Devotions
export const subscribeDevotion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        if (!email) {
             res.status(400).json({ message: "Please enter your email" });
        }

        // Check if the email is already subscribed
        const existingSubscriber = await devotionModel.findOne({ email });

        if (existingSubscriber) {
             res.status(400).json({ message: "You are already subscribed to devotionals!" });
        }

        // Add email to database
        await devotionModel.create({ email, subscribed: true });

        // Send confirmation email
        await sendMail({
            email,
            subject: "Devotion Subscription",
            template: "devotion.ejs",
            data: { 
                email,
                date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
            }
        });

         res.status(200).json({ message: "Subscribed successfully" });

    } catch (error) {
        console.error("❌ Error subscribing:", error);
         res.status(500).json({ message: "Internal server error" });
    }
};



// Schedule Devotional Emails Every Day at 7:00 AM
// cron.schedule("*/2 * * * *", async () => {
//     try {
//         console.log("⏳ Running scheduled devotional email task...");

//         const subscribers = await devotionModel.find({ subscribed: true });
//         console.log(`📋 Found ${subscribers.length} subscribers.`);

//         if (subscribers.length === 0) {
//             console.log("⚠️ No subscribers found. Skipping email sending.");
//             return;
//         }

//         const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" });
//         const pdfPath = path.join(__dirname, "../devotionals/ChristTriumphant.pdf");

//         console.log("📂 Checking PDF file at:", pdfPath);
//         if (!fs.existsSync(pdfPath)) {
//             console.error("❌ PDF file not found:", pdfPath);
//             return;
//         }

//         console.log("✅ PDF file found! Extracting devotional...");
//         const devotional = await getDevotionalForDate(today, pdfPath);

//         if (devotional === "No devotional found for this date.") {
//             console.log("⚠️ No devotional found for today:", today);
//             return;
//         }

//         for (const subscriber of subscribers) {
//             console.log(`📩 Sending devotional to ${subscriber.email}...`);
//             await sendMail({
//                 email: subscriber.email,
//                 subject: `Today's Devotional - ${today}`,
//                 template: "subscribedevotion.ejs",
//                 data: {
//                     title: devotional.split("\n")[0].replace("📖 **", "").replace("**", ""),
//                     date: today,
//                     verse: devotional.split("\n")[2] || "No verse found",
//                     content: devotional.split("\n").slice(3).join("\n") || "No content available",
//                     imageUrl: "https://i.pinimg.com/736x/33/16/10/331610141886c70b54639b700b697487.jpg",
//                 },
//             });

//             console.log(`✅ Devotional email sent to ${subscriber.email}`);
//         }
//     } catch (error) {
//         console.error("❌ Error sending daily devotionals:", error);
//     }
// });


// Unsubscribe from Devotions
export const unsubscribeDevotion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        if (!email) {
             res.status(400).json({ message: "Please enter your email" });
        }

        // Check if the email is already subscribed
        const existingSubscriber = await devotionModel.findOne({ email });

        if (!existingSubscriber) {
             res.status(400).json({ message: "You are not subscribed to devotionals!" });
        }else{
        // Unsubscribe email from database
        await devotionModel.findOneAndUpdate({ email }, { subscribed: false });

        // send email
        await sendMail({
            email,
            subject: "Devotion Unsubscription",
            template: "unsubscribe.ejs",
            data: { 
                email,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
            }
        });

         res.status(200).json({ message: "Unsubscribed successfully" });
        }
    } catch (error) {
        console.error("❌ Error unsubscribing:", error);
         res.status(500).json({ message: "Internal server error" });
    }
}

// get one subsriber
export const getSubscriberByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract email from request parameters
    const email = req.params.email;

    // check if email exists
    const isEmail = await authModel.findOne({email});
    if (!isEmail) {
      return next(new ErrorHandler("Email not found", 404));
    }

    if (!email) {
      return next(new ErrorHandler("Email parameter is required", 400));
    }

    const subscriber = await devotionModel.findOne({ email });

    res.status(200).json({ subscribed: !!subscriber });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
  



// resubscribe
export const resubscribe = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        if (!email) {
             res.status(400).json({ message: "Please enter your email" });
        }

        // Check if the email is already subscribed
        const existingSubscriber = await devotionModel.findOne({ email });

        if (!existingSubscriber) {
             res.status(400).json({ message: "You are not subscribed to devotionals!" });
        }


        // Unsubscribe email from database
        await devotionModel.findOneAndUpdate({ email }, { subscribed: true });

        // send email
        await sendMail({
            email,
            subject: "Devotion Resubscription",
            template: "resubscribe.ejs",
            data: { 
                email,
                date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
            }
        });

         res.status(200).json({ message: "Resubscribed successfully" });
        
    } catch (error) {
        console.error("❌ Error resubscribing:", error);
         res.status(500).json({ message: "Internal server error" });
    }
}