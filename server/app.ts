import express, { json } from "express";
import cors from "cors";
import 'dotenv/config'
import memberRoute from "./Router/authRoute";
import departmentRoute from "./Router/departMentRoute";
import userRoute from "./Router/userRouter";
import familyRoute from "./Router/familiesRouter";
import quizzeRoute from "./Router/quizzeRoute";
import devotionRoute from "./Router/devotionRoute";
import prayerRequestRouter from "./Router/prayerRoute";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/kyusda/v1/quizzes/",quizzeRoute);
app.use('/kyusda/v1/devotion/',devotionRoute);
app.use("/kyusda/v1/prayers/", prayerRequestRouter);


export default app;
