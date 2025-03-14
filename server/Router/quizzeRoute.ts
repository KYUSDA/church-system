import { Router } from "express";
import { createQuiz, getCompletedQuizzes, getQuiz, getUserResults, sendQuizResults } from "../Controlers/quizzes";
import requireAuth from "../middleware/authmiddleware";
const quizzeRoute = Router();

quizzeRoute.post("/create-quizze",createQuiz);

quizzeRoute.get("/get-quizze/:id",getQuiz);

quizzeRoute.get("/get-results",requireAuth, getUserResults);

quizzeRoute.get("/get-quizzes", getCompletedQuizzes);

quizzeRoute.post("/forward-results", requireAuth, sendQuizResults);


export default quizzeRoute;