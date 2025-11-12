import { Request, Response } from 'express';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export const getLatestYoutubeVideos = async (req: Request, res: Response) => {
  try {
    console.log('Starting YouTube video fetch...');
    // Using the provided channel ID
    const channelId = 'UCe6xeVkEBvG7OD_9HltS1xQ';
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    console.log('Fetching RSS feed from:', feedUrl);
    console.log('Fetching RSS feed from:', feedUrl);

    const response = await axios.get(feedUrl);
    const result = await parseStringPromise(response.data);

    const channelTitle = result.feed.title[0];
    const entries = result.feed.entry || [];

    const videos = entries.map((entry: any) => ({
      id: entry['yt:videoId'][0],
      title: entry.title[0],
      published: entry.published[0],
      link: entry.link[0].$.href,
    }));

    res.json({
      channelTitle,
      videos: videos.slice(0, 6) // Get latest 6 videos
    });
  } catch (error) {
    console.error('YouTube RSS feed error:', error);
    res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
};