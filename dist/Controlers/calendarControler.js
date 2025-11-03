"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllCalendarEvents = exports.deleteCalendarEventById = exports.updateCalendarEventById = exports.getCalendarEventById = exports.getAllCalendarEvents = exports.createCalendarEvent = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const calendarModel_1 = require("../Models/calendarModel");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
// create a new calendar event
exports.createCalendarEvent = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const { date, title, theme, verses, hymn, isHighWeek, wednesdayVespers, fridayVespers, sabbathService, details, color } = req.body;
    if (!date || !title) {
        return next(new ErrorHandler_1.default("Date, title and color are required", 400));
    }
    const userId = req.user?.id;
    if (!userId) {
        return next(new ErrorHandler_1.default("User not authenticated", 401));
    }
    const newEvent = await calendarModel_1.CalendarModel.create({
        date,
        title,
        theme,
        verses,
        hymn,
        isHighWeek,
        wednesdayVespers,
        fridayVespers,
        sabbathService,
        details,
        color
    });
    res.status(201).json({
        success: true,
        event: newEvent,
        message: "Calendar event created successfully"
    });
});
// get all calendar events
exports.getAllCalendarEvents = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const events = await calendarModel_1.CalendarModel.find({}).sort({ date: 1 });
    if (events.length === 0) {
        return next(new ErrorHandler_1.default("No calendar events found", 404));
    }
    // // Format each event's date property to 'YYYY-MM-DD' string without mutating Mongoose documents
    // const formattedEvents = events.map(event => ({
    //     ...event,
    //     date: event.date ? new Date(event.date).toISOString().split('T')[0] : event.date
    // }));
    res.status(200).json({
        success: true,
        events: events,
    });
});
// get a single calendar event by id
exports.getCalendarEventById = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const { id } = req.params;
    const event = await calendarModel_1.CalendarModel.findById(id).lean();
    if (!event) {
        return next(new ErrorHandler_1.default("Calendar event not found", 404));
    }
    res.status(200).json({ success: true, event });
});
// update a calendar event by id
exports.updateCalendarEventById = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    if (!id) {
        return next(new ErrorHandler_1.default("ID parameter is required", 400));
    }
    const updatedEvent = await calendarModel_1.CalendarModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
    if (!updatedEvent) {
        return next(new ErrorHandler_1.default(`No calendar event found with id: ${id}`, 404));
    }
    const formattedUpdatedEvent = {
        ...updatedEvent,
        date: updatedEvent.date
            ? new Date(updatedEvent.date).toISOString().split("T")[0]
            : updatedEvent.date,
    };
    res.status(200).json({
        success: true,
        event: formattedUpdatedEvent,
        message: "Calendar event updated successfully",
    });
});
// delete a calendar event by id
// DELETE /calendar/:id
exports.deleteCalendarEventById = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ErrorHandler_1.default("ID parameter is required", 400));
    }
    const deletedEvent = await calendarModel_1.CalendarModel.findByIdAndDelete(id).lean();
    if (!deletedEvent) {
        return next(new ErrorHandler_1.default(`No calendar event found with id: ${id}`, 404));
    }
    res.status(200).json({
        success: true,
        message: "Calendar event deleted successfully",
    });
});
// delete all calendar events
exports.deleteAllCalendarEvents = (0, catchAsyncErrors_1.catchAsyncErrors)(async (req, res, next) => {
    await calendarModel_1.CalendarModel.deleteMany({});
    res.status(200).json({
        success: true,
        message: "All calendar events deleted successfully"
    });
});
