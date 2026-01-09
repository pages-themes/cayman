---
title: "Tutoriales"
layout: collection
permalink: /tutorials/
collection: tutorials
entries_layout: grid
classes: wide
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/tutorials-header.jpg
excerpt: "Aprende paso a paso con nuestros tutoriales detallados"
---

<div class="tutorials-grid">
  {% assign tutorials = site.posts | where: "type", "tutorial" %}
  {% for tutorial in tutorials %}
    <div class="tutorial-card">
      <div class="tutorial-image">
        {% if tutorial.header.teaser %}
          <img src="{{ tutorial.header.teaser }}" alt="{{ tutorial.title }}">
        {% endif %}
      </div>
      <div class="tutorial-content">
        <h2 class="tutorial-title">
          <a href="{{ tutorial.url | relative_url }}">{{ tutorial.title }}</a>
        </h2>
        <div class="tutorial-meta">
          <span class="difficulty {{ tutorial.difficulty | downcase }}">{{ tutorial.difficulty }}</span>
          <span class="duration">{{ tutorial.duration }}</span>
        </div>
        <p class="tutorial-excerpt">{{ tutorial.excerpt | truncate: 160 }}</p>
        <div class="tutorial-tags">
          {% for tag in tutorial.tags %}
            <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
      </div>
    </div>
  {% endfor %}
</div>

<style>
.tutorials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.tutorial-card {
  background: var(--card-bg);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  }
}

.tutorial-image {
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.tutorial-content {
  padding: 1.5rem;
}

.tutorial-title {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;

  a {
    color: var(--text-color);
    text-decoration: none;

    &:hover {
      color: var(--primary-color);
    }
  }
}

.tutorial-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.difficulty {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;

  &.beginner { background: #22c55e; color: white; }
  &.intermediate { background: #eab308; color: white; }
  &.advanced { background: #ef4444; color: white; }
}

.duration {
  color: var(--text-light);
  font-size: 0.875rem;
}

.tutorial-excerpt {
  color: var(--text-light);
  margin-bottom: 1rem;
}

.tutorial-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .tag {
    background: var(--background-color);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: var(--text-light);
  }
}
</style>