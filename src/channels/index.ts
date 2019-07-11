import ndarray = require("ndarray");
import { IImage } from "../index";
import { copy } from "../utils/ndarray";

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
};

const unsetChannels = (image: ndarray, channels: ChannelMap[]) => {
  for (const channel of channels) {
    unsetChannel(image, channel);
  }
};

const isolateBlueChannel = (image: ndarray) => {
  const imageCopy = copy(image);
  unsetChannels(imageCopy, [ChannelMap.r, ChannelMap.g]);
  return imageCopy;
};

const isolateGreenChannel = (image: ndarray) => {
  const imageCopy = copy(image);
  unsetChannels(imageCopy, [ChannelMap.r, ChannelMap.b]);
  return imageCopy;
};

const isolateRedChannel = (image: ndarray) => {
  const imageCopy = copy(image);
  unsetChannels(imageCopy, [ChannelMap.g, ChannelMap.b]);
  return imageCopy;
};

export {
  cycle,
  cycleChannel,
  isolateBlueChannel,
  isolateGreenChannel,
  isolateRedChannel,
};
