
import React from 'react';

const About = () => {
  return (
    <main id="content" className="bg-gray-100 py-12">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">About KYUSDA</h1>
        <p className="text-lg text-gray-600 mt-4">Discover who we are and what we stand for as a community of faith.</p>
      </header>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Brief History */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our History</h2>
          <p className="text-gray-700 leading-relaxed">
            KYUSDA (Kirinyaga University Seventh-day Adventists) has a rich history of serving as a spiritual home for students and the wider community. Rooted in the principles of faith, love, and service, we strive to create an environment where individuals can grow spiritually, intellectually, and socially. Our mission is to inspire a Christ-centered lifestyle through worship, study, and outreach.
          </p>
        </div>

        {/* Right Column: Core Activities */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Daily Prayers */}
          <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6">
            <img
              src="https://i.pinimg.com/736x/55/53/69/55536955ffe72e43b546741ed191f237.jpg"
              alt="Daily Prayers Icon"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Prayers</h3>
            <p className="text-gray-600">Join us as we come together daily to seek God’s guidance and blessings through prayer.</p>
          </div>

          {/* Community Helpers */}
          <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6">
            <img
              src="https://i.pinimg.com/736x/20/c9/79/20c97965bd87bb6d90f0115c110ff6e1.jpg"
              alt="Community Helpers Icon"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Community Helpers</h3>
            <p className="text-gray-600">Serving the needs of those around us through acts of kindness and support.</p>
          </div>

          {/* Continuous Studying */}
          <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fVoIhgnvvuZpffPthWwimolCf45VseOl8vSFch79JkHoaPaMOKbsewQMIHw2HELboOw&usqp=CAU"
              alt="Continuous Studying Icon"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Continuous Studying</h3>
            <p className="text-gray-600">Deepen your understanding of God’s word through consistent study and learning.</p>
          </div>

          {/* Sabbath Worship */}
          <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ErKnDZLzZLcE3A42pwGedtOFq9AlINDTuw&usqp=CAU"
              alt="Sabbath Worship Icon"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sabbath Worship</h3>
            <p className="text-gray-600">Experience the joy and peace of worshiping together every Sabbath day.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
