import mongoose from "mongoose";
import app from "./app.js";
//setting up our cors
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "kyusda",
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on PORT:${process.env.PORT}`);
    });
  });
