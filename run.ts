import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const args = process.argv.slice(2);

if (args.length < 3) {
  console.error("❌ Use: npm run puzzle <language> <year> <puzzle>");
  process.exit(1);
}

const [language, year, puzzle] = args;
const day = Math.round(parseInt(puzzle) / 2);
const fileName = `${String(puzzle).padStart(2, "0")}-day${String(day).padStart(2, "0")}`;
const scriptPath = path.join(
  __dirname,
  language,
  year,
  "src",
  `${fileName}.ts`
);

if (!fs.existsSync(scriptPath)) {
  console.error(`❌ File not found: ${scriptPath}`);
  process.exit(1);
}

console.log(`🚀 Executing ${language}/${year}/${puzzle}...`);
execSync(`npx ts-node ${scriptPath}`, { stdio: "inherit" });
