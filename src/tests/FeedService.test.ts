import { FeedService } from '../application/services/FeedService';
import { FeedRepositoryInterface } from '../infrastructure/repositories/feed/FeedRepositoryInterface';
import { ScrapperRepositoryInterface } from '../infrastructure/repositories/scrapper/ScrapperRepositoryInterface';
import { ScrapperService } from '../application/services/ScrapperService';
import { Feed } from '../domain/model/Feed';

jest.mock('../application/services/ScrapperService');

describe('FeedService', () => {
    let feedService: FeedService;
    let feedRepository: jest.Mocked<FeedRepositoryInterface>;
    let scrappers: jest.Mocked<ScrapperRepositoryInterface>[];

    beforeEach(() => {
        feedRepository = {
            findAll: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            saveScrappedFeeds: jest.fn(),
        } as any;

        scrappers = [
            {
                getTopNews: jest.fn(),
            },
        ];

        feedService = new FeedService(feedRepository, scrappers);
    });

    describe('getAllFeeds', () => {
        it('should scrap feeds and save them', async () => {
            const scrappedFeeds = [{ title: 'Test Feed' } as Feed];
            (ScrapperService.prototype.getTopNews as jest.Mock).mockResolvedValue(scrappedFeeds);
            feedRepository.findAll.mockResolvedValue(scrappedFeeds);

            const result = await feedService.getAllFeeds();

            expect(ScrapperService.prototype.getTopNews).toHaveBeenCalled();
            expect(feedRepository.saveScrappedFeeds).toHaveBeenCalledWith(scrappedFeeds);
            expect(feedRepository.findAll).toHaveBeenCalled();
            expect(result).toEqual(scrappedFeeds);
        });
    });

    describe('createFeed', () => {
        it('should create a new feed', async () => {
            const feedObject = { title: 'New Feed', description: 'Description', author: 'Author', link: 'http://link.com', portrait: null, newsletter: 'Newsletter' };
            const createdFeed = { id: '1', ...feedObject } as Feed;
            feedRepository.create.mockResolvedValue(createdFeed);

            const result = await feedService.createFeed(feedObject);

            expect(feedRepository.create).toHaveBeenCalledWith(feedObject);
            expect(result).toEqual(createdFeed);
        });
    });

    describe('getFeedById', () => {
        it('should return a feed by id', async () => {
            const feed = { title: 'Test Feed' } as Feed;
            feedRepository.findById.mockResolvedValue(feed);

            const result = await feedService.getFeedById('1');

            expect(feedRepository.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(feed);
        });

        it('should return null if feed not found', async () => {
            feedRepository.findById.mockResolvedValue(null);

            const result = await feedService.getFeedById('1');

            expect(feedRepository.findById).toHaveBeenCalledWith('1');
            expect(result).toBeNull();
        });
    });

    describe('updateFeed', () => {
        it('should update a feed', async () => {
            const feed = { title: 'Updated Feed' } as Partial<Feed>;
            const updatedFeed = { id: '1', ...feed } as Feed;
            feedRepository.update.mockResolvedValue(updatedFeed);

            const result = await feedService.updateFeed('1', feed);

            expect(feedRepository.update).toHaveBeenCalledWith('1', feed);
            expect(result).toEqual(updatedFeed);
        });

        it('should return null if feed not found', async () => {
            const feed = { title: 'Updated Feed' } as Partial<Feed>;
            feedRepository.update.mockResolvedValue(null);

            const result = await feedService.updateFeed('1', feed);

            expect(feedRepository.update).toHaveBeenCalledWith('1', feed);
            expect(result).toBeNull();
        });
    });

    describe('deleteFeed', () => {
        it('should delete a feed by id', async () => {
            const feed = { title: "Deleted feed" } as Partial<Feed>;
            const deletedFeed = { id: "1", ...feed } as Feed;
            feedRepository.delete.mockResolvedValue(deletedFeed);

            const result = await feedService.deleteFeed('1');

            expect(feedRepository.delete).toHaveBeenCalledWith('1');
            expect(result).toBe(deletedFeed);
        });

        it('should return null if feed not found', async () => {
            feedRepository.delete.mockResolvedValue(null);

            const result = await feedService.deleteFeed('non existing id');

            expect(feedRepository.delete).toHaveBeenCalledWith('non existing id');
            expect(result).toBe(null);
        });
    });
});