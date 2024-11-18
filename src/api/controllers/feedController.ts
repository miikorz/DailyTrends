import { Request, Response } from 'express';
import { SERVER_CODES, SERVER_MESSAGES, SERVER_STATUS } from '../apiConstants';
import { FeedService } from '../../application/services/FeedService';
import { FeedRepository } from '../../infrastructure/repositories/feed/FeedRepository';
import { Feed } from '../../domain/model/Feed';
import { ElPaisScrapperRepository } from '../../infrastructure/repositories/scrapper/elpais/ElPaisScrapperRepository';
import { ElMundoScrapperRepository } from '../../infrastructure/repositories/scrapper/elmundo/ElMundoScrapperRepository';
import { ScrapperRepositoryInterface } from '../../infrastructure/repositories/scrapper/ScrapperRepositoryInterface';

const feedRepository = new FeedRepository();
// * Scrappers could be injected from a configuration file
const scrappers: ScrapperRepositoryInterface[] = [new ElPaisScrapperRepository(), new ElMundoScrapperRepository()];
const feedService = new FeedService(feedRepository, scrappers);

export const getAllFeeds = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const feedData = await feedService.getAllFeeds();
    res.status(SERVER_CODES.REQUEST_SUCCESSFUL).json({ data: feedData, error: null });
  } catch (error) {
    res.status(SERVER_CODES.INTERNAL_SERVER_ERROR).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: SERVER_MESSAGES[SERVER_STATUS.INTERNAL_SERVER_ERROR]}, data: null });
  }
};

export const getFeed = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const feedData = await feedService.getFeedById(id);
    if (!feedData) {
      res.status(SERVER_CODES.NOT_FOUND).json({ error: { code: SERVER_STATUS.NOT_FOUND, message: SERVER_MESSAGES[SERVER_STATUS.NOT_FOUND]}, data: null });
    } else {
      res.status(SERVER_CODES.REQUEST_SUCCESSFUL).json({ data: feedData, error: null });
    }
  } catch (error: any) {
    console.log(error.reason.toString());
    res.status(SERVER_CODES.INTERNAL_SERVER_ERROR).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: error.reason.toString()}, data: null });
  }
};

export const createFeed = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { title, description, author, link, portrait, newsletter }: Feed = req.body;

  try {
    const feedData = await feedService.createFeed({ title, description, author, link, portrait, newsletter });
    res.status(SERVER_CODES.REQUEST_SUCCESSFUL).json({ data: feedData, error: null });
  } catch (error) {
    res.status(SERVER_CODES.INTERNAL_SERVER_ERROR).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: SERVER_MESSAGES[SERVER_STATUS.INTERNAL_SERVER_ERROR]}, data: null });
  }
};

export const updateFeed = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const { title, description, author, link, portrait, newsletter }: Feed = req.body;

  try {
    const feedData = await feedService.updateFeed(id, { title, description, author, link, portrait, newsletter });
    if (!feedData) {
      res.status(SERVER_CODES.NOT_FOUND).json({ error: { code: SERVER_STATUS.NOT_FOUND, message: SERVER_MESSAGES[SERVER_STATUS.NOT_FOUND]}, data: null });
    } else {
      res.status(SERVER_CODES.REQUEST_SUCCESSFUL).json({ data: feedData, error: null });
    }
  } catch (error) {
    res.status(SERVER_CODES.INTERNAL_SERVER_ERROR).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: SERVER_MESSAGES[SERVER_STATUS.INTERNAL_SERVER_ERROR]}, data: null });
  }
}

export const deleteFeed = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const feedData = await feedService.deleteFeed(id);
    if (!feedData) {
      res.status(SERVER_CODES.NOT_FOUND).json({ error: { code: SERVER_STATUS.NOT_FOUND, message: SERVER_MESSAGES[SERVER_STATUS.NOT_FOUND]}, data: null });
    } else {
      res.status(SERVER_CODES.DELETED_SUCCESSFULLY).json({ data: SERVER_MESSAGES.DELETED, error: null });
    }
  } catch (error) {
    res.status(SERVER_CODES.INTERNAL_SERVER_ERROR).json({ error: { code: SERVER_STATUS.INTERNAL_SERVER_ERROR, message: SERVER_MESSAGES[SERVER_STATUS.INTERNAL_SERVER_ERROR]}, data: null });
  }
}