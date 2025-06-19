
import React, { useState } from "react";
import {
  PlayCircleFilled,
  CalendarToday,
  AccessTime,
  Person,
  Close,
} from "@mui/icons-material";
// @ts-ignore
import YouTubeModule from "react-youtube";
const YouTube = (YouTubeModule as any).default || YouTubeModule;

interface Sermon {
  id: number;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  thumbnail: string;
  description: string;
  category: string;
  videoUrl: string; // YouTube video ID (e.g., "dQw4w9WgXcQ")
}

const Sermons: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Sermon | null>(null);

  const sermons: Sermon[] = [
    {
      id: 1,
      title: "The Power of Faith",
      preacher: "Pastor John Smith",
      date: "2023-10-15",
      duration: "45:22",
      thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
      description: "Exploring how faith can move mountains...",
      category: "Faith",
      videoUrl: "7iChlFdTyKk",
    },
    // Add other sermons similarly with videoUrl
  ];

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen my-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Sermons & Teachings
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Biblical messages to inspire and transform your life
        </p>
      </div>

      <div className="grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
        {sermons.map((sermon) => (
          <div
            key={sermon.id}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                className="h-48 w-full object-cover"
                src={sermon.thumbnail}
                alt={sermon.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                  {sermon.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedVideo(sermon)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-blue-300 transition-colors"
              >
                <PlayCircleFilled style={{ fontSize: "3rem" }} />
              </button>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {sermon.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  <Person className="inline mr-1" fontSize="small" />
                  {sermon.preacher}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {sermon.description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarToday className="mr-1" fontSize="small" />
                  {formatDate(sermon.date)}
                </div>
                <div className="flex items-center">
                  <AccessTime className="mr-1" fontSize="small" />
                  {sermon.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <Close />
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <YouTube
                videoId={selectedVideo.videoUrl}
                opts={{ width: "100%", height: "400" }}
              />
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {selectedVideo.title}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sermons;
