---
title: About the Author
layout: layout.njk
permalink: /about-the-author/
templateEngineOverride: njk,md
---

## About the Author

If you would like to understand the voice behind these writings, this path gathers pieces that reflect the journey, failures, questions, and grace that have shaped this work.

<hr>

{% set entries = readingPaths['get-to-know-the-author'] %}

<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=get-to-know-the-author">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}---
title: About the Author
layout: layout.njk
permalink: /about-the-author/
templateEngineOverride: njk,md
---

## About the Author

If you would like to understand the voice behind these writings, this path gathers pieces that reflect the journey, failures, questions, and grace that have shaped this work.

<hr>

{% set entries = readingPaths['about-the-author'] %}

{% if entries %}
<ul>
  {% for entry in entries %}
    <li>
      <a href="{{ entry.url }}?path=about-the-author">
        {{ entry.title }}
      </a>
    </li>
  {% endfor %}
</ul>
{% else %}
<p>NO ENTRIES FOUND</p>
{% endif %}

<hr>

<p><a href="/begin/">← Back to Begin</a></p>

</ul>

<hr>

<p><a href="/begin/">← Back to Begin</a></p>
