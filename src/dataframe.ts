type Row<T> = T[];
type Lolomo<T> = Row<Row<T>>;

// create from array of arrays with headers
class DataFrame {
  headers: Row<string> = [];
  data: Lolomo<any> = [[], []];
  constructor(
    data: Lolomo<any>,
    headers: Boolean | Row<string> = true,
    types?: Function[]
  ) {
    // all rows must have same length
    if (headers) {
      if (typeof headers === "boolean") {
        this.headers = data[0];
        this.data = data.slice(1);
      } else {
        this.headers = headers as Row<string>;
        // read data row by row for as many cols as there are headers
        let data2 = [];
        for (let row of data) {
          let row2 = [];

          // if ANY of the first row's value match any header skip row
          let match = false;
          for (let i = 0; i < this.headers.length; i++) {
            if (this.headers[i] === row[i]) {
              match = true;
              break;
            }
          }
          if (match) continue;

          for (let i = 0; i < this.headers.length; i++) {
            row2.push(row[i]);
          }
          data2.push(row2);
        }
        this.data = data2;
      }
    } else {
      this.data = data;
    }

    // if types are provided, convert data
    if (types) {
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.data[i].length; j++) {
          this.data[i][j] = types[j](this.data[i][j]);
        }
      }
    }
  }

  row (index: number): Row<any> {
    return this.data[index];
  }

  col (header: string): Row<any> {
    let i = this.headers.indexOf(header);
    if (i === -1) {
      throw new Error(`Header ${header} not found`);
    }
    return this.data.map(row => row[i]);
  }

  // Row,Column
  #queryRC (header: string, index?: number): any {
    let i = this.headers.indexOf(header);
    if (i === -1) {
      throw new Error(`Header ${header} not found`);
    }
    if (index === undefined) {
      return this.data.map(row => row[i]);
    }
    return this.data[index][i];
  }

  // Column,Row
  #queryCR (index: number, header?: string): any {
    if (header === undefined) {
      return this.data[index];
    }
    let i = this.headers.indexOf(header);
    if (i === -1) {
      throw new Error(`Header ${header} not found`);
    }
    return this.data[index][i];
  }

  // auto query
  query (param1: number | string, param2: number | string): any {
    if (typeof param1 === "number") {
      return this.#queryCR(param1, param2 as string);
    }
    return this.#queryRC(param1, param2 as number);
  }
}

export default DataFrame;