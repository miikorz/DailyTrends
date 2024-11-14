import { Router } from 'express';
import { getAllFeeds, getFeed } from './controllers/feedController';

const router = Router();

/**
 * @route GET /feed/:id
 * @desc Get a feed by its id
 */
router.get('/feed/:id', getFeed);

/**
 * @route GET /feed
 * @desc Get all feeds
 */
router.get('/feed', getAllFeeds);

export default router;
