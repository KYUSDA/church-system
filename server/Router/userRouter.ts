import { Router } from "express";
import {
  getAll,
  getOne,
} from "../Controlers/userControler";
import requireAuth, { authorizeRoles } from "../middleware/authmiddleware";
import { createIssue, getIssue, getIssues, updateIssue } from "../Controlers/issueController";
import { ALL } from "../Models/authModel";
import { getReadingProgress, getUserStreak, toggleChapter, upsertUserStreak } from "../Controlers/bibleController";

const userRouter = Router();


userRouter.route("/get-user/:id").get(getOne);
userRouter.route("/getUsers").get(requireAuth,authorizeRoles(...ALL),getAll);

// issues
userRouter.post("/report-issue", requireAuth, createIssue);
userRouter.get("/get-issue/:id",getIssue);
userRouter.get("/get-issues",getIssues);
userRouter.patch("/update-issue/:id",updateIssue);

// bible
/* Reading progress */
userRouter.get("/progress", requireAuth, getReadingProgress);
userRouter.post("/toggle", requireAuth, toggleChapter);

/* Streak */
userRouter.get("/streak", requireAuth, getUserStreak);
userRouter.patch("/streak", requireAuth, upsertUserStreak);

export default userRouter;
