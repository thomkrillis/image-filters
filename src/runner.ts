import { readFile, writeFile } from "fs";
import getPixels = require("get-pixels");
import { promisify } from "util";
import {
  cycle,
  getPixel,
  helloWorld,
} from "./";

const run = async () => {
  helloWorld();

  const img = {
    b: [],
    g: [],
    r: [],
  };

  cycle(img);

  const ndarray = await promisify(getPixels)(__dirname + "/assets/sample.jpg");
  console.log("ndarray", ndarray);
  console.log("12th row, 25th column red value", ndarray.get(11, 24, 0));
  console.log("12th row, 25th column rgba values", getPixel(ndarray, 11, 24));

  const data = await promisify(readFile)(__dirname + "/assets/sample.jpg");
  console.log("d1", data);

  await promisify(writeFile)(__dirname + "/assets/output.jpg", data);

  return null;
};

run().then(() => {
  console.log("Success.");
  process.exit(0);
}).catch((err) => {
  console.log(`Error: ${err}`);
  process.exit(1);
});
