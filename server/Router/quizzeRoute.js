import { Router } from "express";
import { createQuiz } from "../Controlers/quizzes";
const quizzeRoute = Router();

quizzeRoute.route("/create-quizze").post(createQuiz);


export default quizzeRoute;