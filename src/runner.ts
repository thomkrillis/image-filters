import { readFile, writeFile } from "fs";
import getPixels = require("get-pixels");
import jpeg = require("jpeg-js");
import ndarray = require("ndarray");
import { promisify } from "util";
import {
  cycleChannel,
  getPixel,
  helloWorld,
  isolateBlueChannel,
  isolateGreenChannel,
  isolateRedChannel,
  stitchHorizontal,
  sum,
  toBuffer,
} from "./";

const getImageBufferFromNdarray = (array: ndarray): Buffer => {
  const data = toBuffer(array);
  const height = array.shape[1];
  const width = array.shape[0];
  const imageData = {
    data,
    height,
    width,
  };
  return jpeg.encode(imageData).data;
};

const run = async () => {
  helloWorld();

  const array = await promisify(getPixels)(__dirname + "/assets/sample.jpg");
  console.log("array", array);
  console.log("12th row, 25th column red value", array.get(11, 24, 0));
  console.log("12th row, 25th column rgba values", getPixel(array, 11, 24));

  const buffer = getImageBufferFromNdarray(array);
  await promisify(writeFile)(__dirname + "/assets/output-ndarray.jpg", buffer);

  const redArray = isolateRedChannel(array);
  const redBuffer = getImageBufferFromNdarray(redArray);
  await promisify(writeFile)(__dirname + "/assets/output-ndarray-red.jpg", redBuffer);

  const greenArray = isolateGreenChannel(array);
  const greenBuffer = getImageBufferFromNdarray(greenArray);
  await promisify(writeFile)(__dirname + "/assets/output-ndarray-green.jpg", greenBuffer);

  const blueArray = isolateBlueChannel(array);
  const blueBuffer = getImageBufferFromNdarray(blueArray);
  await promisify(writeFile)(__dirname + "/assets/output-ndarray-blue.jpg", blueBuffer);

  const sumArray = sum([redArray, greenArray, blueArray]);
  const sumBuffer = getImageBufferFromNdarray(sumArray);
  await promisify(writeFile)(__dirname + "/assets/output-ndarray-sum.jpg", sumBuffer);

  const horizontalArray = stitchHorizontal([redArray, greenArray, blueArray]);
  const horizontalBuffer = getImageBufferFromNdarray(horizontalArray);
  await promisify(writeFile)(__dirname + "/assets/output-ndarray-stitched.jpg", horizontalBuffer);

  /*
  const cycleArray = cycleChannel(array);
  const cycleBuffer = getImageBufferFromNdarray(cycleArray);
  await promisify(writeFile)(__dirname + "/assets/output-ndarray-cycle.jpg", cycleBuffer);
  */

  const fsData = await promisify(readFile)(__dirname + "/assets/sample.jpg");
  console.log("d1", fsData);

  await promisify(writeFile)(__dirname + "/assets/output.jpg", fsData);

  return null;
};

run().then(() => {
  console.log("Success.");
  process.exit(0);
}).catch((err) => {
  console.log(`Error: ${err}`);
  process.exit(1);
});
