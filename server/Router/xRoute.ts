import express from 'express';
import { getLatestXPosts } from '../Controlers/xController';

const router = express.Router();

// x route to get latest X posts
router.get('/', getLatestXPosts);

export default router;
