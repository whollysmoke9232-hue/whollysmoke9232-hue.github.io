---
title: The Confinement Journals
layout: layout.njk
permalink: /the-confinement-journals/
templateEngineOverride: njk,md
---

## The Confinement Journals

These words were not written from a place of comfort or with the benefit of hindsight. They were scratched out in the middle of the fire—inside a jail cell where my control had ended and my reputation had vanished. I found that when you are stripped of everything, you discover what is indestructible. These reflections are the record of a God who does not wait for us to get out of the margins to meet us; He is already there, waiting for us to look up.

<hr>

{% set entries = readingPaths['the-confinement-journals'] %}
{% set displayTitles = {
		"Settled In You": "Meditation #1"
} %}
<ul>
{% for entry in entries %}
	<li>
		<a href="{{ entry.url }}?path=the-confinement-journals">{{ displayTitles[entry.title] or entry.title }}</a>
	</li>
{% endfor %}
</ul>

---

<p><a href="/begin/">← Back to Begin</a></p>
