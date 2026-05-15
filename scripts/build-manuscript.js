// Regenerates table-of-contents.md and manuscript.md from chapter source files.
// Runs automatically as part of npm run build.

const fs = require('fs');
const path = require('path');

const BOOK_DIR  = path.join(__dirname, '../src/books/margins-where-god-begins');
const CHAPTERS  = path.join(BOOK_DIR, 'chapters');
const TOC_PATH  = path.join(BOOK_DIR, 'table-of-contents.md');
const MS_PATH   = path.join(BOOK_DIR, 'manuscript.md');

// Part section headers — keyed by the `order` value of the first chapter in that part.
// Update these if the book structure changes.
const PART_HEADERS = {
   3: 'Part 1: The Eternal Margin',
  10: 'Part 2: The Unfolding Margin',
  17: 'Part 3: Living In the Margin',
};

// Excluded from both TOC and manuscript (image-only or marketing copy).
const SKIP_ALL = new Set(['00-a-front-cover.md', '27-back-cover.md']);

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseFrontMatter(content) {
  if (!content.startsWith('---')) return { data: {}, body: content };
  const end = content.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: content };
  const data = {};
  for (const line of content.slice(3, end).split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)/);
    if (m) data[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
  return { data, body: content.slice(end + 4).trimStart() };
}

function isPlaceholder(body) {
  const t = body.trim().toLowerCase();
  return !t || t === '[place holder]' || t === '[placeholder]';
}

// Chapters with order 3–23 are Part content (indented in TOC).
const isPartContent = (order) => order >= 3 && order <= 23;

// ─── Load chapters ───────────────────────────────────────────────────────────

const chapters = fs.readdirSync(CHAPTERS)
  .filter(f => f.endsWith('.md') && !SKIP_ALL.has(f))
  .sort((a, b) => {
    const nA = parseInt(a.match(/^(\d+)/)?.[1] ?? 0, 10);
    const nB = parseInt(b.match(/^(\d+)/)?.[1] ?? 0, 10);
    return nA !== nB ? nA - nB : a.localeCompare(b);
  })
  .map(file => {
    const raw = fs.readFileSync(path.join(CHAPTERS, file), 'utf8');
    const { data, body } = parseFrontMatter(raw);
    return {
      file,
      title:         data.title || file,
      permalink:     data.permalink || '',
      order:         parseInt(data.order ?? 0, 10),
      body,
      isPlaceholder: isPlaceholder(body),
    };
  });

// ─── Build table-of-contents.md ─────────────────────────────────────────────

const TOC_CSS = `<style>
  .article-content > header.site-header {
    display: none !important;
  }
  .toc-container {
    max-width: 700px;
    margin: 2rem auto;
    text-align: center;
  }
  .toc-title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  .toc-subtitle {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }
  .toc-links {
    list-style: none;
    padding: 0;
    text-align: left;
  }
  .toc-links li {
    margin: 0.75rem 0;
    padding: 0.5rem;
    border-left: 3px solid #4a90e2;
  }
  .toc-links li:hover {
    background: #f5f5f5;
  }
  .toc-links a {
    text-decoration: none;
    color: #333;
    font-size: 1.1rem;
  }
  .toc-links a:hover {
    color: #4a90e2;
  }
  .toc-section {
    font-weight: bold;
    margin-top: 1.5rem;
    padding-left: 0 !important;
    border-left: none !important;
    color: #4a90e2;
  }
  .toc-indent {
    padding-left: 1.5rem;
  }
  .reading-mode-link {
    display: inline-block;
    margin: 2rem 0;
    padding: 0.75rem 1.5rem;
    background: #4a90e2;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
  }
  .reading-mode-link:hover {
    background: #357abd;
  }
</style>`;

let tocLinks = '';

for (const ch of chapters) {
  if (ch.isPlaceholder) continue;

  if (PART_HEADERS[ch.order]) {
    tocLinks += `    <li class="toc-section">${PART_HEADERS[ch.order]}</li>\n`;
  }

  if (!ch.permalink) continue;
  const indent = isPartContent(ch.order) ? ' class="toc-indent"' : '';
  tocLinks += `    <li${indent}><a href="${ch.permalink}">${ch.title}</a></li>\n`;
}

const tocFile = `---
title: "Margins: Where God Begins - Table of Contents"
layout: default.njk
permalink: "/books/margins-where-god-begins/toc/"
---

${TOC_CSS}

<div class="toc-container">
  <h1 class="toc-title">Margins: Where God Begins</h1>
  <p class="toc-subtitle">Table of Contents</p>

  <a href="/books/margins-where-god-begins/manuscript/" class="reading-mode-link">View Continuous Reading Mode</a>

  <ul class="toc-links">
${tocLinks}  </ul>
</div>
`;

fs.writeFileSync(TOC_PATH, tocFile, 'utf8');
console.log('Table of contents rebuilt.');

// ─── Build manuscript.md ─────────────────────────────────────────────────────

// Inline TOC for manuscript (plain list, no links — reader is already in the flow).
let inlineToc = '## Table of Contents\n\n';

for (const ch of chapters) {
  if (ch.isPlaceholder) continue;

  if (PART_HEADERS[ch.order]) {
    inlineToc += `\n**${PART_HEADERS[ch.order]}**\n`;
  }

  const indent = isPartContent(ch.order) ? '    ' : '';
  inlineToc += `${indent}${ch.title}\n`;
}

inlineToc += '\n---\n\n';

const MS_HEADER = `---
title: "Margins: Where God Begins"
layout: default.njk
permalink: "/books/margins-where-god-begins/manuscript/"
---

<div style="text-align: center; margin: 2rem 0; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
  <p style="margin: 0 0 0.5rem 0; font-size: 0.95rem; color: #666;">
    Prefer chapter-by-chapter reading?
  </p>
  <a href="/books/margins-where-god-begins/toc/" style="color: #4a90e2; text-decoration: none; font-weight: 500;">
    View Table of Contents →
  </a>
</div>

`;

let manuscript = MS_HEADER + inlineToc;
let count = 0;

for (const ch of chapters) {
  if (ch.isPlaceholder) continue;
  manuscript += ch.body.trim() + '\n\n';
  count++;
}

fs.writeFileSync(MS_PATH, manuscript.trimEnd() + '\n', 'utf8');
console.log(`Manuscript rebuilt from ${count} chapters.`);
