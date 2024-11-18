import { Feed } from "../../../domain/model/Feed";

export interface FeedRepositoryInterface {
  saveScrappedFeeds(feed: Feed[]): Promise<Feed[]>;
  findAll(): Promise<Feed[]>;
  create(feed: { title: string; description: string; author: string; link: string; portrait: string | null; newsletter: string }): Promise<Feed>;
  findById(id: string): Promise<Feed | null>;
  update(id: string, feed: Partial<Feed>): Promise<Feed | null>;
  delete(id: string): Promise<Feed | null>;
}
