import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-09.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const inputArr = input.split('').map((digit, i) =>
	i % 2 === 0
		? Array(Number(digit)).fill(i / 2)
		: Array(Number(digit)).fill('.')
).filter((item) => item.length).flat();

const blocks = [...inputArr];

let index = blocks.length - 1;

while (index >= blocks.indexOf('.')) {
	if (!isNaN(Number(blocks[index]))) {
		const firstIndex = blocks.indexOf(blocks[index]);
		const rangeLength = index - firstIndex + 1;

		for (let j = 0; j <= firstIndex; j++) {
			const slice = blocks.slice(j, j + rangeLength);

			if (slice.every((item) => item === '.')) {
				const filled = Array(rangeLength).fill(blocks[index]);
				const dots = Array(rangeLength).fill('.');

				blocks.splice(j, rangeLength, ...filled);
				blocks.splice(firstIndex, rangeLength, ...dots);

				break;
			}
		}

		index -= rangeLength;
		continue;
	}

	index -= 1;
}

console.log(
	"🎄 Answer:",
	blocks.reduce(
		(acc, val, i) => {
			return !isNaN(Number(val)) ? acc += i * Number(val) : acc;
		},
		0,
	),
);