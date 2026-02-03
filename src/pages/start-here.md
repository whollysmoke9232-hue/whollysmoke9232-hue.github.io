---
title: Start Here
layout: layout.njk
permalink: /start-here/
pathKey: start-here
---

{% set path = readingPaths.paths["start-here"] %}

<p>{{ path.intro }}</p>

{% for section in path.sections %}
  <hr>

  <h2>{{ section.title }}</h2>

  {% if section.description %}
    <p>{{ section.description }}</p>
  {% endif %}

  <ul>
    {% for slug in section.items %}
      <li>
        <a href="/{{ slug }}/">{{ slug | replace('-', ' ') | title }}</a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
