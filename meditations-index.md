---
title: Meditations
description: Meditation is the practice of lingering with truth. These writings are brief reflections on Scripture and the life of faith, meant to be read slowly and thoughtfully. They offer space to pause, consider, and allow the deeper meaning of God’s word to settle into the heart.
layout: layout.njk
permalink: /meditations/
templateEngineOverride: njk,md
---

<div class="container">
  <h1>Meditations</h1>

  {% if description %}
    <p class="page-intro">{{ description }}</p>
  {% endif %}

  <ul>
  {% for item in collections.meditations | sort(attribute="data.date") | reverse %}
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
