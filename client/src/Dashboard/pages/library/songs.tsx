import React from "react";
import {
  PlayCircleFilled,
  PauseCircleFilled,
  Favorite,
  MoreVert,
  AccessTime,
  Album,
} from "@mui/icons-material";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  albumArt: string;
  year: string;
  genre: string;
  isFavorite: boolean;
}

const Songs: React.FC = () => {
  // Sample data - replace with your actual data fetching logic
  const [songs, setSongs] = React.useState<Song[]>([
    {
      id: 1,
      title: "Amazing Grace",
      artist: "Hillsong Worship",
      album: "Graceful Worship",
      duration: "4:32",
      albumArt:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      year: "2023",
      genre: "Worship",
      isFavorite: true,
    },
    {
      id: 2,
      title: "What a Beautiful Name",
      artist: "Hillsong United",
      album: "Let There Be Light",
      duration: "5:33",
      albumArt:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      year: "2021",
      genre: "Worship",
      isFavorite: false,
    },
    {
      id: 3,
      title: "Oceans (Where Feet May Fail)",
      artist: "Hillsong UNITED",
      album: "Zion",
      duration: "8:56",
      albumArt:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      year: "2013",
      genre: "Worship",
      isFavorite: true,
    },
    {
      id: 4,
      title: "Goodness of God",
      artist: "Bethel Music",
      album: "Victory",
      duration: "4:57",
      albumArt:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      year: "2022",
      genre: "Worship",
      isFavorite: false,
    },
    {
      id: 5,
      title: "Reckless Love",
      artist: "Cory Asbury",
      album: "Reckless Love",
      duration: "5:22",
      albumArt:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      year: "2018",
      genre: "Worship",
      isFavorite: true,
    },
    {
      id: 6,
      title: "Build My Life",
      artist: "Pat Barrett",
      album: "Canvas and Clay",
      duration: "6:45",
      albumArt:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      year: "2020",
      genre: "Worship",
      isFavorite: false,
    },
  ]);

  const [currentlyPlaying, setCurrentlyPlaying] = React.useState<number | null>(
    null
  );

  const togglePlay = (id: number) => {
    setCurrentlyPlaying(currentlyPlaying === id ? null : id);
  };

  const toggleFavorite = (id: number) => {
    setSongs(
      songs.map((song) =>
        song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Worship Songs
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Lift your voice with these inspiring worship songs
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search songs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Genres</option>
              <option>Worship</option>
              <option>Gospel</option>
              <option>Hymns</option>
              <option>Contemporary</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Sort By</option>
              <option>Recently Added</option>
              <option>Most Popular</option>
              <option>A-Z</option>
            </select>
          </div>
        </div>

        {/* Songs Grid - List View */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-3">Album</div>
            <div className="col-span-2">Year</div>
            <div className="col-span-1 text-right">Duration</div>
          </div>

          {/* Songs List */}
          {songs.map((song, index) => (
            <div
              key={song.id}
              className={`grid grid-cols-2 md:grid-cols-12 gap-4 items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                currentlyPlaying === song.id ? "bg-blue-50" : ""
              }`}
            >
              {/* Number and Play Button (Mobile) */}
              <div className="col-span-1 flex items-center">
                <span className="md:hidden mr-3 text-gray-400">
                  {index + 1}
                </span>
                <button
                  onClick={() => togglePlay(song.id)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {currentlyPlaying === song.id ? (
                    <PauseCircleFilled fontSize="medium" />
                  ) : (
                    <PlayCircleFilled fontSize="medium" />
                  )}
                </button>
              </div>

              {/* Song Info (Mobile collapses to single column) */}
              <div className="col-span-1 md:col-span-5 flex items-center">
                <div className="md:hidden mr-4 flex-shrink-0">
                  <img
                    src={song.albumArt}
                    alt={song.title}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </div>
                <div>
                  <h3
                    className={`font-medium ${
                      currentlyPlaying === song.id
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-500">{song.artist}</p>
                </div>
              </div>

              {/* Album (hidden on mobile) */}
              <div className="hidden md:flex md:col-span-3 items-center">
                <Album className="mr-2 text-gray-400" fontSize="small" />
                <span className="text-gray-700">{song.album}</span>
              </div>

              {/* Year (hidden on mobile) */}
              <div className="hidden md:block md:col-span-2 text-gray-700">
                {song.year}
              </div>

              {/* Duration and Actions */}
              <div className="col-span-1 flex items-center justify-end space-x-3">
                <span className="text-sm text-gray-500">{song.duration}</span>
                <button
                  onClick={() => toggleFavorite(song.id)}
                  className={`${
                    song.isFavorite ? "text-red-500" : "text-gray-400"
                  } hover:text-red-500 transition-colors`}
                >
                  <Favorite fontSize="small" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVert fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Alternative Grid View (Toggle with button) */}
        {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {songs.map((song) => (
            <div key={song.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={song.albumArt}
                  alt={song.album}
                />
                <button 
                  onClick={() => togglePlay(song.id)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:text-blue-300 transition-colors"
                >
                  {currentlyPlaying === song.id ? 
                    <PauseCircleFilled style={{ fontSize: '3rem' }} /> : 
                    <PlayCircleFilled style={{ fontSize: '3rem' }} />}
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{song.year}</span>
                  <button 
                    onClick={() => toggleFavorite(song.id)}
                    className={`${song.isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
                  >
                    <Favorite />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Songs;
