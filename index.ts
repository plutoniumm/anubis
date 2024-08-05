import { table2json, relevenstein } from './src/string';
import { getWiki, get } from "./api";
import DF from "./src/dataframe";
import T from "./src/types";

const at = "List_of_countries_and_dependencies_by_population";

const $ = await getWiki(at, true)
const tables = $("table")

const df = new DF(
  table2json(tables.first()),
  ["Rank", "Country", "Population", "Percentage", "Date"],
  [T.String, T.Html, T.Number, T.Percentage, T.Date]
);

// print first 5 rows
console.log(df.headers);
for (let i = 0; i < 5; i++) {
  console.log(df.row(i));
}
