import { Feed } from "../../../domain/model/Feed";

export interface FeedRepositoryInterface {
  findAll(): Promise<Feed[]>;
  create(feed: { title: string; subtitle: string; description: string; author: string; link: string; portrait: string; newsletter: string }): Promise<Feed>;
  findById(id: string): Promise<Feed | null>;
  update(id: string, feed: Partial<Feed>): Promise<Feed | null>;
  delete(id: string): Promise<void>;
}
