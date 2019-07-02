import { cycle } from "./channels";

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
  cycle,
  helloWorld,
};
