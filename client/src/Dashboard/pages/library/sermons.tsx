import React from "react";
import {
  PlayCircleFilled,
  CalendarToday,
  AccessTime,
  Person,
} from "@mui/icons-material";

interface Sermon {
  id: number;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  thumbnail: string;
  description: string;
  category: string;
}

const Sermons: React.FC = () => {
  // Sample data - replace with your actual data fetching logic
  const sermons: Sermon[] = [
    {
      id: 1,
      title: "The Power of Faith",
      preacher: "Pastor John Smith",
      date: "2023-10-15",
      duration: "45:22",
      thumbnail:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "Exploring how faith can move mountains in our daily lives and help us overcome challenges.",
      category: "Faith",
    },
    {
      id: 2,
      title: "Love Thy Neighbor",
      preacher: "Rev. Sarah Johnson",
      date: "2023-10-08",
      duration: "38:15",
      thumbnail:
        "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "Understanding the biblical command to love others as ourselves and practical ways to apply it.",
      category: "Relationships",
    },
    {
      id: 3,
      title: "Finding Peace in Chaos",
      preacher: "Dr. Michael Brown",
      date: "2023-10-01",
      duration: "52:40",
      thumbnail:
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "Biblical principles for maintaining inner peace during turbulent times in our lives.",
      category: "Peace",
    },
    {
      id: 4,
      title: "The Prodigal Son Returns",
      preacher: "Pastor John Smith",
      date: "2023-09-24",
      duration: "41:18",
      thumbnail:
        "https://images.unsplash.com/photo-1507553532144-b9df5e38c8d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "A fresh look at the parable of the prodigal son and its lessons for modern believers.",
      category: "Forgiveness",
    },
    {
      id: 5,
      title: "Walking in Purpose",
      preacher: "Rev. Sarah Johnson",
      date: "2023-09-17",
      duration: "47:33",
      thumbnail:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "Discovering and fulfilling God's unique purpose for your life through biblical examples.",
      category: "Purpose",
    },
    {
      id: 6,
      title: "The Armor of God",
      preacher: "Dr. Michael Brown",
      date: "2023-09-10",
      duration: "55:07",
      thumbnail:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "An in-depth study of Ephesians 6 and how to practically wear the full armor of God daily.",
      category: "Spiritual Warfare",
    },
  ];

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen my-4">
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Sermons & Teachings
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Biblical messages to inspire and transform your life
          </p>
        </div>

        {/* Filter Controls (optional) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium rounded-l-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              All Sermons
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Recent
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium rounded-r-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Most Viewed
            </button>
          </div>
        </div>

        {/* Sermons Grid */}
        <div className="grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <div
              key={sermon.id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
            >
              {/* Thumbnail */}
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
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-blue-300 transition-colors">
                  <PlayCircleFilled style={{ fontSize: "3rem" }} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
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

        {/* Pagination (optional) */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sermons;
