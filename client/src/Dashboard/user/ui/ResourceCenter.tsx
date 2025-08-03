import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Music,
  BookOpen,
  GraduationCap,
  Map,
  Sparkles,
} from "lucide-react";
import Sermons from "../pages/library/sermons";
import Songs from "../pages/library/songs";
import Books from "../pages/library/books";
import Lessons from "../pages/library/lessons";
import DiscoveryGuides from "../pages/library/discoveryGuides";

const tabs = [
  { label: "Sermons", key: "sermons", icon: Video, color: "bg-blue-500" },
  { label: "Songs", key: "songs", icon: Music, color: "bg-purple-500" },
  { label: "Books", key: "books", icon: BookOpen, color: "bg-green-500" },
  {
    label: "Lessons",
    key: "lessons",
    icon: GraduationCap,
    color: "bg-yellow-500",
  },
  {
    label: "Discovery Guides",
    key: "discoveryGuides",
    icon: Map,
    color: "bg-red-500",
  },
];

const ResourceCenter = () => {
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
    <>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resource Center
              </h1>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Discover spiritual content, worship music, educational materials,
              and more to enrich your faith journey
            </p>
          </div>

          {/* Active Tab Indicator (Mobile) */}
          <div className="block sm:hidden mb-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
                {(() => {
                  const activeTabData = tabs.find(
                    (tab) => tab.key === activeTab
                  );
                  const IconComponent = activeTabData?.icon;
                  const colorClass = activeTabData?.color.replace("bg-", "");

                  return (
                    <>
                      {IconComponent && (
                        <IconComponent
                          className="h-4 w-4"
                          style={{ color: colorClass }}
                        />
                      )}
                      <span
                        className="text-sm font-medium"
                        style={{ color: colorClass }}
                      >
                        {activeTabData?.label}
                      </span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8 h-auto p-1 bg-white/70 backdrop-blur-sm shadow-lg rounded-xl">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.key;
                const colorClass = tab.color.replace("bg-", "");

                return (
                  <TabsTrigger
                    key={tab.key}
                    value={tab.key}
                    className={`
                    relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 
                    h-16 sm:h-12 p-2 sm:p-3 text-xs sm:text-sm font-medium 
                    rounded-lg transition-all duration-300 ease-in-out
                    border-2 border-transparent overflow-hidden
                    hover:bg-gray-50 hover:scale-105 hover:shadow-md
                    data-[state=active]:border-white
                    data-[state=active]:shadow-xl data-[state=active]:scale-105
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-800"
                    }
                  `}
                    style={{
                      backgroundColor: isActive ? colorClass : "transparent",
                      boxShadow: isActive
                        ? `0 10px 25px ${colorClass}40`
                        : undefined,
                    }}
                  >
                    {/* Animated background gradient for active state */}
                    {isActive && (
                      <div
                        className="absolute inset-0 opacity-20 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"
                        style={{
                          background: `linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)`,
                          animation: "shimmer 3s ease-in-out infinite",
                        }}
                      />
                    )}

                    <IconComponent
                      className={`
                    h-4 w-4 sm:h-4 sm:w-4 relative z-10
                    ${isActive ? "animate-bounce" : "hover:scale-110"} 
                    transition-transform duration-200
                  `}
                    />
                    <span className="text-xs sm:text-sm font-medium truncate relative z-10">
                      {tab.label}
                    </span>

                    {/* Active indicator dot */}
                    {isActive && (
                      <div
                        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: "white" }}
                      />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Content */}
            <div className="min-h-[60vh]">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                const colorClass = tab.color.replace("bg-", "");

                return (
                  <TabsContent
                    key={tab.key}
                    value={tab.key}
                    className={`
                    mt-0 transition-all duration-500 ease-in-out
                    ${
                      isActive
                        ? "animate-in fade-in-0 slide-in-from-bottom-4"
                        : ""
                    }
                  `}
                  >
                    <Card
                      className={`
                    border-0 shadow-xl bg-white/90 backdrop-blur-sm 
                    hover:shadow-2xl transition-all duration-300
                    ${isActive ? "scale-100" : "scale-95"}
                  `}
                    >
                      <CardContent className="p-4 sm:p-6 lg:p-8">
                        <div
                          className={`
                        transition-all duration-700 ease-out
                        ${
                          isActive
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }
                      `}
                        >
                          {renderContent()}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ResourceCenter;
