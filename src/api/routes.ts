import { Router } from 'express';
import { getFeed } from './controllers/feedController';

const router = Router();

/**
 * @route GET /feed/:id
 * @desc Get a feed by its id
 */
router.get('/feed/:id', getFeed);

export default router;
