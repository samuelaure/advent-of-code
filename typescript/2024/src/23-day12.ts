import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-12.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

export const grid = input.split('\n').map((row) => row.trim().split(''));

const directions = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1],
];

function getArea(
	grid: string[][],
	i: number,
	j: number,
	char: string,
	area: Set<string>,
): Set<string> {
	area.add(JSON.stringify([i, j]));

	for (const dir of directions) {
		const [row, col] = dir;
		const nextPos = [i + row, j + col];

		if (
			nextPos[1] < 0 || nextPos[1] >= grid.length ||
			nextPos[0] < 0 || nextPos[0] >= grid[0].length
		) continue;
		else if (
			grid[nextPos[1]][nextPos[0]] === char &&
			!area.has(JSON.stringify(nextPos))
		) {
			area.add(JSON.stringify([nextPos[0], nextPos[1]]));
			const next = getArea(grid, nextPos[0], nextPos[1], char, area);
			if (next) {
				for (const item of next) {
					area.add(item);
				}
			}
		}
	}

	return area;
}

function getAreas(grid: string[][]): Map<string, number[][][]> {
	const areas = new Map<string, number[][][]>();

	const visited = new Set<string>();

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (!visited.has(JSON.stringify([i, j]))) {
				visited.add(JSON.stringify([i, j]));

				const area = getArea(
					grid,
					i,
					j,
					grid[j][i],
					new Set<string>(),
				);

				areas.set(grid[j][i], [
					...(areas.get(grid[j][i]) || []),
					Array.from(area).map((a) => JSON.parse(a)),
				]);

				area.forEach((pos) => visited.add(pos));
			}
		}
	}

	return areas;
}

export function getBorders(
	matrix: string[][],
	area: number[][],
	char: string,
): Map<string, string[]> {
	const borders = new Map<string, string[]>();

	area.forEach((a) => {
		for (const dir of directions) {
			const [row, col] = dir;
			const nextPos = [a[0] + row, a[1] + col];

			if (
				nextPos[1] < 0 || nextPos[1] >= matrix.length ||
				nextPos[0] < 0 || nextPos[0] >= matrix[0].length ||
				matrix[nextPos[1]][nextPos[0]] !== char
			) {
				borders.set(
					`${a[0]},${a[1]}`,
					[
						...(borders.get(`${a[0]},${a[1]}`) || ''),
						`${dir[0]},${dir[1]}`,
					],
				);
			}
		}
	});

	return borders;
}

function getPerimeter(
	matrix: string[][],
	area: number[][],
	char: string,
): number {
	return Array.from(getBorders(matrix, area, char).values()).reduce(
		(acc, val) => acc + val.length,
		0,
	);
}

export const areas = getAreas(grid);

const price = Array.from(areas.entries())
	.flatMap(([char, charAreas]) =>
		charAreas.map((area) => area.length * getPerimeter(grid, area, char))
	)
	.reduce((sum, value) => sum + value, 0);

if (require.main === module) {
    console.log("🎄 Answer:", price);
}