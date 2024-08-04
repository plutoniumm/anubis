import type { Cheerio } from "cheerio";

export function levenstein (a: string, b: string): number {
  let m = a.length;
  let n = b.length;
  let d = new Array(m + 1);
  for (let i = 0; i <= m; i++) {
    d[i] = new Array(n + 1);
    d[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    d[0][j] = j;
  }
  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (a[i - 1] === b[j - 1]) {
        d[i][j] = d[i - 1][j - 1];
      } else {
        let min = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1);
        d[i][j] = Math.min(min, d[i - 1][j - 1] + 1);
      }
    }
  }
  return d[m][n];
}

// take in cheerio table -> array of arrays
export function table2json (table: Cheerio<any>): string[][] {
  let rows = table.find("tr");
  let data = [];
  for (let i = 0; i < rows.length; i++) {
    let row = rows.eq(i);
    let cells = row.find("td,th");
    let rowdata = [];
    for (let j = 0; j < cells.length; j++) {
      let cell = cells.eq(j);
      rowdata.push(cell.text().trim());
    }
    data.push(rowdata);
  }
  return data;
}
