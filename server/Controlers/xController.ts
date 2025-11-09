import { Request, Response } from 'express';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import fs from 'fs';
import path from 'path';

// Fetch latest posts for an X account using a public Nitter RSS feed.
// Note: Nitter instances are community-run; if you need a more
// reliable production-ready solution, use the official X API with
// server-side credentials.
// Simple in-memory cache to hold last successful fetch + persistent file cache
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes
const CACHE_FILE = path.join(__dirname, '..', '..', '.cache', 'x_cache.json');
let xCache: { channelTitle: string; posts: any[]; source: string | null; updatedAt: number } | null = null;

// Try to load persistent cache on startup
try {
  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (fs.existsSync(CACHE_FILE)) {
    const raw = fs.readFileSync(CACHE_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed) {
      xCache = parsed;
      console.log('Loaded X cache from file (age ignored)');
    }
  }
} catch (err) {
  console.warn('Failed to load X cache file:', (err as any)?.message || err);
}

export const getLatestXPosts = async (req: Request, res: Response) => {
  try {
    const handle = 'church44320';

    // Try a list of public Nitter instances (order matters; some may be down)
    const instances = [
      'https://nitter.net',
      'https://nitter.snopyta.org',
      'https://nitter.42l.fr',
    ];

    let lastErr: any = null;
    let feedXml: string | null = null;
    let usedUrl = '';

    for (const base of instances) {
      const url = `${base}/${handle}/rss`;
      try {
        const resp = await axios.get(url, {
          responseType: 'arraybuffer',
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; kyusda-fetcher/1.0)' },
          timeout: 10000,
        });
        // Convert buffer to string using utf8
        feedXml = Buffer.from(resp.data).toString('utf8');
        usedUrl = url;
        break;
      } catch (err) {
        lastErr = err;
        console.warn('Failed to fetch from', url, (err as any)?.message || err);
      }
    }

    if (!feedXml) {
      console.error('All Nitter instances failed', (lastErr as any)?.message || lastErr);
      // If we have any cache (regardless of age), return it so UI can show something.
      if (xCache) {
        // Update cache timestamp to mark it as recently served
        try {
          xCache.updatedAt = Date.now();
          // persist updated timestamp
          fs.promises.writeFile(CACHE_FILE, JSON.stringify(xCache), 'utf8').catch((e) => console.warn('Failed to write X cache file:', e?.message || e));
        } catch (e) {
          console.warn('Failed to update X cache timestamp:', (e as any)?.message || e);
        }
        return res.json({ source: xCache.source, channelTitle: xCache.channelTitle, posts: xCache.posts, note: 'cached' });
      }
      // Return a graceful empty response so the frontend can render without breaking.
      return res.json({ source: null, channelTitle: handle, posts: [], note: 'fetch_failed' });
    }

    // Parse the feed
    const result = await parseStringPromise(feedXml);

    // Handle both RSS and Atom-like structures
    const channel = result.rss?.channel?.[0] || result.feed || {};
    const channelTitle = channel.title?.[0] || channel.title || handle;
    const items = (channel.item || channel.entry) || [];

    const posts = items.map((it: any) => {
      // Some instances use <title> for text, others include HTML in <description>
      const content = (it.title && it.title[0]) || (it.description && it.description[0]) || '';
      const pub = (it.pubDate && it.pubDate[0]) || (it.published && it.published[0]) || '';
      const guid = (it.guid && it.guid[0]) || (it.id && it.id[0]) || (it.link && (it.link[0]?.$?.href || it.link[0])) || Math.random().toString(36).slice(2);
      const link = (it.link && (it.link[0]?.$?.href || it.link[0])) || '';
      return {
        id: guid,
        content: String(content),
        published: String(pub),
        link: String(link),
      };
    });
    const sliced = posts.slice(0, 5);
    // Update in-memory cache
    xCache = { channelTitle, posts: sliced, source: usedUrl, updatedAt: Date.now() };
    // Persist cache to disk (best-effort)
    try {
      const dir = path.dirname(CACHE_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.promises.writeFile(CACHE_FILE, JSON.stringify(xCache), 'utf8').catch((e) => console.warn('Failed to write X cache file:', e?.message || e));
    } catch (e) {
      console.warn('Failed to persist X cache:', (e as any)?.message || e);
    }

    return res.json({ source: usedUrl, channelTitle, posts: sliced });
  } catch (error) {
    console.error('X (Nitter) controller fatal error:', (error as any)?.stack || (error as any)?.message || error);
    return res.status(500).json({ error: 'Failed to fetch X posts', detail: (error as any)?.message || String(error) });
  }
};
