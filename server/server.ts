
import app from './app';
import { connectDb } from "./utils/db";
import "dotenv/config"

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on PORT:${port}`);
  connectDb();
});

