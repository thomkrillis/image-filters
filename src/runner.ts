import { readFile } from "fs";
// import { promisify } from "util";
import {
  cycle,
  helloWorld,
} from "./";
// import testImage from "./assets/sample.jpg";
const testImage = require("./assets/sample.jpg");

helloWorld();

const img = {
  b: [],
  g: [],
  r: [],
};

cycle(img);

// const read = promisify(fs.readFile);
// read(__dirname + "/assets/sample.jpg").then((data) => {
//   console.log("d", data);
// });

readFile(__dirname + "/assets/sample.jpg", (err, data) => {
  console.log("d", data);
});

console.log("h", testImage);
