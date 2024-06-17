import { readFileSync, writeFileSync } from "node:fs";

const README = "README.md";

const file = readFileSync(README, "utf-8");

const formattedOutput = file
  .split("\n")
  // remove additional headings
  .filter(
    (line) =>
      !line.includes("# @piwikpro/ngx-piwik-pro") &&
      !line.includes("@piwikpro/ngx-piwik-pro / [Modules](#modulesmd)") &&
      !line.includes("[@piwikpro/ngx-piwik-pro](#readmemd)")
  )
  // remove links suited for multi page documentation
  .filter((line) => !line.includes("@piwikpro/tracking-base-library"))
  // remove duplicated header
  .filter((line) => !line.includes("#### Functions") && !line.includes("### Index"))
  // remove remove additional prefix
  .filter((line) => !line.includes("node\\_modules"))
  .map((line) => line.replace("Namespace: ", ""))
  .map((line) => line.replace("Function: ", ""))
  .join("\n")
  .replace("***", "");
writeFileSync(README, formattedOutput);
