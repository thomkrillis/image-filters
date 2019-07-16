import ndarray = require("ndarray");
import { toBuffer } from "../utils/ndarray";

const stitchHorizontal = (images: ndarray[]): ndarray => {
  const bufferImages: Buffer[] = [];
  const bufferArray: Buffer[] = [];
  let w: number = 0;
  let h: number = 0;
  for (const image of images) {
    if (h !== 0 && image.shape[1] !== h) {
      throw new Error("Heights must match");
    }
    h = image.shape[1];
  }
  for (const image of images) {
    bufferImages.push(toBuffer(image));
    w += image.shape[0];
  }
  for (let h0 = 0; h0 < h; h0++) {
    bufferImages.forEach((image, index) => {
      const width = images[index].shape[0];
      bufferArray.push(image.subarray(h0 * width, (4 * (h0 + 1) * width) - 3));
    });
  }
  const buffer: Buffer = Buffer.concat(bufferArray);
  return ndarray(buffer, [w, h, 4]);
};

const stripedDistortion = (images: ndarray[], phaser: number = 4, shifter: number = 3): ndarray => {
  const bufferImages: Buffer[] = [];
  const bufferArray: Buffer[] = [];
  let w: number = 0;
  let h: number = 0;
  for (const image of images) {
    if (h !== 0 && image.shape[1] !== h) {
      throw new Error("Heights must match");
    }
    h = image.shape[1];
  }
  for (const image of images) {
    bufferImages.push(toBuffer(image));
    w += image.shape[0];
  }
  for (let h0 = 0; h0 < h; h0++) {
    bufferImages.forEach((image, index) => {
      const width = images[index].shape[0];
      bufferArray.push(image.subarray(h0 * width, (phaser * (h0 + 1) * width) - shifter));
    });
  }
  const buffer: Buffer = Buffer.concat(bufferArray);
  return ndarray(buffer, [w, h, 4]);
};

export {
  stitchHorizontal,
};
