import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  Heart,
  MoreHorizontal,
  Album,
  Shuffle,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from "lucide-react";

/** ────────── Types ────────── */
interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string; // "mm:ss" – static label
  albumArt: string;
  year: string;
  genre: string;
  isFavorite: boolean;
  audioUrl: string; // NEW – actual MP3 / stream URL
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
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
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
    {
      id: 3,
      title: "Holy Spirit",
      artist: "Jesus Culture",
      album: "Come Away",
      duration: "6:12",
      albumArt:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&q=80",
      year: "2022",
      genre: "Worship",
      isFavorite: true,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: 4,
      title: "Waymaker",
      artist: "Michael W. Smith",
      album: "Awaken",
      duration: "4:48",
      albumArt:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
      year: "2020",
      genre: "Contemporary",
      isFavorite: false,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      id: 5,
      title: "Goodness of God",
      artist: "Bethel Music",
      album: "Victory",
      duration: "5:21",
      albumArt:
        "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=500&q=80",
      year: "2019",
      genre: "Worship",
      isFavorite: true,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
  ]);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [currentlyPlaying, setCurrentlyPlaying] = React.useState<number | null>(
    null
  );
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [volume, _setVolume] = React.useState<number>(50);

  /* ---------- Play / Pause ---------- */
  const togglePlay = (id: number) => {
    const selected = songs.find((s) => s.id === id);
    if (!selected) return;

    // if clicking the track that's already playing → pause/resume
    if (currentlyPlaying === id) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
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

  /* ---------- Stop Player ---------- */
  const stopPlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentlyPlaying(null);
    setCurrentTime(0);
    setIsPlaying(false);
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
    const onLoadedMetadata = () => setDuration(audioRef.current!.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setCurrentlyPlaying(null);
      setCurrentTime(0);
      setIsPlaying(false);
    };

    const audio = audioRef.current;
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const currentSong = currentlyPlaying
    ? songs.find((s) => s.id === currentlyPlaying)
    : null;

  /* ---------- UI ---------- */
  return (
    <div className="space-y-6">
      {/* Hidden global audio element */}
      <audio ref={audioRef} hidden preload="none" />

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Worship Songs
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Lift your voice with these inspiring worship songs
        </p>
      </div>

      {/* Songs List */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Album className="h-5 w-5" />
            Song Library
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Header row (desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-muted/30 border-b text-sm font-medium text-muted-foreground">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-3">Album</div>
            <div className="col-span-2">Year</div>
            <div className="col-span-1 text-right">Duration</div>
          </div>

          {songs.map((song, idx) => {
            const isCurrentlyPlaying = currentlyPlaying === song.id;
            const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

            return (
              <div
                key={song.id}
                className={`grid grid-cols-2 md:grid-cols-12 gap-4 items-center p-4 border-b hover:bg-muted/50 transition-all duration-200 ${
                  isCurrentlyPlaying ? "bg-purple-50 border-purple-200" : ""
                }`}
              >
                {/* Index + Play/Pause */}
                <div className="col-span-1 flex items-center gap-3">
                  <span className="md:hidden text-muted-foreground font-medium">
                    {idx + 1}
                  </span>
                  <Button
                    onClick={() => togglePlay(song.id)}
                    variant={isCurrentlyPlaying ? "default" : "ghost"}
                    size="sm"
                    className="rounded-full w-10 h-10 p-0"
                  >
                    {isCurrentlyPlaying && isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Title/Artist */}
                <div className="col-span-1 md:col-span-5 flex items-center gap-3">
                  <div className="md:hidden flex-shrink-0">
                    <img
                      src={song.albumArt}
                      alt={song.title}
                      className="h-12 w-12 rounded-md object-cover shadow-sm"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`font-medium truncate ${
                        isCurrentlyPlaying
                          ? "text-purple-600"
                          : "text-foreground"
                      }`}
                    >
                      {song.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {song.artist}
                    </p>
                    {isCurrentlyPlaying && (
                      <div className="mt-1">
                        <div className="w-full bg-purple-200 rounded-full h-1">
                          <div
                            className="bg-purple-600 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Album (desktop only) */}
                <div className="hidden md:flex md:col-span-3 items-center gap-2">
                  <img
                    src={song.albumArt}
                    alt={song.album}
                    className="h-8 w-8 rounded object-cover"
                  />
                  <span className="text-sm text-muted-foreground truncate">
                    {song.album}
                  </span>
                </div>

                {/* Year (desktop only) */}
                <div className="hidden md:block md:col-span-2">
                  <Badge variant="outline" className="text-xs">
                    {song.year}
                  </Badge>
                </div>

                {/* Duration + actions */}
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    {isCurrentlyPlaying && duration > 0
                      ? `${formatSeconds(currentTime)} / ${formatSeconds(
                          duration
                        )}`
                      : song.duration}
                  </span>
                  <Button
                    onClick={() => toggleFavorite(song.id)}
                    variant="ghost"
                    size="sm"
                    className={`rounded-full w-8 h-8 p-0 ${
                      song.isFavorite
                        ? "text-red-500 hover:text-red-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        song.isFavorite ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full w-8 h-8 p-0 text-muted-foreground"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Music Player Bar */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              {/* Current Song Info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img
                  src={currentSong.albumArt}
                  alt={currentSong.title}
                  className="h-12 w-12 rounded-md object-cover shadow-sm"
                />
                <div className="min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {currentSong.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentSong.artist}
                  </p>
                </div>
                <Button
                  onClick={() => toggleFavorite(currentSong.id)}
                  variant="ghost"
                  size="sm"
                  className={`rounded-full w-8 h-8 p-0 ${
                    currentSong.isFavorite
                      ? "text-red-500"
                      : "text-muted-foreground"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      currentSong.isFavorite ? "fill-current" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <Shuffle className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => currentSong && togglePlay(currentSong.id)}
                  className="rounded-full w-10 h-10 p-0"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>

              {/* Progress and Volume */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-xs text-muted-foreground w-10 text-right">
                  {formatSeconds(currentTime)}
                </span>
                <div className="flex-1">
                  <Progress
                    value={duration > 0 ? (currentTime / duration) * 100 : 0}
                    className="h-1"
                  />
                </div>
                <span className="text-xs text-muted-foreground w-10">
                  {formatSeconds(duration)}
                </span>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <div className="w-20">
                    <Progress value={volume} className="h-1" />
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex items-center">
                <Button
                  onClick={stopPlayer}
                  variant="ghost"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
                  title="Close player"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Songs;
