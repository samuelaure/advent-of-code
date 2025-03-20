import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-03.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
let match;
let answer = 0;

while ((match = regex.exec(input)) !== null) {
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    answer += x * y;
}

console.log("🎄 Answer:", answer);