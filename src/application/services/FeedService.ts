import { Feed } from '../../domain/model/Feed';
import { FeedRepositoryInterface } from '../../infrastructure/repositories/feed/FeedRepositoryInterface';
import { ScrapperRepositoryInterface } from '../../infrastructure/repositories/scrapper/ScrapperRepositoryInterface';
import { ScrapperService } from './ScrapperService';

// TODO: type what services return
export class FeedService {
  private scrapperService;

  constructor(private feedRepository: FeedRepositoryInterface, scrapperRepository: ScrapperRepositoryInterface) {
    this.feedRepository = feedRepository;
    this.scrapperService = new ScrapperService(scrapperRepository);
  }

  async getAllFeeds() {
    const scrappedFeeds = await this.scrapperService.getTopNews();
    await this.feedRepository.saveScrappedFeeds(scrappedFeeds);
    
    return await this.feedRepository.findAll();
  }

  async createFeed(feedObject: { title: string; description: string; author: string; link: string; portrait: string | null; newsletter: string }) {
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
