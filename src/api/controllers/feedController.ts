import { Request, Response } from 'express';
import { SERVER_STATUS } from '../apiConstants';
import { FeedService } from '../../application/services/FeedService';
import { FeedRepository } from '../../infrastructure/repositories/feed/FeedRepository';

// TODO: where to inject this?
const feedRepository = new FeedRepository();
const feedService = new FeedService(feedRepository);

export const getFeed = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const feedData = await feedService.getFeedById(id);
    res.status(200).json({ data: {feedData}, error: null });
  } catch (error) {
    res.status(500).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: "Internal Server Error"}, data: null });
  }
};
