import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-06.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const mapArr = input.split("\n").map((line) => line.split(""));
let currentRow = mapArr.findIndex((row) => row.includes("^"));
let currentColumn = mapArr[currentRow].indexOf("^");

const directions = [
    [-1, 0], // Up
    [0, 1],  // Right
    [1, 0],  // Down
    [0, -1]  // Left
]

let dirIndex = 0;
let position = [currentRow, currentColumn];
const visited = new Set();
console.log(visited);

while (true) {
	const [row, col] = position;
	const [dRow, dCol] = directions[dirIndex];
	const nextPosition = [row + dRow, col + dCol];

	if (
		nextPosition[0] < 0 || nextPosition[0] >= mapArr.length ||
		nextPosition[1] < 0 || nextPosition[1] >= mapArr[0].length
	) break;

	if (mapArr[nextPosition[0]][nextPosition[1]] === '#') {
		dirIndex = (dirIndex + 1) % directions.length;
		continue;
	}

	position = nextPosition;

	visited.add(JSON.stringify(position));
}

console.log("🎄 Answer:", visited.size);