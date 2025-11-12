import { EventsUpdate } from "../Models/eventsModel";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";

// create event
export const createEventUpdate = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, start_date, end_date, location, links } = req.body;

    if(!title || !description || !start_date || !end_date) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const eventUpdate = await EventsUpdate.create({
        title,
        description,
        start_date,
        end_date,
        location,
        links
    });

    res.status(201).json({
        success: true,
        eventUpdate,
        message: "Event update created successfully"
    })
});


// get all event updates
export const getAllEventUpdates = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const eventUpdates = await EventsUpdate.find().sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: eventUpdates
    });
});

// get upcoming event updates
export const getUpcomingEventUpdates = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const currentDate = new Date();
    const upcomingEventUpdates = await EventsUpdate.find({ start_date: { $gte: currentDate } }).sort({ start_date: 1 });

    res.status(200).json({
        success: true,
        data: upcomingEventUpdates
    });
});


// delete event update
export const deleteEventUpdate = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const eventUpdate = await EventsUpdate.findById(req.params.id);

    if (!eventUpdate) {
        return next(new ErrorHandler("Event update not found", 404));
    }

    await eventUpdate.remove();

    res.status(200).json({
        success: true,
        message: "Event update deleted successfully"
    });
});