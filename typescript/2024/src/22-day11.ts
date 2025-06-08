import fs from "fs";
import path from "path";
import { blink } from "./21-day11";

const inputPath = path.join(__dirname, "input-11.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const stones: number[] = input.split(' ').map(Number);

console.log("🎄 Answer:", blink(stones, 75));
