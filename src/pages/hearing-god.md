---
title: Hearing God
layout: layout.njk
permalink: /hearing-god/
pathKey: hearing-god
---

{% set path = readingPaths.paths["hearing-god"] %}

<p>{{ path.intro }}</p>

{% for section in path.sections %}
  <hr>

  <h2>{{ section.title }}</h2>

  {% if section.description %}
    <p><em>{{ section.description }}</em></p>
  {% endif %}

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
