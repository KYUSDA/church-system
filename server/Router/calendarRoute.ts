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
import { UserRole } from "../Models/authModel";

export const calendarRouter = Router();

// api/calendar/create
calendarRouter.post(
  "/event",
  requireAuth,
  authorizeRoles(UserRole.SUPERADMIN),
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
  authorizeRoles(UserRole.SUPERADMIN),
  updateCalendarEventById
);

// api/calendar/delete/:id
calendarRouter.delete(
  "/event/:id",
  requireAuth,
  authorizeRoles(UserRole.SUPERADMIN),
  deleteCalendarEventById
);

// api/calendar/deleteAll
calendarRouter.delete(
  "/events",
  requireAuth,
  authorizeRoles(UserRole.SUPERADMIN),
  deleteAllCalendarEvents
);
