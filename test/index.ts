import DF from "./dataframe";
import * as cheerio from 'cheerio';
import { table2json, levenstein } from './string';
const get = (url: string) => fetch(url).then(r => r.text());

const wiki = "https://en.wikipedia.org/wiki/";
const at = "List_of_countries_and_dependencies_by_population";

const data = await get(wiki + at);
if (!data) throw new Error("No data");

const $ = cheerio.load(data);
const heading = "Sovereign states and dependencies by population";

// match ANY h1/h2/h3/h4/h5/h6 tag for the heading
const hmatch = $(`h1,h2`).filter((i, el) =>
  $(el).text().includes(heading)
);
// console.log(hmatch);

const tables = hmatch.nextAll("table");

const first = table2json(tables.first());

const df = new DF(
  first,
  ["Rank", "Country", "Population", "Percentage", "Date"]
);

// print first 5 rows
for (let i = 0; i < 5; i++) {
  console.log(df.row(i));
}
