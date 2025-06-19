import React from "react";
import {
  PlayCircleFilled,
  PauseCircleFilled,
  Favorite,
  MoreVert,
  AccessTime,
  Album,
} from "@mui/icons-material";

/** ────────── Types ────────── */
interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;          // “mm:ss” – static label
  albumArt: string;
  year: string;
  genre: string;
  isFavorite: boolean;
  audioUrl: string;          // NEW – actual MP3 / stream URL
}

/** ────────── Helpers ────────── */
const formatSeconds = (sec: number) => {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

/** ────────── Component ────────── */
const Songs: React.FC = () => {
  /* ---------- State ---------- */
  const [songs, setSongs] = React.useState<Song[]>([
    {
      id: 1,
      title: "Amazing Grace",
      artist: "Hillsong Worship",
      album: "Graceful Worship",
      duration: "4:32",
      albumArt:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
      year: "2023",
      genre: "Worship",
      isFavorite: true,
      audioUrl:
        "https://open.spotify.com/track/2U6PYsaaIYx9TTDgVK49yp?si=d68831a664b746ba",
    },
    {
      id: 2,
      title: "What a Beautiful Name",
      artist: "Hillsong United",
      album: "Let There Be Light",
      duration: "5:33",
      albumArt:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
      year: "2021",
      genre: "Worship",
      isFavorite: false,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    // … other songs, each with audioUrl
  ]);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [currentlyPlaying, setCurrentlyPlaying] = React.useState<number | null>(
    null
  );
  const [currentTime, setCurrentTime] = React.useState<number>(0);

  /* ---------- Play / Pause ---------- */
  const togglePlay = (id: number) => {
    const selected = songs.find((s) => s.id === id);
    if (!selected) return;

    // if clicking the track that’s already playing → pause
    if (currentlyPlaying === id) {
      audioRef.current?.pause();
      setCurrentlyPlaying(null);
      setCurrentTime(0);
      return;
    }

    // otherwise load the new track & play
    if (audioRef.current) {
      audioRef.current.src = selected.audioUrl;
      audioRef.current.play();
    }
    setCurrentlyPlaying(id);
    setCurrentTime(0);
  };

  /* ---------- Favorite toggle ---------- */
  const toggleFavorite = (id: number) => {
    setSongs((prev) =>
      prev.map((song) =>
        song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
      )
    );
  };

  /* ---------- Audio element + listeners ---------- */
  React.useEffect(() => {
    if (!audioRef.current) return;

    const onTimeUpdate = () => setCurrentTime(audioRef.current!.currentTime);

    const onEnded = () => {
      setCurrentlyPlaying(null);
      setCurrentTime(0);
    };

    const audio = audioRef.current;
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hidden global audio element */}
      <audio ref={audioRef} hidden preload="none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Worship Songs
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Lift your voice with these inspiring worship songs
          </p>
        </div>

        {/* Song list */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          {/* Header row (desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-3">Album</div>
            <div className="col-span-2">Year</div>
            <div className="col-span-1 text-right">Duration</div>
          </div>

          {songs.map((song, idx) => {
            const isPlaying = currentlyPlaying === song.id;
            const liveTime =
              isPlaying && audioRef.current
                ? formatSeconds(currentTime)
                : song.duration;

            return (
              <div
                key={song.id}
                className={`grid grid-cols-2 md:grid-cols-12 gap-4 items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                  isPlaying ? "bg-blue-50" : ""
                }`}
              >
                {/* Index + Play/Pause */}
                <div className="col-span-1 flex items-center">
                  <span className="md:hidden mr-3 text-gray-400">
                    {idx + 1}
                  </span>
                  <button
                    onClick={() => togglePlay(song.id)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {isPlaying ? (
                      <PauseCircleFilled fontSize="medium" />
                    ) : (
                      <PlayCircleFilled fontSize="medium" />
                    )}
                  </button>
                </div>

                {/* Title/Artist */}
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
                        isPlaying ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {song.title}
                    </h3>
                    <p className="text-sm text-gray-500">{song.artist}</p>
                  </div>
                </div>

                {/* Album (desktop only) */}
                <div className="hidden md:flex md:col-span-3 items-center">
                  <Album className="mr-2 text-gray-400" fontSize="small" />
                  <span className="text-gray-700">{song.album}</span>
                </div>

                {/* Year (desktop only) */}
                <div className="hidden md:block md:col-span-2 text-gray-700">
                  {song.year}
                </div>

                {/* Duration + actions */}
                <div className="col-span-1 flex items-center justify-end space-x-3">
                  <span
                    className={`text-sm ${
                      isPlaying ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {liveTime}
                  </span>
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Songs;
