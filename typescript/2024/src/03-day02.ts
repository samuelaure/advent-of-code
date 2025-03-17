import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-02.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const reports = input.split("\n");
let answer = 0;

reports.forEach((report) => {
    const levels = report.split(" ").map(Number);
    const levelsLength = levels.length;
    let sort = "";

    for (let j = 0; j < levelsLength - 1; j++) {
        const diff = levels[j + 1] - levels[j];

        if (diff >= 1 && diff <= 3) {
            if (j === 0) {
                sort = "ASC";
            } else if (sort === "DESC") {
                return;
            }
        } else if (diff <= -1 && diff >= -3) {
            if (j === 0) {
                sort = "DESC";
            } else if (sort === "ASC") {
                return;
            }
        } else {
            return;
        }
    }

    answer++;
});

console.log("🎄 Answer:", answer);