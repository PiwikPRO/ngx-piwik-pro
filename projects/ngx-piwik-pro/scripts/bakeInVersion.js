const { version } = require("../package.json");
const path = require("path");
const { writeFileSync } = require("node:fs");

writeFileSync(
  path.join(__dirname, "../src/version.ts"),
  `export const VERSION = ${JSON.stringify(version)}`
);
