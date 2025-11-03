"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const calendarSchema = new mongoose_1.default.Schema({
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
});
exports.CalendarModel = mongoose_1.default.model("Calendar", calendarSchema);
