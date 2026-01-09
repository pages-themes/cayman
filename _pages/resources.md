---
title: "Recursos y Herramientas"
layout: collection
permalink: /resources/
collection: resources
entries_layout: grid
classes: wide
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/resources-header.jpg
excerpt: "Herramientas, plantillas y recursos para profesionales DevOps"
---

<div class="resources-container">
  <div class="resource-section">
    <h2>Cheat Sheets</h2>
    <div class="resource-grid">
      {% assign cheatsheets = site.posts | where: "type", "cheatsheet" %}
      {% for sheet in cheatsheets %}
        <div class="resource-card">
          <div class="resource-icon">
            <i class="fas fa-file-code"></i>
          </div>
          <h3><a href="{{ sheet.url }}">{{ sheet.title }}</a></h3>
          <p>{{ sheet.excerpt | truncate: 100 }}</p>
        </div>
      {% endfor %}
    </div>
  </div>

  <div class="resource-section">
    <h2>Plantillas</h2>
    <div class="resource-grid">
      {% assign templates = site.posts | where: "type", "template" %}
      {% for template in templates %}
        <div class="resource-card">
          <div class="resource-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <h3><a href="{{ template.url }}">{{ template.title }}</a></h3>
          <p>{{ template.excerpt | truncate: 100 }}</p>
        </div>
      {% endfor %}
    </div>
  </div>

  <div class="resource-section">
    <h2>Herramientas</h2>
    <div class="resource-grid">
      {% assign tools = site.posts | where: "type", "tool" %}
      {% for tool in tools %}
        <div class="resource-card">
          <div class="resource-icon">
            <i class="fas fa-tools"></i>
          </div>
          <h3><a href="{{ tool.url }}">{{ tool.title }}</a></h3>
          <p>{{ tool.excerpt | truncate: 100 }}</p>
        </div>
      {% endfor %}
    </div>
  </div>
</div>

<style>
.resources-container {
  margin: 2rem 0;
}

.resource-section {
  margin-bottom: 3rem;

  h2 {
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.resource-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  }

  .resource-icon {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;

    a {
      color: var(--text-color);
      text-decoration: none;

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  p {
    color: var(--text-light);
    font-size: 0.9rem;
    margin: 0;
  }
}

@media screen and (max-width: 768px) {
  .resource-grid {
    grid-template-columns: 1fr;
  }
}
</style>