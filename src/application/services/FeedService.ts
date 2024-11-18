import { Feed } from '../../domain/model/Feed';
import { FeedRepositoryInterface } from '../../infrastructure/repositories/feed/FeedRepositoryInterface';
import { ScrapperRepositoryInterface } from '../../infrastructure/repositories/scrapper/ScrapperRepositoryInterface';
import { ScrapperService } from './ScrapperService';
export class FeedService {

  constructor(private feedRepository: FeedRepositoryInterface, private scrappers: ScrapperRepositoryInterface[]) {}

  async getAllFeeds(): Promise<Feed[]> {
    const scrappedFeeds: Feed[] = [];

    for (const scrapper of this.scrappers) {
      const scrapperService = new ScrapperService(scrapper);
      const justScrappedFeeds = await scrapperService.getTopNews();
      scrappedFeeds.push(...justScrappedFeeds);
    }

    await this.feedRepository.saveScrappedFeeds(scrappedFeeds);
    
    return await this.feedRepository.findAll();
  }

  async createFeed(feedObject: { title: string; description: string; author: string; link: string; portrait: string | null; newsletter: string }): Promise<Feed> {
    return await this.feedRepository.create(feedObject);
  }

  async getFeedById(id: string): Promise<Feed | null> {
    return await this.feedRepository.findById(id);
  }

  async updateFeed(id: string, feed: Partial<Feed>): Promise<Feed | null> {
    return await this.feedRepository.update(id, feed);
  }

  async deleteFeed(id: string): Promise<Feed | null> {
    return await this.feedRepository.delete(id);
  }
}
