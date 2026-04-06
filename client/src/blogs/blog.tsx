import { useState } from "react";
import BlogList from "@/components/blogList";
import { useBlogs } from "@/hooks/use-blogs";
import { BookOpen } from "lucide-react";
import BlogLayout from "./Layout";
import BlogFilters from "./blogFilters";
import SEO from "@/components/SEO";

function NoBlogsPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-6">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-700">No posts yet</h2>
      <p className="text-gray-400 mt-2 max-w-sm text-sm">
        Check back soon — new articles are on their way.
      </p>
    </div>
  );
}

export default function BlogsPage() {
  const { data: blogs, isLoading, error } = useBlogs();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // 🔍 FILTER LOGIC
  const filteredBlogs = blogs?.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      !selectedCategory || blog.category?.slug?.current === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <BlogLayout>
      <SEO
        title="Blogs"
        description="Explore our latest blog posts and articles."
      />
      <div className="p-6 max-w-6xl mx-auto">
        {/* FILTERS */}
        {!isLoading && blogs && (
          <BlogFilters
            blogs={blogs}
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {/* ERROR */}
        {error && (
          <p className="py-16 text-center text-red-500">
            {(error as Error).message}
          </p>
        )}

        {/* CONTENT */}
        {!error && (
          <>
            {filteredBlogs?.length || isLoading ? (
              <BlogList blogs={filteredBlogs || []} isLoading={isLoading} />
            ) : (
              <NoBlogsPlaceholder />
            )}
          </>
        )}
      </div>
    </BlogLayout>
  );
}
