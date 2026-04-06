import { Link } from "react-router-dom";
import { useBlogs, useRelatedBlogs } from "@/hooks/use-blogs";
import { Skeleton } from "@/components/ui/skeleton";
import { getBasePath } from "@/lib/getBasePath";

interface RelatedBlogsProps {
  categoryId: string;
  excludeId: string;
}

const getContentPreview = (content: any[]) => {
  if (!content || !content.length) return "";
  const firstBlock = content.find(
    (block) => block._type === "block" && block.children,
  );
  if (firstBlock) {
    const text = firstBlock.children
      .map((child: any) => child.text || "")
      .join("");
    return text.slice(0, 150) + (text.length > 150 ? "..." : "");
  }
  return "";
};

export default function RelatedBlogs({
  categoryId,
  excludeId,
}: RelatedBlogsProps) {
  const { data: blogs, isLoading } = useBlogs();
  const basePath = getBasePath();

  if (isLoading) {
    return (
      <div className="mt-6 space-y-2">
        <Skeleton className="h-4 w-32" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!blogs?.length) return null;

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold mb-3">Explore more Blogs and Articles</h3>
      <div className="space-y-3">
        {blogs.slice(0, 3).map((blog) => (
          <div key={blog._id} className="border-b pb-3 last:border-b-0">
            <Link
              to={`${basePath}/${blog.slug.current}`}
              className="block hover:text-blue-400 transition"
            >
              <h4 className="font-semibold text-sm">
                {blog.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1 ">
                {getContentPreview(blog.content)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
