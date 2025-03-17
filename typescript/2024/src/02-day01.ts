import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-01.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

console.log("🎄 Day 2 solution");

const lines = input.split("\n");
const numbers = lines.map(line => line.split(/\s+/).map(Number));

const left: number[] = [];
const right: number[] = [];

numbers.forEach(([l, r]) => {
    left.push(l);
    right.push(r);
});

const rightFrequency = right.reduce((map, num) => {
    map.set(num, (map.get(num) || 0) + 1);
    return map;
}, new Map<number, number>());

const similarityScore = left.reduce((score, num) => {
    return score + Math.abs(num * (rightFrequency.get(num) || 0));
}, 0);

console.log("Similarity Score:", similarityScore);
