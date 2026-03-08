// Client-side Reading Path Navigation
// Adds Previous / Next / Back links based on ?path= & ?idx=

(function () {
  const params = new URLSearchParams(window.location.search);
  const pathKey = params.get("path");
  const idx = parseInt(params.get("idx"), 10);

  // If this page is not part of a reading path, do nothing
  if (!pathKey || isNaN(idx)) return;

  // Define reading paths (MUST match readingPaths.js keys + order)
  const readingPaths = {
    "start-here-suffering-or-waiting": [
      "/devotionals/be-still/",
      "/meditations/the-gift-of-now/",
      "/meditations/if-god-is-everywhere/",
      "/devotionals/when-jesus-wept/",
      "/meditations/a-meditation-in-suffering/",
      "/devotionals/new-every-morning/"
    ],

    "start-here-sin-failure-shame": [
      "/reflections/the-bitter-harvest-of-sin/",
      "/testimonies/jesus-the-scapegoat/",
      "/devotionals/purify-my-heart/",
      "/testimonies/from-ashes-to-glory/",
      "/testimonies/in-the-margins/"
    ],

    "weariness-and-renewal": [
      "/devotionals/be-still/",
      "/meditations/the-gift-of-now/",
      "/devotionals/new-every-morning/",
      "/devotionals/look-and-live/"
    ],

    "hurt-and-restoration": [
      "/reflections/held-on-every-side/",
      "/devotionals/when-jesus-wept/",
      "/meditations/a-meditation-in-suffering/",
      "/testimonies/after-gods-heart/",
      "/reflections/fractured-light/chapter-9/"
    ],

    "hearing-god-be-still": [
      "/meditations/the-god-who-is-heard/",
      "/devotionals/be-still/",
      "/meditations/the-gift-of-now/",
      "/meditations/if-god-is-everywhere/"
    ],

    "you-are-not-alone-understand": [
      "/reflections/not-even-one/",
      "/reflections/a-theology-of-weakness/",
      "/reflections/what-are-you-feeding/",
      "/reflections/all-things/",
      "/reflections/the-big-picture/"
    ]
  };

  const path = readingPaths[pathKey];
  if (!path) return;

  const nav = document.createElement("nav");
  nav.className = "reading-path-nav";
  nav.style.marginTop = "3rem";
  nav.style.paddingTop = "1.5rem";
  nav.style.borderTop = "1px solid #ddd";
  nav.style.display = "flex";
  nav.style.justifyContent = "space-between";
  nav.style.gap = "1rem";

  // Previous
  if (idx > 0) {
    const prev = document.createElement("a");
    prev.href = path[idx - 1] + `?path=${pathKey}&idx=${idx - 1}`;
    prev.textContent = "← Previous";
    nav.appendChild(prev);
  } else {
    nav.appendChild(document.createElement("span"));
  }

  // Next
  if (idx < path.length - 1) {
    const next = document.createElement("a");
    next.href = path[idx + 1] + `?path=${pathKey}&idx=${idx + 1}`;
    next.textContent = "Next →";
    nav.appendChild(next);
  }

  // Insert below article content
  const article = document.querySelector(".article-content, .main-page");
  if (article) {
    article.appendChild(nav);
  }
})();
