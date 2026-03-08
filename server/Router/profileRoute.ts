import { Router } from "express";

export const profileRouter = Router();

import {
  createProfile,
  updateProfile,
  sendBirthdayWishes,
    getUpcomingBirthdays,
  updateAvatar,
  getProfile,
} from "../Controlers/profileController";
import requireAuth from "../middleware/authmiddleware";

// Routes
profileRouter.post("/create", requireAuth , createProfile);
profileRouter.get("/me", requireAuth, getProfile);
profileRouter.put("/update/:id", requireAuth, updateProfile);
profileRouter.put("/update-avatar", requireAuth, updateAvatar);
profileRouter.get("/upcoming-birthdays", getUpcomingBirthdays);

// Export the function to start the cron job
export const startBirthdayCron = () => {
  sendBirthdayWishes();
};
