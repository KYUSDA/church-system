import { prayerModel } from "../Models/prayerRequestModel";
import { Response,Request, NextFunction } from "express";
import { sendMail } from "../utils/mail";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { nextTick } from "process";
import ErrorHandler from "../utils/ErrorHandler";

// create prayer request

export const createPrayerRequest = catchAsyncErrors(async (req:Request, res:Response,next:NextFunction) => {
  try {
    const { prayerRequest } = req.body;
    
    if(!prayerRequest){
        return next(new ErrorHandler("Prayer request is required", 400));
    }

    const name = req.user?.firstName;

    const body = { prayerRequest,name };
    const newPrayerRequest = await prayerModel.create(body);
    if(!newPrayerRequest){
        return next(new ErrorHandler("Failed to create prayer request", 500));
    }

   

    const data = {
        name,
        prayerRequest,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
        dashboardLink: `${process.env.CLIENT_URL}/member/submit-prayer-request`,
    }

    const PrayerDepartmentEmail = process.env.PRAYER_DEPARTMENT_EMAIL as string;
    // send email to prayer department
    await sendMail({
        email: PrayerDepartmentEmail,
        subject: "New Prayer Request",
        template: "newPrayerRequest.ejs",
        data,
    })

    res.status(201).json({ status: "success", message: "Prayer request created successfully" });
  
  } catch (error) {
    console.error("❌ Error resubscribing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all prayer requests
export const getAllPrayerRequests = async (req:Request, res:Response) => {
  try {
    const prayerRequests = await prayerModel.find({});
    res.status(200).json(prayerRequests);
  } catch (error) {
    console.error("❌ Error getting all prayer requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};