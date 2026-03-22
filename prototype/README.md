# Figma prototype — test 1st

Web prototype built from your Figma file [test–1st](https://www.figma.com/design/F82x6cPjhGYhHC6NregTpU/test--1st?node-id=387-1199).

## What’s included

- **Design variables** in `media/variables.css` (colors, spacing, typography).
- **Three pages:** Home, Shop (sale cards grid), Cart (summary + total + checkout).
- **Shared UI:** header, search bar, total bar, basket button, footer, nav links.

## Open locally

Open `index.html` in a browser, or run a local server from this folder, e.g.:

```bash
cd prototype
npx serve .
# or: python -m http.server 8080
```

Then go to `http://localhost:3000` (or the port shown).

## Put it on the web

Use the same flow as the main site (see project root `DEPLOY.md`):

- **Netlify:** drag the `prototype` folder into Netlify’s “drop” zone.
- **GitHub Pages:** push a repo that has `prototype` as root (or put `prototype` contents in the repo root and enable Pages).

The prototype is static (HTML + CSS + JS), so any static host works.
