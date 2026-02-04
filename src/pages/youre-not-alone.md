---
title: You're Not Alone
layout: layout.njk
permalink: /youre-not-alone/
templateEngineOverride: njk,md
---

## You're Not Alone

If pornography or sexual compulsion has been part of your story, this page exists to say one simple thing: you are not alone here.

This is not a program. Not a formula. Not a demand for immediate change.

It is a gathering of writings shaped by lived experience — offered as companionship for different seasons of struggle and recovery.

<hr>

## If You Are Trying to Understand What Is Happening

{% set entries = readingPaths['youre-not-alone-understand'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=youre-not-alone-understand">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

## If You Are Wrestling With Relapse

{% set entries = readingPaths['youre-not-alone-relapse'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=youre-not-alone-relapse">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

## If You Are Carrying Shame

{% set entries = readingPaths['youre-not-alone-shame'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=youre-not-alone-shame">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

## If You Are Learning to Walk in Sobriety

{% set entries = readingPaths['youre-not-alone-sober'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=youre-not-alone-sober">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

## If You Are Looking for a Next Step

{% set entries = readingPaths['youre-not-alone-next-step'] %}
<ul>
{% for entry in entries %}
  <li>
    <a href="{{ entry.url }}?path=youre-not-alone-next-step">
      {{ entry.title }}
    </a>
  </li>
{% endfor %}
</ul>

---

<p><a href="/">← Return to Home</a></p>
