# Portfolio: real projects — design spec

**Date:** 2026-05-29
**Status:** Approved (brainstorming complete)
**Scope:** Replace the 5 placeholder case studies in the homepage portfolio with 3 real projects.

## Goal

The `#portfolio` section of `index.html` currently shows 5 fabricated case studies
("Distribution platform rebuild", etc.). Replace them with 3 real projects the owner
has built, using the existing design-system card pattern (`.nrg-work__*`). Keep cards
"simple" (mono label + name + one-line description), link out where a public destination
exists, and use real branding/names.

## The three projects

| Order | Name (display) | Label | Visual source | Link |
|---|---|---|---|---|
| 1 (hero, full-width) | **PackShip** | `2026 · MOBILE · iOS APP` | composed device shots | `https://apps.apple.com/app/id6754204899` |
| 2 (7-col) | **New York Fine Foods** | `2026 · WEB · CLIENT SITE` | brand photo from its `/public` | `https://www.newyorkfinefoods.com` |
| 3 (5-col) | **Restaurant ordering portal** | `2026 · WEB · PRODUCT` | custom on-brand UI mock | none (private template) |

### Card copy (one line each, matching current voice)

- **PackShip** — "A shipping companion that finds the right box with a real-time 3D
  packing view and compares live UPS, FedEx, and USPS rates."
- **New York Fine Foods** — "A cinematic site for a NYC catering, pizza-truck, and
  mobile-bar brand — media galleries, service menus, and booking inquiries."
- **Restaurant ordering portal** — "Commission-free online ordering that plugs into a
  restaurant's existing Square POS — orders, payments, and SMS updates, with no
  third-party fees."

## Layout

Reuse the existing 12-column `.nrg-work__grid`. New 3-item rhythm:

- **Row 1:** PackShip — full width (`.nrg-work__item--full`, `grid-column: 1 / -1`).
- **Row 2:** New York Fine Foods (7-col, `grid-column: 1 / 8`) + Restaurant ordering
  portal (5-col, `grid-column: 8 / 13`).

The weakest visual (the Pizzeria mock) sits in the smallest slot; the flagship app leads
full-width.

### Required CSS change (`assets/css/refresh.css`, "12. WORK")

The current span rules target `:nth-child(1..4)` and out-specify the `--full` modifier.
Replace that block with rules for the new 3-item order:

```css
/* 3 real projects: row 1 full-width hero, row 2 = 7/5 */
.nrg-work__item:nth-child(1) { grid-column: 1 / -1; }   /* PackShip (hero) */
.nrg-work__item:nth-child(2) { grid-column: 1 / 8; }    /* NYFF (7-col) */
.nrg-work__item:nth-child(3) { grid-column: 8 / 13; }   /* Pizzeria (5-col) */
```

Remove the old `:nth-child(1..4)` + `.nrg-work__item--full` span rules they replace.
Keep `.nrg-work__img { aspect-ratio: 16 / 10; }` — all three images are 16:10. Mobile
already collapses the grid to a single column (existing `@media (max-width: 768px)`);
verify the 3 cards stack cleanly with no leftover `--full`/`--wide` assumptions.

## Markup (`index.html`, `#portfolio`)

Replace the 5 `<article class="nrg-work__item …">` blocks with 3:

- **PackShip** and **New York Fine Foods** become anchors:
  `<a class="nrg-work__item" href="…" target="_blank" rel="noopener" data-reveal>` — the
  `.nrg-work__item` CSS is already link-ready (`text-decoration: none; color: inherit`).
- **Restaurant ordering portal** stays a non-linked `<article class="nrg-work__item" data-reveal>`.
- Each keeps the existing inner structure: `.nrg-work__img > picture (source webp + img jpg)`
  and `.nrg-work__meta` (`.nrg-label` + `.nrg-work__name` + `.nrg-work__desc`).
- `alt` text describes each project; `loading="lazy" decoding="async"` retained;
  `width`/`height` set to the new image dimensions to avoid layout shift.

The intro `<header class="nrg-work__head">` ("Recent case studies." / subtitle) and the
section label (`— 004 / SELECTED WORK`) stay as-is.

## Images

Produce 3 new pairs in `assets/img/portfolio/` (matching the existing `webp` + `jpg`
`<picture>` pattern), all **16:10**, ~1600×1000 for the hero and ~1200×750 for the
row-2 cards. Suggested names: `packship.{webp,jpg}`, `nyff.{webp,jpg}`,
`pizzeria.{webp,jpg}`. Tools available locally: `magick`/`convert`, `cwebp`, `sips`.

- **PackShip** — compose 2–3 App Store iPhone screenshots from
  `~/Desktop/PackShip Files/App Store iPhone Screenshots/` (`01_hero.png`, `04_3d.png`,
  `06_rates.png`) as rounded tiles on an on-brand dark panel (ink `#0A0A0B` → subtle blue
  glow), exported 16:10. One portrait screenshot alone crops badly in a wide banner, so a
  device row reads better.
- **New York Fine Foods** — copy a hero image from
  `~/Projects/newyorkfinefoods/public/` (`hero/1.jpg` or `OGImage.png`), crop to 16:10,
  convert to `webp` + `jpg`.
- **Restaurant ordering portal** — a custom on-brand UI mock (stylized storefront/checkout
  frame). No stock photography (violates the site's "no template tells" aesthetic). Built
  with ImageMagick or a small HTML→screenshot, exported 16:10.

The 5 old `assets/img/portfolio/1–5.{jpg,webp}` files become unused; remove them.

## Out of scope

- No detail/case-study pages, no routing changes (GitHub Pages static site stays flat).
- No changes to other sections.
- Standing up a public demo for the Pizzeria template (so that card stays link-less).

## Verification

- Visual check on desktop and mobile widths (the iOS aurora fix is unrelated but the
  portfolio sits over the aurora — confirm cards read on the gradient).
- PackShip and NYFF links open the correct destinations in a new tab.
- No broken image references; no leftover references to `portfolio/1–5`.
- Mobile single-column stack is clean.
