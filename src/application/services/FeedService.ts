import { Feed } from '../../domain/model/Feed';
import { FeedRepositoryInterface } from '../../infrastructure/repositories/feed/FeedRepositoryInterface';

// TODO: type what services return
export class FeedService {
  constructor(private feedRepository: FeedRepositoryInterface) {}

  async createFeed(feedObject: { title: string; subtitle: string; description: string; author: string; link: string; portrait: string; newsletter: string }) {
    return await this.feedRepository.create(feedObject);
  }

  async getFeedById(id: string) {
    return await this.feedRepository.findById(id);
  }

  async updateFeed(id: string, feed: Partial<Feed>) {
    return await this.feedRepository.update(id, feed);
  }

  async deleteFeed(id: string) {
    return await this.feedRepository.delete(id);
  }
}
