import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-07.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const calibrationEquations = input.split('\n').reduce((map, line) => {
	const [key, values] = line.split(':');

	map.set(parseInt(key.trim(), 10), values.trim().split(' ').map(Number));

	return map;
}, new Map<number, number[]>());

function generateCombinations(arr: number[], operations: string[]): string[][] {
	return arr.slice(1).reduce(
		(combinations) =>
			combinations.flatMap((combination) =>
				operations.map((op) => [...combination, op])
			),
		[[]] as string[][],
	);
}

const calculate = (
	equations: Map<number, number[]>,
	operations: string[],
): number =>
	Array.from(equations.entries()).reduce((acc, [k, v]) => {
		const combinations = generateCombinations(v, operations);

		for (const combination of combinations) {
			const result = v.reduce((res, num, i) =>
				i === 0
					? num
					: combination[i - 1] === '+'
					? res + num
					: combination[i - 1] === '*'
					? res * num
					: Number(`${res}${num}`)
			);

			if (result === k) {
				return acc + k;
			}
		}

		return acc;
	}, 0);

console.log(calculate(calibrationEquations, ['+', '*']));