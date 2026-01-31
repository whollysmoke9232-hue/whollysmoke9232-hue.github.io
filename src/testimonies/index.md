---
layout: index.njk
---

<ul class="testimony-list">
  {% for item in collections.testimonies | reverse %}
    {% if item.url != '/testimonies/' %}
      <li class="testimony-list-item">
        <a href="{{ item.url }}">
          <strong>{{ item.data.title }}</strong>
        </a>

        <div class="testimony-meta">
          <span class="testimony-date">{{ item.date | readableDate }}</span>
        </div>

        {% if item.data.excerpt %}
          <p class="testimony-excerpt">
            {{ item.data.excerpt }}
          </p>
        {% endif %}
      </li>
    {% endif %}
  {% endfor %}
</ul>
