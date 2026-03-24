---
title: Grace in the Margins
layout: layout.njk
---

<div class="article-content homepage-redesign">

  <style>
    .homepage-redesign {
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      background: linear-gradient(180deg, rgba(223, 234, 246, 0.45) 0%, rgba(255, 255, 255, 0.92) 38%, rgba(223, 234, 246, 0.35) 100%);
    }

    .homepage-redesign::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0.85;
      background:
        radial-gradient(220px 95px at 14% 10%, rgba(255, 255, 255, 0.95) 0 68%, transparent 72%),
        radial-gradient(260px 105px at 40% 8%, rgba(255, 255, 255, 0.9) 0 68%, transparent 72%),
        radial-gradient(230px 95px at 68% 11%, rgba(255, 255, 255, 0.92) 0 68%, transparent 72%),
        radial-gradient(210px 90px at 90% 9%, rgba(255, 255, 255, 0.88) 0 68%, transparent 72%),
        radial-gradient(180px 80px at 24% 90%, rgba(255, 255, 255, 0.65) 0 68%, transparent 72%),
        radial-gradient(200px 84px at 78% 88%, rgba(255, 255, 255, 0.62) 0 68%, transparent 72%),
        radial-gradient(95% 38% at 50% 100%, rgba(214, 230, 248, 0.38) 0 70%, transparent 75%);
    }

    .homepage-redesign > * {
      position: relative;
      z-index: 1;
    }

    .article-content a:hover {
      text-decoration: underline !important;
    }

  </style>

  <div style="text-align: center; margin: 0 0 0.8rem 0;">
    <a href="{{ '/recent-additions/' | url }}"
       style="text-decoration: none; color: #8b7355; font-weight: bold;">
      Most Recent Additions
    </a>
  </div>

  <a href="{{ '/about/' | url }}">
    <img src="{{ '/images/heavens-declare.png' | url }}"
         alt="The heavens declare the glory of God"
      title="About"
         style="max-width: 100%; margin: 1rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
  </a>

  <a href="{{ '/books/my-story-from-brokenness-to-grace/' | url }}" title="My Story: From Brokenness to Grace">
    <img src="{{ '/images/my-story.png' | url }}"
         alt="My Story: From Brokenness to Grace cover"
         title="My Story: From Brokenness to Grace"
         style="max-width: 100%; margin: 1rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
  </a>

  <div style="text-align: center; margin-bottom: 0.5rem;">
    <a href="{{ '/begin/' | url }}"
       title="Begin"
       style="font-size: 1.18rem; color: #6b4f2c; text-decoration: underline; font-weight: bold; letter-spacing: 0.02em;">
      Unsure where to go? Begin Here
    </a>
  </div>

  <a href="{{ '/begin/' | url }}" title="Begin">
    <img src="{{ '/images/path-2.png' | url }}"
         alt=""
         title="Begin"
         style="max-width: 100%; margin: 1rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
  </a>

  <a href="{{ '/reading-paths/' | url }}" title="Reading Paths">
    <img src="{{ '/images/reading-paths.png' | url }}"
         alt="Reading Paths"
         style="max-width: 100%; margin: 0.4rem 0 1rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
  </a>

  <a href="{{ '/books/' | url }}" title="Explore the Book Collection">
    <img src="{{ '/images/explore-the-book-collection.png' | url }}"
         alt="Explore the Book Collection"
         title="Explore the Book Collection"
         style="max-width: 100%; margin: 0.4rem 0 0.5rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
  </a>

  <a href="{{ '/library/' | url }}">
    <img src="{{ '/images/view-library.png' | url }}"
         alt="View the Complete Library"
         style="max-width: 100%; margin: 0.5rem 0 1rem 0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
  </a>

  <section class="psalm-verse" style="text-align: center;">
    <p style="font-size: 1.5rem; font-style: italic;">
      "Thy word is a lamp unto my feet, and a light unto my path." Psalm 119:105 (KJV)
    </p>
  </section>

  <div style="text-align: center; margin: 2rem 0 0.3rem 0; font-size: 1.05rem;">
    <a href="{{ '/books/' | url }}" style="color: #5a3e2b; text-decoration: none;">Books</a>
    &nbsp;•&nbsp;
    <a href="{{ '/devotionals/' | url }}" style="color: #5a3e2b; text-decoration: none;">Devotionals</a>
    &nbsp;•&nbsp;
    <a href="{{ '/meditations/' | url }}" style="color: #5a3e2b; text-decoration: none;">Meditations</a>
    &nbsp;•&nbsp;
    <a href="{{ '/poems/' | url }}" style="color: #5a3e2b; text-decoration: none;">Poems & Prayers</a>
    &nbsp;•&nbsp;
    <a href="{{ '/reflections/' | url }}" style="color: #5a3e2b; text-decoration: none;">Reflections</a>
    &nbsp;•&nbsp;
    <a href="{{ '/stories/' | url }}" style="color: #5a3e2b; text-decoration: none;">Stories</a>
    &nbsp;•&nbsp;
    <a href="{{ '/testimonies/' | url }}" style="color: #5a3e2b; text-decoration: none;">Testimonies</a>
  </div>

  <div style="text-align: center; margin: 0.8rem 0 0 0; font-size: 1.02rem; line-height: 1.8;">
    <div><a href="{{ '/library/introduction/' | url }}" style="text-decoration: none; color: #8b7355;">Introduction</a></div>
    <div><a href="{{ '/recent-additions/' | url }}" style="text-decoration: none; color: #8b7355;">Most Recent Additions</a></div>
    <div><a href="{{ '/scripture/' | url }}" style="text-decoration: none; color: #8b7355;">Scripture Index</a></div>
    <div><a href="{{ '/tags/' | url }}" style="text-decoration: none; color: #8b7355;">Tag Index</a></div>
    <div><a href="{{ '/about/' | url }}" style="text-decoration: none; color: #8b7355;">Why This Place Exists</a></div>
    <div><a href="{{ '/books/my-story-from-brokenness-to-grace/' | url }}" style="text-decoration: none; color: #8b7355;">My Story</a></div>
    <div><a href="{{ '/begin/' | url }}" style="text-decoration: none; color: #8b7355;">Begin Here</a></div>
    <div><a href="{{ '/reading-paths/' | url }}" style="text-decoration: none; color: #8b7355;">Reading Paths</a></div>
    <div><a href="{{ '/books/' | url }}" style="text-decoration: none; color: #8b7355;">Book Collection</a></div>
    <div><a href="{{ '/library/' | url }}" style="text-decoration: none; color: #8b7355;">Complete Library</a></div>
  </div>

  <div style="text-align:center; margin:4rem 0 2rem 0; font-size:1rem; color:#6a5d4d;">
    <a href="{{'/youre-not-alone/' | url }}"
       style="text-decoration:none; color:inherit; display:inline-block;">
      <img src="{{ '/images/youre-not-alone.png' | url }}"
           alt="You're Not Alone"
          style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
    </a>
  </div>

</div>
