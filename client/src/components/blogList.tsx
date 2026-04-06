import { Blog } from "@/hooks/use-blogs";
import BlogCard from "./blogCard";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path if needed

function BlogCardSkeleton() {
  return (
    <div className="group rounded-2xl overflow-hidden shadow-md">
      {/* IMAGE SKELETON */}
      <div className="overflow-hidden">
        <Skeleton className="w-full h-48" />
      </div>

      {/* CONTENT SKELETON */}
      <div className="p-4 flex flex-col justify-between h-[200px]">
        <div>
          {/* Date and reading time */}
          <Skeleton className="h-4 w-32 mb-2" />

          {/* Title */}
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-3/4 mb-2" />

          {/* Excerpt (3 lines) */}
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* CTA */}
        <Skeleton className="h-4 w-20 mt-4" />
      </div>
    </div>
  );
}

export default function BlogList({
  blogs,
  isLoading,
}: {
  blogs: Blog[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {blogs.map((blog: Blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
