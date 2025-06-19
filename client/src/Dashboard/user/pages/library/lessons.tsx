import React from "react";
import { FaBookOpen, FaDownload, FaClock, FaFilePdf } from "react-icons/fa";

function Lessons() {
  // Sample lesson data
  const lessons = [
    {
      id: 1,
      title: "Introduction to React",
      description:
        "Learn the fundamentals of React including components, props, and state.",
      duration: "45 min",
      type: "pdf",
      fileSize: "2.4 MB",
    },
    {
      id: 2,
      title: "Advanced State Management",
      description:
        "Deep dive into state management with Context API and Redux.",
      duration: "60 min",
      type: "video",
      fileSize: "156 MB",
    },
    {
      id: 3,
      title: "React Hooks Masterclass",
      description: "Master all React hooks from useState to custom hooks.",
      duration: "90 min",
      type: "pdf",
      fileSize: "3.1 MB",
    },
    {
      id: 4,
      title: "Building Responsive UIs",
      description:
        "Create responsive layouts with Tailwind CSS in React applications.",
      duration: "30 min",
      type: "pdf",
      fileSize: "1.8 MB",
    },
    {
      id: 5,
      title: "Performance Optimization",
      description: "Techniques to optimize React application performance.",
      duration: "50 min",
      type: "video",
      fileSize: "210 MB",
    },
    {
      id: 6,
      title: "Testing React Applications",
      description:
        "Complete guide to testing with Jest and React Testing Library.",
      duration: "75 min",
      type: "pdf",
      fileSize: "4.2 MB",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Available Lessons
        </h1>
        <p className="text-lg text-gray-600">
          Browse and access all learning materials
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-5">
              <div className="flex items-center mb-3">
                {lesson.type === "pdf" ? (
                  <FaFilePdf className="text-red-500 text-2xl mr-3" />
                ) : (
                  <div className="text-blue-500 text-2xl mr-3">🎬</div>
                )}
                <h3 className="text-xl font-semibold text-gray-800">
                  {lesson.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{lesson.description}</p>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <FaClock className="mr-1" />
                <span className="mr-4">{lesson.duration}</span>
                <span>{lesson.fileSize}</span>
              </div>

              <div className="flex justify-between border-t pt-4">
                <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <FaBookOpen className="mr-2" />
                  Read
                </button>
                <button className="flex items-center text-green-600 hover:text-green-800 transition-colors">
                  <FaDownload className="mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state (hidden by default) */}
      <div className="hidden text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          <FaBookOpen className="w-full h-full" />
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No lessons available
        </h3>
        <p className="mt-1 text-gray-500">
          Check back later for new learning materials.
        </p>
      </div>
    </div>
  );
}

export default Lessons;
