import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { client } from "../../client";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    client
      .fetch(`*[_type == "quiz"]{_id, title, description, questions}`)
      .then((data) => setQuizzes(data))
      .catch(console.error);

    const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const nextQuestion = () => {
    if (answers[selectedQuiz.questions[currentQuestionIndex]._id]) {
      if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateScore();
        setShowResults(true);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;

    selectedQuiz.questions.forEach((question) => {
      const correctOption = question.options.find((option) => option.isCorrect);
      const selectedOption = answers[question._id];

      if (correctOption && selectedOption && selectedOption.text === correctOption.text) {
        correctCount++;
      }
    });

    setScore(correctCount);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
      {!selectedQuiz ? (
        <div className="w-full text-center">
          {quizzes.length > 0 && (
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{quizzes[0].title}</h2>
              <p className="text-gray-700">{quizzes[0].description}</p>
            </div>
          )}
          <button
            className="p-3 bg-teal-500 text-white rounded-md text-lg"
            onClick={() => setSelectedQuiz(quizzes[0])}
          >
            Start Quiz
          </button>
        </div>
      ) : showResults ? (
        <div className="w-full bg-white shadow-md p-6 rounded-lg text-center">
          {/* Confetti animation */}
          <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={200} />

          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg">
            Your Score: <span className="font-semibold">{score}</span> / {selectedQuiz.questions.length}
          </p>
          <p className="mt-4">
            The quiz results have been emailed to you. You can also view your results in the{" "}
            <strong>Completed Quizzes</strong> section.
          </p>
          <button
            className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-md"
            onClick={() => {
              setSelectedQuiz(null);
              setShowResults(false);
              setAnswers({});
              setCurrentQuestionIndex(0);
            }}
          >
            Go Back to Quizzes
          </button>
        </div>
      ) : (
        <div className="lg:w-2/3 w-full bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{selectedQuiz.title}</h3>
          <div className="mb-4">
            <p className="font-medium">
              {currentQuestionIndex + 1}. {selectedQuiz.questions[currentQuestionIndex].questionText}
            </p>
            {selectedQuiz.questions[currentQuestionIndex].options.map((option, i) => (
              <button
                key={i}
                className={`block w-full p-3 mt-2 rounded-lg text-left border-2 transition-all text-lg ${
                  answers[selectedQuiz.questions[currentQuestionIndex]._id]?.text === option.text
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 border-gray-300"
                }`}
                onClick={() => handleAnswer(selectedQuiz.questions[currentQuestionIndex]._id, option)}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={!answers[selectedQuiz.questions[currentQuestionIndex]._id]}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              {currentQuestionIndex === selectedQuiz.questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quizzes;
