// components/About.tsx
import React from "react";
import { urlFor } from "@/utils/client";
import { AboutSection } from "./department";

interface AboutProps {
  data: AboutSection;
}

function About({ data }: AboutProps) {
  if (!data) {
    return null;
  }

  const { image, title, description, subtitle } = data;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2">
            {/* Subtitle */}
            {subtitle && (
              <p className="text-blue-500 font-semibold text-base md:text-lg mb-4 tracking-wide">
                About {subtitle}
              </p>
            )}

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {title}
            </h2>

            {/* Description */}
            {description && (
              <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-4">
                {description}
              </div>
            )}
          </div>

          {/* Image Section - Right Side */}
          <div className="lg:w-1/2 flex justify-center items-center">
            {image && (
              <div className="relative w-full max-w-lg">
                <img
                  src={urlFor(image).width(600).height(600).url()}
                  alt={title || "About section"}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>
      {/* divider */}
      <hr className="absolute bottom-0 left-0 w-full h-px bg-gray-200" />
      </div>
    </section>
  );
}

export default About;
