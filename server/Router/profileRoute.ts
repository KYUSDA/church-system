import { Router } from "express";

export const profileRouter = Router();

import {
  createProfile,
  updateProfile,
  sendBirthdayWishes,
    getUpcomingBirthdays,
  updateAvatar,
} from "../Controlers/profileController";

// Routes
profileRouter.post("/create", createProfile);
profileRouter.put("/update/:id", updateProfile);
profileRouter.put("/update-avatar", updateAvatar);
profileRouter.get("/upcoming-birthdays", getUpcomingBirthdays);

// Export the function to start the cron job
export const startBirthdayCron = () => {
  sendBirthdayWishes();
};
