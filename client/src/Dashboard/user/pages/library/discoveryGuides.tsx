import React from "react";
import {
  FaBookOpen,
  FaDownload,
  FaMapMarkedAlt,
  FaGlobeAmericas,
  FaMountain,
  FaCity,
} from "react-icons/fa";

function DiscoveryGuides() {
  // Sample discovery guides data
  const guides = [
    {
      id: 1,
      title: "Urban Exploration Guide",
      description: "Discover hidden gems in major cities around the world",
      type: "urban",
      pages: 42,
      fileSize: "5.2 MB",
    },
    {
      id: 2,
      title: "National Parks Handbook",
      description: "Complete guide to all national parks with trail maps",
      type: "nature",
      pages: 86,
      fileSize: "12.1 MB",
    },
    {
      id: 3,
      title: "Cultural Heritage Trails",
      description: "Explore world heritage sites and cultural landmarks",
      type: "culture",
      pages: 64,
      fileSize: "8.7 MB",
    },
    {
      id: 4,
      title: "Coastal Adventures",
      description: "Best beaches and coastal routes for summer explorers",
      type: "nature",
      pages: 38,
      fileSize: "4.9 MB",
    },
    {
      id: 5,
      title: "Metropolis Architect",
      description: "Architectural wonders of modern cities",
      type: "urban",
      pages: 55,
      fileSize: "7.3 MB",
    },
    {
      id: 6,
      title: "Ancient Civilizations",
      description: "Guide to archaeological sites and ancient ruins",
      type: "culture",
      pages: 72,
      fileSize: "9.5 MB",
    },
  ];

  // Icon mapping based on guide type
  const getGuideIcon = (type:string) => {
    switch (type) {
      case "urban":
        return <FaCity className="text-blue-500 text-2xl" />;
      case "nature":
        return <FaMountain className="text-green-500 text-2xl" />;
      case "culture":
        return <FaGlobeAmericas className="text-yellow-500 text-2xl" />;
      default:
        return <FaMapMarkedAlt className="text-gray-500 text-2xl" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Discovery Guides
        </h1>
        <p className="text-lg text-gray-600">
          Explore the world with our curated collection of guides
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="mr-3">{getGuideIcon(guide.type)}</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {guide.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{guide.description}</p>

              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>{guide.pages} pages</span>
                <span>{guide.fileSize}</span>
              </div>

              <div className="flex justify-between border-t pt-4">
                <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <FaBookOpen className="mr-2" />
                  Read Guide
                </button>
                <button className="flex items-center text-green-600 hover:text-green-800 transition-colors">
                  <FaDownload className="mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state (hidden by default) */}
      <div className="hidden text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
          <FaMapMarkedAlt className="w-full h-full" />
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No guides available
        </h3>
        <p className="mt-1 text-gray-500">
          New discovery guides are coming soon.
        </p>
      </div>
    </div>
  );
}

export default DiscoveryGuides;
