---
layout: layout.njk
permalink: /about-the-author/
pathKey: about-the-author
---

{% set path = readingPaths.paths[pathKey] %}

<p>{{ path.intro }}</p>

{% for section in path.sections %}
  <h2>{{ section.title }}</h2>
  <ul>
    {% for slug in section.items %}
      {% set article = collections.library | findBySlug(slug) %}
      <li>
        <a href="{{ article.url }}?path={{ pathKey }}">
          {{ article.data.title }}
        </a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
