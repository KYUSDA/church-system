import { useState, useEffect } from "react";
import { client, urlFor } from "../../client";
import Quizzes from "./Quizzes";

const QuizzesPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        client
            .fetch(`*[_type == "quiz"]{_id, title, image, description, completed, score}`)
            .then((data) => setQuizzes(data))
            .catch(console.error);
    }, []);

    return (
        <div className="p-6">
            {!selectedQuiz ? (
                <>
                    <h1 className="text-2xl font-bold mb-4 text-center">Defend Your Faith - Weekly Quizzes</h1>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Current Quizzes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quizzes.map((quiz) => (
                                <div key={quiz._id} className="border p-4 rounded-lg shadow-lg">
                                    <img src={urlFor(quiz.image)} alt={quiz.title} className="w-full h-40 object-cover rounded-md mb-4" />
                                    <h2 className="text-xl font-semibold">{quiz.title}</h2>
                                    <p className="text-gray-600">{quiz.description}</p>
                                    <button
                                        onClick={() => setSelectedQuiz(quiz)}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                                    >
                                        Start Quiz
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <Quizzes quiz={selectedQuiz} onBack={() => { setSelectedQuiz(null); setShowResults(false); }} onFinish={() => setShowResults(true)} showResults={showResults} />
            )}
        </div>
    );
};

export default QuizzesPage;
