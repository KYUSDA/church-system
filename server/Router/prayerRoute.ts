import { Router } from "express";
import { createPrayerRequest,getAllPrayerRequests } from "../Controlers/prayerRequestController";
import requireAuth,{ authorizeRoles } from "../middleware/authmiddleware";
import { ALL } from "../Models/authModel";

const prayerRequestRouter = Router();

prayerRequestRouter.route("/prayerRequest").post(requireAuth,createPrayerRequest);
prayerRequestRouter.route("/getAllPrayerRequests").get(requireAuth,authorizeRoles(...ALL),getAllPrayerRequests);

export default prayerRequestRouter;