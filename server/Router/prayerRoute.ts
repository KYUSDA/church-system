import { Router } from "express";
import { createPrayerRequest,getAllPrayerRequests } from "../Controlers/prayerRequestController";
import requireAuth,{ authorizeRoles } from "../middleware/authmiddleware";

const prayerRequestRouter = Router();

prayerRequestRouter.route("/prayerRequest").post(requireAuth,createPrayerRequest);
prayerRequestRouter.route("/getAllPrayerRequests").get(requireAuth,authorizeRoles("admin"),getAllPrayerRequests);

export default prayerRequestRouter;