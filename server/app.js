import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
config({ path: "./.env" });
import memberRoute from "./Router/authRoute.js";
import departmentRoute from "./Router/departMentRoute.js";
import userRoute from "./Router/userRouter.js";
import familyRoute from "./Router/familiesRouter.js";
const app = express();
app.use(json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://jolly-coast-0386d1803.5.azurestaticapps.net",
      "https://jolly-coast-0386d1803.5.azurestaticapps.net/",
      "*",
    ],
    credentials: true,
  })
);

app.use("/kyusda/v1/member/", memberRoute);
app.use("/kyusda/v1/department/", departmentRoute);
app.use("/kyusda/v1/user", userRoute);
app.use("/kyusda/v1/family/", familyRoute);
export default app;
