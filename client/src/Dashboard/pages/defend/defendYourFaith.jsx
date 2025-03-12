import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBaseUrl } from "../../../utils/api";

const QuizzesPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const baseUrl = getBaseUrl();
    const navigate = useNavigate();

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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Defend Your Faith - Weekly Quizzes</h1>
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
        </div>
    );
};

export default QuizzesPage;
