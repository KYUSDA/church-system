"use strict";
// import mongoose from "mongoose";
// import 'dotenv/config'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
// const url = process.env.MONGODB_URI as string;
// mongoose.set("strictQuery", false);
// export const connectDb = async() =>{
//     try {
//         await mongoose.connect(url);
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.log("Error connecting",error);
//     }
// }
// ........................test.................................
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = async () => {
    try {
        const url = process.env.MONGODB_URI;
        mongoose_1.default.set("strictQuery", false); // Suppress deprecation warning
        await mongoose_1.default.connect(url);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
exports.connectDb = connectDb;
