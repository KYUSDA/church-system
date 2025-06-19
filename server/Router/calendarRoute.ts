import { Router } from "express";
import {
  createCalendarEvent,
  deleteAllCalendarEvents,
  deleteCalendarEventById,
  getAllCalendarEvents,
  getCalendarEventById,
  updateCalendarEventById,
} from "../Controlers/calendarControler";
import requireAuth, { authorizeRoles } from "../middleware/authmiddleware";

export const calendarRouter = Router();

// api/calendar/create
calendarRouter.post(
  "/event",
  requireAuth,
  authorizeRoles("admin"),
  createCalendarEvent
);
// api/calendar/getAll
calendarRouter.get("/events", getAllCalendarEvents);

// api/calendar/get/:id
calendarRouter.get("/event/:id", getCalendarEventById);

// api/calendar/update/:id
calendarRouter.put(
  "/event/:id",
  requireAuth,
  authorizeRoles("admin"),
  updateCalendarEventById
);

// api/calendar/delete/:id
calendarRouter.delete(
  "/event/:id",
  requireAuth,
  authorizeRoles("admin"),
  deleteCalendarEventById
);

// api/calendar/deleteAll
calendarRouter.delete(
  "/events",
  requireAuth,
  authorizeRoles("admin"),
  deleteAllCalendarEvents
);
