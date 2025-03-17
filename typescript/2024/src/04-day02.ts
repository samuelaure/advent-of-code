import fs from "fs";
import path from "path";

const inputPath = path.join(__dirname, "input-02.txt");
const input = fs.readFileSync(inputPath, "utf-8").trim();

const reports = input.split("\n");
let answer = 0;

reports.forEach((report) => {
    const levels = report.split(" ").map(Number);

    const isSafe = (levels: number[]): boolean => {
        let sort = "";
        for (let j = 0; j < levels.length - 1; j++) {
            const diff = levels[j + 1] - levels[j];
            if (diff >= 1 && diff <= 3) {
                if (sort === "") {
                    sort = "ASC";
                } else if (sort === "DESC") {
                    return false;
                }
            } else if (diff <= -1 && diff >= -3) {
                if (sort === "") {
                    sort = "DESC";
                } else if (sort === "ASC") {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    };

    if (isSafe(levels)) {
        answer++;
    } else {
        for (let i = 0; i < levels.length; i++) {
            const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
            if (isSafe(newLevels)) {
                answer++;
                break;
            }
        }
    }
});

console.log("🎄 Answer:", answer);