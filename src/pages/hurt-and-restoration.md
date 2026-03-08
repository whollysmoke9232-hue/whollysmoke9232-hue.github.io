---
title: Hurt and Restoration
layout: layout.njk
permalink: /hurt-and-restoration/
templateEngineOverride: njk,md
---

## Hurt and Restoration

These writings are for those carrying injuries they did not choose. They speak gently to harm, betrayal, and loss, without minimizing pain or rushing healing—holding space for restoration that unfolds in its own time.

<hr>

{% set entries = readingPaths['hurt-and-restoration'] %}

<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=hurt-and-restoration#">{{ entry.title }}</a>
  </li>
{% endfor %}
</ul>

<hr>

<p><a href="/begin/">← Back to Begin</a></p>
