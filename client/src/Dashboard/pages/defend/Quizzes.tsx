import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { getBaseUrl } from "../../../services/authService";

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  questionText: string;
  options: Option[];
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
}

interface QuizzesProps {
  quiz: Quiz;
  onBack: () => void;
}

const Quizzes: React.FC<QuizzesProps> = ({ quiz, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: Option }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const baseUrl = getBaseUrl();

  useEffect(() => {
    const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleAnswer = (questionId: string, option: Option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const nextQuestion = () => {
    if (answers[quiz.questions[currentQuestionIndex]._id]) {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateScore();
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = async () => {
    let correctCount = 0;
    let correctAnswers: string[] = [];
    let userAnswers: string[] = [];

    quiz.questions.forEach((question) => {
      const correctOption = question.options.find((option) => option.isCorrect);
      const selectedOption = answers[question._id];

      if (correctOption && selectedOption && selectedOption.text === correctOption.text) {
        correctCount++;
      }

      correctAnswers.push(correctOption ? correctOption.text : "N/A");
      userAnswers.push(selectedOption ? selectedOption.text : "No Answer");
    });

    const percentage = (correctCount / quiz.questions.length) * 100;
    setScore(correctCount);
    setPassed(percentage > 40);
    setShowResults(true);

    await sendResults(correctAnswers, userAnswers);
  };

  const sendResults = async (correctAnswers: string[], userAnswers: string[]) => {
    try {
      const response = await fetch(`${baseUrl}/quizzes/forward-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          quizId: quiz?._id,
          correctAnswers,
          userAnswers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to send results: ${errorData.error}`);
      }

      console.log("Results sent successfully");
    } catch (error) {
      console.error("Error sending results:", error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
      {showResults ? (
        <div className="w-full bg-white shadow-md p-6 rounded-lg text-center">
          {passed && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={50} />}
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg">
            Your Score: <span className="font-semibold">{score}</span> / {quiz.questions.length} ({((score / quiz.questions.length) * 100).toFixed(2)}%)
          </p>
          <p className={`mt-4 text-lg font-bold ${passed ? "text-green-600" : "text-red-600"}`}>
            {passed ? "You Passed! 🎉" : "You Failed. Try Again! ❌"}
          </p>
          <button
            className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-md"
            onClick={onBack}
          >
            Go Back to Quizzes
          </button>
        </div>
      ) : (
        <div className="lg:w-2/3 w-full bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{quiz.title}</h3>
          <div className="mb-4">
            <p className="font-medium">
              {currentQuestionIndex + 1}. {quiz.questions[currentQuestionIndex].questionText}
            </p>
            {quiz.questions[currentQuestionIndex].options.map((option, i) => (
              <button
                key={i}
                className={`block w-full p-3 mt-2 rounded-lg text-left border-2 transition-all text-lg ${
                  answers[quiz.questions[currentQuestionIndex]._id]?.text === option.text
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 border-gray-300"
                }`}
                onClick={() => handleAnswer(quiz.questions[currentQuestionIndex]._id, option)}
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
              disabled={!answers[quiz.questions[currentQuestionIndex]._id]}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
