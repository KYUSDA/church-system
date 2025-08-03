import mongoose from "mongoose";

interface CalendarEvent {
    date: string;
    title: string;
    theme: string;
    verses: string[];
    hymn: string;
    isHighWeek: boolean;
    wednesdayVespers?: string[];
    fridayVespers?: string[];
    sabbathService?: string[];
    details?: {
        department: string[];
        choristers: string[];
        deacons: string[];
    };
    color?: string;
}

const calendarSchema = new mongoose.Schema<CalendarEvent>({
    date: { type: String, required: true },
    title: { type: String, required: true },
    theme: { type: String, default: "" },
    verses: { type: [String], default: [] },
    hymn: { type: String, default: "" },
    isHighWeek: { type: Boolean, default: false },
    wednesdayVespers: { type: [String], default: [] },
    fridayVespers: { type: [String], default: [] },
    sabbathService: { type: [String], default: [] },
    details: {
        department: { type: [String], default: [] },
        choristers: { type: [String], default: [] },
        deacons: { type: [String], default: [] }
    },
    color: { type: String }
})


export const CalendarModel = mongoose.model<CalendarEvent>("Calendar", calendarSchema);