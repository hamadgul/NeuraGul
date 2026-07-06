# Handoff: NeuraGul Labs — Marketing Site Redesign

## Overview
A dark, cinematic "tech-luxe" marketing site for NeuraGul Labs, a software development agency. The package covers three pages:
1. **Home** — hero (background video), manifesto, services list, portfolio, animated stats, process timeline, contact form, footer.
2. **PackShip Case Study** — a mobile/iOS project case study.
3. **NYMM Case Study** — New York Mobile Mechanic, a web/SEO project case study (the featured project on the home page).

The site's job is to make a small agency look like a $10k+ studio: heavy grotesk typography, a blue/violet accent on near-black, and a coordinated motion system (interactive canvas / hero video, scroll reveals, magnetic buttons, 3D-tilt cards, count-up numbers).

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes that show the intended look, layout, and behavior. They are **not production code to copy verbatim**. They are authored as "Design Components" (a streaming HTML format) and use inline styles heavily; do not treat that as a styling recommendation.

Your task is to **recreate these designs in the target codebase's environment**, using its established patterns and libraries. Given the motion requirements, a good default stack is **Next.js + React + Tailwind CSS + Framer Motion** (which is what the featured NYMM project itself was built on). If a codebase/framework already exists, follow its conventions instead. Extract a real design-token system and reusable components rather than porting inline styles.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, and interactions are final and intentional. Recreate the UI faithfully, then refactor into the target stack's component + token patterns. Media (project screenshots/videos) are placeholders in the prototype — see **Assets**.

## Design Tokens

### Color
All accents are defined in `oklch`. Approximate hex equivalents given for convenience — prefer the oklch values.
- **Page background (base):** `#0a0d12`
- **Section background (alt / darker):** `#070a0f`
- **Primary text:** `#eef2f8`
- **Body text:** `rgba(223,230,238,.62)` — muted variants at `.45`–`.72` opacity
- **Accent (primary blue/violet):** `oklch(0.68 0.17 258)` ≈ `#4a72e8` — used for CTA fills, links, numerals
- **Accent light:** `oklch(0.78–0.82 0.12–0.14 258)` ≈ `#8fa8f2` — labels, hover, small accents
- **Accent gradient (headline/CTA sweep):** `linear-gradient(105deg,#eef2f8 15%, oklch(0.8 0.13 258) 55%, oklch(0.68 0.17 245) 88%)`
- **Nav CTA gradient:** `linear-gradient(120deg, oklch(0.55 0.19 248), oklch(0.62 0.19 268))`
- **Hairline / border:** `rgba(140,170,255,.12–.18)`
- **Card surface:** `rgba(140,170,255,.03)` to `linear-gradient(165deg, rgba(140,170,255,.05), rgba(140,170,255,.01))`
- **Selection:** bg `oklch(0.6 0.17 258 / .45)`, text `#fff`
- **Glow orbs:** `radial-gradient(circle, oklch(0.5 0.16-0.17 258 / .2-.3), transparent 65%)`, `filter: blur(48–52px)`

### Typography
- **Display / headings:** `Bricolage Grotesque` (Google Fonts), weights 300/650/700/800. Headline letter-spacing `-.03em` to `-.035em`, line-height `.9`–`1.0`. Big headlines are `text-transform: uppercase`.
- **Body / UI:** `Instrument Sans` (Google Fonts), 400–650. Body copy 15–21px, line-height 1.55–1.7.
- **Mono / labels (eyebrows, coordinates, tags):** `ui-monospace, Menlo, monospace`, 10.5–13px, letter-spacing `.12em`–`.18em`, often uppercase, in accent-light color.
- Hero headline sizes: home `min(11.4vw, 158px)`; case study `min(13vw, 180px)` / `min(8.6vw, 120px)` for longer names.

### Spacing / layout
- Horizontal page padding: **64px** (nav and section gutters).
- Section vertical rhythm: **~130px** top/bottom for major sections.
- Content max width is not globally capped — sections span the gutter; text blocks cap at 440–640px.
- Card radius: **16–22px**; pills/buttons: **999px**; inputs: **12px**.
- Hairline dividers separate sections and rows.

### Shadow / effects
- CTA glow: `box-shadow: 0 0 44px oklch(0.6 0.18 258 / .5)` (primary), `0 0 32px oklch(0.55 0.18 258 / .4)` (nav).
- Tilt cards lift on hover (see Interactions).
- Blueprint grid overlay: `linear-gradient(rgba(120,150,255,.045) 1px, transparent 1px)` + 90deg variant, `background-size: 48px 48px`.

## Screens / Views

### 1. Home (`Neuragul Home.dc.html`)
Fixed top nav (logo image left, 4 text links center, gradient "Start a project" pill right). Nav is transparent at top and gains `rgba(7,10,15,.8)` + `blur(16px)` + hairline border after 30px of scroll.

Sections in order:
- **Hero** (`min-height:100vh`, bottom-aligned content): full-bleed background `<video>` (muted, loop, autoplay, `object-fit:cover`) + blueprint grid + top/bottom scrim gradient. Mono eyebrow with pulsing dot ("A SENIOR ENGINEERING STUDIO — NYC / REMOTE"). Three-line masked headline "We build / software / that ships." — line 1 solid, line 2 translucent light-blue fill with 2px stroke + dark drop-shadow halo (so it reads over video), line 3 gradient sweep. Sub-paragraph + two CTAs (solid pill + outline pill). Bottom row: "— 001 / 2026", "SCROLL ↓" (bobbing), "RESPONSE < 24H".
- **Marquee**: infinite horizontal scroll of capabilities separated by ✦, on a faint accent strip.
- **Manifesto** (`— 002 / WHO WE ARE`): big statement headline; three cards (Ship fast / Write less / Stay human), staggered reveal.
- **Services** (`— 003 / WHAT WE DO`): 6-row table. Each row: `grid-template-columns: 110px 1fr 400px 60px` = number / name (36px grotesk) / description / arrow. Hover pushes `padding-left` to 26px + faint bg.
- **Work** (`— 004 / SELECTED WORK`): giant outlined word "WORK" drifting left→center on scroll (see Interactions). Featured card = **New York Mobile Mechanic** (links to `NYMM Case Study.dc.html`), badged "FEATURED CASE STUDY", tags Next.js / TypeScript / Local SEO. Then a 3-up grid: New York Fine Foods, **PackShip** (links to `PackShip Case Study.dc.html`), Landscape Drainage Proz.
- **Stats** (4-col): count-up numbers — 37 systems shipped, 99.98% uptime, <24h response, 0 abandoned.
- **Process** (`— 005 / HOW WE WORK`): vertical timeline, 3 steps (Discover / Design & build / Operate). A gradient progress line draws in (scaleY) as you scroll; dots are centered on the line and the line spans exactly first-dot-center to last-dot-center (measured at runtime).
- **Contact** (`— 006 / GET IN TOUCH`): giant gradient "Let's build something." headline + drifting outlined "BUILD" word + glow orb. Two columns: form (name, email, project-type select, message, send pill) and contact details (email, based in, response time).
- **Footer**: logo + tagline, three link columns (Company / Services / Resources), bottom legal row.

### 2. PackShip Case Study (`PackShip Case Study.dc.html`)
Nav (logo links home). Hero: "← ALL WORK" back-link, mono eyebrow, gradient title "PackShip", lede, 4-col meta strip (Platform / Scope / Stack / Year), full-bleed 21:9 hero media with parallax. Problem/Approach two-column. Three alternating feature blocks (image ⇄ text, tilt on the media): "One photo, measured" (on-device ML), "Watch it pack itself" (three.js 3D box-fit), "Carriers, racing" (live rate comparison). 3-col count-up results (18% saved, 3 wks to TestFlight, 4.9★). Centered CTA. Footer.

### 3. NYMM Case Study (`NYMM Case Study.dc.html`)
Same template as PackShip. Title "New York / Mobile Mechanic" (line 1 outlined, line 2 gradient). Hero has a "VISIT LIVE SITE ↗" link to `https://newyorkmobilemechanic.com`. Meta: Web / Next.js, Design→Build→SEO, TypeScript·Tailwind·Framer Motion, 2026. Feature blocks: "Built to rank" (local SEO / Next.js), "Numbers that move" (Framer Motion stat gauges), "Panic → phone call" (conversion / sticky call button + live reviews). Results: Top 3 map pack, 2.4× calls in 90 days, 98 Lighthouse. CTA chains to the PackShip case study.

> **Note:** case-study result figures are plausible placeholders — confirm real numbers with the client before shipping.

## Interactions & Behavior
All motion lives in a single vanilla-JS engine (`fx.js`, `NGFX.init({motion})`). Recreate these as Framer Motion / hooks. Everything respects `prefers-reduced-motion` and a `motion` prop with values `full | calm | off`.

- **Page-load choreography:** hero headline lines rise from a clipped mask (`heroRise`, `translateY(112%)→0`, `cubic-bezier(.16,.8,.24,1)`, staggered .15/.28/.41s). Eyebrow, sub-copy, CTAs fade-up after.
- **Scroll reveals:** elements with a reveal marker fade + translate in (up/left/right/scale) when they cross ~86% viewport. Duration `.9s cubic-bezier(.2,.7,.2,1)`, optional per-element delay for stagger. Only elements below the fold are hidden initially (no flash).
- **Count-up numbers:** animate from 0 to target over 1.5s (ease-out cubic) when scrolled into view; support decimals, prefix, suffix.
- **Magnetic buttons:** on fine pointers, CTA translates toward cursor (strength ~0.25–0.32), springs back on leave (`cubic-bezier(.2,.9,.25,1.25)`).
- **3D tilt cards:** perspective 1100px, rotateX/Y up to 3–5° following cursor, eased return.
- **Parallax / drift:** hero media parallax; giant background words: "WORK" eases left→center via smoothstep on scroll progress; "BUILD" drifts on scroll.
- **Nav chrome:** background/blur/border fade in past 30px scroll.
- **Cursor glow:** a soft radial follows the pointer (lerp 0.1) on fine pointers.
- **Hero background:** in the final design a muted looping video. The engine also contains an interactive flow-field particle canvas (blue/violet threads that swirl around the cursor) used as an alternative hero backdrop — keep it as a fallback/option if no video is supplied.
- **Marquee:** CSS `translateX(-50%)` loop, ~28s linear infinite.
- **Process line:** `scaleY` from 0→1 mapped to scroll position through the section.

## State Management
Minimal. Per page: a `motion` setting (`full|calm|off`, default `full`, also forced `off` under reduced-motion). Contact form needs local field state + submit handling + validation (not wired in the prototype). No data fetching in the prototype; live Google reviews on NYMM would need an integration in production.

## Assets
- **`uploads/logo.png`** — NeuraGul Labs logo (218×105, transparent PNG). Used in home nav (44px tall), home footer (48px), and case-study navs. Note: the mark's navy nodes are dark on the near-black bg — consider a light/white variant.
- **`uploads/hero.mp4`** — home hero background video (muted/loop).
- **All project thumbnails and case-study feature images/videos are placeholders** (striped boxes with `[ ... ]` captions describing intended content). Replace with real screenshots/recordings: PackShip app captures (camera sizing, 3D box-fit, rate comparison), NYMM homepage/gauges/mobile call button, and the other portfolio thumbnails.
- **Fonts:** Bricolage Grotesque + Instrument Sans via Google Fonts.

## Files
Included in this bundle (design references):
- `Neuragul Home.dc.html`
- `PackShip Case Study.dc.html`
- `NYMM Case Study.dc.html`
- `fx.js` — the shared motion engine; read it for exact timings/easings.
- `uploads/logo.png`, `uploads/hero.mp4`
