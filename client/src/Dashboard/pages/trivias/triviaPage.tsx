import trivia from "../../../assets/trivia.jpeg";
import { useNavigate } from "react-router-dom";

const TriviaPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">Trivia Levels</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            title: "Easy",
            description: "Start your trivia journey with beginner-level questions. Perfect for newcomers!",
            path: "/member/bibleTrivia/trivia/beginner",
          },
          {
            title: "Medium",
            description: "Challenge yourself with intermediate-level questions. Ideal with some experience!",
            path: "/member/bibleTrivia/trivia/intermediate",
          },
          {
            title: "Hard",
            description: "Test your knowledge with advanced-level questions. Perfect for trivia experts!",
            path: "/member/bibleTrivia/trivia/advanced",
          },
        ].map((level, index) => (
          <div key={index} className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105">
            <img src={trivia} alt={level.title} className="w-full h-52 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{level.title}</h2>
              <p className="text-gray-700 mb-6">{level.description}</p>
              <button 
              onClick={() => navigate(level.path)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300">
                Start {level.title} Trivia
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TriviaPage;
