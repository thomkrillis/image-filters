import ndarray = require("ndarray");
import { toBuffer } from "../utils/ndarray";

const stitchHorizontal = (images: ndarray[]): ndarray => {
  const bufferArray: Buffer[] = [];
  let w: number = 0;
  let h: number = 0;
  for (const image of images) {
    if (h !== 0 && image.shape[1] !== h) {
      throw new Error("Heights must match");
    }
    // TODO fix pushing of buffer to row-by-row
    bufferArray.push(toBuffer(image));
    w += image.shape[0];
    h = image.shape[1];
  }
  const buffer: Buffer = Buffer.concat(bufferArray);
  return ndarray(buffer, [w, h, 4]);
};

export {
  stitchHorizontal,
};
