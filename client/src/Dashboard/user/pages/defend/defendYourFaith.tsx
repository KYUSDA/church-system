import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../../../services/authService";
import Loader from "../../components/loader";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const baseUrl = getBaseUrl();
  const navigate = useNavigate();

  // Fetch Available Quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${baseUrl}/quizzes/get-quizzes`, {
          credentials: "include",
        });

        // if (!response.ok) throw new Error("Failed to fetch quizzes");

        const data = await response.json();
        setQuizzes(Array.isArray(data.quizzes) ? data.quizzes : []);
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
        // if (!response.ok) throw new Error("Failed to fetch completed quizzes");

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
      <Loader isLoading={loading} text="Get things ready..." />
      <h1 className="text-2xl font-bold mb-4 text-center">
        Defend Your Faith - Weekly Quizzes
      </h1>

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
                  onClick={() =>
                    navigate(`/member/defend-your-faith/quizze/${quiz._id}`)
                  }
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
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 font-semibold">Week</th>
                <th className="px-4 py-2 font-semibold">Title</th>
                <th className="px-4 py-2 font-semibold">Description</th>
                <th className="px-4 py-2 font-semibold">Score (%)</th>
              </tr>
            </thead>
            <tbody>
              {completedQuizzes.length > 0 ? (
                completedQuizzes.map((result) => (
                  <tr
                    key={result._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-2 text-gray-600">
                      {result.quiz.week}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-800 ">
                      {result.quiz.title}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {result.quiz.description}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                          result.scorePercentage >= 50
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {result.scorePercentage}%
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No completed quizzes yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizzesPage;
