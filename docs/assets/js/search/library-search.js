(function () {
  const input = document.querySelector("[data-library-search-input]");
  const resultsWrap = document.querySelector("[data-library-search-results]");
  const countEl = document.querySelector("[data-library-search-count]");
  const statusEl = document.querySelector("[data-library-search-status]");

  if (!input || !resultsWrap || !countEl || !statusEl) {
    return;
  }

  const INDEX_PATH = "/assets/js/search/library-search-index.json";
  const MIN_QUERY_LENGTH = 2;
  const MAX_RESULTS = 60;

  let docs = [];
  let ready = false;

  function esc(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function tokenize(query) {
    return String(query || "")
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  function scoreDoc(doc, tokens) {
    let score = 0;

    for (const token of tokens) {
      const inTitle = String(doc.title || "").toLowerCase().includes(token);
      const inScripture = (doc.scripture || []).join(" ").toLowerCase().includes(token);
      const inTags = (doc.tags || []).join(" ").toLowerCase().includes(token);
      const inThemes = (doc.themes || []).join(" ").toLowerCase().includes(token);
      const inExcerpt = String(doc.excerpt || "").toLowerCase().includes(token);
      const inContent = String(doc.content || "").toLowerCase().includes(token);

      if (inTitle) score += 12;
      if (inScripture) score += 8;
      if (inTags) score += 7;
      if (inThemes) score += 7;
      if (inExcerpt) score += 4;
      if (inContent) score += 2;
    }

    return score;
  }

  function previewText(doc) {
    const excerpt = String(doc.excerpt || "").trim();
    if (excerpt) {
      return excerpt;
    }

    const body = String(doc.content || "").trim();
    if (body.length <= 220) {
      return body;
    }

    return `${body.slice(0, 220).trim()}...`;
  }

  function metaText(doc) {
    const parts = [];
    if (doc.category) parts.push(`Category: ${doc.category}`);
    if (Array.isArray(doc.themes) && doc.themes.length) parts.push(`Themes: ${doc.themes.join(", ")}`);
    if (Array.isArray(doc.tags) && doc.tags.length) parts.push(`Tags: ${doc.tags.join(", ")}`);
    if (Array.isArray(doc.scripture) && doc.scripture.length) parts.push(`Scripture: ${doc.scripture.join(", ")}`);
    return parts.join(" | ");
  }

  function clearResults() {
    resultsWrap.innerHTML = "";
    countEl.textContent = "";
  }

  function renderResults(results) {
    if (!results.length) {
      resultsWrap.innerHTML = "<p class=\"library-search-empty\">No matches found.</p>";
      countEl.textContent = "0 results";
      return;
    }

    const html = results
      .map((doc) => {
        return [
          '<article class="library-search-item">',
          `<h3><a href="${esc(doc.url)}">${esc(doc.title)}</a></h3>`,
          `<p class="library-search-preview">${esc(previewText(doc))}</p>`,
          `<p class="library-search-meta">${esc(metaText(doc))}</p>`,
          "</article>",
        ].join("");
      })
      .join("");

    resultsWrap.innerHTML = html;
    countEl.textContent = `${results.length} result${results.length === 1 ? "" : "s"}`;
  }

  function runSearch() {
    const query = input.value;
    const tokens = tokenize(query);

    if (tokens.length === 0) {
      clearResults();
      statusEl.textContent = "Search by scripture, tags, themes, or article text.";
      return;
    }

    if (tokens.join(" ").length < MIN_QUERY_LENGTH) {
      clearResults();
      statusEl.textContent = "Type at least 2 characters.";
      return;
    }

    const matches = docs
      .filter((doc) => tokens.every((token) => String(doc.searchText || "").includes(token)))
      .map((doc) => ({ doc, score: scoreDoc(doc, tokens) }))
      .sort((a, b) => b.score - a.score || String(a.doc.title).localeCompare(String(b.doc.title)))
      .slice(0, MAX_RESULTS)
      .map((entry) => entry.doc);

    renderResults(matches);
    statusEl.textContent = "";
  }

  async function init() {
    statusEl.textContent = "Loading search index...";

    try {
      const response = await fetch(INDEX_PATH, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Index request failed: ${response.status}`);
      }

      const payload = await response.json();
      docs = Array.isArray(payload.documents) ? payload.documents : [];
      ready = true;

      statusEl.textContent = `Ready to search ${docs.length} library entries.`;
      input.removeAttribute("disabled");
      input.focus();

      input.addEventListener("input", runSearch);
    } catch (error) {
      ready = false;
      statusEl.textContent = "Search is unavailable right now.";
      console.error(error);
    }
  }

  if (!ready) {
    init();
  }
})();
