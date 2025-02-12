import axios from 'axios';

const TWITTER_API_URL = 'https://api.twitter.com/2/tweets'; // Replace with actual API endpoint
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'; // Replace with actual API endpoint

const fetchLatestXPost = async () => {
  try {
    const response = await axios.get(TWITTER_API_URL, {
      headers: { Authorization: `Bearer YOUR_TWITTER_BEARER_TOKEN` },
      params: { query: 'from:YourAccount', max_results: 1 },
    });
    return response.data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching latest X post:', error);
    return null;
  }
};

const fetchLatestSong = async () => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',
        channelId: 'YOUR_YOUTUBE_CHANNEL_ID',
        order: 'date',
        maxResults: 5,
        q: 'song',
        key: 'YOUR_YOUTUBE_API_KEY',
      },
    });
    return response.data.items.length > 0 ? response.data.items[0] : await fetchLatestSermon();
  } catch (error) {
    console.error('Error fetching latest song:', error);
    return await fetchLatestSermon();
  }
};

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

export { fetchLatestXPost, fetchLatestSong, fetchLatestSermon };
