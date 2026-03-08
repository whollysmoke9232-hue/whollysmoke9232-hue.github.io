const fs = require("fs");
const path = require("path");

const libraryRoot = path.resolve(__dirname, "..", "src", "library");
const outputPath = path.resolve(__dirname, "..", "docs", "library-export.csv");

function getMarkdownFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontMatter(content) {
  const lines = content.split(/\r?\n/);
  if (lines[0] !== "---") {
    return null;
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === "---") {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return null;
  }

  const data = {};
  let currentArrayKey = null;

  for (const rawLine of lines.slice(1, endIndex)) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      continue;
    }

    if (currentArrayKey && /^-\s+/.test(line.trimStart())) {
      const item = line.trimStart().replace(/^-[\s]+/, "");
      data[currentArrayKey].push(stripQuotes(item));
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) {
      continue;
    }

    const key = match[1];
    const value = match[2];

    if (!value) {
      currentArrayKey = key;
      data[key] = [];
    } else {
      currentArrayKey = null;
      data[key] = stripQuotes(value);
    }
  }

  return data;
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const isoMatch = value.match(/^(\d{4})[-/](\d{2})[-/](\d{2})$/);
  if (isoMatch) {
    return `${isoMatch[2]}/${isoMatch[3]}/${isoMatch[1]}`;
  }

  const usMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (usMatch) {
    return value;
  }

  return value;
}

function csvEscape(value) {
  const safe = value == null ? "" : String(value);
  if (/[",\n]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        const nextChar = line[i + 1];
        if (nextChar === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else if (char === ',') {
      values.push(current);
      current = "";
    } else if (char === '"') {
      inQuotes = true;
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
}

function buildLibraryUrl(filePath) {
  const relativePath = path.relative(libraryRoot, filePath);
  const normalizedPath = relativePath.split(path.sep).join("/");
  const withoutExtension = normalizedPath.replace(/\.md$/i, "");

  if (withoutExtension.toLowerCase() === "index") {
    return "/library/";
  }

  return `/library/${withoutExtension}/`;
}

function getScriptureFirst(frontMatter) {
  const scriptureKeys = ["scripture_references", "scripture"];

  for (const key of scriptureKeys) {
    const value = frontMatter[key];
    if (Array.isArray(value) && value.length > 0) {
      return value[0];
    }
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

const markdownFiles = getMarkdownFiles(libraryRoot);
const header = ["title", "date", "category", "scripture_reference", "url"];
const existingRows = [];
const existingUrls = new Set();

if (fs.existsSync(outputPath)) {
  const existingContent = fs.readFileSync(outputPath, "utf8");
  const lines = existingContent.split(/\r?\n/).filter((line) => line.trim());

  if (lines.length > 0) {
    const existingHeader = parseCsvLine(lines[0]);
    const urlIndex = existingHeader.indexOf("url");

    for (const line of lines.slice(1)) {
      const values = parseCsvLine(line);
      existingRows.push(values);

      if (urlIndex >= 0 && values[urlIndex]) {
        existingUrls.add(values[urlIndex]);
      }
    }
  }
}

const newRows = [];

for (const filePath of markdownFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const frontMatter = parseFrontMatter(content);
  if (!frontMatter) {
    continue;
  }

  const url = buildLibraryUrl(filePath);
  if (existingUrls.has(url)) {
    continue;
  }

  newRows.push([
    frontMatter.title || "",
    formatDate(frontMatter.date || ""),
    frontMatter.category || "",
    getScriptureFirst(frontMatter),
    url,
  ]);
}

const rows = [header, ...existingRows, ...newRows];
const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
fs.writeFileSync(outputPath, `${csv}\n`, "utf8");

console.log(`Wrote ${newRows.length} new rows to ${outputPath}`);
