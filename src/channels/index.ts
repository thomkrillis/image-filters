import ndarray = require("ndarray");
import { IImage } from "../index";

enum ChannelMap {
  r = 0,
  g = 1,
  b = 2,
  a = 3,
}

// Deprecated
const cycle = (i: IImage) => {
  console.log("Cycle colour channels", i.r, i.g, i.b);
};

// TODO this is some crazy vertical stripe for some reason...
const cycleChannel = (image: ndarray, left: boolean = true) => {
  if (left) {
    return image.transpose(2, 0, 1);
  }
  return image.transpose(1, 2, 0);
};

const unsetChannel = (image: ndarray, c: ChannelMap) => {
  const channel = image.pick(null, null, c);
  for (let i = 0; i < channel.shape[0]; ++i) {
    for (let j = 0; j < channel.shape[1]; ++j) {
      channel.set(i, j, 0);
    }
  }
  return null;
};

const isolateGreenChannel = (image: ndarray) => {
  unsetChannel(image, ChannelMap.r);
  unsetChannel(image, ChannelMap.b);
  return image;
};

const isolateRedChannel = (image: ndarray) => {
  unsetChannel(image, ChannelMap.g);
  unsetChannel(image, ChannelMap.b);
  return image;
};

export {
  cycle,
  cycleChannel,
  isolateGreenChannel,
  isolateRedChannel,
};
