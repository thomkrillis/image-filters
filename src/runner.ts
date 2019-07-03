import { readFile } from "fs";
import { promisify } from "util";
import {
  cycle,
  helloWorld,
} from "./";

helloWorld();

const img = {
  b: [],
  g: [],
  r: [],
};

cycle(img);

promisify(readFile)(__dirname + "/assets/sample.jpg").then((data) => {
  console.log("d1", data);
});
