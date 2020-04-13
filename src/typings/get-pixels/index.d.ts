
declare module "get-pixels" {
  import ndarray = require("ndarray");

  interface Callback {
    ( error: Error | null, result: ndarray) : void;
  }

  function getPixels(url: string, callback: Callback): void;

  export = getPixels;
}