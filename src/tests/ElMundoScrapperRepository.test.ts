import { ElMundoScrapperRepository } from '../infrastructure/repositories/scrapper/elmundo/ElMundoScrapperRepository';
import { Feed } from '../domain/model/Feed';

global.fetch = jest.fn() as jest.Mock;

describe('ElMundoScrapperRepository', () => {
  let repository: ElMundoScrapperRepository;

  beforeEach(() => {
    repository = new ElMundoScrapperRepository();
  });

  it('should fetch and parse top news correctly', async () => {
    const mockHtml = `
            <html>
                <body>
                    <article>
                        <header><a href="https://example.com/news1">News 1</a></header>
                        <h2>Title 1</h2>
                        <span class="ue-c-cover-content__byline-name">Author 1</span>
                        <div class="ue-c-cover-content__footer">Description 1</div>
                        <img class="ue-c-cover-content__image" src="https://example.com/image1.jpg" />
                    </article>
                    <article>
                        <header><a href="https://example.com/news2">News 2</a></header>
                        <h2>Title 2</h2>
                        <span class="ue-c-cover-content__byline-name">Author 2</span>
                        <div class="ue-c-cover-content__footer">Description 2</div>
                        <img class="ue-c-cover-content__image" src="https://example.com/image2.jpg" />
                    </article>
                </body>
            </html>
        `;

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      new Response(mockHtml)
    );

    const news: Feed[] = await repository.getTopNews();

    expect(news).toHaveLength(2);
    expect(news[0]).toEqual({
      title: 'Title 1',
      description: 'Description 1',
      author: 'Author 1',
      link: 'https://example.com/news1',
      portrait: 'https://example.com/image1.jpg',
      newsletter: 'El Mundo',
    });
    expect(news[1]).toEqual({
      title: 'Title 2',
      description: 'Description 2',
      author: 'Author 2',
      link: 'https://example.com/news2',
      portrait: 'https://example.com/image2.jpg',
      newsletter: 'El Mundo',
    });
  });

  it('should skip articles without links', async () => {
    const mockHtml = `
            <html>
                <body>
                    <article>
                        <header><a href="">News 1</a></header>
                        <h2>Title 1</h2>
                        <span class="ue-c-cover-content__byline-name">Author 1</span>
                        <div class="ue-c-cover-content__footer">Description 1</div>
                        <img class="ue-c-cover-content__image" src="https://example.com/image1.jpg" />
                    </article>
                </body>
            </html>
        `;

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      new Response(mockHtml)
    );

    const feeds: Feed[] = await repository.getTopNews();

    expect(feeds).toHaveLength(0);
  });
});
