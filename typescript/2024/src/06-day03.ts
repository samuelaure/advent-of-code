import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-03.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const controlRegex = /(do\(\)|don't\(\))/g;

let answer = 0;
let allowMultiplication = true;

let controlMatches = [...input.matchAll(controlRegex)];
let mulMatches = [...input.matchAll(regex)];

let lastControlIndex = 0;

for (let mulMatch of mulMatches) {
    let mulIndex = mulMatch.index;
    
    while (lastControlIndex < controlMatches.length && controlMatches[lastControlIndex].index < mulIndex) {
        if (controlMatches[lastControlIndex][0] === "do()") {
            allowMultiplication = true;
        } else if (controlMatches[lastControlIndex][0] === "don't()") {
            allowMultiplication = false;
        }
        lastControlIndex++;
    }
    
    if (allowMultiplication) {
        const num1 = parseInt(mulMatch[1], 10);
        const num2 = parseInt(mulMatch[2], 10);
        answer += num1 * num2;
    }
}

console.log("🎄 Answer:", answer);