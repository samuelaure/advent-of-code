import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-11.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const stones: number[] = input.split(' ').map(Number);

function engrave(stone: number): number[] {
	return stone === 0 ? [1] : stone.toString().length % 2 === 0
		? [
			Number(stone.toString().slice(0, stone.toString().length / 2)),
			Number(stone.toString().slice(stone.toString().length / 2)),
		]
		: [stone * 2024];
}

export function blink(stones: number[], iterations: number): number {
	let currentMap = new Map(stones.map((stone) => [stone, 1]));

	for (let _ = 0; _ < iterations; _++) {
		const nextMap = new Map<number, number>();

		for (const [stone, count] of currentMap) {
			for (const engraved of engrave(stone)) {
				nextMap.set(
					engraved,
					(nextMap.get(engraved) ?? 0) + count,
				);
			}
		}

		currentMap = nextMap;
	}

	return Array.from(currentMap.values()).reduce((acc, val) => acc + val, 0);
}

if (require.main === module) {
	console.log("🎄 Answer:", blink(stones, 25));
}
