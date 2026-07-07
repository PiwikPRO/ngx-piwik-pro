import { readFileSync, writeFileSync } from "node:fs";

const README = "README.md";

const splitIntoSections = (content) => {
  const anchorRegex = /<a name="([^"]+)"><\/a>/g;
  const matches = [...content.matchAll(anchorRegex)];

  if (matches.length === 0) {
    return [{ name: "_all", content }];
  }

  const sections = [];

  if (matches[0].index > 0) {
    sections.push({
      name: "_prefix",
      content: content.slice(0, matches[0].index),
    });
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end =
      i + 1 < matches.length ? matches[i + 1].index : content.length;

    sections.push({
      name: matches[i][1],
      content: content.slice(start, end),
    });
  }

  return sections;
};

const normalizeAnchors = (content) =>
  content
    .replace(/piwikpronamespaces/g, "namespaces")
    .replace(/piwikprofunctions/g, "functions");

const formatParameters = (content) =>
  content.replace(
    /### Parameters\n\n([\s\S]*?)(?=\n### |\n<a name=|\n## |\n$)/g,
    (match, block) => {
      const lines = block.trimEnd().split("\n");
      const formatted = [];
      let index = 0;

      while (index < lines.length) {
        const headerMatch = lines[index].match(/^#### (.+)$/);

        if (!headerMatch) {
          index++;
          continue;
        }

        const name = headerMatch[1];
        index++;

        while (index < lines.length && lines[index].trim() === "") {
          index++;
        }

        if (index < lines.length && lines[index].startsWith("`")) {
          const type = lines[index].trim();
          index++;

          const description = [];
          while (
            index < lines.length &&
            lines[index].trim() !== "" &&
            !lines[index].startsWith("####")
          ) {
            description.push(lines[index]);
            index++;
          }

          const entry = `• **${name}**: ${type}`;
          formatted.push(
            description.length ? `${entry}\n\n${description.join("\n")}` : entry
          );
        }
      }

      if (formatted.length === 0) {
        return match;
      }

      return `### Parameters\n\n${formatted.join("\n")}\n`;
    }
  );

const transformSection = (content) =>
  normalizeAnchors(content)
    .split("\n")
    .filter((line) => !line.includes("@piwikpro/tracking-base-library"))
    .filter(
      (line) =>
        !line.includes("#### Functions") &&
        !line.includes("### Functions") &&
        !line.includes("### Index")
    )
    .filter((line) => !line.match(/^## @piwikpro\//))
    .map((line) => line.replace("Namespace: ", ""))
    .map((line) => line.replace(/^## Function: /, "## "))
    .map((line) => line.replace("Function: ", ""))
    .map((line) =>
      line.replace(
        "## Piwik PRO Library for Angular",
        "# Piwik PRO Library for Angular"
      )
    )
    .map((line) => line.replace(/^> \*\*([^*]+)\*\* = /, "> **$1**: "))
    .map((line) => line.replace(/^### Properties$/, "### Type declaration"))
    .map((line) => line.replace(/^### Type Declaration$/, "### Type declaration"))
    .map((line) => line.replace(/^#### Type Aliases$/, "### Type Aliases"))
    .map((line) =>
      line.replace(/^#### (decorator|getter)$/, "• **$1**:")
    )
    .map((line) =>
      line.replace(/> `optional` \*\*([^?]+)\?\*\*:/, "> `optional` **$1**:")
    )
    .join("\n");

const reorderSections = (sections) => {
  const byName = new Map(sections.map((section) => [section.name, section]));

  const installation = byName.get("readmemd")?.content ?? "";
  const globals = byName.get("globalsmd")?.content ?? "";

  const namespaceSections = sections
    .filter(
      (section) =>
        section.name.startsWith("namespaces") ||
        section.name.startsWith("piwikpronamespaces")
    )
    .map((section) => section.content)
    .join("");

  const referenceSections = sections
    .filter(
      (section) =>
        section.name.startsWith("type-aliases") ||
        section.name.startsWith("variables")
    )
    .map((section) => section.content)
    .join("");

  return [installation, globals, namespaceSections, referenceSections]
    .filter(Boolean)
    .join("\n");
};

const file = readFileSync(README, "utf-8");
const sections = splitIntoSections(file);
const reordered = reorderSections(sections);
const formattedOutput = formatParameters(transformSection(reordered));

writeFileSync(README, `\n${formattedOutput.trimStart()}\n`);
