import { cycle, cycleChannel, isolateGreenChannel, isolateRedChannel } from "./channels";
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
  cycleChannel,
  getPixel,
  helloWorld,
  isolateGreenChannel,
  isolateRedChannel,
};
