---
title: Reflections
description: Faith invites us not only to believe, but to think. These reflections explore Scripture, spiritual life, and the quiet lessons that emerge through experience. They are not meant to provide final answers, but to encourage deeper thought about God, ourselves, and the work He is doing within us.
layout: layout.njk
permalink: /reflections/
templateEngineOverride: njk,md
---

<div class="container">
  <h1>Reflections</h1>

  {% if description %}
    <p class="page-intro">{{ description }}</p>
  {% endif %}

  <ul>
  {% for item in collections.reflections | sort(attribute="data.date") | reverse %}
    <li style="margin-bottom: 1.5rem;">
      <a href="{{ item.url }}"><strong>{{ item.data.title }}</strong></a><br>

      {% if item.date %}
        <small>{{ item.date | readableDate }}</small><br>
      {% endif %}

      {% if item.data.excerpt %}
        <div style="margin-top: 0.25rem; color: #6a5d4d;">
          {{ item.data.excerpt }}
        </div>
      {% endif %}
    </li>
  {% endfor %}
</ul>
