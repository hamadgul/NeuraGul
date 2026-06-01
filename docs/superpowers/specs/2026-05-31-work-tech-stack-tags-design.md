# Work card tech-stack / skill tags — design

**Date:** 2026-05-31
**Status:** Approved (design), ready for implementation plan

## Goal

Show the tech stack (or, for product work, the skills) used on each project under the
"Selected work" section. Must be visually pleasing, easy to parse at a glance, and fully
in line with the existing editorial-dark design system.

## Decision

**Outlined mono pills** — each technology is its own small chip: hairline border, muted
JetBrains Mono text, **no fill**, **sharp corners** (`border-radius: 0`, matching the
site's buttons and cards). Chosen over an inline middot-divider line (harder to parse as a
long single line) and filled accent-tinted chips (too busy with 5–6 tags per card).

## Markup

One list added to the bottom of each card's `.nrg-work__meta`, immediately after
`.nrg-work__desc`:

```html
<ul class="nrg-work__stack" aria-label="Built with">
  <li>React Native</li><li>TypeScript</li><li>JavaScript</li>
  <li>threeJS</li><li>Postgres</li><li>Redis</li>
</ul>
```

- Semantic `<ul>`/`<li>` (a list of technologies).
- `aria-label="Built with"` on all cards **except** RWD Pipeline, which uses
  `aria-label="Skills"` (its tags are PM skills, not tech). Same visual treatment.
- The card is already wrapped in `<a class="nrg-work__item" … data-reveal>`, so the stack
  fades in with the card — no per-element reveal needed.

## CSS (added to the WORK section of `assets/css/refresh.css`)

```css
.nrg-work__stack {
    list-style: none;
    margin: 4px 0 0;            /* ~12px below desc with the meta's own rhythm */
    padding: 0;
    display: flex;
    flex-wrap: wrap;            /* wraps to as many rows as needed */
    gap: 8px;
}
.nrg-work__stack li {
    font-family: var(--font-mono);
    font-size: 11.5px;
    letter-spacing: 0.04em;
    color: var(--muted);
    padding: 5px 10px;
    border: 1px solid var(--rule);
    border-radius: 0;          /* sharp — matches .nrg-btn / cards */
    white-space: nowrap;
    transition: border-color 250ms ease, color 250ms ease;
}
.nrg-work__item:hover .nrg-work__stack li {
    border-color: var(--accent-ghost);
    color: var(--paper);
}
```

The hover lift ties into the card's existing hover behavior (name slides `translateX(4px)`,
image brightens/scales) and stays subtle (`--accent-ghost` is a faint blue border).

## Data mapping (verbatim from the user)

| Card (in DOM order) | `aria-label` | Tags |
|---|---|---|
| PackShip | Built with | React Native, TypeScript, JavaScript, threeJS, Postgres, Redis |
| New York Fine Foods | Built with | TypeScript, NextJS, JavaScript |
| Vintus | Built with | WordPress, PHP, Python |
| Restaurant ordering portal | Built with | TypeScript, Square SDK, Delivery APIs |
| Real-World Data Pipeline | Skills | Product Management, Agile, Planning |
| Landscape Drainage Proz | Built with | Shopify, Custom Liquid, SEO, Google Ads |

> Note: current DOM row order is PackShip, NYFF, Vintus (row 1) / Restaurant ordering
> portal, RWD Pipeline, Landscape Drainage Proz (row 2). Apply tags to each by its name,
> not by position.

## Responsive & risk

- Pills wrap natively; **no media-query changes** needed. On mobile (1 card/row) cards are
  wider, so tags fit comfortably.
- Tags sit **below** the description, so there is **zero layout shift** to the image or the
  grid — pure addition.
- Scope: 6 HTML edits (one `<ul>` per card) + ~16 lines of CSS. No new files, no JS.

## Verification

Render `index.html` via headless Chrome (force `[data-reveal]` visible; see
`reference-visual-verify-headless-chrome` memory) at desktop (3/row) and a narrow width
(1/row); confirm pills wrap cleanly, read clearly at card scale, align under each desc, and
the hover lift works. No automated tests (static marketing site).
