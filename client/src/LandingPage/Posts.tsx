const VIDEOS = [
  {
    videoId: "nGpCLJ8B_vg?si=RqWG30vbdv6YHeci",
  },
  {
    videoId: "4CZVDldoKiY?si=WnX01wW5vZVZfJwU",
  },
  {
    videoId: "Q3NJNgBPLlk?si=DvsutMO4eFBDyC4J",
  },
];

function VideoCard({ video }: { video: (typeof VIDEOS)[0] }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative w-full aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

function Posts() {
  return (
    <section className="text-center mb-12">
      <header>
        <h1 className="text-3xl font-semibold text-gray-900 relative inline-block">
          Our Recent <span className="text-blue-500 font-medium">POSTS</span>
          <span className="block w-16 h-1 bg-blue-500 mt-1 mx-auto" />
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Be inspired by the Word. Explore our latest sermons and messages of
          faith.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-5 mt-8 p-4">
        {VIDEOS.map((video) => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </section>
  );
}

export default Posts;
