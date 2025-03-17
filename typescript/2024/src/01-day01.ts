import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-01.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const lines = input.split("\n");

const [left, right] = lines.reduce<[number[], number[]]>((acc, line) => {
  const [l, r] = line.split("   ").map(Number);
  acc[0].push(l);
  acc[1].push(r);
  return acc;
}, [[], []]);

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

const totalDistance = left.reduce((sum, value, i) => sum + Math.abs(value - right[i]), 0);

console.log("🎄 Answer:", totalDistance);
