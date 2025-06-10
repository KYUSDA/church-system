import React from "react";

function Books() {
  // Sample book data
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover:
        "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
      year: 1925,
      genre: "Classic",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover:
        "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
      year: 1960,
      genre: "Fiction",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      cover:
        "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg",
      year: 1949,
      genre: "Dystopian",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover:
        "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
      year: 1813,
      genre: "Romance",
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      cover:
        "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
      year: 1937,
      genre: "Fantasy",
    },
    {
      id: 6,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      cover:
        "https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg",
      year: 1997,
      genre: "Fantasy",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-1">{book.author}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-500">{book.year}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {book.genre}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state (hidden by default) */}
      <div className="hidden text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No books found
        </h3>
        <p className="mt-1 text-gray-500">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    </div>
  );
}

export default Books;
