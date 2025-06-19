import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { CalendarModel } from "../Models/calendarModel";
import ErrorHandler from "../utils/ErrorHandler";


// create a new calendar event
export const createCalendarEvent = catchAsyncErrors(async (req:Request,res:Response,next: NextFunction) =>{
    const { date, title, theme, verses, hymn, isHighWeek, wednesdayVespers, fridayVespers, sabbathService, details, color } = req.body;

    if (!date || !title) {
        return next(new ErrorHandler("Date, title and color are required", 400));
    }

    const userId = req.user?.id; 
    if (!userId) {
        return next(new ErrorHandler("User not authenticated", 401));
    }

    const newEvent = await CalendarModel.create({
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
})


// get all calendar events
export const getAllCalendarEvents = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const events = await CalendarModel.find({}).sort({ date: 1 });
    if (events.length === 0) {
        return next(new ErrorHandler("No calendar events found", 404));
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
export const getCalendarEventById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const event = await CalendarModel.findById(id).lean();
    if (!event) {
      return next(new ErrorHandler("Calendar event not found", 404));
    }

    res.status(200).json({ success: true, event });
  }
);
  
  


// update a calendar event by id
export const updateCalendarEventById = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const updateData = req.body;
  
      if (!id) {
        return next(new ErrorHandler("ID parameter is required", 400));
      }
  
      const updatedEvent = await CalendarModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).lean();
  
      if (!updatedEvent) {
        return next(new ErrorHandler(`No calendar event found with id: ${id}`, 404));
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
    }
  );
  

// delete a calendar event by id
// DELETE /calendar/:id
export const deleteCalendarEventById = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
  
      if (!id) {
        return next(new ErrorHandler("ID parameter is required", 400));
      }
  
      const deletedEvent = await CalendarModel.findByIdAndDelete(id).lean();
  
      if (!deletedEvent) {
        return next(new ErrorHandler(`No calendar event found with id: ${id}`, 404));
      }
  
      res.status(200).json({
        success: true,
        message: "Calendar event deleted successfully",
      });
    }
  );
  

// delete all calendar events
export const deleteAllCalendarEvents = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    await CalendarModel.deleteMany({});
    res.status(200).json({
        success: true,
        message: "All calendar events deleted successfully"
    });
});