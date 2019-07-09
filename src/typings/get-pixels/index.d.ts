
declare module "get-pixels" {
  import ndarray = require("ndarray");

  interface Pixels extends ndarray {}

  interface Callback {
    ( error: Error | null, result: Pixels) : void;
  }

  export = function getPixels(url: string, callback: Callback): void;
}