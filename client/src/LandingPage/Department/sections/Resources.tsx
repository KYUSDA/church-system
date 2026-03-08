import { ArrowRight } from "lucide-react";
import { ResourcesSection } from "./department";
import { client, urlFor } from "@/utils/client";
import { useNavigate } from "react-router-dom";
import { getFileAsset } from "@sanity/asset-utils";

interface ResourceProps {
  data: ResourcesSection;
}

function Resources({ data }: ResourceProps) {
  const navigate = useNavigate();

  const displayedResources = data.resources.slice(0, 6);

  // Move this logic INSIDE the map
  const getResourceUrl = (
    resource: any,
  ): { url: string; isExternal: boolean } => {
    const hasFile = resource.file?.asset?._ref;
    const hasLink = resource.link && resource.link.trim() !== "";

    if (hasFile) {
      const fileAsset = getFileAsset(resource.file, client.config());
      return { url: fileAsset.url, isExternal: true };
    }

    if (hasLink) {
      return {
        url: resource.link,
        isExternal: resource.link.startsWith("http"),
      };
    }

    return { url: "#", isExternal: false };
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {data.title.split(" ").map((word, index) => {
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
          {displayedResources.map((resource, index) => {
            const { url, isExternal } = getResourceUrl(resource); // ✅ called per resource

            return (
              <div key={index} className="overflow-hidden">
                {resource.image && (
                  <div className="relative bg-white rounded-2xl aspect-[3/4]">
                    <img
                      src={urlFor(resource.image).url()}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="py-6 px-2 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight min-h-[3rem]">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {resource.description}
                  </p>

                  {url !== "#" && (
                    <a
                      href={url}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-colors group"
                    >
                      <span>Get resource</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {data.resources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No resources available at the moment.
            </p>
          </div>
        )}

        {data.resources.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/resources")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition"
            >
              See All Resources
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Resources;
