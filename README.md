# Thanga Vignesh Raja T — Portfolio

Personal portfolio of **Thanga Vignesh Raja T**, Manager – Software Development & Engineering, focused on AI/LLM systems, Model Context Protocol (MCP) architectures, and resilient connected infrastructure.

**Live site:** https://thangavigneshraja.github.io/

## About

A single-page static website with a modern, AI-focused design. It is built with plain HTML, CSS and JavaScript: no frameworks, build step or dependencies.

## Features

- **Agent console hero**: an animated, scripted chat-style session that answers questions about my focus, experience and leadership (no live AI or API calls).
- **AI Focus section**: a bento grid covering LLM systems, MCP architectures (with an animated diagram), agentic coding, natural language interfaces, and the engineering foundation behind them.
- **Modern visual design**: dark theme with aurora gradients, an interactive neural-network canvas background, frosted-glass cards with a cursor spotlight, and gradient typography.
- **About, Experience and Capabilities**: profile photo, career timeline and skills grid.
- **Sticky navigation** that highlights the section in view.
- **Responsive** from desktop down to phone widths.
- **Accessible motion**: all animations are turned off for visitors who prefer reduced motion.
- **SEO and sharing**: meta description, Open Graph and Twitter card tags with the profile photo, and Schema.org `Person` structured data.

## Project structure

```
.
├── index.html          # Page content, meta tags and structured data
├── styles.css          # Theme tokens, layout, components and animations
├── script.js           # Scroll reveal, nav highlighting, count-up stats,
│                       # agent console and neural-network background
├── assets/
│   ├── profile.webp    # Profile photo (800×800, used by most browsers)
│   └── profile.jpg     # JPEG fallback, also used for link previews
├── robots.txt          # Allows all crawlers
└── README.md
```

## Run locally

Clone the repository and open `index.html` in a browser:

```bash
git clone https://github.com/thangavigneshraja/thangavigneshraja.github.io.git
cd thangavigneshraja.github.io
```

For a local development server, you can use VS Code Live Server or run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Customizing

- **Content**: edit the sections directly in `index.html`.
- **Colours and fonts**: change the CSS variables at the top of `styles.css` (`--violet`, `--cyan`, `--lime`, `--grad`, `--sans`, `--mono`, `--serif`).
- **Agent console conversation**: edit the `script` array in `script.js`.
- **Profile photo**: replace both files in `assets/` with a square image (800×800 recommended).
- **Fonts**: Geist, Geist Mono and Instrument Serif, loaded from Google Fonts in `index.html`.

## Deployment

This repository is configured for GitHub Pages and deploys the site from the `main` branch. Every push or merged pull request to `main` publishes the site automatically, usually within a couple of minutes.

If a deployment fails with a server error from GitHub, re-run it from the **Actions** tab. If no deployment starts after a merge, go to **Settings → Pages**, set the source branch to `None` and save, then set it back to `main` / `(root)` to trigger a fresh build.

## Contact

- Email: [thangavigneshraja@gmail.com](mailto:thangavigneshraja@gmail.com)
- LinkedIn: [linkedin.com/in/thangavigneshraja](https://www.linkedin.com/in/thangavigneshraja/)
- X: [@tvigneshraja](https://x.com/tvigneshraja)
