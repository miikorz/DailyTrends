
import { Feed } from "../../domain/model/Feed";
import { ScrapperRepositoryInterface } from "../../infrastructure/repositories/scrapper/ScrapperRepositoryInterface";

export class ScrapperService {
  constructor(private scrapperRepository: ScrapperRepositoryInterface) {}

  async getTopNews(): Promise<Feed[]> {
    const feeds: Feed[] = await this.scrapperRepository.getTopNews();

    return feeds;
  }
}