import { Router } from "express";
import {
  getAll,
  createFamily,
  getOne,
  updateFamily,
  deleteFamily,
} from "../Controlers/family";
import requireAuth,{ authorizeRoles } from "../middleware/authmiddleware";

const familyRouter = Router();

familyRouter.route("/getFamilies").get(requireAuth, authorizeRoles("admin"), getAll);
familyRouter.route("/createFamily").post(requireAuth, authorizeRoles("admin"),createFamily);
familyRouter.patch("/update-family/:id", requireAuth, authorizeRoles("admin"), updateFamily);

familyRouter.route("/:id").get(requireAuth, authorizeRoles("admin"),getOne).delete(authorizeRoles("admin"),deleteFamily);

export default familyRouter;
