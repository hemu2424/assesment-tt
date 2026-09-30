import fs from "fs/promises";
import { EventEmitter } from "events";

const data = await fs.readFile("./data.js", "utf-8");

const lines = data.split(/\r?\n/).length;

console.log("Number of lines:", lines);

const emitter = new EventEmitter();

emitter.on("planAdded", (payload) => {
  console.log("Plan added:", payload);
});

emitter.emit("planAdded", {
  id: 6,
  name: "HIIT",
  category: "Advanced",
  price: 1200,
  stock: 8,
});

