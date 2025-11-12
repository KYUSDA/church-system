import { useCallback, useEffect, useState } from "react";
import { fetchLatestYoutubeVideos, YoutubeVideo } from "../services/youtube";

export function useYoutube() {
  const [channelTitle, setChannelTitle] = useState<string | null>(null);
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchLatestYoutubeVideos();
      setChannelTitle(res.channelTitle);
      setVideos(res.videos);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { channelTitle, videos, loading, error, refresh: load } as const;
}
