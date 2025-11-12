import { Router } from "express";
import { createEventUpdate, getAllEventUpdates, getUpcomingEventUpdates, deleteEventUpdate } from "../Controlers/eventsControler";

export const eventsRouter = Router();

eventsRouter.post("/", createEventUpdate);
eventsRouter.get("/", getAllEventUpdates);
eventsRouter.get("/upcoming", getUpcomingEventUpdates);
eventsRouter.delete("/:id", deleteEventUpdate);
