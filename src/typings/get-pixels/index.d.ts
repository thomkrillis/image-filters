
declare module "get-pixels" {
  import ndarray = require("ndarray");

  interface Callback {
    ( error: Error | null, result: ndarray) : void;
  }

  export = function getPixels(url: string, callback: Callback): void;
}