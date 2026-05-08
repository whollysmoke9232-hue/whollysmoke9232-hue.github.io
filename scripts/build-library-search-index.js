const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const libraryRoot = path.join(projectRoot, "src", "library");
const outputPath = path.join(
  projectRoot,
  "assets",
  "js",
  "search",
  "library-search-index.json"
);

function getMarkdownFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function stripQuotes(value) {
  const trimmed = String(value || "").trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseFrontMatter(content) {
  const lines = String(content || "").split(/\r?\n/);
  if (lines[0] !== "---") {
    return { data: {}, body: content };
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === "---") {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return { data: {}, body: content };
  }

  const data = {};
  let currentArrayKey = null;

  for (const rawLine of lines.slice(1, endIndex)) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      continue;
    }

    if (currentArrayKey && /^\s*-\s+/.test(line)) {
      const item = stripQuotes(line.replace(/^\s*-\s+/, ""));
      data[currentArrayKey].push(item);
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) {
      currentArrayKey = null;
      continue;
    }

    const key = match[1];
    const value = match[2];

    if (!value) {
      currentArrayKey = key;
      data[key] = [];
      continue;
    }

    currentArrayKey = null;
    data[key] = stripQuotes(value);
  }

  return {
    data,
    body: lines.slice(endIndex + 1).join("\n"),
  };
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

function slugFromFile(filePath) {
  const relative = path.relative(libraryRoot, filePath);
  return relative.split(path.sep).join("/").replace(/\.md$/i, "");
}

function shouldIncludeDocument(frontMatter, fileSlug) {
  const exclude = String(frontMatter.excludeFromLibrary || "")
    .trim()
    .toLowerCase();

  if (exclude === "true") {
    return false;
  }

  if (fileSlug.startsWith("fractured-light-the-")) {
    return false;
  }

  return true;
}

function stripHtml(markdown) {
  return String(markdown || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]*>/g, " ");
}

function stripMarkdown(markdown) {
  return String(markdown || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_~#]/g, " ")
    .replace(/\|/g, " ");
}

function normalizeWhitespace(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function searchTextForDocument(doc) {
  const fields = [
    doc.title,
    doc.excerpt,
    doc.category,
    ...(doc.tags || []),
    ...(doc.themes || []),
    ...(doc.scripture || []),
    doc.content,
  ];

  return normalizeWhitespace(fields.join(" ")).toLowerCase();
}

function buildDocument(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, body } = parseFrontMatter(raw);

  const fileSlug = slugFromFile(filePath);
  if (!shouldIncludeDocument(data, fileSlug)) {
    return null;
  }

  const title = String(data.title || fileSlug).trim();
  const permalink = String(data.permalink || "").trim();
  const url = permalink || `/library/${fileSlug}/`;
  const category = String(data.category || "").trim().toLowerCase();
  const tags = toArray(data.tags);
  const themes = toArray(data.themes);
  const scripture = toArray(data.scripture_references).length
    ? toArray(data.scripture_references)
    : toArray(data.scripture);
  const excerpt = String(data.excerpt || "").trim();

  const content = normalizeWhitespace(stripMarkdown(stripHtml(body)));

  const doc = {
    id: `src/library/${fileSlug}.md`,
    title,
    url,
    category,
    tags,
    themes,
    scripture,
    excerpt,
    content,
  };

  doc.searchText = searchTextForDocument(doc);

  return doc;
}

function main() {
  const markdownFiles = getMarkdownFiles(libraryRoot);
  const documents = markdownFiles
    .map((filePath) => buildDocument(filePath))
    .filter(Boolean)
    .sort((a, b) => String(a.title).localeCompare(String(b.title)));

  const payload = {
    generatedAt: new Date().toISOString(),
    total: documents.length,
    documents,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Wrote ${documents.length} documents to ${outputPath}`);
}

main();