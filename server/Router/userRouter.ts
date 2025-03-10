import { Router } from "express";
import {
  getAll,
  createUser,
  getOne,
  updateUser,
  deleteUser,
  updateUserAvatar,
} from "../Controlers/userControler";
const userRouter = Router();
userRouter.route("/getUsers").get(getAll);
userRouter.route("/createUser").post(createUser);
userRouter.route("/update-avatar/:id").put(updateUserAvatar);
userRouter.route("/:id").get(getOne).patch(updateUser).delete(deleteUser);

export default userRouter;
