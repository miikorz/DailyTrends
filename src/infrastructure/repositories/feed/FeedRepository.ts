import { Feed } from '../../../domain/model/Feed';
import { FeedODMModel as FeedModel } from './FeedODMModel';
import { FeedRepositoryInterface } from './FeedRepositoryInterface';

export class FeedRepository implements FeedRepositoryInterface {

  async findAll(): Promise<Feed[]> {
    const feeds = await FeedModel.find().lean();
    return feeds.map((feed) => ({ ...feed, id: feed._id.toString() }) as Feed);
  }

  async create(feed: { title: string; subtitle: string; description: string; author: string; link: string; portrait: string; newsletter: string }): Promise<Feed> {
    const createdFeed = await FeedModel.create(feed);
    return createdFeed.toObject() as unknown as Feed;
  }

  async findById(id: string): Promise<Feed | null> {
    const feed = await FeedModel.findById(id).lean();
    if (feed) {
      return { ...feed, id: feed._id.toString() } as Feed;
    }
    return null;
  }

  async update(id: string, feed: Partial<Feed>): Promise<Feed | null> {
    const updatedFeed = await FeedModel.findByIdAndUpdate(id, feed, { new: true }).lean();
    if (updatedFeed) {
      return { ...updatedFeed, id: updatedFeed._id.toString() } as Feed;
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    await FeedModel.findByIdAndDelete(id);
  }
}
