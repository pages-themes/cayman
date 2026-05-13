# Copilot Instructions — gabycb.github.io

## Project Overview

Personal website for Gabriela Barrera, hosted on GitHub Pages. Built on a **customized Cayman Jekyll theme** with hand-written SCSS and inline HTML sections within Markdown content pages.

Live site: https://gabycb.github.io/

## Build & Serve

```bash
# Install dependencies
script/bootstrap          # or: bundle install

# Local development server
script/server             # or: bundle exec jekyll serve

# Full CI build (build + htmlproofer + rubocop + HTML validation + gem build)
script/cibuild
```

Ruby 3.2 is used in CI. The Gemfile pulls dependencies from the `jekyll-theme-cayman.gemspec`.

## Architecture

- **Jekyll static site** using the Cayman theme (`jekyll-theme-cayman`), customized in-repo rather than via `remote_theme`.
- **Single layout**: `_layouts/default.html` — all pages use `layout: default`.
- **Content pages** are Markdown files with heavy inline HTML for custom sections (hero panels, gallery grids, featured cards). They are not pure Markdown.
- **Styling**: `_sass/jekyll-theme-cayman.scss` is the main stylesheet, importing `variables.scss`, `normalize.scss`, and `rouge-github.scss`. Responsive breakpoints use `$large-breakpoint` (64em) and `$medium-breakpoint` (42em) via SCSS mixins (`@include large`, `@include medium`, `@include small`).
- **Color scheme** is defined in `_sass/variables.scss` — warm orange (`#e2894d`) as the primary accent and blue (`#155799`) as secondary. Change colors there, not in the main SCSS.
- **Page navigation** is controlled by `header_pages` in `_config.yml` (index, projects, about).
- **External dependencies**: Font Awesome 6.5 (CDN) for icons, Google Fonts (Open Sans).

## Key Conventions

- Content pages (`index.md`, `about.md`, `projects.md`) mix Markdown with raw HTML `<section>` blocks using CSS classes like `.hero-bg`, `.block`, `.gallery-grid`, `.gallery-card`, `.featured-card`. Keep this pattern when adding new sections.
- Links between pages use root-relative paths (`/about`, `/projects`) without `.html` extensions.
- The site uses emoji extensively as part of the personal brand voice — maintain this style in content.
- Images are stored at the repo root (e.g., `avatar_result1.png`, `veteran-tool-preview.png`), not in a dedicated images folder.
- The `jekyll-seo-tag` plugin generates SEO metadata from `_config.yml` values (`title`, `description`).

## CI

GitHub Actions workflow (`.github/workflows/ci.yaml`) runs on push and PR: bootstrap → `script/cibuild`. The cibuild script runs Jekyll build, htmlproofer, rubocop, HTML validation, and gem build.
