import { Router } from "express";
import {
  getAll,
  createUser,
  getOne,
  updateUser,
  deleteUser,
  updateUserAvatar,
  updateScore,
  getAllScores,
  updateTriviaNumbers,
  sendBirthdayWishes,
  getUpcomingBirthdays,
} from "../Controlers/userControler";
import requireAuth, { authorizeRoles } from "../middleware/authmiddleware";
import { createIssue, getIssue, getIssues, updateIssue } from "../Controlers/issueController";
import multer from "multer";
import { ALL, UserRole } from "../Models/authModel";
import { getReadingProgress, getUserStreak, toggleChapter, upsertUserStreak } from "../Controlers/bibleController";
const upload = multer({ dest: "uploads/" });

const userRouter = Router();


userRouter.route("/get-user/:id").get(getOne);
userRouter.route("/getUsers").get(requireAuth,authorizeRoles(...ALL),getAll);
userRouter.patch("/update-user/:id", requireAuth,authorizeRoles(UserRole.SUPERADMIN) , updateUser);
userRouter.route("/createUser").post(requireAuth, authorizeRoles(UserRole.SUPERADMIN),createUser);
userRouter.put("/update-avatar/:id",upload.single("avatar"),updateUserAvatar);
userRouter.put("/update-scores",requireAuth, updateScore);
userRouter.put("/update-trivias",requireAuth,updateTriviaNumbers);
userRouter.delete(
  "/delete-user/:id",
  requireAuth,
  authorizeRoles(UserRole.SUPERADMIN),
  deleteUser
);
userRouter.post(
  "/celebrate-birthday",
  requireAuth,
  authorizeRoles(UserRole.SUPERADMIN, UserRole.ADMIN),
  sendBirthdayWishes
);
userRouter.get("/birthdays", getUpcomingBirthdays);

// issues
userRouter.post("/report-issue", requireAuth, createIssue);
userRouter.get("/get-issue/:id",getIssue);
userRouter.get("/get-issues",getIssues);
userRouter.patch("/update-issue/:id",updateIssue);

// scores
userRouter.get("/get-scores",getAllScores);

// bible
/* Reading progress */
userRouter.get("/progress", requireAuth, getReadingProgress);
userRouter.post("/toggle", requireAuth, toggleChapter);

/* Streak */
userRouter.get("/streak", requireAuth, getUserStreak);
userRouter.patch("/streak", requireAuth, upsertUserStreak);

export default userRouter;
