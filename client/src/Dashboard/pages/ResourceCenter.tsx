import { useState } from "react";
import Sermons from "./library/sermons";
import Songs from "./library/songs";
import Books from "./library/books";
import Lessons from "./library/lessons";
import DiscoveryGuides from "./library/discoveryGuides";

const tabs = [
  { label: "Sermons", key: "sermons" },
  { label: "Songs", key: "songs" },
  { label: "Books", key: "books" },
  { label: "Lessons", key: "lessons" },
  { label: "Discovery Guides", key: "discoveryGuides" },
];

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState("sermons");

  const renderContent = () => {
    switch (activeTab) {
      case "sermons":
        return <Sermons />;
      case "songs":
        return <Songs />;
      case "books":
        return <Books />;
      case "lessons":
        return <Lessons />;
      case "discoveryGuides":
        return <DiscoveryGuides />;
      default:
        return <Sermons />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Horizontal Navigation */}
      {/* <nav className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-start sm:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.key
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav> */}

      {/* Filter Controls (optional) */}
      <div className="flex justify-center my-8">
        <div className="inline-flex rounded-md shadow-sm">
          {tabs.map((tab, idx) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          type="button"
          className={`px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50
            ${idx === 0 ? "rounded-l-lg" : ""}
            ${idx === tabs.length - 1 ? "rounded-r-lg" : ""}
            ${activeTab === tab.key ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-blue-100"}
            ${idx !== 0 ? "-ml-px" : ""}
          `}
        >
          {tab.label}
        </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">{renderContent()}</main>
    </div>
  );
};

export default LibraryPage;
