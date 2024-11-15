import { Feed } from '../../../domain/model/Feed';
import { FeedODMModel as FeedModel } from './FeedODMModel';
import { FeedRepositoryInterface } from './FeedRepositoryInterface';

export class FeedRepository implements FeedRepositoryInterface {

 async saveScrappedFeeds(feeds: Feed[]): Promise<Feed[]> {
    const existingFeeds = await FeedModel.find({ link: { $in: feeds.map(feed => feed.link) } }).lean();
    const existingLinks = new Set(existingFeeds.map(feed => feed.link));
    const newFeeds: Feed[] = feeds.filter(feed => !existingLinks.has(feed.link));
    
    if (newFeeds.length > 0) {
      await FeedModel.insertMany(newFeeds);
    }
    console.log({newFeeds});

    return newFeeds;
  }

  async findAll(): Promise<Feed[]> {
    const feeds = await FeedModel.find().lean();
    return feeds.map((feed) => ({ ...feed }) as Feed);
  }

  async create(feed: { title: string; description: string; author: string; link: string; portrait: string | null; newsletter: string }): Promise<Feed> {
    const createdFeed = await FeedModel.create(feed);

    return createdFeed.toObject() as unknown as Feed;
  }

  async findById(id: string): Promise<Feed | null> {
    const feed = await FeedModel.findById(id).lean();

    if (feed) {
      return { ...feed } as Feed;
    }

    // TODO: return 404 error, here or in controller
    return null;
  }

  async update(id: string, feed: Partial<Feed>): Promise<Feed | null> {
    const updatedFeed = await FeedModel.findByIdAndUpdate(id, feed, { new: true }).lean();
    
    if (updatedFeed) {
      return { ...updatedFeed } as Feed;
    }

    // TODO: return 404 error, here or in controller
    return null;
  }

  async delete(id: string): Promise<null> {
    const deletedFeed = await FeedModel.findByIdAndDelete(id);
    
    if (deletedFeed) {
      return null;
    }

    // TODO: return 404 error, here or in controller
    return null;
  }
}
