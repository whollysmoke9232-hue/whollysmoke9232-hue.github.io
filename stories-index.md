---
title: Stories
description: Truth often arrives through story. These narratives explore moments from life where ordinary events reveal deeper spiritual realities. Some are drawn from personal experience, others from quiet observations along the way. Each one seeks to illuminate something about God, the human heart, and the grace that meets us in unexpected places.
layout: layout.njk
permalink: /stories/
templateEngineOverride: njk,md
---

<div class="container">
  <h1>Stories</h1>

  {% if description %}
    <p class="page-intro">{{ description }}</p>
  {% endif %}

  <ul>
  {% for item in collections.stories | sort(attribute="data.date") | reverse %}
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
