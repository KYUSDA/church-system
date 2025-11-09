export type RawXPost = {
  id: string;
  content: string;
  published: string;
  link: string;
};

export type XChannelResponse = {
  channelTitle: string;
  posts: RawXPost[];
  note?: string;
  source?: string | null;
};

export type XPost = {
  id: string;
  content: string;
  published: string;
  link: string;
};

const API_BASE = (import.meta as any).env?.VITE_API_BASE || "";

export async function fetchLatestXPosts(): Promise<{ channelTitle: string; posts: XPost[]; note?: string; source?: string | null }> {
  const res = await fetch(`${API_BASE}/kyusda/v1/x`);
  if (!res.ok) throw new Error(`Failed to fetch X posts: ${res.status} ${res.statusText}`);
  const data: XChannelResponse = await res.json();

  const posts: XPost[] = (data.posts || []).map((p) => ({
    id: p.id,
    content: p.content,
    published: p.published,
    link: p.link,
  }));

  return { channelTitle: data.channelTitle, posts, note: data.note, source: data.source };
}
