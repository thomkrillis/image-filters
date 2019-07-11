import ndarray = require("ndarray");

const copy = (image: ndarray): ndarray => ndarray(toBuffer(image), image.shape);

const toBuffer = (image: ndarray): Buffer => Buffer.from(image.data as number[]);

export {
  copy,
  toBuffer,
};
