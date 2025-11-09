
import XFeed from "../../components/XFeed/XFeed";
import YouTubeGrid from "../../components/YouTubeVideos/YouTubeGrid";

function Announcement() {
  return (
    <section className="text-center mb-12">
      <header>
        <h1 className="text-3xl font-semibold text-gray-900 relative inline-block">
          Our Recent <span className="text-blue-500 font-medium">POSTS</span>
          <span className="block w-16 h-1 bg-blue-500 mt-1"></span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Be inspired by the Word. Explore our latest sermons and messages of faith.
        </p>
      </header>
      
  <XFeed />
  <YouTubeGrid />
    </section>
  );
}

export default Announcement;
