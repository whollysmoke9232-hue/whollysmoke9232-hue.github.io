---
title: Grace in the Margins
layout: layout.njk
---

<div class="homepage-image-hero">
  <a href="{{ '/about/' | url }}" class="homepage-image-link">
    <img src="/images/heavens-declare.png" alt="The heavens declare the glory of God">
  </a>
  <a href="{{ '/for-you/' | url }}" class="homepage-image-cta">Is this site for you? &rarr;</a>
</div>

<div class="homepage-section">
  <input
    id="hp-library-search-input"
    data-library-search-input
    type="search"
    placeholder="Search by scripture, theme, or any phrase"
    autocomplete="off"
    style="display:block; width:80%; margin:0 auto; box-sizing:border-box; border:1px solid #ccb993; border-radius:6px; padding:0.45rem 0.65rem; font-size:0.95rem;"
  />
  <p class="library-search-count" data-library-search-count style="font-weight:600; color:#4d3a1b; margin:0.5rem 0;"></p>
  <div class="library-search-results" data-library-search-results aria-live="polite" style="display:grid; gap:0.85rem;"></div>
</div>

<div class="homepage-section">
  <div class="homepage-browse-links">
    <a href="{{ '/devotionals/' | url }}">Devotionals</a>
    <a href="{{ '/meditations/' | url }}">Meditations</a>
    <a href="{{ '/reflections/' | url }}">Reflections</a>
    <a href="{{ '/poems/' | url }}">Poems &amp; Prayers</a>
    <a href="{{ '/stories/' | url }}">Stories</a>
    <a href="{{ '/library/' | url }}">Complete Library</a>
  </div>
</div>

<div class="homepage-footer-links">
  <a href="{{ '/recent-additions/' | url }}">Recent Additions</a> &nbsp;&middot;&nbsp;
  <a href="{{ '/reading-paths/' | url }}">Reading Paths</a> &nbsp;&middot;&nbsp;
  <a href="{{ '/scripture/' | url }}">Scripture Index</a> &nbsp;&middot;&nbsp;
  <a href="{{ '/tags/' | url }}">Tag Index</a> &nbsp;&middot;&nbsp;
  <a href="{{ '/about/' | url }}">About</a>
</div>

<script src="/assets/js/search/library-search.js" defer></script>
