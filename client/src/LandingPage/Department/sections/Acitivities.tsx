import { urlFor } from "@/utils/client";
import { Activity } from "./department";
import { Star } from "lucide-react";

export interface ActivitySection {
  title: string;
  description: string;
  activities: Activity[];
}

interface ActivitiesProps {
  data: ActivitySection;
}

function Activities({ data }: ActivitiesProps) {
  if (!data || !data.activities || data.activities.length === 0) {
    return null;
  }

  const { title, description, activities } = data;

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

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              {activity.image && (
                <div className="relative h-48 md:h-52 overflow-hidden">
                  <img
                    src={urlFor(activity.image).width(600).quality(85).url()}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Activity Content */}
              <div className="p-6">
                {/* Icon shown only when there's no image */}
                {!activity.image && (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow mb-4">
                    <Star className="text-white w-6 h-6" />
                  </div>
                )}
                {/* Activity Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {activity.title}
                </h3>

                {/* Activity Period */}
                <p className="text-blue-600 font-semibold text-sm mb-3">
                  {activity.period}
                </p>

                {/* Activity Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Activities;
