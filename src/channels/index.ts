import ndarray = require("ndarray");
import { IImage } from "../index";

enum ChannelMap {
  r = 0,
  g = 1,
  b = 2,
  a = 3,
}

const cycle = (i: IImage) => {
  console.log("Cycle colour channels", i.r, i.g, i.b);
};

const getChannel = (image: ndarray, c: ChannelMap) => {
  return image.pick(null, null, c);
};

const getRedChannel = (image: ndarray) => {
  return getChannel(image, ChannelMap.r);
};

export {
  cycle,
  getRedChannel,
};
