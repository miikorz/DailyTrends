import { Feed } from '../../../domain/model/Feed';

export interface ScrapperRepositoryInterface {
  getTopNews(): Promise<Feed[]>;
}
