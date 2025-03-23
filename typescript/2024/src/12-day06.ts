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

let obstructionCount = 0;

for (let i = 0; i < mapArr.length; i++) {
	for (let j = 0; j < mapArr[i].length; j++) {
		if (!['#', '^'].includes(mapArr[i][j])) {
			let dirIndex = 0;
			let position = [currentRow, currentColumn];
			const visited = new Set([
				JSON.stringify([...position, ...directions[dirIndex]]),
			]);
			const modifiedmapArr = mapArr.map((row) => [...row]);
			modifiedmapArr[i][j] = '#';

			while (true) {
				const [row, col] = position;
				const [dRow, dCol] = directions[dirIndex];
				const nextPosition = [row + dRow, col + dCol];

				if (
					nextPosition[0] < 0 || nextPosition[0] >= modifiedmapArr.length ||
					nextPosition[1] < 0 || nextPosition[1] >= modifiedmapArr[0].length
				) break;

				if (modifiedmapArr[nextPosition[0]][nextPosition[1]] === '#') {
					dirIndex = (dirIndex + 1) % directions.length;
					continue;
				}

				position = nextPosition;

				if (visited.has(JSON.stringify([...position, ...directions[dirIndex]]))) {
					obstructionCount += 1;
					break;
				}

				visited.add(JSON.stringify([...position, ...directions[dirIndex]]));
			}
		}
	}
}

console.log("🎄 Answer:", obstructionCount);