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
		const firstDotIndex = blocks.indexOf('.');

		blocks[firstDotIndex] = blocks[index],
			blocks[index] = '.';
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