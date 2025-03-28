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
import requireAuth, { authorizeRoles } from "../middleware/authmiddleware";
import { createIssue, getIssue, getIssues, updateIssue } from "../Controlers/issueController";
const userRouter = Router();
userRouter.route("/get-user/:id").get(getOne);
userRouter.route("/getUsers").get(requireAuth,authorizeRoles("admin"),getAll);
userRouter.patch("/update-user/:id",updateUser);
userRouter.route("/createUser").post(requireAuth, authorizeRoles("admin"),createUser);
userRouter.put("/update-avatar/:id",updateUserAvatar);
userRouter.put("/update-scores",requireAuth, updateScore);
userRouter.put("/update-trivias",requireAuth,updateTriviaNumbers);
userRouter.delete("/delete-user/:id",requireAuth, authorizeRoles("admin"),deleteUser)

// issues
userRouter.post("/report-issue", requireAuth, createIssue);
userRouter.get("/get-issue/:id",getIssue);
userRouter.get("/get-issues",getIssues);
userRouter.patch("/update-issue/:id",updateIssue);

// scores
userRouter.get("/get-scores",getAllScores);

export default userRouter;
