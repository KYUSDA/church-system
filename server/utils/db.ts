// import mongoose from "mongoose";
// import 'dotenv/config'

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

import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const url = process.env.MONGODB_URI as string;
    mongoose.set("strictQuery", false); // Suppress deprecation warning
    await mongoose.connect(url);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
