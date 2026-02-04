---
title: Testimonies
layout: layout.njk
permalink: /testimonies/
templateEngineOverride: njk,md
---

<div class="container">
  <h1>Testimonies</h1>

  <ul>
    {% for item in collections.testimonies %}
      <li>
        <a href="{{ item.url }}">{{ item.data.title }}</a>
      </li>
    {% endfor %}
  </ul>
</div>
