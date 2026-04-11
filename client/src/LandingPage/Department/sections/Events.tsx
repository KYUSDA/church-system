import { ArrowRight } from "lucide-react";
import { EventsSection } from "./department";
import { urlFor } from "@/utils/client";

interface EventsProps {
  data: EventsSection;
}

function Events({ data }: EventsProps) {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Upcoming <span className="text-blue-500">Events</span>
          </h2>
          <div className="w-32 h-1 bg-blue-500 mx-auto"></div>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed mt-6">
            {data.description}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Event Image */}
              {event.imgUrl && (
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.imgUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Event Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  {event.description}
                </p>

                {/* Register Link */}
                {event.links && event.links.length > 0 && (
                  <a
                    href={event.links[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
                  >
                    <span>Register here</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No events available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Events;
