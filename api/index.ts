import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';

export const get = (url: string) => fetch(url).then(r => r.text());

// .m will have less crap that needs to be parsed
const wiki = "https://en.m.wikipedia.org/wiki/";
export async function getWiki (page: string, parsed = false): P<CheerioAPI | string> {
  if (!page.includes("wikipedia.org")) {
    page = wiki + page;
  };

  page = await get(page);
  if (!page) throw new Error("No data");

  if (parsed) {
    return cheerio.load(page);
  }
  return page;
}
// barrel file
// ./oecd
// ./wiki