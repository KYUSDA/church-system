import { useBlog, useBlogsByDate } from "@/hooks/use-blogs";
import { useParams, Link } from "react-router-dom";
import BlogContent from "./blogContent";
import RelatedBlogs from "./RelatedBlogs";
import BlogLayout from "./Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link2, Twitter, Facebook } from "lucide-react";
import SEO from "@/components/SEO";
import { useState } from "react";
import { format } from "date-fns";

// ── Calendar ───────────────────────────────────────────────────────────────────
function CalendarCard() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  console.log("selected", selected);

  const datePrefix = selected ? format(selected, "yyyy-MM-dd") : "";
  const { data: dayBlogs, isLoading: dayLoading } = useBlogsByDate(datePrefix);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog calendar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          className="w-full"
        />

        {selected && (
          <div className="border-t pt-4 space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {format(selected, "MMMM d, yyyy")}
            </p>

            {dayLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}

            {!dayLoading && dayBlogs?.length === 0 && (
              <p className="text-sm text-gray-400">No posts on this day.</p>
            )}

            {!dayLoading &&
              dayBlogs?.map((b) => (
                <Link
                  key={b._id}
                  to={`/blogs/${b.slug.current}`}
                  className="flex items-start gap-2 group"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm text-blue-600 group-hover:text-primary transition line-clamp-2">
                    {b.title}
                  </span>
                </Link>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Share ──────────────────────────────────────────────────────────────────────
function ShareCard({ title, slug }: { title: string; slug: string }) {
  const url = `${window.location.origin}/blogs/${slug}`;
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share this post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <button
          onClick={copyLink}
          className="inline-flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Link2 className="h-4 w-4 text-gray-500" />
          {copied ? "Link copied!" : "Copy link"}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Twitter className="h-4 w-4 text-sky-500" /> Share on X
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Facebook className="h-4 w-4 text-blue-600" /> Share on Facebook
        </a>
      </CardContent>
    </Card>
  );
}

// ── Follow ─────────────────────────────────────────────────────────────────────
function FollowCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow Us</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <a
          href="https://www.facebook.com/KyUSDAchurch"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <FaFacebook className="h-5 w-5 text-blue-600" /> Facebook
        </a>
        <a
          href="https://x.com/kyusdachurch?s=09"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <FaTwitter className="h-5 w-5 text-sky-500" /> Twitter
        </a>
        <a
          href="http://www.youtube.com/@kyusdachurch"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <FaYoutube className="h-5 w-5 text-red-600" /> YouTube
        </a>
      </CardContent>
    </Card>
  );
}

// ── Skeleton / Not found ───────────────────────────────────────────────────────
function BlogSkeleton() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Skeleton className="w-full h-[300px] rounded-xl" />
      <Skeleton className="w-2/3 h-8" />
      <Skeleton className="w-1/3 h-4" />
      <div className="space-y-4">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-5/6 h-4" />
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] text-center">
      <div>
        <h2 className="text-2xl font-semibold">Blog not found</h2>
        <p className="text-gray-500 mt-2">
          The article you're looking for doesn't exist or was removed.
        </p>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function BlogDetail() {
  const { slug } = useParams();
  const { data: blog, isLoading } = useBlog(slug as string);

  if (isLoading)
    return (
      <BlogLayout>
        <BlogSkeleton />
      </BlogLayout>
    );
  if (!blog)
    return (
      <BlogLayout>
        <NotFound />
      </BlogLayout>
    );

  return (
    <BlogLayout>
      <SEO
        title={blog.title || "Blogs"}
        description="Explore our latest blog posts and articles."
      />

      <div className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        &gt;{" "}
        <Link to="/blogs" className="hover:text-primary">
          Blogs
        </Link>{" "}
        &gt; <span className="text-gray-700">{blog.title}</span>
      </div>

      <div className="py-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 border border-slate-200 bg-white p-6 rounded-3xl shadow-sm">
          <img
            src={blog.thumbnail}
            alt={blog.thumbnailAlt ?? "Blog image"}
            className="rounded-3xl mb-8 w-full object-cover max-h-[420px]"
          />
          <h1 className="text-4xl font-bold leading-tight">{blog.title}</h1>
          <p className="text-gray-500 mt-3 text-sm border-b pb-4">
            {new Date(blog.publishedAt).toDateString()} • {blog.readingTime} min
            read
          </p>

          {blog.author && (
            <div className="flex items-center gap-3 mt-6 border-b pb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div>
                <p className="font-medium">{blog.author.name}</p>
                <p className="text-sm text-gray-500">{blog.author.email}</p>
              </div>
            </div>
          )}

          <div className="mt-10">
            <BlogContent content={blog.content} />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6 border border-slate-200 bg-white p-4 rounded-3xl shadow-sm">
          <CalendarCard />
          <FollowCard />
          <ShareCard title={blog.title} slug={blog.slug.current} />
          <RelatedBlogs
            categoryId={blog.category?._id ?? ""}
            excludeId={blog._id}
          />
        </div>
      </div>
    </BlogLayout>
  );
}
