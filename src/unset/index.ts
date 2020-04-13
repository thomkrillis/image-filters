import ndarray = require("ndarray");
import { copy, toBuffer } from "../utils/ndarray";

const unsetPixels = (image: ndarray): ndarray => {
  const stride = 4;
  const w = image.shape[0];
  const h = image.shape[1];
  const imageCopy = copy(image);
  const bufferImage = toBuffer(imageCopy);
  for (let i = 0; i < stride * w * h; i += stride) {
    maybeUnsetPixel(bufferImage.slice(i, i + 4));
  }
  return ndarray(bufferImage, [w, h, stride]);
};

const maybeUnsetPixel = (pixel: Buffer): void => {
  redCheck(pixel);
};

const redCheck = (pixel: Buffer): void => {
  bandFilter({
    lower: 100,
    pixel,
    subpixel: pixel[0],
  });
};

const bandFilter = ({
  lower = 0,
  pixel,
  stop = false,
  subpixel,
  upper = 255,
}: {
  lower?: number;
  pixel: Buffer;
  subpixel: number;
  stop?: boolean;
  upper?: number;
}): void => {
  if (stop) {
    if (lower <= subpixel && subpixel <= upper) {
      unsetPixel(pixel);
    }
  } else {
    if (lower > subpixel || subpixel > upper) {
      unsetPixel(pixel);
    }
  }
};

const unsetPixel = (pixel: Buffer): void => {
  pixel[0] = 0;
  pixel[1] = 0;
  pixel[2] = 0;
  pixel[3] = 0;
};

export {
  unsetPixels,
};
