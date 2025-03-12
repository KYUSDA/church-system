import { Router } from "express";
import { createQuiz, getCompletedQuizzes, getQuiz, sendQuizResults } from "../Controlers/quizzes";
import requireAuth from "../middleware/authmiddleware";
const quizzeRoute = Router();

quizzeRoute.route("/create-quizze").post(createQuiz);

quizzeRoute.get("/get-quizze/:id",getQuiz);

quizzeRoute.route("/get-quizzes").get(getCompletedQuizzes);

quizzeRoute.post("/forward-results", requireAuth, sendQuizResults);


export default quizzeRoute;