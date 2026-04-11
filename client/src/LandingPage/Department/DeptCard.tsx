import { useState } from "react";
import { urlFor } from "../../utils/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Department } from "./Departments";
import { X } from "lucide-react";

const DeptCard = ({
  department,
  index,
}: {
  department: Department;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Check if department has sections - if yes, navigate; if no, show dialog
  const hasSections =
    department.sections &&
    Array.isArray(department.sections) &&
    department.sections.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (!hasSections) {
      e.preventDefault();
      setIsOpen(true);
    }
    // If hasSections is true, Link's default behavior will navigate
  };

  const CardContent = (
    <>
      {/* Index Badge */}
      <span
        className="absolute top-3 left-4 z-20
                   font-serif text-[11px] tracking-widest text-white/90
                   bg-black/20 backdrop-blur-sm
                   px-2.5 py-1 rounded-full pointer-events-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden flex-shrink-0">
        <LazyLoadImage
          src={urlFor(department.imgUrl).url()}
          alt={department.title}
          effect="blur"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 pt-5 pb-5 gap-2.5">
        <h3 className="font-serif text-xl font-normal text-slate-900 leading-snug tracking-tight">
          {department.title}
        </h3>

        <p className="text-sm leading-relaxed text-slate-500 line-clamp-3 flex-1">
          {department.description}
        </p>

        {/* Tags */}
        {department.tags &&
          Array.isArray(department.tags) &&
          department.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {department.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-semibold tracking-widest uppercase
                             bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

        {/* CTA Row */}
        <div
          className="flex items-center gap-1.5 mt-2 pt-4 border-t border-stone-100
                     text-[13px] font-semibold text-blue-600"
        >
          <span>{hasSections ? "Explore" : "View Details"}</span>
          <svg
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M4 10H16M12 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]
                   bg-gradient-to-r from-blue-600 to-blue-400
                   scale-x-0 origin-left transition-transform duration-300 ease-out
                   group-hover:scale-x-100"
      />
    </>
  );

  return (
    <>
      {hasSections ? (
        // Link to details page for departments with sections
        <Link
          to={`/Departments/${department._id}`}
          className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden
                     transition-all duration-300 ease-out
                     hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-12px_rgba(37,99,235,0.15)] hover:border-blue-200"
          aria-label={`Explore ${department.title} department`}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {CardContent}
        </Link>
      ) : (
        // Button that opens dialog for departments without sections
        <button
          onClick={handleClick}
          className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden
                     transition-all duration-300 ease-out text-left w-full
                     hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-12px_rgba(37,99,235,0.15)] hover:border-blue-200"
          aria-label={`View ${department.title} department details`}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {CardContent}
        </button>
      )}

      {/* Dialog Modal - Only for departments without sections */}
      {!hasSections && isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-30 flex items-center justify-center w-10 h-10 rounded-full
                         bg-white/90 backdrop-blur-sm text-slate-600 hover:text-slate-900 hover:bg-white
                         transition-all duration-200 shadow-lg"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Hero Image */}
              <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden flex-shrink-0">
                <img
                  src={urlFor(department.imgUrl).url()}
                  alt={department.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-tight">
                    {department.title}
                  </h2>
                  {department.tags &&
                    Array.isArray(department.tags) &&
                    department.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {department.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-semibold tracking-widest uppercase
                                       bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 sm:p-8 lg:p-10">
                {/* Description */}
                {department.description && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400 mb-3">
                      About
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                      {department.description}
                    </p>
                  </div>
                )}

                {/* Info Notice */}
                <div className="mt-8 p-6 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-sm text-slate-600 text-center">
                    This department currently has no additional sections or
                    detailed information.
                    <br />
                    Check back later for updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeptCard;
