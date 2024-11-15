import * as cheerio from "cheerio"
import { Feed } from "../../../../domain/model/Feed";
import { ScrapperRepositoryInterface } from "../ScrapperRepositoryInterface";

const newsletterUrl = "https://elpais.com/";

export class ElPaisScrapperRepository implements ScrapperRepositoryInterface {
    async getTopNews(): Promise<Feed[]> {
        const content = await fetch(newsletterUrl);
        const body = await content.text();
        const $ = cheerio.load(body);

        const feeds: Feed[] = [];

        $("article").each((i, el) => {
            if (i < 5) {
                // console.log({el: $(el).html()});
                const title = $(el).find("h2").text();
                const author = $(el).find("a.c_a_a").first().text();
                const description = $(el).find("p.c_d").text();
                const link = $(el).find("header a").first().attr("href") || "";
                // get the image url from img tag with class c_m_e _re lazyload a_m-h
                const portrait = $(el).find("img.c_m_e._re.lazyload.a_m-h").attr("src") || null;
                // const portrait = $(el).find("figcaption img").attr("src") || "";
                console.log({ title, author, description, link, portrait });

                // feeds.push({ title, description, author, portrait, link, newsletter: newsletterUrl });
            }
        });

        return feeds;
    }
}
