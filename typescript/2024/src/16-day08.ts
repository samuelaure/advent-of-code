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
					antinodes.add(JSON.stringify([x2, y2]));

					const dx = x2 - x1;
					const dy = y2 - y1;
					let lineIterator = 1;

					const isValidAntinode = ([x, y]: number[]): boolean =>
						x >= 0 &&
						x < grid[0].length &&
						y >= 0 &&
						y < grid.length;

					while (true) {
						const possibleAntinodes = [
							[x1 - lineIterator * dx, y1 - lineIterator * dy],
							[x2 + lineIterator * dx, y2 + lineIterator * dy],
						];

						const validAntinodes = possibleAntinodes.filter(
							isValidAntinode,
						);

						if (validAntinodes.length === 0) break;

						validAntinodes.forEach((antinode) =>
							antinodes.add(JSON.stringify(antinode))
						);

						lineIterator++;
					}
				}
			})
		);
	})
);

console.log(antinodes.size);