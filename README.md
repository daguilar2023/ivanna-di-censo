# Ivanna di Censo — Portfolio

Live: https://daguilar2023.github.io/ivanna-di-censo/

A Spanish-language fashion portfolio based on Ivanna's original PDF, the supplied feedback, and visual references. GitHub Pages serves the root of `main`; there is no build step or package installation.

## Local preview

```sh
python3 -m http.server 4187
```

Open http://localhost:4187.

## Pages and assets

- `index.html`: original profile introduction and three unique project links in a scroll-driven 3D wheel
- `hay-alguien-en-casa.html`: original concept, moodboard, all 13 figurines, process board, lookbook and editorial photographs
- `uniqlo-flower.html`: original concept, moodboards, all 15 figurines, both process boards, editorial photographs and communication layouts
- `match-and-martini.html`: identity, featured garment, brand strategy, complete Instagram/TikTok layouts, organization chart and projection
- `sobre-mi.html`: original profile, formation, experience, tools and languages
- `assets/style.css`: white backgrounds, handwritten headings, responsive layouts and small geometric accents from the portfolio's palette
- `assets/main.js`: native-scroll wheel, explicit project controls, gallery/overview switch and accessible image viewer
- `assets/ivanna-di-censo-portfolio.pdf`: original downloadable portfolio

Body copy comes from the supplied portfolio, with line-break and spelling cleanup. Project and section headings follow the feedback. Interface labels and image alternatives describe navigation and source content.

## Interaction and accessibility

The wheel does not intercept scrolling. All three faces have the same dimensions before perspective, and all link to their own project pages. Hover and keyboard focus reveal a title and short description. Numbered selectors and previous/next buttons are alternatives to scrolling. Reduced-motion preference uses a static project layout. On touch devices captions remain visible.

Figurines support a horizontal gallery and a complete overview. Full-size original images open in a native modal dialog, which supports Escape and returns focus to the opening link. Navigation and image links remain usable without JavaScript.

Photos are never cropped on project pages. Embedded source images are extracted at their full native resolution and stored losslessly; smaller responsive versions are supplied for larger assets. Some UNIQLO photos are low resolution in the original PDF, so their display size is limited rather than inventing detail. The original PDF is always available.

No analytics, cookies, third-party JavaScript, account system, or form processing are used. Fonts are self-hosted: DM Sans and Gaegu, under the SIL Open Font License in `assets/fonts`. Portfolio content and imagery remain the property of their respective creators.

## Validation

Reviewed in the browser at 375, 768, 1024 and 1440 CSS pixels. Checked native wheel scrolling, project navigation, title reveal with keyboard focus, gallery navigation, complete figurine mode, dialog dismissal/focus return, local file/anchor references and JavaScript syntax.
