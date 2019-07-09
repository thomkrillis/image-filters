import { readFile, writeFile } from "fs";
import { promisify } from "util";
import {
  cycle,
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
