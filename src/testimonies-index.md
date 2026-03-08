---
title: Testimonies
layout: layout.njk
permalink: /testimonies/
templateEngineOverride: njk,md
---

<div class="container">
  <h1>Testimonies</h1>

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

