export default {
  String: (x: string) => x,
  Number: (x: string) => {
    x = x.replace(/,/g, "");
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
  Percentage: (x: string) => Number(x.replace("%", "")) / 100,
  Date: (x: string) => new Date(x),
}