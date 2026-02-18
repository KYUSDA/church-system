import { urlFor } from "../../utils/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Department } from "./Departments";

const DeptCard = ({
  department,
  index,
}: {
  department: Department;
  index: number;
}) => {
  return (
    <Link
      to={`/Departments/${department._id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden
                 transition-all duration-300 ease-out
                 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-12px_rgba(37,99,235,0.15)] hover:border-blue-200"
      aria-label={`View ${department.title} department`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden flex-shrink-0">
        <LazyLoadImage
          src={urlFor(department.imgUrl).url()}
          alt={department.title}
          effect="blur"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Subtle gradient over image bottom */}
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
        {department.tags.length > 0 && (
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
          <span>Explore</span>
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

      {/* Bottom accent line — animates in on hover via group */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]
                   bg-gradient-to-r from-blue-600 to-blue-400
                   scale-x-0 origin-left transition-transform duration-300 ease-out
                   group-hover:scale-x-100"
      />
    </Link>
  );
};

export default DeptCard;
