import { Router } from "express";
import {
  getAll,
  createFamily,
  getOne,
  updateFamily,
  deleteFamily,
} from "../Controlers/family";
import requireAuth,{ authorizeRoles } from "../middleware/authmiddleware";
import { ALL, UserRole } from "../Models/authModel";

const familyRouter = Router();

familyRouter.route("/getFamilies").get(requireAuth, authorizeRoles(...ALL), getAll);
familyRouter.route("/createFamily").post(requireAuth, authorizeRoles(UserRole.SUPERADMIN),createFamily);
familyRouter.patch("/update-family/:id", requireAuth, authorizeRoles(UserRole.SUPERADMIN), updateFamily);

familyRouter
  .route("/:id")
  .get(requireAuth, authorizeRoles(UserRole.SUPERADMIN), getOne)
  .delete(requireAuth,authorizeRoles(UserRole.SUPERADMIN), deleteFamily);

export default familyRouter;
