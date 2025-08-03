import trivia from "../../../../assets/trivia.jpeg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const levels = [
  {
    title: "Easy",
    description:
      "Start your trivia journey with beginner-level questions. Perfect for newcomers!",
    path: "/member/bibleTrivia/trivia/beginner",
  },
  {
    title: "Medium",
    description:
      "Challenge yourself with intermediate-level questions. Ideal with some experience!",
    path: "/member/bibleTrivia/trivia/intermediate",
  },
  {
    title: "Hard",
    description:
      "Test your knowledge with advanced-level questions. Perfect for trivia experts!",
    path: "/member/bibleTrivia/trivia/advanced",
  },
];

const TriviaPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Easy");

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Bible Trivia Challenge
        </h1>
        <p className="text-gray-600 text-lg">
          Test your biblical knowledge across different difficulty levels
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {levels.map((level) => (
          <button
            key={level.title}
            onClick={() => setSelected(level.title)}
            className={`px-6 py-2 rounded-full font-semibold transition duration-200 ${
              selected === level.title
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {level.title}
          </button>
        ))}
      </div>

      {/* Card Content */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <img src={trivia} alt="Trivia" className="w-full h-48 object-cover" />
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selected}</h2>
          <p className="text-gray-700 mb-4">
            {levels.find((l) => l.title === selected)?.description}
          </p>
          <button
            onClick={() => {
              const path = levels.find((l) => l.title === selected)?.path;
              if (path) navigate(path);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Start {selected} Trivia
          </button>
        </div>
      </div>
    </div>
  );
};

export default TriviaPage;
