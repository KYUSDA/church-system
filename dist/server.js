"use strict";
// import { app } from "./app";
// import { connectDb } from "./utils/db";
// import "dotenv/config"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { v2 as cloudinary } from "cloudinary";
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running on PORT:${port}`);
//   connectDb();
// });
// .................................test......................................
const app_1 = __importDefault(require("./app"));
const db_1 = require("./utils/db");
require("dotenv/config");
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary with environment variables
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Set the port from environment variable or default to 8000 (matches your .env)
const port = process.env.PORT || 8000;
app_1.default.listen(port, async () => {
    console.log(`Server running on PORT:${port}`);
    try {
        // Pass MONGODB_URI explicitly to connectDb (optional, depending on your utils/db.ts)
        await (0, db_1.connectDb)();
        console.log("Database connection established");
    }
    catch (error) {
        console.error("Server startup failed due to DB error:", error);
        process.exit(1); // Exit if DB fails
    }
});
