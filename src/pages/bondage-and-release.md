---
title: Bondage and Release
layout: layout.njk
permalink: /bondage-and-release/
templateEngineOverride: njk,md
---

## Bondage and Release

These readings are for those who find themselves repeating what they long to escape. They do not offer quick fixes or simple answers, but honest witness to grace that meets us in confinement—and begins release from within it.

<hr>

{% set entries = readingPaths['bondage-and-release'] %}

<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=bondage-and-release#">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

<hr>

<p><a href="/begin/">← Back to Begin</a></p>
