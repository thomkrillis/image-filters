import {
  isolateBlueChannel,
  isolateGreenChannel,
  isolateRedChannel,
  newCycle,
} from "./channels";
import { stitchHorizontal, sum } from "./compose";
import { getPixel } from "./pixels";
import { unsetPixels } from "./unset";
import { toBuffer } from "./utils/ndarray";

interface IImage {
  r: number[][];
  g: number[][];
  b: number[][];
}

const helloWorld = () => {
  console.log("Hello world.");
};

export {
  IImage,
  getPixel,
  helloWorld,
  isolateBlueChannel,
  isolateGreenChannel,
  isolateRedChannel,
  newCycle,
  stitchHorizontal,
  sum,
  toBuffer,
  unsetPixels,
};
