---
title: Complete Library
layout: default.njk
permalink: /library/
---

<div class="library-landing" style="display: flex; flex-direction: column; align-items: center;">
  <div class="library-grid" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 2rem; justify-items: center;">
    <div>
      <h2>Devotionals</h2>
      <ul>
          {% for item in collections.devotionals %}
          <li><a href="{{ item.url }}" title="{{ item.data.excerpt | escape }}">{{ item.data.title }}</a></li>
          {% endfor %}
      </ul>
    </div>
    <div>
      <h2>Meditations</h2>
      <ul>
          {% for item in collections.meditations %}
            <li><a href="{{ item.url }}" title="{{ item.data.excerpt | escape }}">{{ item.data.title }}</a></li>
          {% endfor %}
      </ul>
    </div>
    <div>
      <h2>Reflections</h2>
      <ul>
          {% for item in collections.reflections %}
            <li><a href="{{ item.url }}" title="{{ item.data.excerpt | escape }}">{{ item.data.title }}</a></li>
          {% endfor %}
      </ul>
    </div>
    <div>
      <h2>Stories</h2>
      <ul>
          {% for item in collections.stories %}
            <li><a href="{{ item.url }}" title="{{ item.data.excerpt | escape }}">{{ item.data.title }}</a></li>
          {% endfor %}
      </ul>
    </div>
    <div>
      <h2>Testimonies</h2>
      <ul>
          {% for item in collections.testimonies %}
            <li><a href="{{ item.url }}" title="{{ item.data.excerpt | escape }}">{{ item.data.title }}</a></li>
          {% endfor %}
      </ul>
    </div>
    <div>
      <h2>Books</h2>
      <ul>
          {% for item in collections.books %}
            <li><a href="{{ item.url }}" title="{{ item.data.excerpt | escape }}">{{ item.data.title }}</a></li>
          {% endfor %}
      </ul>
    </div>
  </div>
</div>
