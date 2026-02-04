import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import memberRoute from "./Router/authRoute";
import userRoute from "./Router/userRouter";
import quizzeRoute from "./Router/quizzeRoute";
import prayerRequestRouter from "./Router/prayerRoute";
import cookieParser from "cookie-parser";
import notificationRouter from "./Router/notificationRouter";
import { profileRouter } from "./Router/profileRoute";

const app = express();
app.use(express.json());

//body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

const allowedOrigins = process.env.ORIGINS!.split(",");

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
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
  }),
);

app.use("/kyusda/v1/member/", memberRoute);
app.use("/kyusda/v1/profile/", profileRouter);
app.use("/kyusda/v1/user", userRoute);
app.use("/kyusda/v1/prayers/", prayerRequestRouter);
app.use("/kyusda/v1/notification", notificationRouter);
app.use("/kyusda/v1/quizzes/", quizzeRoute);

// check cookies
app.use((req, _res, next) => {
  console.log("Cookie header:", req.headers.cookie);
  console.log("Parsed cookies:", req.cookies);
  next();
});

//test
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: "API working correctly" });
});

//unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(
    `The route: ${req.originalUrl} does not exist`,
  ) as any;
  error.statusCode = 404;
  next(error);
});

//404 page
app.use("/", (error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

export default app;
