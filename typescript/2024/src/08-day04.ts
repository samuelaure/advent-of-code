import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-04.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

let answer = 0;

const grid = input.split("\n").map((row) => row.split(""));
const rows = grid.length;
const cols = grid[0].length;

const diagonals = [
    [[-1, 1], [1, -1]], // Up-Right & Down-Left
    [[-1, -1], [1, 1]] // Up-Left & Down-Right
];

function checkDiagonal(row: number, col: number, diagonal: number[][]) {
    let foundM = false, foundS = false;

    for (const [dRow, dCol] of diagonal) {
        const newX = row + dRow;
        const newY = col + dCol;

        if (newX < 0 || newX >= rows || newY < 0 || newY >= cols) {
            return false;
        }

        if (grid[newX][newY] === "M") foundM = true;
        if (grid[newX][newY] === "S") foundS = true;
    }

    return foundM && foundS;
}

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (grid[i][j] === "A") {
            if (checkDiagonal(i, j, diagonals[0]) && checkDiagonal(i, j, diagonals[1])) {
                answer++;
            }
        }
    }
}

console.log("🎄 Answer:", answer);