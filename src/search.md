---
title: Search
layout: layout.njk
permalink: /search/
---

<p data-library-search-status style="margin: 0.25rem 0 0.5rem 0; color: #6a5738; font-size: 0.95rem;"></p>
<label for="search-input" style="display:block; margin-bottom:0.3rem; font-size:0.92rem; color:#5d4a2a;">Search by scripture, theme, or any phrase</label>
<input
  id="search-input"
  data-library-search-input
  type="search"
  placeholder="Try: Psalm 42, despair, surrender, or any phrase"
  autocomplete="off"
  style="width:100%; box-sizing:border-box; border:1px solid #ccb993; border-radius:6px; padding:0.65rem 0.75rem; font-size:1rem;"
/>
<p class="library-search-count" data-library-search-count style="font-weight:600; color:#4d3a1b; margin:0.5rem 0;"></p>
<div class="library-search-results" data-library-search-results aria-live="polite" style="display:grid; gap:0.85rem; margin-top:0.5rem;"></div>

<script src="/assets/js/search/library-search.js" defer></script>
