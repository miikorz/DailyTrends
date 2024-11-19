import * as cheerio from 'cheerio';
import { Feed, FeedDTO } from '../../../../domain/model/Feed';
import { ScrapperRepositoryInterface } from '../ScrapperRepositoryInterface';

const newsletterUrl: string = 'https://elpais.com/';
const newsletterName: string = 'El País';

export class ElPaisScrapperRepository implements ScrapperRepositoryInterface {
  async getTopNews(): Promise<Feed[]> {
    const content: Response = await fetch(newsletterUrl);
    const body: string = await content.text();
    const $: cheerio.CheerioAPI = cheerio.load(body);
    const feedLimit: number = 5;
    const feeds: Feed[] = [];

    $('article').each((i, el) => {
      if (i < feedLimit) {
        const title: string = $(el).find('h2').text();
        const author: string = $(el).find('a.c_a_a').first().text();
        const description: string = $(el).find('p.c_d').text();
        const link: string = $(el).find('header a').first().attr('href') || '';
        const portrait: string =
          $(el).find('img.c_m_e._re.lazyload.a_m-h').attr('src') || '';

        const feed: Feed = new FeedDTO(
          title,
          description,
          author,
          link,
          portrait,
          newsletterName
        ).toObject();
        feeds.push(feed);
      }
    });

    return feeds;
  }
}
