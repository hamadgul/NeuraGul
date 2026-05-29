# NeuraGul Website Redesign — Design Spec

**Date:** 2026-05-29
**Status:** Approved for implementation planning
**Scope:** `index.html` and its associated CSS/JS. `privacy-policy.html` is untouched.

## Goal

The current site reads as "template-y" because it is — it was built on the purchased "Onion — Corporate Agency" HTML template (AB_Themes, Bootstrap 5 + Owl Carousel + WOW.js + animate.css). The visual signatures of that template (blob shape backgrounds, owl carousels, fade-in-on-scroll animations, 3-tier pricing cards, generic SVG icons in card grids, rounded pill buttons, blue `#3772FF` accent) work against NeuraGul's positioning as a custom software shop.

This redesign restructures the high-impact sections (hero, services, portfolio, work process) with custom layouts and replaces the visual identity end-to-end. The result should read as an editorial, deliberate product surface — closer to Linear or Vercel than to a corporate-agency template.

**Scope decision:** restructure key sections. Not a CSS-only facelift (would leave structural template tells in place), and not a full from-scratch rebuild (the existing Bootstrap grid and section scaffolding can be reused).

## Design foundations

### Color tokens

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0A0A0B` | Page background. Warm near-black, not pure. |
| `--surface` | `#141416` | Card and panel backgrounds where needed. |
| `--paper` | `#FAFAF7` | Primary text. Warm off-white. |
| `--muted` | `rgba(250,250,247,0.55)` | Secondary text. |
| `--rule` | `rgba(250,250,247,0.08)` | Hairline borders and dividers. |
| `--accent` | `#FF5A1F` | Electric orange. **One use per section maximum** (one button, one underline, one number). Never as a background fill. |

### Typography

- **Display + body:** Geist (loaded from a free CDN). Body at regular tracking; headings at `-0.04em`. Using a single family for both kills the "two-font template" feel.
- **Mono:** JetBrains Mono (Google Fonts). Used only for small labels: section numbers (`— 003 / SERVICES`), version tags, contact metadata, button labels in uppercase.
- **Fallback:** if Geist CDN is unreliable, fall back to Inter from Google Fonts. The existing DM Sans / Plus Jakarta Sans `@import` in `style.css` stays in place (so `privacy-policy.html` is unaffected); `refresh.css` overrides `font-family` on `body` and headings for `index.html`.
- **Type scale:**
  - Hero h1: `clamp(56px, 9vw, 132px)`
  - Section h2: `clamp(40px, 5vw, 72px)`
  - Body: 17px / 1.55 line-height
  - Mono labels: 12px / 0.08em letter-spacing / uppercase

### Spatial system

- Sharp corners by default: `border-radius: 0` for buttons, max `2px` for cards
- Hairline 1px borders in `--rule` for all dividers. No soft shadows. No glassmorphism.
- Section padding: 160px top/bottom on desktop, 80px on mobile
- Background texture: a CSS-only dot grid (radial-gradient repeat, ~2px dots at 24px spacing, ~8% opacity) concentrated in section corners. Replaces all PNG blob shapes.

### Animation policy

- Remove `wow.min.js` and `animate.min.css` entirely
- One reveal style: an 8px fade-up over 400ms triggered by IntersectionObserver on section enter. Fires once, no repeats.
- Hover transitions: 150ms ease only. No transforms beyond small position nudges. No carousels, marquees, parallax, or scroll-jacking.

### Component primitives

- **Buttons (two only):**
  - *Filled* — orange background, ink text, sharp corners, 14px uppercase tracked label, arrow icon.
  - *Ghost* — no border, paper-colored text, animated underline that draws on hover.
- **Section number label:** `— 003 / SERVICES` in mono, top-right of each section in the gutter.
- **Removed primitives:** pill buttons, soft-shadow cards, owl dots, lightbox icons, the `verson_mood` dark-mode toggle.

## Section-by-section layout

### Navigation
- Sticky top, transparent at scroll position 0, becomes solid `--ink` with a bottom hairline after 40px of scroll.
- Layout: wordmark left (text `NeuraGul` set in display font — replaces `assets/img/logo.png`) · four links (`work`, `services`, `team`, `contact`) center-right in mono · one filled CTA `Start a project →` far right.
- Dark-mode toggle button removed.

### Hero (`#home`)
- Full-viewport-height section. Asymmetric 12-column grid.
- Left 9 cols: mono label `— 001 / 2026` top, then a 3-line tight-leading headline (`Software,` / `shipped` / `with intent.`). The word `intent.` carries the only accent in the section (orange or orange underline).
- Below the headline, a 2-col split: left column = ~60-character positioning sentence in muted text; right column = two stacked buttons (`Start a project →` filled, `View work` ghost).
- Bottom strip pinned to the viewport bottom: thin hairline, then mono row `TRUSTED BY · <CLIENT 1> · <CLIENT 2> · <CLIENT 3> · <CLIENT 4>` (text wordmarks, no client logos needed). Client names to be supplied by the user during implementation; if none are provided, the entire trusted-by strip is omitted rather than filled with placeholders.
- Headline copy: `Software, / shipped / with intent.` is the working proposal — the user can substitute alternative copy during implementation, but the 3-line structure with one accent-colored word is fixed.
- Background: CSS dot-grid concentrated in the top-right corner, fading out. No `home-bg.png`. No blob shape.

### About / intro (`#about`)
- Replaces the existing 2-column image+copy layout. `about.png` retired.
- Section label `— 002 / WHO WE ARE`.
- Left 5 cols: a single editorial sentence (~30 words) at h2 size. Working copy proposal — the user supplies the final sentence during implementation.
- Right 7 cols: three stacked stat rows separated by hairlines. Each row: display-sized number left (`12+`, `40+`, `8`) · mono label right (`YEARS BUILDING`, `SHIPPED PROJECTS`, `ENGINEERS`).
- Stat numbers and labels are working values — the user supplies real numbers during implementation. If real numbers aren't available, the three stat rows are replaced with three short principle statements in the same visual rhythm (e.g., `SHIP FAST`, `WRITE LESS`, `STAY HUMAN`) rather than ship with fake metrics.

### Services (`#service`)
- Drops the 6-card 3×2 grid + SVG icons entirely.
- Section label `— 003 / WHAT WE DO`.
- Six full-width rows, each with a hairline above. Row anatomy: `01.` (mono, left) · service title in display font · one-line description in muted text · `→` arrow far right.
- Whole row is the hover target. On hover: background tints to `rgba(255,90,31,0.04)`, title nudges 8px right, arrow flips to orange. 150ms ease.
- Existing service titles and descriptions reused; existing `assets/img/service/1-6.svg` files no longer referenced.

### Portfolio / Work (`#portfolio`)
- Drops Owl Carousel entirely.
- Section label `— 004 / SELECTED WORK`.
- Asymmetric 2-column grid: rows alternate widths (row 1 = 7/5, row 2 = 5/7) to break the uniform-card-grid feel.
- Each project: image at 16:10 with a permanent 20% dark overlay · below: mono caption (`2025 · WEB · CASE STUDY`) · project name in display font · one-line description.
- Hover: overlay lifts to 0%, title shifts right slightly.
- Uses the existing 5 portfolio images (`assets/img/portfolio/1.jpg` through `5.jpg`); the duplicate slides used to fill the carousel are removed.
- Lightbox JS/CSS removed.

### Work process (`#work_process`)
- Section label `— 005 / HOW WE WORK`.
- Three vertical chapters stacked, each full-bleed.
- Each chapter: a massive ghosted display number (`01`) at ~280px size in `rgba(255,90,31,0.08)` sitting behind/left · title in display font · 2–3 sentence description in body.

### Team (`#team`)
- Drops the 4-card grid with social icons.
- Section label `— 006 / TEAM`.
- Single horizontal row of 4 portraits at equal height — treated as a contact sheet. Photos rendered grayscale by default. On hover: color returns and the name shifts to accent orange.
- Below each portrait: name in display font, role in mono.
- Uses existing `assets/img/member/1-4.png`.

### Contact (`#contact`)
- Drops `contact-bg1.jpg` and `contact-bg2.jpg`.
- Section label `— 007 / GET IN TOUCH`.
- 2-col layout. Left 7 cols: large headline `Let's build something.` then a form with hairline borders, no input backgrounds — labeled fields use bottom-rule inputs (name, email, project type select, message). Submit button is filled orange `Send →`.
- Right 5 cols: contact details in mono, stacked — `EMAIL`, `BASED IN`, `RESPONSE TIME` rows separated by hairlines. Small note below: "We reply within 24h."
- Form posts to the existing `assets/contact.php` endpoint (unchanged).

### Footer (`#footer`)
- Three rows separated by hairlines.
- Top row: wordmark + one-line tagline left · three columns of small mono links right (Company, Services, Resources).
- Middle row: thin rule.
- Bottom row: `© 2026 NeuraGul Labs` left · `v2026 · Made with intent` right (mono).

### Sections removed entirely
- `#countdown` — countdown timer (gimmicky without a real launch)
- `#pricing` — 3-tier pricing cards (strong template tell; agencies rarely publish fixed pricing)
- `#faq` — accordion FAQ (adds length without payoff)
- `#blog` — blog teasers on the homepage (dates the site fast if not regularly updated)

**Final page flow:** Nav → Hero → About → Services → Portfolio → Work Process → Team → Contact → Footer. Eight sections, down from twelve.

## File-level impact

### Files created
- `assets/css/refresh.css` — design system tokens, font-face links, full section rewrites, button primitives, dot-grid utility. Loaded **last** in `<head>` so it cascades over `style.css`.
- `assets/js/reveal.js` — ~30-line IntersectionObserver that adds `.is-revealed` to sections on viewport entry. Replaces WOW.js.

### Files modified
- `index.html` — section HTML rewrites, removed sections deleted, WOW/animate classes stripped, head and script tags pruned (see below), wordmark replaces PNG logo, dark-mode toggle button removed.

### Files untouched
- `privacy-policy.html` — verified to still render against the existing `style.css` baseline after the implementation passes.
- `assets/css/style.css` — kept as-is so the privacy page stays stable.

### `<head>` CSS link tags dropped from `index.html`
- `animate.min.css`
- `owl.carousel.min.css`
- `owl.theme.default.min.css`
- `flipdown.css`
- `lightbox.min.css`
- `dark-mode.css`

### `<script>` tags dropped from `index.html`
- `wow.min.js`
- `owl.carousel.min.js`
- `flipdown.js`
- `lightbox.min.js`
- `magiccursor.js`
- `counterup.js`
- `jquery.waypoints.min.js`

### `<script>` tags kept
- `jquery-3.6.0.min.js`, `popper.min.js`, `bootstrap.bundle.min.js` (navbar collapse)
- `SmoothScroll.js`, `jquery.nav.js`, `script.js`
- New: `reveal.js`

### Image assets no longer referenced (left in repo for now)
- `assets/img/shape/1-4.png` — blob shape backgrounds
- `assets/img/about.png`
- `assets/img/contact-bg1.jpg`, `contact-bg2.jpg`
- `assets/img/faq.png`, `assets/img/world-map.png`
- `assets/img/service/1-6.svg` — generic service icons
- `assets/img/counter/`, `assets/img/blogs/`, `assets/img/process/`, `assets/img/testi/`, `assets/img/testimonial/`

### External resources added
- Geist font via `https://fonts.cdnfonts.com/css/geist` (free, no key). Inter from Google Fonts as fallback.
- JetBrains Mono via Google Fonts: `family=JetBrains+Mono:wght@400;500&display=swap`.

## Implementation order

Each step is a sensible commit checkpoint:

1. **Foundations.** Create `refresh.css` with design tokens, font imports, button primitives. Wire into `index.html` `<head>` (loaded last). Page should look mostly unchanged — this only establishes the cascade.
2. **Asset cleanup.** Drop the 5 unused CSS link tags and 7 unused script tags from `index.html`. Remove the `verson_mood` dark-mode toggle button. Verify nothing visually breaks beyond expected.
3. **Hero rewrite.** Replace `#home` markup with the new structure. Highest-impact moment — once the hero feels right, the rest follows.
4. **Section removal.** Delete `#countdown`, `#pricing`, `#faq`, `#blog` from `index.html`.
5. **Remaining section rewrites,** in order: about → services → portfolio → work_process → team → contact → footer.
6. **Reveal behavior.** Add `reveal.js` (IntersectionObserver) and the `.is-revealed` CSS rules.
7. **Verification pass.** Open `index.html`, scroll every section. Open `privacy-policy.html` and confirm no regression. Resize through 375px / 768px / 1280px / 1920px.

## Verification

- Manual browser walk-through of `index.html` at four breakpoints (375 / 768 / 1280 / 1920).
- `privacy-policy.html` rendered and confirmed visually unchanged.
- Browser console clean — no 404s from dropped JS, no JS errors.
- All hover interactions in services rows, portfolio cards, team portraits, and buttons behave as specified.

## Risk and rollback

- All work happens on `main` with commits at each implementation step (see Implementation Order). Any step can be reverted independently with `git revert`.
- Single explicit risk: the privacy page shares `style.css`. Mitigation: `style.css` itself is not modified; only `index.html`'s `<head>` link list is changed. `privacy-policy.html` continues to load `style.css` exactly as before.
- No backend, database, or deployment surface affected. The site is static and served from GitHub Pages.

## Out of scope

- Copy rewriting (existing service titles, about copy, etc. reused unless minor adjustments are needed for layout fit).
- New portfolio case study content. The 5 existing portfolio images are reused.
- Replacing team photos. Existing 4 member photos reused.
- The `privacy-policy.html` page design.
- Mobile-first redesign of the navbar collapse menu — Bootstrap default behavior is kept; only the visual styling is updated.
- Backend / form-handling changes. The contact form continues to POST to `assets/contact.php`.
