import { Router } from "express";
import {
  getAll,
  createUser,
  getOne,
  updateUser,
  deleteUser,
} from "../Controlers/userControler.js";
const userRouter = Router();
userRouter.route("/getUsers").get(getAll);
userRouter.route("/createUser").post(createUser);
userRouter.route("/:id").get(getOne).patch(updateUser).delete(deleteUser);

export default userRouter;
