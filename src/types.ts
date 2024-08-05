import * as cheerio from 'cheerio';

const round = (x: number, d = 2) => (x * 10 ** d | 0) / 10 ** d;

export default {
  String: (x: string) => x,
  Number: (x: string) => {
    x = x.replace(/,/g, "");
    // remove all non-numeric/kmb characters
    x = x.replace(/(0-9)*(k|m|b)/gi, "");

    if (x.endsWith("k") || x.endsWith("k")) {
      return Number(x.replace("k", "").replace("K", "")) * 1000;
    }
    if (x.endsWith("m") || x.endsWith("M")) {
      return Number(x.replace("M", "").replace("m", "")) * 1e6;
    }
    if (x.endsWith("b") || x.endsWith("B")) {
      return Number(x.replace("B", "").replace("b", "")) * 1e9;
    }
    return Number(x);
  },
  Percentage: (x: string) => round(Number(x.replace("%", ""))),
  Date: (x: string) => new Date(x),
  RelativeDate: (x: string, format?: string) => {
    const then = +new Date(x);
    const now = +new Date();
    if (!format) return then - now;
    const allowedFormats = ["day", "week", "month", "year"];
    if (!allowedFormats.includes(format)) {
      throw new Error(`Format ${format} not allowed`);
    }

    const diff = now - then;
    return new Intl.RelativeTimeFormat("en", {
      numeric: "auto"
      // there is probably some shitfuckery with the /1000
      // i think it needs to change wrt day/month/week etc
    }).format(Math.floor(diff / 1000), format as Intl.RelativeTimeFormatUnit);
  },
  Html: (x: string) => {
    const $ = cheerio.load(`<div>${x}</div>`);
    return $.text().trim();
  }
}
