import { Router } from "express";
import { createQuiz, getAllQuizzes, getQuiz, getQuizzes, getUserResults, sendQuizResults } from "../Controlers/quizzes";
import requireAuth, { authorizeRoles } from "../middleware/authmiddleware";
const quizzeRoute = Router();

quizzeRoute.post("/create-quizze",requireAuth,authorizeRoles("admin"),createQuiz);

quizzeRoute.get("/get-quizze/:id",getQuiz);

quizzeRoute.get("/all-quizzes",getAllQuizzes)

quizzeRoute.get("/get-results",requireAuth, getUserResults);

quizzeRoute.get("/get-quizzes", requireAuth,getQuizzes);

quizzeRoute.post("/forward-results", requireAuth, sendQuizResults);


export default quizzeRoute;