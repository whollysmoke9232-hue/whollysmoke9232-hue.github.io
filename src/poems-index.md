---
title: Poems & Prayers
description: Not every truth arrives as a sermon or a reflection. Sometimes it comes as a prayer.  These short pieces are written in the spirit of the Psalms - moments of worship, confession, longing, and trust offered honestly before God.
layout: layout.njk
permalink: /poems/
templateEngineOverride: njk,md
---

<div class="container">
  <h1>Poems & Prayers</h1>

  {% if description %}
    <p class="page-intro">{{ description }}</p>
  {% endif %}

  <ul>
  {% for item in collections.poems | sort(attribute="data.date") | reverse %}
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
