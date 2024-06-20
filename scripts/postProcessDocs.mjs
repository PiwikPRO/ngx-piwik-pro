import { readFileSync, writeFileSync } from "node:fs";

const README = "README.md";

const file = readFileSync(README, "utf-8");

const formattedOutput = file
  .split("\n")
  // remove links suited for multi page documentation
  .filter((line) => !line.includes("@piwikpro/tracking-base-library"))
  // remove duplicated headers
  .filter(
    (line) => !line.includes("#### Functions") && !line.includes("### Index")
  )
  // remove remove additional prefixes
  .map((line) => line.replace("Namespace: ", ""))
  .map((line) => line.replace("Function: ", ""))
  // increase heading level for the title
  .map((line) =>
    line.replace(
      "## Piwik PRO Library for Angular",
      "# Piwik PRO Library for Angular"
    )
  )
  .join("\n")
  .replace("***", "");

writeFileSync(README, formattedOutput);
