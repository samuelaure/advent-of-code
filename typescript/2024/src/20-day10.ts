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

function unrollTrailRating(
	grid: number[][],
	x: number,
	y: number,
	num: number,
) {
	directions.forEach(([dx, dy]) => {
		const newX = x + dx, newY = y + dy;

		if (
			newY >= 0 && newY < grid.length &&
			newX >= 0 && newX < grid[newY].length &&
			grid[newY][newX] === num + 1
		) {
			if (grid[newY][newX] === 9) {
				trailheadsCount += 1;
			} else {
				unrollTrailRating(grid, newX, newY, num + 1);
			}
		}
	});
}

let trailheadsCount = 0;

grid.forEach((row, y) => {
	row.forEach((cell, x) => {
		if (!cell) {
			unrollTrailRating(grid, x, y, 0);
		}
	});
});

console.log();

console.log("🎄 Answer:", trailheadsCount);