---
title: "Ejemplo de Post Programado"
date: 2026-01-01
categories:
  - blog
tags:
  - Azure
  - DevOps
  - Automatización
seo:
  type: TechArticle
  description: "Este es un ejemplo de un post programado que se publicará automáticamente en la fecha especificada."
---

Este es un ejemplo de cómo programar posts para publicación automática.

## Cómo Funciona

1. Coloca tus posts en el directorio `_drafts`
2. Asegúrate de que tengan una fecha futura en el frontmatter
3. El sistema automáticamente los publicará en la fecha especificada

## Frontmatter Requerido

```yaml
---
title: "Título del Post"
date: YYYY-MM-DD  # Fecha futura de publicación
categories:
  - categoría1
  - categoría2
tags:
  - tag1
  - tag2
seo:
  type: TechArticle
  description: "Descripción SEO del artículo"
---
```

## Tips para Posts Programados

1. **Fechas**: Usa el formato YYYY-MM-DD
2. **Categorías**: Incluye al menos una categoría
3. **Tags**: Añade tags relevantes para mejor organización
4. **SEO**: Siempre incluye una buena descripción SEO