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
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());

// body parser
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// cookie parser
app.use(cookieParser());

app.use(json());


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://jolly-coast-0386d1803.5.azurestaticapps.net",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
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
