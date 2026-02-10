import { ArrowRight } from "lucide-react";
import { ResourcesSection } from "./department";
import { urlFor } from "@/utils/client";

interface ResourceProps {
  data: ResourcesSection;
}

function Resources({ data }: ResourceProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {data.title.split(" ").map((word, index) => {
              // Check if word contains "Bible" or "Guides" or any word that should be blue
              const blueWords = [
                "Bible",
                "Guides",
                "Resources",
                "Study",
                "Discover",
              ];
              const isBlue = blueWords.some((blueWord) =>
                word.toLowerCase().includes(blueWord.toLowerCase()),
              );

              return isBlue ? (
                <span key={index} className="text-blue-500">
                  {" "}
                  {word}
                </span>
              ) : (
                <span key={index}> {word}</span>
              );
            })}
          </h2>
          <p className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.resources.map((resource, index) => (
            <div key={index} className="overflow-hidden">
              {/* Resource Image */}
              <div className="relative bg-white rounded-2xl aspect-[3/4]">
                <img
                  src={urlFor(resource.image).url()}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Resource Content */}
              <div className="py-6 px-2 space-y-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 leading-tight min-h-[3rem]">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {resource.description}
                </p>

                {/* Get Resource Button */}
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-colors group"
                >
                  <span>Get resource</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.resources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No resources available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Resources;
