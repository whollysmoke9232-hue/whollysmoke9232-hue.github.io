---
title: "Books"
layout: default.njk
---

<style>
  .books-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
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

  .book-pos-1 { grid-column: 2; grid-row: 1; }
  .book-pos-2 { grid-column: 3; grid-row: 1; }
  .book-pos-3 { grid-column: 1; grid-row: 2; }
  .book-pos-4 { grid-column: 2; grid-row: 2; }
  .book-pos-5 { grid-column: 3; grid-row: 2; }
  .book-pos-6 { grid-column: 4; grid-row: 2; }
  .book-pos-7 { grid-column: 1; grid-row: 3; }
  .book-pos-8 { grid-column: 2; grid-row: 3; }
  .book-pos-9 { grid-column: 3; grid-row: 3; }
  .book-pos-10 { grid-column: 4; grid-row: 3; }

  @media (max-width: 900px) {
    .books-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .book-pos-1, .book-pos-2, .book-pos-3, .book-pos-4, .book-pos-5,
    .book-pos-6, .book-pos-7, .book-pos-8, .book-pos-9, .book-pos-10 {
      grid-column: auto;
      grid-row: auto;
    }
  }

  @media (max-width: 640px) {
    .books-grid {
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }
  }
</style>

## Book Collection

<div class="books-grid">
  <a class="book-link book-pos-1" href="/books/margins-where-god-begins/" data-hover="Finding presence in the places we overlook" aria-label="Margins: Where God Begins">
    <img src="/images/margins-front-cover.jpg" alt="Margins: Where God Begins cover">
  </a>

  <a class="book-link book-pos-2" href="/books/fractured-light/" data-hover="In times of brokenness and darkness, a journey of hope toward the light, discovering grace in unexpected places." aria-label="Fractured Light">
    <img src="/images/fractured-light.png" alt="Fractured Light cover">
  </a>

  <a class="book-link book-pos-3" href="/books/letters-from-confinement/" data-hover="Powerful reflections and letters written from inside jail, grappling with faith and dispair during a time of confinement and solitude" aria-label="Letters from Confinement">
    <img src="/images/letters-from-confinement.png" alt="Letters from Confinement cover">
  </a>

  <a class="book-link book-pos-4" href="/books/the-confinement-journals/" data-hover="A heartfelt and intimate series of journal entries writtten from inside jail, exploring themes of faith and discovery amidst deep isolation" aria-label="The Confinement Journals: Finding God in the Silence">
    <img src="/images/the-confinement-journals.png" alt="The Confinement Journals cover">
  </a>

  <a class="book-link book-pos-5" href="/books/the-hidden-life-of-faith/" data-hover="Exploring the quiet and often overlooked ways in which God works in our hearts and lives" aria-label="The Hidden Life of Faith">
    <img src="/images/the-hidden-life-of-faith.png" alt="The Hidden Life of Faith cover">
  </a>

  <a class="book-link book-pos-6" href="/books/hold-my-hand-walking-with-god/" data-hover="Encouragement and reflections for journeying through life hand in hand with God" aria-label="Hold My Hand: Walking With God">
    <img src="/images/hold-my-hand.png" alt="Hold My Hand cover">
  </a>

  <a class="book-link book-pos-7" href="/books/speak-up-lord-i-dont-hear-so-well/" data-hover="Honest reflections and devotions on listening for God's voice through the noise of life" aria-label="Speak Up Lord: I Don't Hear So Well">
    <img src="/images/speak-up-lord.png" alt="Speak Up Lord cover">
  </a>

  <a class="book-link book-pos-8" href="/books/standing-in-awe/" data-hover="Reflections and devotions inspiring awe of God's majesty and presence in our everyday lives" aria-label="Standing in Awe">
    <img src="/images/sanding-in-awe.png" alt="Standing in Awe cover">
  </a>

  <a class="book-link book-pos-9" href="/books/when-life-hurts-finding-purpose-in-the-pain/" data-hover="Honest reflections and encouragement for those seeking meaning and hope in seasons of suffering" aria-label="When Life Hurts: Finding Purpose in the Pain">
    <img src="/images/when-life-hurts.png" alt="When Life Hurts cover">
  </a>

  <a class="book-link book-pos-10" href="/books/parables-and-reflections/" data-hover="Exploring timeless lessons and spiritual truths through stories that illuminate faith and life" aria-label="Parables and Reflections">
    <img src="/images/parables-and-reflections.png" alt="Parables and Reflections cover">
  </a>
</div>
