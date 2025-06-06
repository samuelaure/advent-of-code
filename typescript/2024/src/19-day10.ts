import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-10.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const grid = input.split('\n').map((row) => row.trim().split('').map(Number));

const directions = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1],
];

function unrollTrail(
	grid: number[][],
	x: number,
	y: number,
	num: number,
	localCount: Set<string>,
) {
	directions.forEach(([dx, dy]) => {
		const newX = x + dx, newY = y + dy;

		if (
			newY >= 0 && newY < grid.length &&
			newX >= 0 && newX < grid[newY].length &&
			grid[newY][newX] === num + 1
		) {
			if (grid[newY][newX] === 9) {
				localCount.add(`${newY},${newX}`);
			} else {
				unrollTrail(grid, newX, newY, num + 1, localCount);
			}
		}
	});
	return localCount.size;
}

const count = grid.flatMap((row, y) =>
	row.map((cell, x) =>
		!cell ? unrollTrail(grid, x, y, 0, new Set<string>()) : 0
	)
).reduce((acc, val) => acc + val, 0);

console.log("🎄 Answer:", count);