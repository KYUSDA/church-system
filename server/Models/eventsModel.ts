import mongoose, { Schema } from "mongoose";

interface TEvents {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    location?: string;
    links?: string[];
}


// schema
const eventsUpdateSchema = new Schema<TEvents>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    location: { type: String, required: false },
    links: { type: [String], required: false },
});



// model
export const EventsUpdate = mongoose.model<TEvents>('EventsUpdate', eventsUpdateSchema);