import mongoose from "mongoose";

const userQuizProgressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    completed: { type: Boolean, default: false },
});

export const userQuizProgressModel = mongoose.model("UserQuizProgress", userQuizProgressSchema);
