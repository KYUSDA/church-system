import mongoose from "mongoose";
import 'dotenv/config'

const url = process.env.MONGODB_URI as string;
mongoose.set("strictQuery", false);

export const connectDb = async() =>{
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB"); 
    } catch (error) {
        console.log("Error connecting",error);
    }
}