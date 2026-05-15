---
title: Learning to Follow
layout: layout.njk
permalink: /start-here/
templateEngineOverride: njk,md
---

## Learning to Follow

Choose the path that best reflects where you are right now.  
There is no right order. There is no rush.

Some readings appear in more than one path because certain truths meet us in many seasons.

<hr>

## If You Feel Spiritually Numb, Dry, or Disconnected

{% set entries = readingPaths['start-here-numb-dry-disconnected'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=start-here-numb-dry-disconnected">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

## If You Long to Know Who You Really Are

{% set entries = readingPaths['start-here-know-who-you-are'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=start-here-know-who-you-are">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

## If You Learn Best Through Story and Image

{% set entries = readingPaths['start-here-story-image'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=start-here-story-image">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

## If You Are Relearning Grace

{% set entries = readingPaths['start-here-relearning-grace'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=start-here-relearning-grace">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

## If You Are Seeking Wisdom Without Noise

{% set entries = readingPaths['start-here-seeking-wisdom'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=start-here-seeking-wisdom">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

<p><a href="/reading-paths/">← Reading Paths</a></p>
