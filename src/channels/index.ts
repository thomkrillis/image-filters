import ndarray = require("ndarray");
import { IImage } from "../index";
import { copy, toBuffer } from "../utils/ndarray";

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

const newCycle = (image: ndarray, right: boolean = true): ndarray => {
  const [red, green, blue, alpha] = getChannelBuffersFromArray(image);
  const newOrder: Buffer[] = right
    ? [green, blue, red, alpha]
    : [blue, red, green, alpha];
  return getNdArrayFromChannelBuffers(newOrder, image.shape[0], image.shape[1]);
};

const getChannelBuffersFromArray = (image: ndarray): Buffer[] => {
  const stride = 4;
  const w = image.shape[0];
  const h = image.shape[1];
  const imageCopy = copy(image);
  const bufferImage = toBuffer(imageCopy);
  const red: number[] = [];
  const green: number[] = [];
  const blue: number[] = [];
  const alpha: number[] = [];
  for (let i = 0; i < stride * w * h; i += stride) {
    red.push(bufferImage[i]);
    green.push(bufferImage[i + 1]);
    blue.push(bufferImage[i + 2]);
    alpha.push(bufferImage[i + 3]);
  }
  return [Buffer.from(red), Buffer.from(green), Buffer.from(blue), Buffer.from(alpha)];
};

const getNdArrayFromChannelBuffers = (buffers: Buffer[], width: number, height: number): ndarray => {
  const stride = 4;
  const bufferArray: number[] = new Array(stride * width * height);
  for (let i = 0; i < width * height; i++) {
    bufferArray[i * stride + 0] = buffers[0][i];
    bufferArray[i * stride + 1] = buffers[1][i];
    bufferArray[i * stride + 2] = buffers[2][i];
    bufferArray[i * stride + 3] = buffers[3][i];
  }
  const outBuffer = Buffer.from(bufferArray);
  return ndarray(outBuffer, [width, height, stride]);
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
  isolateBlueChannel,
  isolateGreenChannel,
  isolateRedChannel,
  newCycle,
};
