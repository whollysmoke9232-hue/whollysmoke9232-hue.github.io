---
title: Devotionals
description: The purpose of Scripture is not only to inform us, but to transform us. These devotionals explore practical applications of God’s word for everyday life. They are written to encourage faith, obedience, and a deeper walk with Christ in the ordinary moments of life.
layout: layout.njk
permalink: /devotionals/
templateEngineOverride: njk,md
---

<div class="container">
  <h1>Devotionals</h1>

  {% if description %}
    <p class="page-intro">{{ description }}</p>
  {% endif %}

  <ul>
  {% for item in collections.devotionals | sort(attribute="data.date") | reverse %}
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
