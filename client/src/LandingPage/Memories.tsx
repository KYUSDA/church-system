import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { client } from "@/utils/client";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useQuery } from "@tanstack/react-query";

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

/* Helper function to determine image orientation */
const getImageOrientation = (
  url: string,
): Promise<"portrait" | "landscape" | "square"> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.width > img.height) {
        resolve("landscape");
      } else if (img.height > img.width) {
        resolve("portrait");
      } else {
        resolve("square");
      }
    };
    img.onerror = () => resolve("square"); // Default to square on error
    img.src = url;
  });
};

/* Image Component with dynamic orientation */
const DynamicImage = ({
  image,
  onClick,
  className = "",
  style = {},
}: {
  image: Image;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [orientation, setOrientation] = useState<
    "portrait" | "landscape" | "square"
  >("square");

  useEffect(() => {
    getImageOrientation(image.imageurl).then(setOrientation);
  }, [image.imageurl]);

  const getAspectRatio = () => {
    switch (orientation) {
      case "portrait":
        return "3/4";
      case "landscape":
        return "4/3";
      default:
        return "1/1";
    }
  };

  return (
    <div className={`cursor-pointer group ${className}`} onClick={onClick}>
      <div className="relative overflow-hidden rounded-3xl h-full w-full">
        <LazyLoadImage
          src={image.imageurl}
          alt={image.altText}
          effect="blur"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          style={{
            aspectRatio: getAspectRatio(),
            ...style,
          }}
        />
        <div className="absolute inset-0 bg-black opacity-0" />
      </div>
    </div>
  );
};

const fetchGallery = async (): Promise<GalleryData> => {
  const data = await client.fetch(`*[_type == "gallery"]{
    images[]{
      "imageurl": imageurl.asset->url,
      altText
    }
  }`);
  return data[0];
};

function Memories() {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const imagesPerPage = 15;

 const { data: galleryData = null, isLoading } = useQuery({
   queryKey: ["gallery"],
   queryFn: fetchGallery,
 });

  if (isLoading) {
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
        {/* First Row: Large portrait area + 6 images in 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Large Portrait Area - first image takes full height */}
          {currentImages[0] && (
            <DynamicImage
              image={currentImages[0]}
              onClick={() => handleOpenModal(0)}
              className="md:row-span-2"
            />
          )}

          {/* Top Right Section - 3 columns with 2 rows */}
          <div className="md:col-span-3 grid grid-cols-3 gap-4">
            {currentImages.slice(1, 7).map((image, idx) => (
              <DynamicImage
                key={idx}
                image={image}
                onClick={() => handleOpenModal(idx + 1)}
                className="h-full"
              />
            ))}
          </div>
        </div>

        {/* Second Row: 3 images in landscape-friendly container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentImages.slice(7, 10).map((image, idx) => (
            <DynamicImage
              key={idx}
              image={image}
              onClick={() => handleOpenModal(idx + 7)}
              className="h-full"
            />
          ))}
        </div>

        {/* Third Row: 5 images in flexible grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {currentImages.slice(10, 15).map((image, idx) => (
            <DynamicImage
              key={idx}
              image={image}
              onClick={() => handleOpenModal(idx + 10)}
              className="h-full"
            />
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
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={prevSlide}
            className="absolute left-5 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-5 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          <div className="max-w-6xl max-h-[85vh] w-full flex justify-center items-center">
            <LazyLoadImage
              src={allImages[slideNumber].imageurl}
              alt={allImages[slideNumber].altText}
              effect="blur"
              className="object-contain max-w-full max-h-[85vh] w-auto h-auto"
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {slideNumber + 1} / {allImages.length}
          </div>
        </div>
      )}

      {/* Main Section */}
      <section
        className="py-16 px-6 relative"
        style={{
          backgroundImage: `url('/back5.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Optional overlay for better readability */}
        <div className="absolute inset-0 bg-white/50" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 mb-12 lg:mb-16">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-7 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600">
                Gallery
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-slate-900 mb-4">
              Explore our <em className="italic text-blue-600">Gallery</em>
            </h2>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-lg">
              Memories - Cherish the moments we've shared together as a
              community
            </p>
          </div>

          {/* Dynamic Masonry Grid Layout */}
          {renderImageGrid()}
          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 pt-4">
              <button
                onClick={handlePrevious}
                className="p-3 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <span className="text-sm text-gray-700 font-medium">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={handleNext}
                className="p-3 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Memories;
