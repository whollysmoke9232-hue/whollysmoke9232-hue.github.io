---
title: Testimonies
layout: layout.njk
description: God’s work in a life is worth remembering and worth telling. These accounts reflect moments where His presence, mercy, and guidance became clear in the midst of ordinary life and difficult seasons. Each story points beyond the individual to the faithfulness of God.
permalink: /testimonies/
templateEngineOverride: njk,md
---

<div class="container">
  <h1>Testimonies</h1>

  {% if description %}
    <p class="page-intro">{{ description }}</p>
  {% endif %}

  <ul>
  {% for item in collections.testimonies | sort(attribute="data.date") | reverse %}
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
