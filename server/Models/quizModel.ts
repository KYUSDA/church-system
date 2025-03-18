import mongoose, { Schema, Document } from "mongoose";

interface IOption {
    text: string;
    isCorrect: boolean;
}

interface IQuestion {
    questionText: string;
    options: IOption[];
}

interface IQuiz extends Document {
    title: string;
    image:{
        public_id: string;
        url: string;
    };
    description?: string;
    questions: IQuestion[];
    week: number;
    completed: boolean;
}

const OptionSchema = new Schema<IOption>({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
});

const QuestionSchema: Schema<IQuestion> = new Schema<IQuestion>({
    questionText: { type: String, required: true },
    options: { type: [OptionSchema], required: true, validate: (v: IOption[]) => v.length >= 2 },
});

const QuizSchema = new Schema<IQuiz>({
    title: { type: String, required: true },
    image: { 
        public_id: String,
        url: String
    },
    description: { type: String },
    questions: { type: [QuestionSchema], required: true },
    week: { type: Number, required: true, min: 1 },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IQuiz>("Quiz", QuizSchema);
