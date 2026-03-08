import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../utils/client";
import "react-lazy-load-image-component/src/effects/blur.css";
import ResourceCard from "./ResourceCard";
import { Resource } from "../Department/sections/department";

const CARDS_PER_PAGE = 9;

const RESOURCES_QUERY = `
  *[_type == "departments" && defined(sections)]
    .sections[_type == "resourcesSection"][]
    .resources[]{
      tag,
      title,
      description,
      link,
      image,
      file
    }
`;

function findUniqueByTitle(dataArray: Resource[]): Resource[] {
  return dataArray.filter(
    (item, index, array) =>
      array.findIndex((other) => other.title === item.title) === index,
  );
}

const fetchResources = async (): Promise<Resource[]> => {
  const data = await client.fetch(RESOURCES_QUERY);
  return findUniqueByTitle(data);
};

/* Skeleton Card */
const SkeletonCard = ({ index }: { index: number }) => (
  <div
    className="group flex flex-col overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
    style={{ animationDelay: `${index * 80}ms` }}
  >
    <div className="relative w-full aspect-[3/4] overflow-hidden">
      <div className="w-full h-full bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse transition-transform duration-700 ease-out group-hover:scale-105" />
    </div>
    <div className="px-4 py-3 text-center flex flex-col gap-2">
      <div className="h-5 w-2/3 mx-auto rounded-full bg-stone-200 animate-pulse" />
      <div className="h-3 w-full rounded-full bg-stone-100 animate-pulse" />
      <div className="h-3 w-full rounded-full bg-stone-100 animate-pulse" />
      <div className="h-3 w-1/2 mx-auto rounded-full bg-stone-100 animate-pulse" />
    </div>
  </div>
);

/* Pagination Component */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${
            currentPage === 1
              ? "bg-stone-100 text-stone-400 cursor-not-allowed"
              : "bg-white border border-stone-300 text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-sm"
          }`}
      >
        Previous
      </button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200
              ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white border border-stone-300 text-slate-600 hover:border-blue-500 hover:text-blue-600"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${
            currentPage === totalPages
              ? "bg-stone-100 text-stone-400 cursor-not-allowed"
              : "bg-white border border-stone-300 text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-sm"
          }`}
      >
        Next
      </button>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────── */
const Resources = () => {
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });

  const allTags = useMemo(() => {
    const tags = Array.from(
      new Set(
        resources
          .map((r) => r.tag)
          .filter((tag): tag is string => Boolean(tag)),
      ),
    );
    return ["All", ...tags];
  }, [resources]);

  const filtered = useMemo(
    () =>
      filter === "All" ? resources : resources.filter((r) => r.tag === filter),
    [resources, filter],
  );

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
  const currentResources = filtered.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById("resources-grid")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="min-h-screen py-16 sm:py-20 lg:py-24"
      style={{
        backgroundImage: `url('/back5.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ── Page Header ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 mb-12 lg:mb-16">
        <div className="flex items-center gap-3 mb-5">
          <span className="block w-7 h-0.5 bg-blue-600 rounded-full" />
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600">
            Knowledge Hub
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-slate-900 mb-4">
          Explore our <em className="italic text-blue-600">Resources</em>
        </h2>

        <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-lg">
          Access valuable materials, guides, and tools to support your spiritual
          growth and engagement with our community.
        </p>

        {!isLoading && (
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-stone-200">
            {allTags.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilter(tag)}
                    className={`px-4 py-1.5 rounded-full border text-[13px] font-medium
                                transition-all duration-200 cursor-pointer
                                ${
                                  filter === tag
                                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                                    : "bg-transparent border-stone-300 text-slate-500 hover:border-blue-500 hover:text-blue-600"
                                }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
            <span className="text-sm text-slate-400 ml-auto">
              {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* ── Card Grid ── */}
      <div
        id="resources-grid"
        className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12"
      >
        <div className="flex flex-wrap justify-center gap-6">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}

          {!isLoading &&
            currentResources.length > 0 &&
            currentResources.map((resource, i) => (
              <ResourceCard key={resource._id} resource={resource} index={i} />
            ))}

          {!isLoading && filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-slate-400">
              <svg
                className="mb-5 opacity-30"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16 24h16M24 16v16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <h4 className="font-serif text-2xl text-slate-700 font-normal mb-2">
                No resources found
              </h4>
              <p className="text-sm">Try selecting a different filter</p>
            </div>
          )}
        </div>

        {!isLoading && filtered.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Resources;
