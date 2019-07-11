import { readFile, writeFile } from "fs";
import getPixels = require("get-pixels");
import jpeg = require("jpeg-js");
import ndarray = require("ndarray");
import { promisify } from "util";
import {
  cycle,
  cycleChannel,
  getPixel,
  helloWorld,
  isolateGreenChannel,
  isolateRedChannel,
} from "./";

const getImageBufferFromNdarray = (array: ndarray): Buffer => {
  const preBufferData = array.data;
  const data = Buffer.from(preBufferData as number[]);
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

  const img = {
    b: [],
    g: [],
    r: [],
  };

  cycle(img);

  const array = await promisify(getPixels)(__dirname + "/assets/sample.jpg");
  console.log("array", array);
  console.log("12th row, 25th column red value", array.get(11, 24, 0));
  console.log("12th row, 25th column rgba values", getPixel(array, 11, 24));

  const buffer = getImageBufferFromNdarray(array);
  await promisify(writeFile)(__dirname + "/assets/output-ndarray.jpg", buffer);

  const redArray = isolateRedChannel(array);
  const redBuffer = getImageBufferFromNdarray(redArray);
  await promisify(writeFile)(__dirname + "/assets/output-ndarray-red.jpg", redBuffer);

  // TODO find some way to deep copy ndarray (this is black because the previous step wiped the green channel)
  const greenArray = isolateGreenChannel(array);
  const greenBuffer = getImageBufferFromNdarray(greenArray);
  await promisify(writeFile)(__dirname + "/assets/output-ndarray-green.jpg", greenBuffer);

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
