import { useState, useEffect } from "react";
import { client } from "../../utils/client";
import "react-lazy-load-image-component/src/effects/blur.css";
import FamilyFAQ from "../FamilyFaq";
import FamilyCard from "./FamilyCard";

export interface Family {
  _id: string;
  title: string;
  description: string;
  imgUrl: string;
  tags: string[];
  locationUrl?: string;
}

function findUniqueById(dataArray: Family[]): Family[] {
  return dataArray.filter(
    (item, index, array) =>
      array.findIndex((other) => other.title === item.title) === index,
  );
}

/* ─── Skeleton Card ─────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
    <div className="w-full h-52 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse" />
    <div className="p-6 flex flex-col gap-3">
      <div className="h-5 w-2/3 rounded-full bg-stone-200 animate-pulse" />
      <div className="h-3 w-full rounded-full bg-stone-100 animate-pulse" />
      <div className="h-3 w-full rounded-full bg-stone-100 animate-pulse" />
      <div className="h-3 w-1/2 rounded-full bg-stone-100 animate-pulse" />
      <div className="flex gap-2 mt-2">
        <div className="h-5 w-14 rounded-full bg-blue-100 animate-pulse" />
        <div className="h-5 w-14 rounded-full bg-blue-100 animate-pulse" />
      </div>
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────────────────── */
const Families = () => {
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const query = '*[_type == "families"]';
    client.fetch(query).then((data: Family[]) => {
      const unique = findUniqueById(data);
      setFamilies(unique);
      const tags = Array.from(new Set(unique.flatMap((f) => f.tags))).slice(
        0,
        6,
      );
      setAllTags(["All", ...tags]);
      setLoading(false);
    });
  }, []);

  const filtered =
    filter === "All"
      ? families
      : families.filter((f) => f.tags.includes(filter));

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      {/* ── Page Section ── */}
      <div className="py-16 sm:py-20 lg:py-24">
        {/* ── Header ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 mb-12 lg:mb-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-7 h-0.5 bg-blue-600 rounded-full" />
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600">
              Our Community
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-slate-900 mb-4">
            Meet our <em className="italic text-blue-600">Families</em>
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-lg">
            Every family has a story worth sharing. Discover the people and
            communities that make us who we are.
          </p>

          {/* Divider + Filters + Count */}
          {!loading && (
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-stone-200">
              {/* Filter Pills */}
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

              {/* Result Count */}
              <span className="text-sm text-slate-400 ml-auto">
                {filtered.length}{" "}
                {filtered.length !== 1 ? "families" : "family"}
              </span>
            </div>
          )}
        </div>

        {/* ── Card Grid ── */}
        <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skeleton Loading State */}
            {loading &&
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

            {/* Populated Cards */}
            {!loading &&
              filtered.length > 0 &&
              filtered.map((family, i) => (
                <FamilyCard key={family._id} family={family} index={i} />
              ))}

            {/* Empty State */}
            {!loading && filtered.length === 0 && (
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
                  No families found
                </h4>
                <p className="text-sm">Try selecting a different filter</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── FAQ Section ── */}
      <FamilyFAQ />
    </div>
  );
};

export default Families;
