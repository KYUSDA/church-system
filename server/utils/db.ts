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

// Use the environment variable directly in the function
export const connectDb = async () => {
  try {
    const url = process.env.MONGODB_URI as string;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};