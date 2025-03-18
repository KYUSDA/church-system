import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../../services/authService";

interface Quiz {
  _id: string;
  title: string;
  description: string;
  week: number;
  image?: { url: string };
}

interface CompletedQuiz {
  _id: string;
  scorePercentage: number;
  quiz: Quiz;
}

const QuizzesPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<CompletedQuiz[]>([]);
  const baseUrl = getBaseUrl();
  const navigate = useNavigate();

  // Fetch Available Quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${baseUrl}/quizzes/get-quizzes`);
        if (!response.ok) throw new Error("Failed to fetch quizzes");

        const data = await response.json();
        setQuizzes(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setQuizzes([]);
      }
    };

    fetchQuizzes();
  }, [baseUrl]);

  // Fetch Completed Quizzes
  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        const response = await fetch(`${baseUrl}/quizzes/get-results`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch completed quizzes");

        const data = await response.json();
        setCompletedQuizzes(Array.isArray(data.results) ? data.results : []);
      } catch (error) {
        console.error("Error fetching completed quizzes:", error);
        setCompletedQuizzes([]);
      }
    };

    fetchCompletedQuizzes();
  }, [baseUrl]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Defend Your Faith - Weekly Quizzes</h1>

      {/* Current Quizzes */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div key={quiz._id} className="border p-4 rounded-lg shadow-lg">
                <img
                  src={quiz.image?.url || "https://via.placeholder.com/150"}
                  alt={quiz.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold">{quiz.title}</h2>
                <p className="text-gray-600">{quiz.description}</p>
                <button
                  onClick={() => navigate(`/member/defend-your-faith/quizze/${quiz._id}`)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Start Quiz
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No quizzes available.</p>
          )}
        </div>
      </div>

      {/* Completed Quizzes */}
      <div className="mt-8 p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Completed Quizzes</h2>
        {completedQuizzes.length > 0 ? (
          <ul className="space-y-2">
            {completedQuizzes.map((result) => (
              <li key={result._id} className="flex justify-between items-center p-2 bg-white shadow rounded-md">
                <div>
                  <h4 className="text-gray-400">Week: {result.quiz.week}</h4>
                  <h3 className="text-lg font-medium">{result.quiz.title}</h3>
                  <p className="text-sm text-gray-600">{result.quiz.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    result.scorePercentage >= 50 ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {result.scorePercentage}%
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No completed quizzes yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuizzesPage;
