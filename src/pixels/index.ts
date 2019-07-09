import ndarray = require("ndarray");

const getPixel = (image: ndarray, i: number, j: number) => {
  const r = image.get(i, j, 0);
  const g = image.get(i, j, 1);
  const b = image.get(i, j, 2);
  const a = image.get(i, j, 3);

  return {
    a,
    b,
    g,
    r,
  };
};

export {
  getPixel,
};
