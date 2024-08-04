import * as cheerio from 'cheerio';

export const get = (url: string) => fetch(url).then(r => r.text());

const wiki = "https://en.wikipedia.org/wiki/";
export async function getWiki (page: string, parsed = false) {
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