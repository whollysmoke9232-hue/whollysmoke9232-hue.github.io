---
layout: index.njk
---

<ul class="story-list">
  {% for item in collections.stories | reverse %}
    {% if item.url != '/stories/' %}
      <li class="story-list-item">
        <a href="{{ item.url }}">
          <strong>{{ item.data.title }}</strong>
        </a>

        <div class="story-meta">
          <span class="story-date">{{ item.date | readableDate }}</span>
        </div>

        {% if item.data.excerpt %}
          <p class="story-excerpt">
            {{ item.data.excerpt }}
          </p>
        {% endif %}
      </li>
    {% endif %}
  {% endfor %}
</ul>
