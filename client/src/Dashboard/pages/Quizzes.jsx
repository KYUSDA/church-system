import React, { useEffect, useState } from "react";
import { client } from "../../client";

// interface IQuiz {
//   _id: string;
//   title: string;
//   image: string;
//   description: string;
//   questions: Array<{
//     _id: string;
//     questionText: string;
//     options: Array<{
//       text: string;
//       isCorrect: boolean;
//     }>;
//   }>;
//   week: number;
//   completed: boolean;
//   score: number;
//   totalQuestions: number;
// }

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    client
      .fetch(`*[_type == "quiz"]{_id, title, questions}`)
      .then((data) => setQuizzes(data))
      .catch(console.error);
  }, []);

  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-6">
      {/* Left Section: Quiz Questions */}
      <div className="lg:w-2/3 w-full bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Select a Quiz</h2>
        <div>
          {quizzes.map((quiz) => (
            <button
              key={quiz._id}
              onClick={() => setSelectedQuiz(quiz)}
              className="block w-full text-left px-4 py-2 border-b hover:bg-gray-100"
            >
              {quiz.title}
            </button>
          ))}
        </div>
        {selectedQuiz && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{selectedQuiz.title}</h3>
            {selectedQuiz.questions.map((q, index) => (
              <div key={q._id} className="mb-4">
                <p className="font-medium">{index + 1}. {q.questionText}</p>
                {q.options.map((option, i) => (
                  <label key={i} className="block cursor-pointer">
                    <input
                      type="radio"
                      name={q._id}
                      value={option.text}
                      onChange={() => handleAnswer(q._id, option)}
                      className="mr-2"
                    />
                    {option.text}
                  </label>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Right Section: Progress Indicator */}
      <div className="lg:w-1/3 w-full bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Progress</h2>
        <div className="grid grid-cols-5 gap-2">
          {selectedQuiz?.questions.map((q, index) => (
            <div
              key={q._id}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                answers[q._id] ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quizzes;
