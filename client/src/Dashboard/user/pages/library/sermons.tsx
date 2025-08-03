import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Play,
  Calendar,
  Clock,
  User,
  X,
  Share2,
  Download,
  Heart,
  Eye,
} from "lucide-react";
// @ts-ignore
import YouTubeModule from "react-youtube";
const YouTube = (YouTubeModule as any).default || YouTubeModule;

interface Sermon {
  id: number;
  title: string;
  preacher: string;
  date: string;
  duration: string;
  thumbnail: string;
  description: string;
  category: string;
  videoUrl: string;
  views?: number;
  likes?: number;
}

const Sermons: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Sermon | null>(null);

  const sermons: Sermon[] = [
    {
      id: 1,
      title: "The Power of Faith",
      preacher: "Pastor John Smith",
      date: "2023-10-15",
      duration: "45:22",
      thumbnail:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
      description:
        "Exploring how faith can move mountains and transform lives. This powerful message delves into the biblical foundations of faith and its practical applications in our daily walk with God.",
      category: "Faith",
      videoUrl: "7iChlFdTyKk",
      views: 1234,
      likes: 98,
    },
    {
      id: 2,
      title: "Walking in Love",
      preacher: "Pastor Sarah Johnson",
      date: "2023-10-08",
      duration: "38:15",
      thumbnail:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      description:
        "Understanding God's love and how to express it to others in practical ways.",
      category: "Love",
      videoUrl: "dQw4w9WgXcQ",
      views: 856,
      likes: 72,
    },
    {
      id: 3,
      title: "Hope in Difficult Times",
      preacher: "Pastor Michael Brown",
      date: "2023-10-01",
      duration: "42:08",
      thumbnail:
        "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=800&q=80",
      description:
        "Finding hope and strength when facing life's challenges through biblical wisdom.",
      category: "Hope",
      videoUrl: "kJQP7kiw5Fk",
      views: 2105,
      likes: 156,
    },
  ];

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Sermons & Teachings
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Biblical messages to inspire and transform your life
        </p>
      </div>

      {/* Sermons Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sermons.map((sermon) => (
          <Card
            key={sermon.id}
            className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg"
          >
            <div className="relative overflow-hidden">
              <img
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={sermon.thumbnail}
                alt={sermon.title}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-gray-800 hover:bg-white"
                >
                  {sermon.category}
                </Badge>
              </div>

              {/* Play Button */}
              <Button
                onClick={() => setSelectedVideo(sermon)}
                size="lg"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300"
              >
                <Play className="h-6 w-6 text-white ml-1" />
              </Button>

              {/* Stats */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <div className="flex items-center gap-1 text-white text-xs bg-black/30 rounded-full px-2 py-1">
                  <Eye className="h-3 w-3" />
                  {sermon.views}
                </div>
                <div className="flex items-center gap-1 text-white text-xs bg-black/30 rounded-full px-2 py-1">
                  <Heart className="h-3 w-3" />
                  {sermon.likes}
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                  {sermon.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  {sermon.preacher}
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {sermon.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(sermon.date)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {sermon.duration}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Modal */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
          <div className="relative">
            {selectedVideo && (
              <>
                <div className="aspect-video w-full">
                  <YouTube
                    videoId={selectedVideo.videoUrl}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                        rel: 0,
                      },
                    }}
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      {selectedVideo.title}
                    </DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {selectedVideo.preacher}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(selectedVideo.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedVideo.duration}
                      </div>
                    </div>
                  </DialogHeader>
                  <DialogDescription className="text-base leading-relaxed">
                    {selectedVideo.description}
                  </DialogDescription>
                  <div className="flex items-center gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Like ({selectedVideo.likes})
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sermons;
