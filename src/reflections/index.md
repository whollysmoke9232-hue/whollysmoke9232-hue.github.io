---
layout: index.njk
---

<ul class="reflection-list">
  {% for item in collections.reflections | reverse %}
    {% if item.url != '/reflections/' %}
      <li class="reflection-list-item">
        <a href="{{ item.url }}">
          <strong>{{ item.data.title }}</strong>
        </a>

        <div class="reflection-meta">
          <span class="reflection-date">{{ item.date | readableDate }}</span>
        </div>

        {% if item.data.excerpt %}
          <p class="reflection-excerpt">
            {{ item.data.excerpt }}
          </p>
        {% endif %}
      </li>
    {% endif %}
  {% endfor %}
</ul>
