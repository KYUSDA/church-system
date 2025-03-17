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
const userRouter = Router();
userRouter.route("/getUsers").get(getAll);
userRouter.route("/createUser").post(createUser);
userRouter.put("/update-avatar/:id",updateUserAvatar);
userRouter.put("/update-scores",requireAuth, updateScore);
userRouter.put("/update-trivias",requireAuth,updateTriviaNumbers);
userRouter.get("/get-scores",getAllScores);
userRouter.route("/:id").get(getOne).patch(updateUser).delete(deleteUser);

export default userRouter;
