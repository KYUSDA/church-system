"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const authRoute_1 = __importDefault(require("./Router/authRoute"));
const departMentRoute_1 = __importDefault(require("./Router/departMentRoute"));
const userRouter_1 = __importDefault(require("./Router/userRouter"));
const familiesRouter_1 = __importDefault(require("./Router/familiesRouter"));
const quizzeRoute_1 = __importDefault(require("./Router/quizzeRoute"));
const devotionRoute_1 = __importDefault(require("./Router/devotionRoute"));
const prayerRoute_1 = __importDefault(require("./Router/prayerRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notificationRouter_1 = __importDefault(require("./Router/notificationRouter"));
const calendarRoute_1 = require("./Router/calendarRoute");
const resourceRoute_1 = require("./Router/resourceRoute");
const youtube_1 = require("./youtube"); //changes by Coach Lameck
const app = (0, express_1.default)();
app.use(express_1.default.json());
//body parser
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// cookie parser
app.use((0, cookie_parser_1.default)());
// check if workflow is working
// check if extraction well
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://church-system-three.vercel.app",
    "https://www.kyusda.co.ke",
    "https://kyusda.co.ke"
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
}));
app.use("/kyusda/v1/member/", authRoute_1.default);
app.use("/kyusda/v1/department/", departMentRoute_1.default);
app.use("/kyusda/v1/user", userRouter_1.default);
app.use("/kyusda/v1/family/", familiesRouter_1.default);
app.use("/kyusda/v1/quizzes/", quizzeRoute_1.default);
app.use('/kyusda/v1/devotion/', devotionRoute_1.default);
app.use("/kyusda/v1/prayers/", prayerRoute_1.default);
app.use("/kyusda/v1/notification", notificationRouter_1.default);
app.use("/kyusda/v1/calendar", calendarRoute_1.calendarRouter);
app.use("/kyusda/v1/resource", resourceRoute_1.resourceRouter);
// check cookies
app.use((req, _res, next) => {
    console.log("Cookie header:", req.headers.cookie);
    console.log("Parsed cookies:", req.cookies);
    next();
});
//test 
app.get("/test", (req, res, next) => {
    res.status(200).json({ success: true, message: "API working correctly" });
});
//unknown routes
app.all("*", (req, res, next) => {
    const error = new Error(`The route: ${req.originalUrl} does not exist`);
    error.statusCode = 404;
    next(error);
});
//404 page
app.use("/", (error, req, res, next) => {
    res.status(error.statusCode).json({ success: false, message: error.message });
});
//changes by Coach Lameck
app.get("/api/youtube", async (req, res) => {
    try {
        const channelId = "UCe6xeVkEBvG7OD_9HltS1xQ"; // your YouTube channel ID
        const data = await (0, youtube_1.getChannelVideosRSS)(channelId);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch YouTube data" });
    }
});
//end of changes
exports.default = app;
