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
      // 4-factor because of RGBA
      const fourWidth = 4 * images[index].shape[0];
      // Push one row at a time of each image
      bufferArray.push(image.subarray(h0 * fourWidth, (h0 + 1) * fourWidth));
    });
  }
  const buffer: Buffer = Buffer.concat(bufferArray);
  return ndarray(buffer, [w, h, 4]);
};

const sum = (images: ndarray[]): ndarray => {
  const bufferImages: Buffer[] = [];
  const sumArray: number[] = [];
  let w: number = 0;
  let h: number = 0;
  for (const image of images) {
    if (h !== 0 && image.shape[1] !== h) {
      throw new Error("Heights must match");
    }
    if (w !== 0 && image.shape[0] !== w) {
      throw new Error("Widths must match");
    }
    [w, h] = image.shape;
  }
  for (const image of images) {
    bufferImages.push(toBuffer(image));
  }
  bufferImages.forEach((image, imageIndex) => {
    image.forEach((value, valueIndex) => {
      if (imageIndex === 0) {
        sumArray[valueIndex] = value;
      } else {
        sumArray[valueIndex] += value;
      }
    });
  });
  const buffer = Buffer.from(sumArray);
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
  sum,
};
