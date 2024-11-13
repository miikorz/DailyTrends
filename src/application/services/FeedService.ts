import { FeedRepository } from '../../domain/interfaces/FeedRepository';
import { Feed } from '../../domain/entities/Feed';

export class FeedService {
  constructor(private feedRepository: FeedRepository) {}

  async createFeed(feed: Feed) {
    return await this.feedRepository.create(feed);
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
