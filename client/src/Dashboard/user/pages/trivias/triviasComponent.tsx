import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import useUserData from "../../../../session/authData";
import { getBaseUrl } from "@/services/base_query";
import { updateTrivias } from "../../../../session/userSlice";
import Confetti from "react-confetti";

interface IQuizs {
  id: number;
  question: string;
  choices: string[];
  correct: string;
  level: string;
}

interface IShuffleArray {
  (array: string[]): string[];
}

const shuffleArray: IShuffleArray = (array) =>
  array.sort(() => Math.random() - 0.5);

const TriviaComponent = ({
  level,
  questionsData,
}: {
  level: string;
  questionsData: IQuizs[];
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useUserData();
  const baseUrl = getBaseUrl();
  const key = `${level}Number` as keyof typeof user;
  const userProgress =
    typeof user?.[key] === "number" ? (user[key] as number) : 0;
  const levelCompleted =
    typeof userProgress === "number" && userProgress >= questionsData.length;
  // const { width, height } = useWindowSize();

  const [questions, setQuestions] = useState<IQuizs[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(
    () => Number(localStorage.getItem("quizTimer")) || 0
  );
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!levelCompleted) {
      setQuestions(
        questionsData.slice(userProgress, userProgress + 15).map((q) => ({
          ...q,
          choices: shuffleArray([...q.choices]),
        }))
      );
    }
  }, [userProgress, levelCompleted, questionsData]);

  useEffect(() => {
    if (quizStarted && !quizCompleted && !levelCompleted) {
      localStorage.setItem("quizTimer", elapsedTime.toString());
      const timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [elapsedTime, quizStarted, quizCompleted, levelCompleted]);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    if (!quizStarted) return;
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (levelCompleted) return;

    let totalScore = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correct) {
        totalScore += 10;
      }
    });
    setScore(totalScore);
    setQuizCompleted(true);
    localStorage.removeItem("quizTimer");

    try {
      const newProgress = userProgress + 15;
      const response = await fetch(`${baseUrl}/user/update-trivias`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, number: newProgress }),
        credentials: "include",
      });
      if (!response.ok)
        throw new Error("Failed to update progress in the database");
      dispatch(updateTrivias({ key: `${level}Number`, number: newProgress }));
    } catch (error) {
      console.error("Error updating progress:", error);
      alert(
        "Failed to update progress. Please check your connection and try again."
      );
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-gray-900 text-2xl"
      >
        <AiOutlineArrowLeft />
      </button>
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        {level} Trivia
      </h1>
      {!quizStarted ? (
        <div className="text-center">
          {levelCompleted ? (
            <h2 className="text-2xl font-bold text-gray-900">
              Congratulations, you've completed the {level} level!
            </h2>
          ) : (
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Start Quiz
            </button>
          )}
        </div>
      ) : quizCompleted ? (
        <div className="text-center">
          {
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={50}
            />
          }
          <h2 className="text-2xl font-bold text-gray-900">
            Your Score: {score}
          </h2>
          <button
            onClick={() => navigate("/member/bibleTrivia")}
            className="mt-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition duration-300 w-full"
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div>
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="mb-6 p-4 border rounded-lg bg-white shadow-md"
            >
              <h2 className="text-xl font-semibold mb-3">
                {index + 1}. {question.question}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {question.choices.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(question.id, option)}
                    className={`p-3 border rounded-lg text-center font-medium transition duration-300 ${
                      selectedAnswers[question.id] === option
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default TriviaComponent;
