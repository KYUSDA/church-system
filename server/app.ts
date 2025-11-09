
import express, { NextFunction, Request, Response } from 'express';
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
import notificationRouter from './Router/notificationRouter';
import { calendarRouter } from './Router/calendarRoute';
import { resourceRouter } from './Router/resourceRoute';
import youtubeRoute from "./Router/youtubeRoute";
import xRoute from "./Router/xRoute";

const app = express();
app.use(express.json());

//body parser
app.use(express.json({limit: "50mb"})); 
app.use(express.urlencoded({extended: true}));

// cookie parser
app.use(cookieParser());


// check if workflow is working
// check if extraction well

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://church-system-three.vercel.app",
  "https://www.kyusda.co.ke",
  "https://kyusda.co.ke"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // In development, allow localhost with any port
      if (process.env.NODE_ENV !== 'production' && origin.match(/^http:\/\/localhost:/)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  })
);


app.use("/kyusda/v1/member/", memberRoute);
app.use("/kyusda/v1/department/", departmentRoute);
app.use("/kyusda/v1/user", userRoute);
app.use("/kyusda/v1/family/", familyRoute);
app.use("/kyusda/v1/quizzes/",quizzeRoute);
app.use('/kyusda/v1/devotion/',devotionRoute);
app.use("/kyusda/v1/prayers/", prayerRequestRouter);
app.use("/kyusda/v1/notification", notificationRouter);
app.use("/kyusda/v1/calendar",calendarRouter);
app.use("/kyusda/v1/resource",resourceRouter);
app.use("/kyusda/v1/youtube", youtubeRoute);
app.use("/kyusda/v1/x", xRoute);

// check cookies
app.use((req, _res, next) => {
  console.log("Cookie header:", req.headers.cookie);
  console.log("Parsed cookies:", req.cookies);
  next();
});


//test 
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({success: true, message: "API working correctly"});
})

//unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`The route: ${req.originalUrl} does not exist`) as any;
  error.statusCode = 404;
  next(error);
})

//404 page
app.use("/", (error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({success: false, message: error.message})
})


export default app;

