import { getBorders, areas, grid } from "./23-day12";

function getPerimeterWithDiscount(
	grid: string[][],
	area: number[][],
	char: string,
): number {
	const borders = getBorders(grid, area, char);

	const similarities: string[] = [];

	borders.forEach((value, key) => {
		const [row, col] = key.split(',').map(Number);

		borders.forEach((value2, key2) => {
			const [row2, col2] = key2.split(',').map(Number);
			const [drow, dcol] = [Math.abs(row2 - row), Math.abs(col2 - col)];

			if (
				key2 !== key &&
				((drow === 0 && dcol === 1) || (drow === 1 && dcol === 0))
			) {
				similarities.push(...value.filter(function (el) {
					return value2.indexOf(el) >= 0;
				}));
			}
		});
	});

	return Array.from(borders.values()).reduce(
		(acc, val) => acc + val.length,
		0,
	) - similarities.length / 2;
}

const priceWithDiscount = Array.from(areas.entries())
	.flatMap(([char, charAreas]) =>
		charAreas.map((area) =>
			area.length * getPerimeterWithDiscount(grid, area, char)
		)
	)
	.reduce((sum, value) => sum + value, 0);

console.log("🎄 Answer:", priceWithDiscount);
