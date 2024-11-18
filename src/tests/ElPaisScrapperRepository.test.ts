import { ElPaisScrapperRepository } from "../infrastructure/repositories/scrapper/elpais/ElPaisScrapperRepository";
import { Feed } from "../domain/model/Feed";

global.fetch = jest.fn() as jest.Mock;

describe("ElPaisScrapperRepository", () => {
    let repository: ElPaisScrapperRepository;

    beforeEach(() => {
        repository = new ElPaisScrapperRepository();
    });

    it("should fetch and parse top news correctly", async () => {
        const mockHtml = `
            <html>
                <body>
                    <article>
                        <h2>Title 1</h2>
                        <a class="c_a_a">Author 1</a>
                        <p class="c_d">Description 1</p>
                        <header><a href="https://www.elpais.com/news/1"></a></header>
                        <img class="c_m_e _re lazyload a_m-h" src="portrait1.jpg" />
                    </article>
                    <article>
                        <h2>Title 2</h2>
                        <a class="c_a_a">Author 2</a>
                        <p class="c_d">Description 2</p>
                        <header><a href="https://www.elpais.com/news/2"></a></header>
                        <img class="c_m_e _re lazyload a_m-h" src="portrait2.jpg" />
                    </article>
                </body>
            </html>
        `;

        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(new Response(mockHtml));

        const news: Feed[] = await repository.getTopNews();

        expect(news).toHaveLength(2);

        expect(news[0]).toEqual({
            title: "Title 1",
            description: "Description 1",
            author: "Author 1",
            link: "https://www.elpais.com/news/1",
            portrait: "portrait1.jpg",
            newsletter: "El País"
        });

        expect(news[1]).toEqual({
            title: "Title 2",
            description: "Description 2",
            author: "Author 2",
            link: "https://www.elpais.com/news/2",
            portrait: "portrait2.jpg",
            newsletter: "El País"
        });
    });

    it("should handle empty articles", async () => {
        const mockHtml = `<html><body></body></html>`;
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(new Response(mockHtml));

        const feeds: Feed[] = await repository.getTopNews();

        expect(feeds).toHaveLength(0);
    });
});