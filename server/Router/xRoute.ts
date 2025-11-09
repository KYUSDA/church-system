import express from 'express';
import { getLatestXPosts } from '../Controlers/xController';

const router = express.Router();

router.get('/', getLatestXPosts);

export default router;
