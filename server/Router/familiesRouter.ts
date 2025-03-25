import { Router } from "express";
import {
  getAll,
  createFamily,
  getOne,
  updateFamily,
  deleteFamily,
} from "../Controlers/family";

const familyRouter = Router();

familyRouter.route("/getFamilies").get(getAll);
familyRouter.route("/createFamily").post(createFamily);
familyRouter.patch("/update-family/:id", updateFamily);

familyRouter.route("/:id").get(getOne).delete(deleteFamily);

export default familyRouter;
