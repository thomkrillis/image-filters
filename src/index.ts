import { cycle } from "./channels";

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
  helloWorld,
};
