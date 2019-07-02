import { IImage } from "../index";

const cycle = (i: IImage) => {
  console.log("Cycle colour channels", i.r, i.g, i.b);
};

export {
  cycle,
};
