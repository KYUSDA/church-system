import { Router } from "express";
import { createPrayerRequest,getAllPrayerRequests } from "../Controlers/prayerRequestController";

const prayerRequestRouter = Router();

prayerRequestRouter.route("/prayerRequest").post(createPrayerRequest);
prayerRequestRouter.route("/getAllPrayerRequests").get(getAllPrayerRequests);

export default prayerRequestRouter;