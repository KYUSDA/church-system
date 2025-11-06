// youtube-public.ts
import fetch from "node-fetch"; // node-fetch v2
import { parseStringPromise } from "xml2js";
import * as cheerio from "cheerio";

/**
 * Fetch channel's RSS feed (recent videos)
 * Returns parsed array of videos with id, title, published, link
 */
export async function getChannelVideosRSS(channelId: string) {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  const parsed = await parseStringPromise(xml, { explicitArray: false });
  const feed = parsed.feed;
  const channelTitle = feed.title;
  const entries = feed.entry ? (Array.isArray(feed.entry) ? feed.entry : [feed.entry]) : [];
  const videos = entries.map((e: any) => ({
    id: e['yt:videoId'],
    title: e.title,
    published: e.published,
    link: e.link?.['$']?.href || `https://www.youtube.com/watch?v=${e['yt:videoId']}`
  }));
  return { channelTitle, videos };
}

/**
 * Fetch oEmbed for a video (gives title, author_name, thumbnail_url, etc.)
 * Works without API key for single videos
 */
export async function getVideoOEmbed(videoId: string) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }});
  if (!res.ok) throw new Error(`oEmbed fetch failed: ${res.status} ${res.statusText}`);
  return await res.json();
}

/**
 * Scrape basic channel page info (fragile)
 * Returns channelTitle, description (if present), subscriberText (may be missing), customUrl, avatar
 * Must be run server-side (no CORS) — parsing YouTube HTML is brittle.
 */
export async function getChannelInfoScrape(channelIdOrName: string) {
  // channelIdOrName can be: channel/CHANNEL_ID or user/USER_NAME or @handle style
  // We'll fetch the canonical channel URL using /channel/<id> or /c/<name> if supplied.
  const urlsToTry = [
    `https://www.youtube.com/channel/${channelIdOrName}`,
    `https://www.youtube.com/c/${channelIdOrName}`,
    `https://www.youtube.com/user/${channelIdOrName}`,
    `https://www.youtube.com/@${channelIdOrName}`
  ];
  let html = "";
  let lastErr: any = null;
  for (const url of urlsToTry) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }});
      if (!res.ok) {
        lastErr = new Error(`fetch ${url} failed: ${res.status}`);
        continue;
      }
      html = await res.text();
      if (html && html.length > 0) {
        // found
        break;
      }
    } catch (e) {
      lastErr = e;
    }
  }
  if (!html) throw lastErr || new Error("Unable to fetch channel HTML");

  // Parse for JSON data blobs
  const $ = cheerio.load(html);

  // Try to extract JSON-LD structured data
  const ldJson = $('script[type="application/ld+json"]').first().text();
  let structured: any = null;
  try {
    structured = ldJson ? JSON.parse(ldJson) : null;
  } catch (e) {
    structured = null;
  }

  // Fallback: search for ytInitialData or ytInitialPlayerResponse in HTML
  const initialDataMatch = html.match(/var ytInitialData = (\{.*?\});/s) || html.match(/ytInitialData\s*=\s*(\{.*?\});/s);
  const initialPlayerMatch = html.match(/var ytInitialPlayerResponse = (\{.*?\});/s) || html.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});/s);
  let initialData = null;
  let initialPlayer = null;
  try {
    if (initialDataMatch) initialData = JSON.parse(initialDataMatch[1]);
  } catch {}
  try {
    if (initialPlayerMatch) initialPlayer = JSON.parse(initialPlayerMatch[1]);
  } catch {}

  // Extract some info
  const title = structured?.name || $("meta[property='og:site_name']").attr("content") || $("meta[name='title']").attr("content") || null;
  const description = structured?.description || $("meta[name='description']").attr("content") || null;
  const avatar = $("link[rel='image_src']").attr("href") || structured?.image || null;

  // subscriber count text — sometimes available in initialData or in meta
  let subscriberText: string | null = null;
  if (initialData) {
    try {
      // this path may change often; try to find a renderer containing "subscriberCountText"
      const jsonString = JSON.stringify(initialData);
      const subMatch = jsonString.match(/"subscriberCountText":\s*\{\s*"simpleText"\s*:\s*"([^"]+)"/);
      if (subMatch) subscriberText = subMatch[1];
    } catch {}
  }
  // fallback: try to find visible subscriber text in HTML (rare)
  if (!subscriberText) {
    const visibleSub = $("yt-formatted-string#subscriber-count").text();
    if (visibleSub) subscriberText = visibleSub.trim();
  }

  return { title, description, avatar, subscriberText, structured, initialDataPresent: !!initialData };
}

(async () => {
  const channelId = "UCe6xeVkEBvG7OD_9HltS1xQ"; // your channel ID

  const rss = await getChannelVideosRSS(channelId);
  console.log("Channel title:", rss.channelTitle);
  console.log("Videos:", rss.videos.slice(0, 5));

  const info = await getChannelInfoScrape(channelId);
  console.log(info);
})();


