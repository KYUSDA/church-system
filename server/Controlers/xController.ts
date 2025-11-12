import { Request, Response } from 'express';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import fs from 'fs';
import path from 'path';

const CACHE_TTL = 1000 * 60 * 10; // 10 minutes
const CACHE_FILE = path.join(__dirname, '..', '..', '.cache', 'x_cache.json');
let xCache: { channelTitle: string; posts: any[]; source: string | null; updatedAt: number } | null = null;

// Load persistent cache
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

export const getLatestXPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const handle = 'church44320';
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
      if (xCache) {
        xCache.updatedAt = Date.now();
        fs.promises.writeFile(CACHE_FILE, JSON.stringify(xCache), 'utf8').catch((e) =>
          console.warn('Failed to write X cache file:', e?.message || e)
        );
        res.json({
          source: xCache.source,
          channelTitle: xCache.channelTitle,
          posts: xCache.posts,
          note: 'cached',
        });
        return;
      }
      res.json({ source: null, channelTitle: handle, posts: [], note: 'fetch_failed' });
      return;
    }

    const result = await parseStringPromise(feedXml);
    const channel = result.rss?.channel?.[0] || result.feed || {};
    const channelTitle = channel.title?.[0] || channel.title || handle;
    const items = channel.item || channel.entry || [];

    const posts = items.map((it: any) => {
      const content = (it.title?.[0]) || (it.description?.[0]) || '';
      const pub = (it.pubDate?.[0]) || (it.published?.[0]) || '';
      const guid = (it.guid?.[0]) || (it.id?.[0]) || (it.link?.[0]?.$?.href || it.link?.[0]) || Math.random().toString(36).slice(2);
      const link = (it.link?.[0]?.$?.href || it.link?.[0]) || '';
      return { id: guid, content: String(content), published: String(pub), link: String(link) };
    });

    const sliced = posts.slice(0, 5);
    xCache = { channelTitle, posts: sliced, source: usedUrl, updatedAt: Date.now() };
    fs.promises.writeFile(CACHE_FILE, JSON.stringify(xCache), 'utf8').catch((e) =>
      console.warn('Failed to write X cache file:', e?.message || e)
    );

    res.json({ source: usedUrl, channelTitle, posts: sliced });
  } catch (error) {
    console.error('X (Nitter) controller fatal error:', (error as any)?.stack || (error as any)?.message || error);
    res.status(500).json({
      error: 'Failed to fetch X posts',
      detail: (error as any)?.message || String(error),
    });
  }
};

