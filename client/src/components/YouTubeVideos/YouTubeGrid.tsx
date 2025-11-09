import { useState } from 'react';
import { useYoutube } from '../../hooks/useYoutube';
import './YouTubeGrid.css';

interface VideoModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={e => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>&times;</button>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          className="video-modal-iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function YouTubeGrid() {
  const { videos, loading, error } = useYoutube();
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string; } | null>(null);

  if (loading) {
    return (
      <section className="text-center mb-12">
        <div className="grid md:grid-cols-3 gap-6 mt-8 p-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white shadow-lg rounded-lg overflow-hidden min-h-[250px] animate-pulse">
              <div className="bg-gray-200 w-full h-full"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-center mb-12">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Failed to load videos. Please try again later.
        </div>
      </section>
    );
  }

  const recentVideos = videos.slice(0, 3);

  return (
    <section className="text-center mb-12">
      <header>
        <h1 className="text-3xl font-semibold text-gray-900 relative inline-block">
          Latest <span className="text-blue-500 font-medium">SERMONS</span>
          <span className="block w-16 h-1 bg-blue-500 mt-1"></span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Watch our latest services and choir performances
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mt-8 p-4">
        {recentVideos.map((video) => (
          <div 
            key={video.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden min-h-[250px] group cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative w-full h-full">
              <img 
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(video.published).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <VideoModal 
          videoId={selectedVideo.id}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}