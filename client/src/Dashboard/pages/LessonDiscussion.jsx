// import { useState } from "react";
// import Quizzes from './Quizzes';

// const quizzes = [
//   {
//     id: 1,
//     title: "The Existence of God",
//     image: "/Exists.jpeg",
//     description: "Explore philosophical and biblical reasons for God's existence.",
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "The Bible's Authority",
//     image: "/bible.jpeg",
//     description: "Understand why the Bible is reliable and authoritative.",
//     completed: true,
//     score: "8/10",
//   },
// ];

// const LessonDiscussion = () => {
//   const [selectedQuiz, setSelectedQuiz] = useState(null);

//   const currentQuizzes = quizzes.filter((quiz) => !quiz.completed);
//   const completedQuizzes = quizzes.filter((quiz) => quiz.completed);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">Defend Your Faith - Weekly Quizzes</h1>
//       {!selectedQuiz ? (
//         <>
//           {/* Current Quizzes */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4">Current Quizzes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {currentQuizzes.map((quiz) => (
//                 <div key={quiz.id} className="border p-4 rounded-lg shadow-lg">
//                   <img src={quiz.image} alt={quiz.title} className="w-full h-40 object-cover rounded-md mb-4" />
//                   <h2 className="text-xl font-semibold">{quiz.title}</h2>
//                   <p className="text-gray-600">{quiz.description}</p>
//                   <button
//                     onClick={() => setSelectedQuiz(quiz)}
//                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
//                   >
//                     Take Quiz
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Completed Quizzes */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Completed Quizzes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {completedQuizzes.map((quiz) => (
//                 <div key={quiz.id} className="border p-4 rounded-lg shadow-lg">
//                   <img src={quiz.image} alt={quiz.title} className="w-full h-40 object-cover rounded-md mb-4" />
//                   <h2 className="text-xl font-semibold">{quiz.title}</h2>
//                   <p className="text-gray-600">{quiz.description}</p>
//                   <div className="mt-4 text-green-600 font-semibold">Completed - Score: {quiz.score}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       ) : (
//         <QuizRenderer quiz={selectedQuiz} onBack={() => setSelectedQuiz(null)} />
//       )}
//     </div>
//   );
// };

// function QuizRenderer({ quiz, onBack }) {
//   return (
//     <div className="p-4 border rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold">{quiz.title}</h2>
//       <p className="text-gray-600 mb-4">{quiz.description}</p>
//       <button className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={onBack}>
//         Back to Quizzes
//       </button>
//       {/* Quiz questions will be rendered here */}
//       <Quizzes />
//     </div>
//   );
// }

// export default LessonDiscussion;

import { useState, useEffect } from "react";
import { client } from "../../client";
import Quizzes from "./Quizzes";

const LessonDiscussion = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    useEffect(() => {
        client
            .fetch(`*[_type == "quiz"]{_id, title, image, description, completed, score}`)
            .then((data) => setQuizzes(data))
            .catch(console.error);
    }, []);

    const currentQuizzes = quizzes.filter((quiz) => !quiz.completed);
    const completedQuizzes = quizzes.filter((quiz) => quiz.completed);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Defend Your Faith - Weekly Quizzes</h1>
            {!selectedQuiz ? (
                <>
                    {/* Current Quizzes */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Current Quizzes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentQuizzes.map((quiz) => (
                                <div key={quiz._id} className="border p-4 rounded-lg shadow-lg">
                                    <img src={quiz.image} alt={quiz.title} className="w-full h-40 object-cover rounded-md mb-4" />
                                    <h2 className="text-xl font-semibold">{quiz.title}</h2>
                                    <p className="text-gray-600">{quiz.description}</p>
                                    <button
                                        onClick={() => setSelectedQuiz(quiz)}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                                    >
                                        Take Quiz
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Completed Quizzes */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Completed Quizzes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {completedQuizzes.map((quiz) => (
                                <div key={quiz._id} className="border p-4 rounded-lg shadow-lg">
                                    <img src={quiz.image} alt={quiz.title} className="w-full h-40 object-cover rounded-md mb-4" />
                                    <h2 className="text-xl font-semibold">{quiz.title}</h2>
                                    <p className="text-gray-600">{quiz.description}</p>
                                    <div className="mt-4 text-green-600 font-semibold">Completed - Score: {quiz.score}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <QuizRenderer quiz={selectedQuiz} onBack={() => setSelectedQuiz(null)} />
            )}
        </div>
    );
};

function QuizRenderer({ quiz, onBack }) {
    return (
        <div className="p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{quiz.title}</h2>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={onBack}>
                Back to Quizzes
            </button>
            {/* Quiz questions will be rendered here */}
            <Quizzes />
        </div>
    );
}

export default LessonDiscussion;
