import { Blog } from "@/hooks/use-blogs";
import { getBasePath } from "@/lib/getBasePath";
import { Link } from "react-router-dom";

// Portable Text → plain string
function getPlainText(blocks: any[]): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";

  return blocks
    .filter(
      (block) => block?._type === "block" && Array.isArray(block.children),
    )
    .map((block) =>
      block.children
        .filter((child: any) => typeof child.text === "string")
        .map((child: any) => child.text)
        .join(""),
    )
    .join(" ")
    .trim();
}

export default function BlogCard({ blog }: { blog: Blog }) {
  const excerpt = getPlainText(blog.content ?? []).slice(0, 120);
  const basePath = getBasePath();

  return (
    <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      {/* IMAGE */}
      <Link to={`${basePath}/${blog.slug.current}`}>
        <div className="overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.thumbnailAlt ?? blog.title}
            className="
              w-full h-48 object-cover
              transform transition duration-500 ease-out
              group-hover:scale-105
            "
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4 flex flex-col justify-between h-[200px]">
        <div>
          <p className="text-sm text-gray-500">
            {new Date(blog.publishedAt).toDateString()} • {blog.readingTime} min
            read
          </p>

          <h2 className="text-lg font-semibold mt-2 line-clamp-2">
            {blog.title}
          </h2>

          <p className="text-gray-600 mt-2 text-base line-clamp-3">
            {excerpt ? `${excerpt}...` : ""}
          </p>
        </div>

        {/* CTA */}
        <Link
          to={`${basePath}/${blog.slug.current}`}
          className="
            mt-4 inline-flex items-center text-sm font-medium
            text-blue-600 hover:text-blue-800
            transition
          "
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
