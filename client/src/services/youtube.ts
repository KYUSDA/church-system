export type RawYoutubeVideo = {
  id: string;
  title: string;
  published: string;
  link: string;
};

export type YoutubeChannelResponse = {
  channelTitle: string;
  videos: RawYoutubeVideo[];
};

export type YoutubeVideo = {
  id: string;
  title: string;
  published: string;
  link: string;
  thumbnailUrl: string;
};

// Use Vite env var to point to your API server (set VITE_API_BASE in .env.local or .env)
const API_BASE = (import.meta as any).env?.VITE_API_BASE || "";

export async function fetchLatestYoutubeVideos(): Promise<{ channelTitle: string; videos: YoutubeVideo[] }> {
  const res = await fetch(`${API_BASE}/kyusda/v1/youtube`);
  if (!res.ok) throw new Error(`Failed to fetch YouTube videos: ${res.status} ${res.statusText}`);
  const data: YoutubeChannelResponse = await res.json();

  const videos: YoutubeVideo[] = data.videos.map((v) => ({
    id: v.id,
    title: v.title,
    published: v.published,
    link: v.link,
    // Standard YouTube thumbnail URL pattern
    thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
  }));

  return { channelTitle: data.channelTitle, videos };
}
