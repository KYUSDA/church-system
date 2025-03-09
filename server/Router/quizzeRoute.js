import { Router } from "express";
import { createQuiz } from "../Controlers/quizzes.js";
const quizzeRoute = Router();

quizzeRoute.route("/create-quizze").post(createQuiz);


export default quizzeRoute;