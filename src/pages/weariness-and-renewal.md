---
title: Weariness and Renewal
layout: layout.njk
permalink: /weariness-and-renewal/
pathKey: weariness-and-renewal
---

{% set path = readingPaths.paths["weariness-and-renewal"] %}

<p>{{ path.intro }}</p>

{% for section in path.sections %}
  <hr>

  <h3>{{ section.title }}</h3>

  <ul>
    {% for slug in section.items %}
      <li>
        <a href="/{{ slug }}/">
          {{ slug | replace('-', ' ') | title }}
        </a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

<div class="explore-bubbles">
  <a href="/begin/">← Back to Begin</a>
</div>
