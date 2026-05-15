---
title: Learning to Pray
layout: layout.njk
permalink: /learning-to-pray/
templateEngineOverride: njk,md
---

## Learning to Pray

Prayer is not a technique to master. It is a relationship to enter.

These readings trace the movement from wanting God to seeking Him, from silence to honest speech, from performance to presence.

<hr>

{% set entries = readingPaths['learning-to-pray'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=learning-to-pray">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

<p><a href="/reading-paths/">← Reading Paths</a></p>
