import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../../services/authService";
import Quizzes from "./Quizzes";

interface Quiz {
  _id: string;
  title: string;
  questions: {
    _id: string;
    questionText: string;
    options: {
      text: string;
      isCorrect: boolean;
    }[];
  }[];
}

const QuizDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const baseUrl = getBaseUrl();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${baseUrl}/quizzes/get-quizze/${id}`);
        if (!response.ok) throw new Error("Failed to fetch quiz");

        const data = await response.json();
        console.log("Fetched quiz:", data);
        setQuiz(data.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [baseUrl, id]);

  return (
    <div className="p-6">
      {quiz && quiz.questions && quiz.questions.length > 0 ? (
        <Quizzes quiz={quiz} onBack={() => navigate("/member/defend-your-faith")} />
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default QuizDetail;
