import { cycle, getRedChannel } from "./channels";
import { getPixel } from "./pixels";

interface IImage {
  r: number[][];
  g: number[][];
  b: number[][];
}

interface IImageBuffer extends Buffer {};

const helloWorld = () => {
  console.log("Hello world.");
};

export {
  IImage,
  IImageBuffer,
  cycle,
  getPixel,
  getRedChannel,
  helloWorld,
};
