---
title: Excerpts
description: Excerpts are selected sections from longer works, shared as standalone readings. These pieces offer focused entry points into broader themes of faith, suffering, redemption, and spiritual formation.
layout: layout.njk
permalink: /excerpts/
templateEngineOverride: njk,md
---

<div class="container">
  <h1>Excerpts</h1>

  {% if description %}
    <p class="page-intro">{{ description }}</p>
  {% endif %}

  <ul>
  {% for item in collections.excerpts | sort(attribute="data.date") | reverse %}
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
