import { createClient } from "@sanity/client";

const sanity = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    useCdn: false,
    apiVersion: "2023-01-01",
    // token: process.env.SANITY_API_TOKEN,
});

export const createQuiz = async (req, res) => {
    try {
        const { title, image, description, questions, week, completed, score, totalQuestions } = req.body;

        // Basic validation
        if (!title || typeof title !== "string") {
            return res.status(400).json({ error: "Title is required and must be a string." });
        }
        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ error: "At least one question is required." });
        }
        if (!week || typeof week !== "number" || week < 1) {
            return res.status(400).json({ error: "Week number is required and must be a positive number." });
        }
        if (totalQuestions !== questions.length) {
            return res.status(400).json({ error: "Total questions count must match the number of questions provided." });
        }

        // Validate each question
        for (const question of questions) {
            if (!question.questionText || typeof question.questionText !== "string") {
                return res.status(400).json({ error: "Each question must have a text." });
            }
            if (!Array.isArray(question.options) || question.options.length < 2) {
                return res.status(400).json({ error: "Each question must have at least two options." });
            }
            if (!question.options.some(option => option.isCorrect)) {
                return res.status(400).json({ error: "Each question must have at least one correct option." });
            }
        }

        // Prepare data for Sanity
        const quizData = {
            _type: "quiz",
            title,
            image,
            description,
            questions,
            week,
            completed: completed || false,
            score: completed ? score : undefined, // Score is only relevant if completed
            totalQuestions,
        };

        // Save to Sanity
        const result = await sanity.create(quizData);
        return res.status(201).json({ message: "Quiz created successfully", data: result });
    } catch (error) {
        console.error("Error creating quiz:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
