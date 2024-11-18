import * as cheerio from "cheerio"
import { Feed, FeedDTO } from "../../../../domain/model/Feed";
import { ScrapperRepositoryInterface } from "../ScrapperRepositoryInterface";

const newsletterUrl: string = "https://elmundo.es/";
const newsletterName: string = "El Mundo";

export class ElMundoScrapperRepository implements ScrapperRepositoryInterface {
    async getTopNews(): Promise<Feed[]> {
        const content: Response = await fetch(newsletterUrl);
        const body: string = await content.text();
        const $: cheerio.CheerioAPI = cheerio.load(body);
        const feedLimit: number = 5;
        let feedCount: number = 0;
        const feeds: Feed[] = [];

        $("article").each((i, el) => {
            if (feedCount < feedLimit) {
                const link: string = $(el).find("header a").first().attr("href") || "";
                // * If there is no link we skip this feed since its only a video or not a full new
                if (!link) return;

                const title: string = $(el).find("h2").text();
                const author: string = $(el).find("span.ue-c-cover-content__byline-name").text().replace("Redacci�n: ", "");
                const description: string = $(el).find("div.ue-c-cover-content__footer").text();
                const portrait: string = $(el).find("img.ue-c-cover-content__image").attr("src") || "";

                const feed: Feed = new FeedDTO(title, description, author, link, portrait, newsletterName).toObject();
                feeds.push(feed);
                
                feedCount++;
            }
        });

        return feeds;
    }
}
