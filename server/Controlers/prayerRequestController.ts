import { prayerModel } from "../Models/prayerRequestModel";
import { Response,Request } from "express";
import { sendMail } from "../utils/mail";

// create prayer request

export const createPrayerRequest = async (req:Request, res:Response): Promise<void> => {
  try {
    const { name, prayerRequest } = req.body;
    
    if(!prayerRequest || !name){
        res.status(400).json({ message: "Prayer request is required" });
    }else{

    const body = { name, prayerRequest };
    const newPrayerRequest = new prayerModel(body);
    await newPrayerRequest.save();

    const data = {
        name,
        prayerRequest,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtQVCYDri-bQmVrsKUsdNFYFBfL9dVZG8Cw&s",
        dashboardLink: `${process.env.CLIENT_URL}/dashboard/prayer-requests`,
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
  }
  } catch (error) {
    console.error("❌ Error resubscribing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all prayer requests
export const getAllPrayerRequests = async (req:Request, res:Response) => {
  try {
    const prayerRequests = await prayerModel.find({});
    res.status(200).json({ prayerRequests });
  } catch (error) {
    console.error("❌ Error getting all prayer requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};