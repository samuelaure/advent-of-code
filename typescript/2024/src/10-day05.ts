import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-05.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const rules = input.split(/\n\s*\n/)[0].split("\n").map((rule) => rule.split("|").map(Number));
const updates = input.split(/\n\s*\n/)[1].split("\n").map((update) => update.split(",").map(Number));

function isUpdateCorrect(rules: number[][], update: number[]): boolean {
    return !rules.some(([a, b]) =>
        update.includes(a) && update.includes(b) &&
        update.indexOf(a) > update.indexOf(b)
    );
}

function orderUpdate(rules: number[][], update: number[]): number[] {
	while (!isUpdateCorrect(rules, update)) {
		rules.forEach(([a, b]) => {
			const indexA = update.indexOf(a);
			const indexB = update.indexOf(b);
			if (indexA > -1 && indexB > -1 && indexA > indexB) {
				[update[indexA], update[indexB]] = [
					update[indexB],
					update[indexA],
				];
			}
		});
	}
	return update;
}

console.log("🎄 Answer:", updates.reduce(
		(acc, update) =>
			acc +
			(isUpdateCorrect(rules, update) ? 0 : orderUpdate(
				rules,
				update,
			)[Math.floor(update.length / 2)]),
		0,
	),
);