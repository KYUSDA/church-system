import { createNotification, getAllNotifications, updateNotificationState } from "../Controlers/notificationController";


import { Router } from "express";
import requireAuth, { authorizeRoles } from "../middleware/authmiddleware";

const notificationRouter = Router();

notificationRouter.post("/create-notification",requireAuth, authorizeRoles("admin"), createNotification);
notificationRouter.get("/getAll-notification",requireAuth, getAllNotifications);
notificationRouter.patch("/update-notification-state",requireAuth, authorizeRoles("admin"), updateNotificationState);


export default notificationRouter;