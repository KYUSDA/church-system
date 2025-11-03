"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizResultModel = void 0;
const mongoose_1 = require("mongoose");
const QuizResultSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    quiz: { type: mongoose_1.Schema.Types.ObjectId, ref: "Quiz", required: true },
    correctAnswers: { type: [String], required: true },
    userAnswers: { type: [String], required: true },
    scorePercentage: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.quizResultModel = (0, mongoose_1.model)("QuizResult", QuizResultSchema);
