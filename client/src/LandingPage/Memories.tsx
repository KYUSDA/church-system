import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { client } from "@/utils/client";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Image {
  imageurl: string;
  altText: string;
}

interface GalleryData {
  images: Image[];
}

/* Skeleton Card */
const SkeletonCard = () => (
  <div
    className="bg-gray-300 rounded-3xl animate-pulse"
    style={{ aspectRatio: "1/1" }}
  />
);

function Memories() {
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const imagesPerPage = 15;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "gallery"]{
      images[]{
        "imageurl": imageurl.asset->url,
        altText
      }
    }`;

    client
      .fetch(query)
      .then((data) => {
        setGalleryData(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gallery data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center space-y-3 mb-12">
            <div className="h-10 w-48 bg-gray-300 rounded-full mx-auto animate-pulse" />
            <div className="h-5 w-96 bg-gray-200 rounded-full mx-auto animate-pulse" />
          </div>

          {/* Grid Skeleton */}
          <div className="space-y-4 mb-8">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:row-span-2">
                <SkeletonCard />
              </div>
              <div className="md:col-span-3 grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!galleryData || !galleryData.images.length)
    return <div className="text-center py-16">No memories found</div>;

  const totalPages = Math.ceil(galleryData.images.length / imagesPerPage);
  const allImages = galleryData.images;

  const getCurrentImages = () => {
    const start = currentPage * imagesPerPage;
    const end = start + imagesPerPage;
    return allImages.slice(start, end);
  };

  const handleOpenModal = (index: number) => {
    const actualIndex = currentPage * imagesPerPage + index;
    setSlideNumber(actualIndex);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const prevSlide = () => {
    setSlideNumber(slideNumber === 0 ? allImages.length - 1 : slideNumber - 1);
  };

  const nextSlide = () => {
    setSlideNumber(slideNumber + 1 === allImages.length ? 0 : slideNumber + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentImages = getCurrentImages();

  const renderImageGrid = () => {
    return (
      <div className="space-y-4 mb-8">
        {/* First Row: Large portrait + 6 mixed sizes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Large Portrait Image */}
          {currentImages[0] && (
            <div
              className="md:row-span-2 cursor-pointer group"
              onClick={() => handleOpenModal(0)}
            >
              <div className="relative overflow-hidden rounded-3xl h-full">
                <LazyLoadImage
                  src={currentImages[0].imageurl}
                  alt={currentImages[0].altText}
                  effect="blur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ minHeight: "500px", maxHeight: "600px" }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
            </div>
          )}

          {/* Top Right Section - 3 columns */}
          <div className="md:col-span-3 grid grid-cols-3 gap-4">
            {currentImages.slice(1, 7).map((image, idx) => (
              <div
                key={idx}
                className="cursor-pointer group"
                onClick={() => handleOpenModal(idx + 1)}
              >
                <div className="relative overflow-hidden rounded-3xl h-full">
                  <LazyLoadImage
                    src={image.imageurl}
                    alt={image.altText}
                    effect="blur"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{
                      aspectRatio:
                        idx === 0 ? "16/10" : idx === 1 ? "1/1" : "3/4",
                    }}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row: 3 wide landscape images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentImages.slice(7, 10).map((image, idx) => (
            <div
              key={idx}
              className="cursor-pointer group"
              onClick={() => handleOpenModal(idx + 7)}
            >
              <div className="relative overflow-hidden rounded-3xl h-full">
                <LazyLoadImage
                  src={image.imageurl}
                  alt={image.altText}
                  effect="blur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ aspectRatio: "16/9" }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Third Row: 5 mixed images */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {currentImages.slice(10, 15).map((image, idx) => (
            <div
              key={idx}
              className="cursor-pointer group"
              onClick={() => handleOpenModal(idx + 10)}
            >
              <div className="relative overflow-hidden rounded-3xl h-full">
                <LazyLoadImage
                  src={image.imageurl}
                  alt={image.altText}
                  effect="blur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{ aspectRatio: idx % 2 === 0 ? "1/1" : "3/4" }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-50 p-4">
          <button
            onClick={handleCloseModal}
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={prevSlide}
            className="absolute left-5 text-white hover:text-gray-300 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-5 text-white hover:text-gray-300 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          <div className="max-w-4xl max-h-[80vh] flex justify-center items-center">
            <LazyLoadImage
              src={allImages[slideNumber].imageurl}
              alt={allImages[slideNumber].altText}
              effect="blur"
              className="object-contain w-full h-full"
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {slideNumber + 1} / {allImages.length}
          </div>
        </div>
      )}

      {/* Main Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Memories
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Cherish the moments we've shared together as a community
            </p>
          </div>

          {/* Masonry Grid Layout */}
          {renderImageGrid()}

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
              <span className="text-sm text-gray-600">
                {currentPage + 1} / {totalPages}
              </span>
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
    </>
  );
}

export default Memories;
