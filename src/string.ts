import * as cheerio from "cheerio";
import type { Cheerio } from "cheerio";

export function relevenstein (a: string, b: string): number {
  const max = Math.max(a.length, b.length);
  const distance = levenstein(a, b);

  let rel = distance * 100 / max
  rel = ((100 - rel) | 0) / 100

  return rel;
}

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

export function table2json (table: Cheerio<any>): string[][] {
  const $ = cheerio.load(table.html());

  const rows = [];
  table.find('tr').each((i, row) => {
    const cols = [];
    $(row).find('td, th').each((j, cell) => {
      cols.push($(cell));
    });
    rows.push(cols);
  });

  const newTable = [];
  for (let i = 0; i < rows.length; i++) {
    newTable[i] = [];
  }

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
      const cell = rows[row][col];
      const rowspan = parseInt(cell.attr('rowspan')) || 1;
      const colspan = parseInt(cell.attr('colspan')) || 1;
      const cellContent = cell.text().trim();

      let i = row, j = 0;
      while (newTable[i][j] !== undefined) j++;

      for (let r = 0; r < rowspan; r++) {
        for (let c = 0; c < colspan; c++) {
          newTable[i + r][j + c] = cellContent;
        }
      }
    }
  };

  return newTable.map(row => row.map(cell => cell !== undefined ? cell : ''));
}