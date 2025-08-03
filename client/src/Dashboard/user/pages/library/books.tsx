import { FaBookOpen, FaDownload } from "react-icons/fa";

function Books() {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover:
        "https://i.pinimg.com/736x/37/a9/91/37a9913e6b218e1eac89f4f57482cd9a.jpg",
      year: 1925,
      genre: "Classic",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover:
        "https://i.pinimg.com/736x/37/a9/91/37a9913e6b218e1eac89f4f57482cd9a.jpg",
      year: 1960,
      genre: "Fiction",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      cover:
        "https://i.pinimg.com/736x/37/a9/91/37a9913e6b218e1eac89f4f57482cd9a.jpg",
      year: 1949,
      genre: "Dystopian",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Our Book Collection
        </h1>
        <p className="text-xl text-gray-600">
          Discover amazing books from various genres
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search books..."
          className="flex-grow max-w-2xl px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">All Genres</option>
          <option value="Classic">Classic</option>
          <option value="Fiction">Fiction</option>
          <option value="Dystopian">Dystopian</option>
          <option value="Romance">Romance</option>
          <option value="Fantasy">Fantasy</option>
        </select>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
          >
            {/* Responsive Image */}
            <div className="w-full h-64 overflow-hidden">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-1">{book.author}</p>
              </div>

              <div className="flex justify-between items-center mt-3 mb-2">
                <span className="text-sm text-gray-500">{book.year}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {book.genre}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between border-t pt-4">
                <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <FaBookOpen className="mr-2" />
                  Read
                </button>
                <button className="flex items-center text-green-600 hover:text-green-800 transition-colors">
                  <FaDownload className="mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
