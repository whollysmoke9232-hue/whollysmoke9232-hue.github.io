---
title: Begin
layout: layout.njk
permalink: /begin/
pathKey: begin
---
{% set path = readingPaths.paths.begin %}

<p>{{ path.intro }}</p>

<div class="begin-grid">
  {% for entry in path.entries %}
    {% include "begin-tile.njk" %}
  {% endfor %}
</div>

<div style="text-align: center; margin: 2.5rem 0 1.5rem 0; font-size: 1.08rem;">
  <strong>For more reading paths:</strong><br>
  <a href="/start-here/">Start Here</a> &middot;
  <a href="/hearing-god/">Hearing God</a>

  <br><br>

  <strong>There’s more to explore:</strong><br>
  <a href="/devotionals/">Devotionals</a> &middot;
  <a href="/meditations/">Meditations</a> &middot;
  <a href="/reflections/">Reflections</a> &middot;
  <a href="/stories/">Stories</a> &middot;
  <a href="/testimonies/">Testimonies</a> &middot;
  <a href="/books/">Books</a><br>
  <a href="/scripture/">Scripture Index</a>
</div>

<div style="text-align: center; margin-top: 1.2rem;">
  <a href="/youre-not-alone/">If pornography or sexual compulsion has been part of your story, there’s a place here for you too.</a>
</div>
