---
title: You're Not Alone
layout: layout.njk
permalink: /youre-not-alone/
pathKey: youre-not-alone
description: A quiet place for those struggling with pornography or sexual compulsion—written from lived experience, not formulas or fixes.
---

{% set path = readingPaths.paths["youre-not-alone"] %}

<div style="font-style: italic; color: #6a5d4d; margin-bottom: 1.5rem; font-size: 1.08rem;">
  {{ path.description }}
</div>

<p>{{ path.intro }}</p>

{% for section in path.sections %}
  <hr>

  <h2>{{ section.title }}</h2>

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

<p><em>You don’t need to read everything here. Start wherever something feels familiar.</em></p>
