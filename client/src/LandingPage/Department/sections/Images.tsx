import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImagesSection } from "./department";
import { useState } from "react";

interface ImagesProps {
  data: ImagesSection;
}

function Images({ data }: ImagesProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 7;
  const totalPages = Math.ceil(data.images.length / imagesPerPage);

  const getCurrentImages = () => {
    const start = currentPage * imagesPerPage;
    const end = start + imagesPerPage;
    return data.images.slice(start, end);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentImages = getCurrentImages();

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {data.title}
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Masonry Grid Layout */}
        <div className="space-y-4 mb-8">
          {/* First Row: Large portrait + 2 medium landscape */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large Portrait Image */}
            {currentImages[0] && (
              <div className="md:row-span-2">
                <img
                  src={currentImages[0].url}
                  alt={currentImages[0].altText}
                  className="w-full h-full object-cover rounded-3xl"
                  style={{ minHeight: "500px", maxHeight: "600px" }}
                />
              </div>
            )}

            {/* Top Right Section - 2 columns */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {/* Small landscape */}
              {currentImages[1] && (
                <div>
                  <img
                    src={currentImages[1].url}
                    alt={currentImages[1].altText}
                    className="w-full h-full object-cover rounded-3xl"
                    style={{ aspectRatio: "16/10" }}
                  />
                </div>
              )}

              {/* Small square/badge */}
              {currentImages[2] && (
                <div>
                  <img
                    src={currentImages[2].url}
                    alt={currentImages[2].altText}
                    className="w-full h-full object-cover rounded-3xl"
                    style={{ aspectRatio: "1/1" }}
                  />
                </div>
              )}

              {/* Medium uniform */}
              {currentImages[3] && (
                <div>
                  <img
                    src={currentImages[3].url}
                    alt={currentImages[3].altText}
                    className="w-full h-full object-cover rounded-3xl"
                    style={{ aspectRatio: "3/4" }}
                  />
                </div>
              )}

              {/* Portrait person */}
              {currentImages[4] && (
                <div>
                  <img
                    src={currentImages[4].url}
                    alt={currentImages[4].altText}
                    className="w-full h-full object-cover rounded-3xl"
                    style={{ aspectRatio: "3/4" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Second Row: 2 wide landscape images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentImages[5] && (
              <div>
                <img
                  src={currentImages[5].url}
                  alt={currentImages[5].altText}
                  className="w-full h-full object-cover rounded-3xl"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            )}

            {currentImages[6] && (
              <div>
                <img
                  src={currentImages[6].url}
                  alt={currentImages[6].altText}
                  className="w-full h-full object-cover rounded-3xl"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 pt-4">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Images;
