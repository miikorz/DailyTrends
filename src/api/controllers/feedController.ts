import { Request, Response } from 'express';
import { SERVER_STATUS } from '../apiConstants';
import { FeedService } from '../../application/services/FeedService';
import { FeedRepository } from '../../infrastructure/repositories/feed/FeedRepository';
import { Feed } from '../../domain/model/Feed';

// TODO: where to inject this?
const feedRepository = new FeedRepository();
const feedService = new FeedService(feedRepository);

export const getAllFeeds = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const feedData = await feedService.getAllFeeds();
    res.status(200).json({ data: feedData, error: null });
  } catch (error) {
    res.status(500).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: "Internal Server Error"}, data: null });
  }
};

export const getFeed = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const feedData = await feedService.getFeedById(id);
    res.status(200).json({ data: feedData, error: null });
  } catch (error) {
    res.status(500).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: "Internal Server Error"}, data: null });
  }
};

export const createFeed = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { title, subtitle, description, author, link, portrait, newsletter }: Feed = req.body;

  try {
    const feedData = await feedService.createFeed({ title, subtitle, description, author, link, portrait, newsletter });
    res.status(200).json({ data: feedData, error: null });
  } catch (error) {
    res.status(500).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: "Internal Server Error"}, data: null });
  }
};

export const updateFeed = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const { title, subtitle, description, author, link, portrait, newsletter }: Feed = req.body;

  try {
    const feedData = await feedService.updateFeed(id, { title, subtitle, description, author, link, portrait, newsletter });
    res.status(200).json({ data: feedData, error: null });
  } catch (error) {
    res.status(500).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: "Internal Server Error"}, data: null });
  }
}

export const deleteFeed = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    await feedService.deleteFeed(id);
    res.status(200).json({ data: "Feed deleted successfully", error: null });
  } catch (error) {
    res.status(500).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: "Internal Server Error"}, data: null });
  }
}