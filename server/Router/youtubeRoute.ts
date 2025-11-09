import express from 'express';
import { getLatestYoutubeVideos } from '../Controlers/youtubeController';

const router = express.Router();

router.get('/', getLatestYoutubeVideos);

export default router;