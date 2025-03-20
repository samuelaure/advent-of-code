import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-04.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

let answer = 0;

const iArr = input.split("\n").map((row) => row.split(""));
const rows = iArr.length;
const columns = iArr[0].length;

const directions = [
    [0, 1],   // Right
    [0, -1],  // Left
    [-1, 0],  // Up
    [1, 0],   // Down
    [-1, 1],  // Up-Right
    [-1, -1], // Up-Left
    [1, 1],   // Down-Right
    [1, -1]   // Down-Left
];

function checkDirection(i: number, j: number, rowOffset: number, colOffset: number) {
    const target = ["M", "A", "S"];
    for (let step = 1; step <= 3; step++) {
        const newRow = i + step * rowOffset;
        const newCol = j + step * colOffset;
        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= columns || iArr[newRow][newCol] !== target[step - 1]) {
            return false;
        }
    }
    return true;
}

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        if (iArr[i][j] === "X") {
            for (const [rowOffset, colOffset] of directions) {
                if (checkDirection(i, j, rowOffset, colOffset)) {
                    answer++;
                }
            }
        }
    }
}

console.log("🎄 Answer:", answer);