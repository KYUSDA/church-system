import axios from 'axios';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const fetchLatestSermon = async () => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',
        channelId: 'YOUR_YOUTUBE_CHANNEL_ID',
        order: 'date',
        maxResults: 1,
        q: 'sermon',
        key: 'YOUR_YOUTUBE_API_KEY',
      },
    });
    return response.data.items?.[0] || null;
  } catch (error) {
    console.error('Error fetching latest sermon:', error);
    return null;
  }
};

export { fetchLatestSermon };
