---
layout: default
title: {{ site.name }}
---
# Weekly Meetings
{% for post in site.posts %}
* {{ post.date | date_to_string }} <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}
{% endfor %}
