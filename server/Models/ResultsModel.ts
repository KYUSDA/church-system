import mongoose, { Schema, Document,model } from "mongoose";

interface IQuizResult extends Document {
    user: mongoose.Types.ObjectId;
    quiz: mongoose.Types.ObjectId;
    correctAnswers: string[];    
    userAnswers: string[];        
    scorePercentage: number;        
    correctCount: number;          
    totalQuestions: number;        
    createdAt: Date;
}

const QuizResultSchema = new Schema<IQuizResult>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    correctAnswers: { type: [String], required: true },
    userAnswers: { type: [String], required: true },
    scorePercentage: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const quizResultModel =  model("QuizResult", QuizResultSchema);
