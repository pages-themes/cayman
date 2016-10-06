# Cayman - `jekyll-theme-cayman` gem

Cayman is a clean, responsive theme for [GitHub Pages](https://pages.github.com).

You can preview the theme at http://jasonlong.github.io/cayman-theme or with real content at http://jasonlong.github.io/geo_pattern.

![](http://cl.ly/image/1T3r3d18311V/content)

### Usage

This theme was ported from the GitHub Automatic Page Generator to a Jekyll theme gem. To use it on a Pages site, add `theme: jekyll-theme-cayman` to your `_config.yml`.

Markdown files should be prefixed with the following frontmatter.

```md
---
layout: default
---

```

### Customizations

```yaml
theme: jekyll-theme-cayman

title: Custom title
description: Custom description.
show_downloads: true
google_analytics:
```

- Set a custom `title` or `description`.
- Set `show_downloads` to `true` to show the download buttons in the header.
- Set `google_analytics` to your tracking ID to enable pageview tracking.

#### CSS

For CSS customization, create your own `/assets/css/styles.scss` in your project to replace the one from this theme. For convenience, the variables from `_sass/variables.scss` can simply be uncommented and their values modified.

A couple of nice sources for gradient colors are http://uigradients.com and http://jxnblk.com/shade/.

```scss
---
---

@import "normalize";
@import "rouge-github";
@import "variables";

// Breakpoints
// $large-breakpoint: 64em;
// $medium-breakpoint: 42em;

// Headers
// $header-heading-color: #fff;
$header-bg-color: #8E0E00;
$header-bg-color-secondary: #1F1C18;

// Text
// $section-headings-color: #159957;
// $body-text-color: #606c71;
// $body-link-color: #1e6bb8;
// $blockquote-text-color: #819198;

// Code
// $code-bg-color: #f3f6fa;
// $code-text-color: #567482;

// Borders
// $border-color: #dce6f0;
// $table-border-color: #e9ebec;
// $hr-border-color: #eff0f1;

@import 'cayman';
```

#### Syntax Highlighting

[Rouge](http://rouge.jneen.net/) is the default highlighter in Jekyll 3. This theme includes the `github` stylesheet from Rouge.

To switch syntax highlighting colors to say `monokai`, install the `rouge` gem and run the following on the command line.

```
mkdir _scss
rougify style monokai > _scss/rouge-monokai.scss
```

Then replace `rouge-github` with `rouge-monokai` in `/assets/css/styles.scss`

Other pygments highlighter themes should work as well.


### License

This work is licensed under a [Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/) license.
