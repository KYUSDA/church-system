import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideosSection } from "./department";

interface VideosProps {
  data: VideosSection;
}

/* ---------- Helpers ---------- */
const toEmbedUrl = (url: string) => {
  // YouTube watch → embed
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }

  // youtu.be → embed
  if (url.includes("youtu.be")) {
    const id = url.split("/").pop();
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }

  return url; // already embed or other platform
};

/* ---------- Component ---------- */
function Videos({ data }: VideosProps) {
  if (!data?.videos?.length) return null;

  // Split title into words for styling
  const titleWords = data.title?.split(" ") || [];
  const firstWord = titleWords[0] || "";
  const remainingWords = titleWords.slice(1).join(" ");

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="underline decoration-4 decoration-blue-600 underline-offset-8 inline-block">
              {firstWord}
            </span>{" "}
            <span className="text-blue-600">{remainingWords}</span>
          </h2>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {data.videos.map((video, idx) => (
            <Card
              key={idx}
              className="overflow-hidden shadow-sm"
            >
              <CardContent className="p-0 relative">
                <div className="aspect-video w-full">
                  <iframe
                    src={toEmbedUrl(video.url)}
                    className="w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`video-${idx}`}
                  />
                </div>

                {/* Tag Badge - Absolute positioned on video */}
                {video.tag && (
                  <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 shadow-lg">
                    {video.tag}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Videos;
