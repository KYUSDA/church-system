import React, { useEffect, useState } from "react";
import { client } from "../../client";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    client
      .fetch(`*[_type == "quiz"]{_id, title, questions}`)
      .then((data) => setQuizzes(data))
      .catch(console.error);
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
      const correctOption = question.options.find((option) => option.isCorrect); // Find the correct option
      const selectedOption = answers[question._id]; // Get user's selected option
      
      if (correctOption && selectedOption && selectedOption.text === correctOption.text) {
        correctCount++;
      }
    });
  
    setScore(correctCount);
  };
  

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
      {!selectedQuiz ? (
        <div className="flex justify-center w-full">
          <button className="p-3 bg-teal-500 text-white rounded-md text-lg" onClick={() => setSelectedQuiz(quizzes[0])}>
            Start Quiz
          </button>
        </div>
      ) : showResults ? (
        <div className="w-full bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg">Your Score: <span className="font-semibold">{score}</span> / {selectedQuiz.questions.length}</p>
          <button
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md"
            onClick={() => {
              setSelectedQuiz(null);
              setCurrentQuestionIndex(0);
              setAnswers({});
              setShowResults(false);
            }}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          {/* Left Section: Quiz */}
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

          {/* Right Section: Progress Indicator */}
          <div className="lg:w-1/3 w-full bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Progress</h2>
            <div className="grid grid-cols-5 gap-2">
              {selectedQuiz.questions.map((q, index) => (
                <div
                  key={q._id}
                  className={`w-10 h-10 flex items-center justify-center rounded-md text-white font-bold transition-all ${
                    answers[q._id] ? "bg-teal-600" : "bg-teal-600"
                  } ${currentQuestionIndex === index ? "border-2 bg-teal-600" : ""}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Quizzes;
