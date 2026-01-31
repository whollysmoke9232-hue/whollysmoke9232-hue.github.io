---
layout: index.njk
---

<ul class="devotionals-list">
  {% for item in collections.devotionals | reverse %}
    <li class="devotionals-list-item">
      <a href="{{ item.url }}">
        <strong>{{ item.data.title }}</strong>
      </a>
      <div class="devotionals-meta">
        <span class="devotionals-date">{{ item.date | readableDate }}</span>
      </div>
      {% if item.data.excerpt %}
        <p class="devotionals-excerpt">
          {{ item.data.excerpt }}
        </p>
      {% endif %}
    </li>
  {% endfor %}
</ul>
