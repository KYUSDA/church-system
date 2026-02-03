import { urlFor } from "@/utils/client";
import { Leaders } from "./department";
import { User } from "lucide-react";

interface LeadersSection {
  title: string;
  description: string;
  leaders: Leaders[];
}

interface LeadersProps {
  data: LeadersSection;
}

function LeadersComponent({ data }: LeadersProps) {
  if (!data || !data.leaders || data.leaders.length === 0) {
    return null;
  }

  const { title, description, leaders } = data;

  // Split title into words for styling
  const titleWords = title?.split(" ") || [];
  const firstWord = titleWords[0] || "";
  const remainingWords = titleWords.slice(1).join(" ");

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="underline decoration-4 decoration-blue-600 underline-offset-8 inline-block">
              {firstWord}
            </span>{" "}
            <span className="text-blue-600">{remainingWords}</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center"
            >
              {/* Circular Leader Photo */}
              <div className="relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mb-5 md:mb-6">
                {leader.photo ? (
                  <img
                    src={urlFor(leader.photo)
                      .width(400)
                      .height(400)
                      .fit("crop")
                      .crop("focalpoint")
                      .focalPoint(0.5, 0.4)
                      .quality(90)
                      .url()}
                    alt={leader.name}
                    className="w-full h-full rounded-full object-cover ring-4 ring-gray-100 transition-transform duration-300 hover:ring-blue-100"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 ring-4 ring-gray-100">
                    <User
                      className="w-16 h-16 md:w-20 md:h-20 text-blue-400"
                      strokeWidth={1.5}
                    />
                  </div>
                )}
              </div>

              {/* Leader Info */}
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5">
                  {leader.name}
                </h3>
                <p className="text-gray-500 font-medium text-sm md:text-base">
                  {leader.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeadersComponent;
