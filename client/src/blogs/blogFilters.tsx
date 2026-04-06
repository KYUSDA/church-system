import { useMemo } from "react";
import { Search } from "lucide-react";

type Props = {
  blogs: any[];
  search: string;
  setSearch: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
};

export default function BlogFilters({
  blogs,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  // extract unique categories
  const categories = useMemo(() => {
    const map = new Map();

    blogs.forEach((blog) => {
      if (blog.category?._id) {
        map.set(blog.category._id, blog.category);
      }
    });

    return Array.from(map.values());
  }, [blogs]);

  return (
    <div className="mb-8 space-y-4">
      {/* SEARCH */}
      <div className="relative w-full flex justify-end">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full px-4 py-3 pr-12 rounded-xl
              border border-gray-200
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* CATEGORY CHIPS */}
      <div className="flex flex-wrap gap-2">
        {/* ALL */}
        <button
          onClick={() => setSelectedCategory("")}
          className={`
            px-4 py-2 rounded-full text-sm border transition
            ${
              !selectedCategory
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          All
        </button>

        {categories.map((cat: any) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.slug?.current)}
            className={`
              px-4 py-2 rounded-full text-sm border transition
              ${
                selectedCategory === cat.slug?.current
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* CLEAR */}
      {(search || selectedCategory) && (
        <button
          onClick={() => {
            setSearch("");
            setSelectedCategory("");
          }}
          className="text-sm text-gray-500 hover:text-black"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
