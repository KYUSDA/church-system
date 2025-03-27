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
} from "../Controlers/userControler";
import requireAuth from "../middleware/authmiddleware";
import { createIssue, getIssue, getIssues, updateIssue } from "../Controlers/issueController";
const userRouter = Router();
userRouter.route("/getUsers").get(getAll);
userRouter.patch("/update-user/:id",updateUser);
userRouter.route("/createUser").post(createUser);
userRouter.put("/update-avatar/:id",updateUserAvatar);
userRouter.put("/update-scores",requireAuth, updateScore);
userRouter.put("/update-trivias",requireAuth,updateTriviaNumbers);

// issues
userRouter.post("/report-issue", requireAuth, createIssue);
userRouter.get("/get-issue/:id",getIssue);
userRouter.get("/get-issues",getIssues);
userRouter.patch("/update-issue/:id",updateIssue);

// scores
userRouter.get("/get-scores",getAllScores);
userRouter.route("/:id").get(getOne).delete(deleteUser);

export default userRouter;
