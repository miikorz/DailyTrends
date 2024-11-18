import request from 'supertest';
import { SERVER_CODES, SERVER_MESSAGES, SERVER_STATUS } from '../api/apiConstants';
import { Feed } from '../domain/model/Feed';
import app from '../app';

let feedsMock: Feed[] = [];
let feedMock: Feed | null = {} as Feed;

jest.mock('../application/services/FeedService', () => {
  return {
    FeedService: jest.fn().mockImplementation(() => {
      return {
        getAllFeeds: () => {
          return feedsMock;
        },
        getFeedById: () => {
          return feedMock;
        },
        createFeed: () => {
          return {...feedMock, id: '1'};
        },
        updateFeed: () => {
          return feedMock;
        },
        deleteFeed: () => {
          return feedMock;
        },
      };
    })
  };
});

jest.mock('../application/services/FeedService');

describe('FeedController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllFeeds', () => {
    it('should return all feeds', async () => {
      feedsMock = [{ title: 'Test Feed' } as Feed, { title: 'Test Feed 2' } as Feed];

      const response = await request(app).get('/feed').expect(200, {data: feedsMock, error: null});

      expect(response.status).toBe(SERVER_CODES.REQUEST_SUCCESSFUL);
      expect(response.body.data).toEqual(feedsMock);
    });
  });

  describe('getFeed', () => {
    it('should return a feed by id', async () => {
      feedMock = { title: 'Test Feed', author: 'Author', description: 'Description', link: 'http://link.com', newsletter: 'Newsletter' } as Feed;

      const response = await request(app).get('/feed/1').expect(200, {data: feedMock, error: null});

      expect(response.status).toBe(SERVER_CODES.REQUEST_SUCCESSFUL);
    });

    it('should return 404 if feed not found', async () => {
      feedMock = null;

      const response = await request(app).get('/feed/1').expect(404, {data: null, error: {message: SERVER_MESSAGES.NOT_FOUND, code: SERVER_STATUS.NOT_FOUND}});

      expect(response.status).toBe(SERVER_CODES.NOT_FOUND);
    });
  });

  describe('createFeed', () => {
    it('should create a new feed', async () => {
      feedMock = { title: 'New Feed', description: 'Description', author: 'Author', link: 'http://link.com', portrait: null, newsletter: 'Newsletter' };
      
      const response = await request(app).post('/feed').send(feedMock).expect(200, {data: {...feedMock, id: '1'}, error: null});

      expect(response.status).toBe(SERVER_CODES.REQUEST_SUCCESSFUL);
    });
  });

  describe('updateFeed', () => {
    it('should update a feed', async () => {
      feedMock = { title: 'Updated Feed', author: 'Author', description: 'Description', link: 'http://link.com', newsletter: 'Newsletter' } as Feed;

      const response = await request(app).put('/feed/1').send({title: 'Updated Feed'}).expect(200, {data: feedMock, error: null});

      expect(response.status).toBe(SERVER_CODES.REQUEST_SUCCESSFUL);
    });

    it('should return 404 if feed not found', async () => {
      feedMock = null;

      const response = await request(app).put('/feed/nonExistingId').send({title: 'Updated Feed'}).expect(404, {data: null, error: {message: SERVER_MESSAGES.NOT_FOUND, code: SERVER_STATUS.NOT_FOUND}});

      expect(response.status).toBe(SERVER_CODES.NOT_FOUND);
    });
  });

  describe('deleteFeed', () => {
    it('should delete a feed by id', async () => {
      feedMock = { title: 'Deleted Feed'} as Feed;

      const response = await request(app).delete('/feed/1').expect(204);

      expect(response.status).toBe(SERVER_CODES.DELETED_SUCCESSFULLY);
    });

    it('should return 404 if feed not found', async () => {
      feedMock = null;

      const response = await request(app).delete('/feed/1').expect(404, {data: null, error: {message: SERVER_MESSAGES.NOT_FOUND, code: SERVER_STATUS.NOT_FOUND}});

      expect(response.status).toBe(SERVER_CODES.NOT_FOUND);
    });
  });

  it('should return 404 if endpoint does not exist', async () => {
    const response = await request(app).get('/noexistingendpoint');

    expect(response.status).toBe(SERVER_CODES.NOT_FOUND);
  });
});