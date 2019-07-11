import {
  cycleChannel,
  isolateBlueChannel,
  isolateGreenChannel,
  isolateRedChannel,
} from "./channels";
import { stitchHorizontal } from "./compose";
import { getPixel } from "./pixels";
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
  cycleChannel,
  getPixel,
  helloWorld,
  isolateBlueChannel,
  isolateGreenChannel,
  isolateRedChannel,
  stitchHorizontal,
  toBuffer,
};
