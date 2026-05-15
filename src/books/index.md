---
title: "Books"
layout: layout.njk
templateEngineOverride: njk
---

<style>
  .books-outer {
    width: min(900px, 100vw);
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 1rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
  }
  .books-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 0.9rem;
    margin: 1rem 0 0;
  }
  .book-link {
    display: block;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.18);
  }
  .book-link::after {
    content: attr(data-hover);
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0.8rem;
    color: #fff;
    font-size: 1rem;
    line-height: 1.3;
    background: rgba(35, 24, 16, 0.72);
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }
  .book-link img {
    display: block;
    width: 100%;
    height: auto;
  }
  .book-link:hover::after {
    opacity: 1;
  }
  .book-pos-1 { grid-column: 2 / span 2; grid-row: 1; }
  .book-pos-2 { grid-column: 4 / span 2; grid-row: 1; }
  .book-pos-3 { grid-column: 1 / span 2; grid-row: 2; }
  .book-pos-4 { grid-column: 3 / span 2; grid-row: 2; }
  .book-pos-5 { grid-column: 5 / span 2; grid-row: 2; }
  @media (max-width: 900px) {
    .books-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .book-pos-1, .book-pos-2, .book-pos-3, .book-pos-4, .book-pos-5 {
      grid-column: auto;
      grid-row: auto;
    }
  }
  @media (max-width: 640px) {
    .books-grid { grid-template-columns: 1fr; gap: 0.6rem; }
  }
</style>

<h1 style="text-align: center; font-size: 2.5rem; margin: 1rem 0 1.5rem;">Books</h1>

<div class="books-outer">
  <div class="books-grid">
    <a class="book-link book-pos-1" href="/books/margins-where-god-begins/" data-hover="Finding presence in the places we overlook" aria-label="Margins: Where God Begins">
      <img src="/images/margins-front-cover.jpg" alt="Margins: Where God Begins cover">
    </a>
    <a class="book-link book-pos-2" href="/books/fractured-light/" data-hover="In times of brokenness and darkness, a journey of hope toward the light, discovering grace in unexpected places." aria-label="Fractured Light">
      <img src="/images/fractured-light.png" alt="Fractured Light cover">
    </a>
    <a class="book-link book-pos-3" href="/books/letters-from-confinement/" data-hover="Powerful reflections and letters written from inside jail, grappling with faith and despair during a time of confinement and solitude" aria-label="Letters from Confinement">
      <img src="/images/letters-from-confinement.png" alt="Letters from Confinement cover">
    </a>
    <a class="book-link book-pos-4" href="/books/the-hidden-life-of-faith/" data-hover="Exploring the quiet and often overlooked ways in which God works in our hearts and lives" aria-label="The Hidden Life of Faith">
      <img src="/images/the-hidden-life-of-faith.png" alt="The Hidden Life of Faith cover">
    </a>
    <a class="book-link book-pos-5" href="/books/standing-in-awe/" data-hover="Reflections and devotions inspiring awe of God's majesty and presence in our everyday lives" aria-label="Standing in Awe">
      <img src="/images/standing-in-awe.png" alt="Standing in Awe cover">
    </a>
  </div>
</div>
