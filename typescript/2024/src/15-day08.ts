import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-08.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const grid = input.split('\n').map((row) => row.trim().split(''));

const antinodes = new Set<string>();

grid.forEach((row, y1) =>
	row.forEach((cell, x1) => {
		if (cell === '.') return;

		grid.forEach((row2, y2) =>
			row2.forEach((cell2, x2) => {
				if (cell === cell2 && (x2 !== x1 || y2 !== y1)) {
					const dx = x2 - x1, dy = y2 - y1;

					[[x1 - dx, y1 - dy], [x2 + dx, y2 + dy]]
						.filter(
							([x, y]) =>
								x >= 0 &&
								x < grid[0].length &&
								y >= 0 &&
								y < grid.length,
						)
						.forEach((antinode) =>
							antinodes.add(JSON.stringify(antinode))
						);
				}
			})
		);
	})
);
console.log(antinodes.size);