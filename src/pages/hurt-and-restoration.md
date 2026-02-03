---
title: Hurt and Restoration
layout: layout.njk
permalink: /hurt-and-restoration/
pathKey: hurt-and-restoration
---

{% set path = readingPaths.paths["hurt-and-restoration"] %}

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

<div style="text-align: center; margin: 2rem 0;">
  <nav class="explore-bubbles" aria-label="Return">
    <a href="/begin/">Back to Begin</a>
  </nav>
</div>
