import { Router } from "express";
import {
  getAll,
  createFamily,
  getOne,
  updateFamily,
  deleteFamily,
} from "../Controlers/family.js";
const familyRouter = Router();
familyRouter.route("/getFamilies").get(getAll);
familyRouter.route("/createFamily").post(createFamily);

familyRouter.route("/:id").get(getOne).patch(updateFamily).delete(deleteFamily);

export default familyRouter;
