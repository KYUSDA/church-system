

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
      
      <div className="grid md:grid-cols-3 gap-6 mt-8 p-4">
        {/* Latest Post Card */}
        <div className="bg-white shadow-lg rounded-lg p-4 min-h-[250px] flex flex-col justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Latest Sermon</h2>
          <p className="text-gray-600 mt-2">Discover our most recent message of faith and inspiration.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Read More</button>
        </div>

        {/* YouTube Video 1 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden min-h-[250px]">
          <div className="relative w-full h-full aspect-w-16 aspect-h-9">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/TwXr9hgy4pQ" 
              style={{ border: 0 }} 
              title="KyUSDA CHURCH CHOIR - HATUJUI SAA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* YouTube Video 2 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden min-h-[250px]">
          <div className="relative w-full h-full aspect-w-16 aspect-h-9">
            <iframe 
              src="https://www.youtube.com/embed/xtndPd8OQ4E" 
              title="KyUSDA CHURCH CHOIR - MWANGA"
              className="w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              style={{ border: 0 }}
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Announcement;
