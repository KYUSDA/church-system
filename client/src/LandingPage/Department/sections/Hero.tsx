import { urlFor } from "@/utils/client";
import { Link } from "react-router-dom";
import { HeroSection } from "./department";

interface HeroProps {
  data: HeroSection;
}

function Hero({ data }: HeroProps) {
  if (!data) {
    return null;
  }
  const { title, description, image, buttons } = data;

  // Helper function to get button styles based on style type
  const getButtonClasses = (style?: string) => {
    const baseClasses =
      "px-8 py-3.5 rounded-full font-semibold transition-all duration-300 text-center inline-block text-base md:text-lg";

    switch (style) {
      case "secondary":
        return `${baseClasses} bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900`;
      case "primary":
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl`;
    }
  };

  // Split title by lines if it contains "and"
  const renderTitle = () => {
    if (title.includes(" and ") && !title.includes("\n")) {
      const parts = title.split(" and ");
      return (
        <>
          {parts[0]} and
          <br />
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      {image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${urlFor(image).width(1920).quality(80).url()})`,
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-tight mb-6 md:mb-8 uppercase tracking-wide">
          {renderTitle()}
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed max-w-4xl mx-auto font-normal">
          {description}
        </p>

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {buttons.map((button, index) => (
              <Link
                key={index}
                to={button.url}
                className={getButtonClasses(button.style)}
              >
                {button.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
