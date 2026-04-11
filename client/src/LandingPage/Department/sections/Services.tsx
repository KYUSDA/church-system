import { Star } from "lucide-react";
import { ServicesSection } from "./department";

interface ServiceProps {
  data: ServicesSection;
}

function Services({ data }: ServiceProps) {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {data.title.split(" ").map((word, index) => {
              // Highlight words like "services", "Core", etc. in blue
              const blueWords = ["services", "core", "our"];
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
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white fill-white" />
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No services available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;
