import "zx/globals";
import fs from "fs-extra";

const excludes = [
  // Bots
  "mt-gitlocalize",
  "gitlocalize-app[bot]",

  // Duplicates
  // - Burrito
  "NonSpicyBurrito",
  // - ドマオー
  "Dosugamea",
  // - Nanashi.
  "sevenc-nanashi",
  "Nanashi",
];

const contributors = [
  ...new Set((await $`git log --pretty="%aN"`).stdout.split("\n")),
]
  .filter((line) => !!line)
  .filter((line) => !excludes.includes(line))
  .sort();
fs.outputJsonSync("./src/contributors.json", contributors, { spaces: 4 });
