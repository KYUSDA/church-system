import express from "express";
import cors from "cors";
import { getChannelVideosRSS, getChannelInfoScrape } from "./youtube";


const app = express();
app.use(cors()); // allow frontend requests

// Fetch recent videos
app.get("/api/youtube/videos", async (req, res) => {
  const channelId = req.query.channelId as string;
  try {
    const data = await getChannelVideosRSS(channelId);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch channel info
app.get("/api/youtube/info", async (req, res) => {
  const id = req.query.channelId as string;
  try {
    const info = await getChannelInfoScrape(id);
    res.json(info);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running at http://localhost:5000"));
