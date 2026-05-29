# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `index.html` from the "Onion" corporate-agency template into a custom editorial dark / Linear-style site, per `docs/superpowers/specs/2026-05-29-website-redesign-design.md`.

**Architecture:** Additive override CSS file (`assets/css/refresh.css`) loaded last in the cascade so the existing `style.css` stays intact (privacy-policy.html depends on it). Section HTML in `index.html` is rewritten in place. A tiny new `assets/js/reveal.js` replaces WOW.js for entrance animations.

**Tech Stack:** Static HTML, vanilla CSS (custom properties, CSS Grid), vanilla JS (IntersectionObserver). Bootstrap grid kept for responsive `.container` only.

**Verification model:** This codebase has no automated test framework. Each task's "verification" step is a manual browser check — open `index.html` (`open "/Users/hamadgul/Projects/NeuraGul - Website/index.html"` on macOS) and confirm the specified visual state.

---

## File Structure

| Path | Status | Responsibility |
|---|---|---|
| `assets/css/refresh.css` | **CREATE** | Design tokens, font imports, button primitives, dot-grid utility, all section styles, reveal animation styles. Loaded last in `<head>`. |
| `assets/js/reveal.js` | **CREATE** | ~30-line IntersectionObserver that adds `.is-revealed` to sections on viewport entry. |
| `index.html` | **MODIFY** | `<head>` link/script pruning. Section HTML rewrites. Removed sections deleted. Wordmark replaces PNG logo. Dark-mode toggle removed. |
| `assets/css/style.css` | UNCHANGED | Stays intact so `privacy-policy.html` is unaffected. |
| `privacy-policy.html` | UNCHANGED | Final verification confirms it still renders. |

---

## Task 1: Foundations (refresh.css + cascade wiring)

**Files:**
- Create: `assets/css/refresh.css`
- Modify: `index.html` (head section)

- [ ] **Step 1: Create `assets/css/refresh.css` with design tokens, font imports, base reset, and utilities**

Write this exact content to `assets/css/refresh.css`:

```css
/* =============================================================
   NeuraGul Redesign — Refresh Layer
   Loaded after style.css. Overrides intentional.
   ============================================================= */

/* -------------------------------------------------------------
   01. FONT IMPORTS
   ------------------------------------------------------------- */
@import url("https://fonts.cdnfonts.com/css/geist");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");

/* -------------------------------------------------------------
   02. TOKENS
   ------------------------------------------------------------- */
:root {
    --ink: #0A0A0B;
    --surface: #141416;
    --paper: #FAFAF7;
    --muted: rgba(250, 250, 247, 0.55);
    --rule: rgba(250, 250, 247, 0.08);
    --accent: #FF5A1F;
    --accent-soft: rgba(255, 90, 31, 0.04);
    --accent-ghost: rgba(255, 90, 31, 0.08);

    --font-display: "Geist", "Inter", "Helvetica Neue", sans-serif;
    --font-body: "Geist", "Inter", "Helvetica Neue", sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, monospace;

    --section-pad-y: 160px;
}

@media (max-width: 768px) {
    :root { --section-pad-y: 80px; }
}

/* -------------------------------------------------------------
   03. BASE OVERRIDES
   ------------------------------------------------------------- */
html, body {
    background: var(--ink) !important;
}
body {
    font-family: var(--font-body);
    color: var(--paper);
    font-size: 17px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    color: var(--paper);
    letter-spacing: -0.04em;
    text-transform: none;
}
p { color: var(--paper); }
a { color: inherit; }
img { display: block; max-width: 100%; }

/* Kill any leftover blob shape backgrounds from style.css */
.bg_shape1::after,
.bg_shape2::after,
.bg_shape3::after,
.bg_shape4::after { display: none !important; }

/* Hide preloader spinner styling we no longer want */
.loader-wrapper { background: var(--ink) !important; }

/* -------------------------------------------------------------
   04. LAYOUT PRIMITIVES
   ------------------------------------------------------------- */
.nrg-section {
    position: relative;
    padding: var(--section-pad-y) 0;
    border-top: 1px solid var(--rule);
}
.nrg-section:first-of-type { border-top: 0; }

.nrg-container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
}
@media (max-width: 768px) {
    .nrg-container { padding: 0 24px; }
}

.nrg-section__label {
    position: absolute;
    top: 32px;
    right: 40px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
}
@media (max-width: 768px) {
    .nrg-section__label { right: 24px; top: 24px; }
}

/* -------------------------------------------------------------
   05. UTILITIES
   ------------------------------------------------------------- */
.nrg-dotgrid {
    background-image: radial-gradient(circle, rgba(250,250,247,0.12) 1px, transparent 1px);
    background-size: 24px 24px;
}
.nrg-label {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
}
.nrg-rule {
    height: 1px;
    background: var(--rule);
    border: 0;
    margin: 0;
}

/* -------------------------------------------------------------
   06. BUTTONS
   ------------------------------------------------------------- */
.nrg-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 24px;
    border: 0;
    border-radius: 0;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease, transform 150ms ease;
    text-decoration: none;
}
.nrg-btn--filled {
    background: var(--accent);
    color: var(--ink);
}
.nrg-btn--filled:hover {
    background: #FF6F3D;
    color: var(--ink);
}
.nrg-btn--ghost {
    background: transparent;
    color: var(--paper);
    padding-left: 0;
    padding-right: 0;
    position: relative;
}
.nrg-btn--ghost::after {
    content: "";
    position: absolute;
    left: 0;
    right: 100%;
    bottom: 6px;
    height: 1px;
    background: var(--paper);
    transition: right 250ms ease;
}
.nrg-btn--ghost:hover {
    color: var(--paper);
}
.nrg-btn--ghost:hover::after {
    right: 0;
}
.nrg-btn__arrow {
    width: 14px;
    height: 14px;
}

/* -------------------------------------------------------------
   07. REVEAL (set in Task 12)
   ------------------------------------------------------------- */
[data-reveal] {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 400ms ease, transform 400ms ease;
}
[data-reveal].is-revealed {
    opacity: 1;
    transform: translateY(0);
}
```

- [ ] **Step 2: Wire `refresh.css` into `index.html` head**

Open `index.html`. Find the existing CSS link block (lines 13-23) and add `refresh.css` as the **last** stylesheet, after `modal.css`.

Modify line 23 area — locate:

```html
		<link rel="stylesheet" href="assets/css/modal.css">
	</head>
```

Replace with:

```html
		<link rel="stylesheet" href="assets/css/modal.css">
		<link rel="stylesheet" href="assets/css/refresh.css">
	</head>
```

- [ ] **Step 3: Verify foundations in browser**

Open the site:
```bash
open "/Users/hamadgul/Projects/NeuraGul - Website/index.html"
```

Expected:
- Page background is now warm near-black (`#0A0A0B`), not white
- Text is warm off-white
- Existing layouts still mostly visible but recolored — this is correct; sections get rewritten in later tasks
- Browser DevTools → Network: confirm `refresh.css` loads with status 200

- [ ] **Step 4: Commit foundations**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
git add assets/css/refresh.css index.html
git commit -m "Add refresh.css foundations (tokens, fonts, buttons)"
```

---

## Task 2: Asset cleanup (drop unused CSS + JS + dark-mode toggle)

**Files:**
- Modify: `index.html` (head links, body script tags, dark-mode button)

- [ ] **Step 1: Drop 5 unused CSS link tags**

In `index.html`, locate the `<head>` link block (around lines 13-23). Remove these five lines (DO NOT remove `bootstrap.min.css`, `responsive.css`, `style.css`, `modal.css`, or `refresh.css` — those stay):

```html
		<link rel="stylesheet" href="assets/css/owl.carousel.min.css">
		<link rel="stylesheet" href="assets/css/owl.theme.default.min.css">
		<link rel="stylesheet" href="assets/css/flipdown.css">
		<link rel="stylesheet" href="assets/css/lightbox.min.css">
		<link rel="stylesheet" href="assets/css/animate.min.css">
		<link rel="stylesheet" href="assets/css/dark-mode.css">
```

Final head CSS list should be (in order):
```html
		<link rel="stylesheet" href="assets/css/bootstrap.min.css">
		<link rel="stylesheet" href="assets/font-awesome/css/all.min.css">
		<link rel="stylesheet" href="assets/css/responsive.css">
		<link rel="stylesheet" href="assets/css/style.css">
		<link rel="stylesheet" href="assets/css/modal.css">
		<link rel="stylesheet" href="assets/css/refresh.css">
```

- [ ] **Step 2: Drop 7 unused script tags**

In `index.html`, scroll to the script block before `</body>`. Remove these `<script src="...">` lines:

- `assets/js/wow.min.js`
- `assets/js/owl.carousel.min.js`
- `assets/js/flipdown.js`
- `assets/js/lightbox.min.js`
- `assets/js/magiccursor.js`
- `assets/js/counterup.js`
- `assets/js/jquery.waypoints.min.js`

Keep: `jquery-3.6.0.min.js`, `popper.min.js`, `bootstrap.bundle.min.js`, `SmoothScroll.js`, `jquery.nav.js`, `script.js`.

- [ ] **Step 3: Remove the `verson_mood` dark-mode toggle button**

In `index.html`, search for `verson_mood`. There will be one `<button>` (or `<div>`) wrapper. Delete that entire element.

If `script.js` references the toggle and now errors in console, comment out the offending lines in `script.js` (or wrap with `if (document.getElementById('mode-icon'))` guard). Inspect the console after step 4 — fix only if there's a real error.

- [ ] **Step 4: Verify cleanup in browser**

Reload `index.html`.

Expected:
- No layout regression beyond what was already broken in Task 1's checkpoint
- Browser DevTools → Console: no 404s for the dropped CSS/JS files
- Network tab: only the kept CSS and JS files load

- [ ] **Step 5: Commit cleanup**

```bash
git add index.html
git commit -m "Drop unused template CSS/JS and dark-mode toggle"
```

---

## Task 3: Navigation rewrite

**Files:**
- Modify: `index.html` (navbar markup, lines ~37-78)
- Modify: `assets/css/refresh.css` (append nav styles)

- [ ] **Step 1: Replace navbar HTML**

In `index.html`, locate the `<div class="navbar-section">` block (around line 37) through its closing `</div>` (around line 78). Replace the entire block with:

```html
		<header class="nrg-nav" id="nrg-nav">
			<div class="nrg-container nrg-nav__inner">
				<a href="#home" class="nrg-nav__brand">NeuraGul</a>
				<nav class="nrg-nav__links" aria-label="Primary">
					<a href="#service">Services</a>
					<a href="#portfolio">Work</a>
					<a href="#team">Team</a>
					<a href="#contact">Contact</a>
				</nav>
				<a href="#contact" class="nrg-btn nrg-btn--filled nrg-nav__cta">
					Start a project
					<svg class="nrg-btn__arrow" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"/></svg>
				</a>
				<button class="nrg-nav__toggle" type="button" aria-label="Toggle menu" aria-controls="nrg-nav-mobile" aria-expanded="false">
					<span></span><span></span><span></span>
				</button>
			</div>
			<div class="nrg-nav__mobile" id="nrg-nav-mobile" hidden>
				<a href="#service">Services</a>
				<a href="#portfolio">Work</a>
				<a href="#team">Team</a>
				<a href="#contact">Contact</a>
			</div>
		</header>
```

- [ ] **Step 2: Append nav CSS to `refresh.css`**

Append this block to the end of `assets/css/refresh.css`:

```css
/* -------------------------------------------------------------
   08. NAVIGATION
   ------------------------------------------------------------- */
.nrg-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: transparent;
    transition: background-color 200ms ease, border-color 200ms ease;
    border-bottom: 1px solid transparent;
}
.nrg-nav.is-scrolled {
    background: rgba(10, 10, 11, 0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-bottom-color: var(--rule);
}
.nrg-nav__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    padding-top: 20px;
    padding-bottom: 20px;
}
.nrg-nav__brand {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--paper);
    text-decoration: none;
}
.nrg-nav__links {
    display: flex;
    gap: 32px;
    margin-left: auto;
}
.nrg-nav__links a {
    font-family: var(--font-mono);
    font-size: 13px;
    letter-spacing: 0.04em;
    text-transform: lowercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 150ms ease;
}
.nrg-nav__links a:hover { color: var(--paper); }
.nrg-nav__cta { padding: 10px 16px; font-size: 12px; }
.nrg-nav__toggle {
    display: none;
    width: 32px;
    height: 32px;
    background: transparent;
    border: 0;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
.nrg-nav__toggle span {
    display: block;
    width: 22px;
    height: 1px;
    background: var(--paper);
}
.nrg-nav__mobile {
    display: none;
    flex-direction: column;
    gap: 8px;
    padding: 16px 40px 24px;
    background: var(--ink);
    border-top: 1px solid var(--rule);
}
.nrg-nav__mobile a {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--paper);
    text-decoration: none;
    padding: 8px 0;
    text-transform: lowercase;
}
.nrg-nav__mobile[hidden] { display: none; }

@media (max-width: 900px) {
    .nrg-nav__links, .nrg-nav__cta { display: none; }
    .nrg-nav__toggle { display: flex; }
    .nrg-nav__mobile { display: flex; }
    .nrg-nav__mobile[hidden] { display: none; }
}
```

- [ ] **Step 3: Add nav scroll + toggle behavior**

Append this script before the closing `</body>` tag in `index.html` (right after `script.js`):

```html
		<script>
			(function(){
				var nav = document.getElementById('nrg-nav');
				if (!nav) return;
				var sync = function(){ nav.classList.toggle('is-scrolled', window.scrollY > 40); };
				sync();
				window.addEventListener('scroll', sync, { passive: true });
				var toggle = nav.querySelector('.nrg-nav__toggle');
				var mobile = document.getElementById('nrg-nav-mobile');
				if (toggle && mobile) {
					toggle.addEventListener('click', function(){
						var open = !mobile.hasAttribute('hidden');
						if (open) { mobile.setAttribute('hidden', ''); toggle.setAttribute('aria-expanded', 'false'); }
						else { mobile.removeAttribute('hidden'); toggle.setAttribute('aria-expanded', 'true'); }
					});
					mobile.querySelectorAll('a').forEach(function(a){
						a.addEventListener('click', function(){ mobile.setAttribute('hidden', ''); toggle.setAttribute('aria-expanded', 'false'); });
					});
				}
			})();
		</script>
```

- [ ] **Step 4: Verify nav**

Reload `index.html`.

Expected:
- Top of page: transparent navbar with "NeuraGul" wordmark left, four lowercase mono links right, orange "Start a project" button
- Scroll down 60px: navbar gets dark background and hairline bottom border
- Resize browser to <900px: links and CTA disappear, hamburger appears; clicking opens mobile menu

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/refresh.css
git commit -m "Rewrite navigation as fixed editorial header"
```

---

## Task 4: Hero rewrite

**Files:**
- Modify: `index.html` (hero section, lines ~83-104)
- Modify: `assets/css/refresh.css` (append hero styles)

- [ ] **Step 1: Replace hero HTML**

In `index.html`, locate `<section class="home" id="home">` (around line 83) through its closing `</section>` (around line 104). Replace with:

```html
		<section class="nrg-section nrg-hero" id="home">
			<div class="nrg-hero__grid nrg-dotgrid" aria-hidden="true"></div>
			<div class="nrg-container nrg-hero__inner">
				<span class="nrg-section__label">— 001 / 2026</span>
				<h1 class="nrg-hero__headline" data-reveal>
					Software,<br>
					shipped<br>
					with <em>intent.</em>
				</h1>
				<div class="nrg-hero__foot" data-reveal>
					<p class="nrg-hero__sub">We partner with founders and engineering teams to design, build, and operate production software that earns its keep.</p>
					<div class="nrg-hero__cta">
						<a href="#contact" class="nrg-btn nrg-btn--filled">
							Start a project
							<svg class="nrg-btn__arrow" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"/></svg>
						</a>
						<a href="#portfolio" class="nrg-btn nrg-btn--ghost">View work</a>
					</div>
				</div>
			</div>
		</section>
```

(Per spec: the trusted-by strip is omitted until real client names are supplied.)

- [ ] **Step 2: Append hero CSS to `refresh.css`**

```css
/* -------------------------------------------------------------
   09. HERO
   ------------------------------------------------------------- */
.nrg-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 140px;
    padding-bottom: 80px;
    border-top: 0;
    overflow: hidden;
}
.nrg-hero__grid {
    position: absolute;
    top: 0;
    right: 0;
    width: 55%;
    height: 70%;
    pointer-events: none;
    -webkit-mask-image: radial-gradient(ellipse at top right, #000 10%, transparent 70%);
            mask-image: radial-gradient(ellipse at top right, #000 10%, transparent 70%);
}
.nrg-hero__inner {
    position: relative;
    width: 100%;
}
.nrg-hero__headline {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(56px, 9vw, 132px);
    line-height: 0.95;
    letter-spacing: -0.04em;
    color: var(--paper);
    margin: 0 0 64px;
    max-width: 14ch;
}
.nrg-hero__headline em {
    font-style: normal;
    color: var(--accent);
}
.nrg-hero__foot {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: end;
    border-top: 1px solid var(--rule);
    padding-top: 32px;
}
.nrg-hero__sub {
    max-width: 46ch;
    color: var(--muted);
    font-size: 17px;
    margin: 0;
}
.nrg-hero__cta {
    display: flex;
    gap: 32px;
    justify-content: flex-end;
    align-items: center;
}
@media (max-width: 768px) {
    .nrg-hero { padding-top: 120px; min-height: auto; }
    .nrg-hero__headline { margin-bottom: 40px; }
    .nrg-hero__foot { grid-template-columns: 1fr; gap: 32px; }
    .nrg-hero__cta { justify-content: flex-start; flex-wrap: wrap; }
}
```

- [ ] **Step 3: Verify hero**

Reload `index.html`. Expected:
- Headline reads "Software, / shipped / with intent." across three lines; "intent." is orange
- Headline scales smoothly when resizing the window
- Below the headline: hairline + sub-copy (left) + two buttons (right) on desktop
- Top-right corner: faint dot-grid texture fading out
- Top-right corner of section: small mono label `— 001 / 2026`
- Mobile (375px): headline shrinks, sub + buttons stack vertically

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/refresh.css
git commit -m "Rewrite hero with editorial headline and dot-grid"
```

---

## Task 5: Remove countdown, pricing, FAQ, blog sections

**Files:**
- Modify: `index.html` (delete 4 sections)

- [ ] **Step 1: Delete `#countdown` section**

In `index.html`, locate `<section class="countdown-section section_padding" id="countdown">` (around line 432). Delete from the comment block above it (`<!----- countdown ----->`) through and including the `</section>` tag (around line 442).

- [ ] **Step 2: Delete `#pricing` section**

Locate `<section class="pricing section_padding pb_0" id="pricing">` (around line 551). Delete from the preceding comment block through the matching `</section>` (around line 677).

- [ ] **Step 3: Delete `#faq` section**

Locate `<section class="faq-section section_padding pb_0" id="faq">` (around line 683). Delete from the preceding comment block through the matching `</section>` (around line 791).

- [ ] **Step 4: Delete `#blog` section**

Locate `<section class="blogs section_padding pb_0" id="blog">` (around line 874). Delete from the preceding comment block through the matching `</section>` (around line 931).

- [ ] **Step 5: Verify page flow**

Reload `index.html`. Scroll from hero down. Expected section order:
1. Hero
2. About (still old layout — will be rewritten in Task 6)
3. Services (still old)
4. Portfolio (still old)
5. Work Process (still old)
6. Team (still old)
7. Contact (still old)
8. Footer

No countdown timer, no pricing cards, no FAQ accordion, no blog teasers anywhere.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "Remove countdown, pricing, FAQ, and blog sections"
```

---

## Task 6: About section rewrite

**Files:**
- Modify: `index.html` (about section, ~lines 109-141)
- Modify: `assets/css/refresh.css` (append about styles)

- [ ] **Step 1: Replace about HTML**

Locate `<section class="about section_padding pb_0 bg_shape1" id="about">` and its closing `</section>`. Replace the entire section with:

```html
		<section class="nrg-section nrg-about" id="about">
			<div class="nrg-container">
				<span class="nrg-section__label">— 002 / WHO WE ARE</span>
				<div class="nrg-about__grid">
					<h2 class="nrg-about__statement" data-reveal>
						NeuraGul builds production software for teams who want a partner, not a vendor — engineering work that earns trust line by line.
					</h2>
					<ul class="nrg-about__stats" data-reveal>
						<li>
							<span class="nrg-about__value">Ship fast</span>
							<span class="nrg-label">Cadence over ceremony</span>
						</li>
						<li>
							<span class="nrg-about__value">Write less</span>
							<span class="nrg-label">Code is a liability</span>
						</li>
						<li>
							<span class="nrg-about__value">Stay human</span>
							<span class="nrg-label">Teams, not contractors</span>
						</li>
					</ul>
				</div>
			</div>
		</section>
```

(Per spec: principle statements are the default; swap to real numerical stats once user supplies them.)

- [ ] **Step 2: Append about CSS**

```css
/* -------------------------------------------------------------
   10. ABOUT
   ------------------------------------------------------------- */
.nrg-about__grid {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: 80px;
    align-items: start;
    margin-top: 24px;
}
.nrg-about__statement {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.2vw, 44px);
    line-height: 1.15;
    letter-spacing: -0.03em;
    color: var(--paper);
    margin: 0;
}
.nrg-about__stats {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--rule);
}
.nrg-about__stats li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 32px;
    align-items: baseline;
    padding: 28px 0;
    border-bottom: 1px solid var(--rule);
}
.nrg-about__value {
    font-family: var(--font-display);
    font-size: clamp(36px, 4vw, 56px);
    line-height: 1;
    letter-spacing: -0.04em;
    color: var(--paper);
}
@media (max-width: 768px) {
    .nrg-about__grid { grid-template-columns: 1fr; gap: 48px; }
    .nrg-about__stats li { grid-template-columns: 1fr; gap: 8px; }
}
```

- [ ] **Step 3: Verify**

Reload. Expected: about section now shows large statement-sentence on the left, three stacked principle rows on the right separated by hairlines. No image, no blob shape, no "Read More" button.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/refresh.css
git commit -m "Rewrite about as editorial statement + principle stack"
```

---

## Task 7: Services section rewrite

**Files:**
- Modify: `index.html` (services section, ~lines 147-247)
- Modify: `assets/css/refresh.css` (append services styles)

- [ ] **Step 1: Replace services HTML**

Locate `<section class="service-section section_padding pb_0" id="service">`. Replace through its `</section>` with:

```html
		<section class="nrg-section nrg-services" id="service">
			<div class="nrg-container">
				<span class="nrg-section__label">— 003 / WHAT WE DO</span>
				<header class="nrg-services__head">
					<h2 class="nrg-services__title" data-reveal>Quality & innovative solutions, end to end.</h2>
				</header>
				<ul class="nrg-services__list">
					<li class="nrg-service" data-reveal>
						<span class="nrg-service__num">01.</span>
						<h3 class="nrg-service__title">Custom Software Development</h3>
						<p class="nrg-service__desc">Tailored software designed to meet your business requirements and scale with growth.</p>
						<span class="nrg-service__arrow" aria-hidden="true">→</span>
					</li>
					<li class="nrg-service" data-reveal>
						<span class="nrg-service__num">02.</span>
						<h3 class="nrg-service__title">Web & Mobile Development</h3>
						<p class="nrg-service__desc">Responsive sites and applications built with the technologies your team can maintain.</p>
						<span class="nrg-service__arrow" aria-hidden="true">→</span>
					</li>
					<li class="nrg-service" data-reveal>
						<span class="nrg-service__num">03.</span>
						<h3 class="nrg-service__title">Cloud Solutions</h3>
						<p class="nrg-service__desc">Scalable, secure cloud infrastructure that stays predictable as your traffic grows.</p>
						<span class="nrg-service__arrow" aria-hidden="true">→</span>
					</li>
					<li class="nrg-service" data-reveal>
						<span class="nrg-service__num">04.</span>
						<h3 class="nrg-service__title">IT Infrastructure</h3>
						<p class="nrg-service__desc">Server, network, firewall, and security work for businesses that need uptime.</p>
						<span class="nrg-service__arrow" aria-hidden="true">→</span>
					</li>
					<li class="nrg-service" data-reveal>
						<span class="nrg-service__num">05.</span>
						<h3 class="nrg-service__title">AI Consulting & Development</h3>
						<p class="nrg-service__desc">Strategic integration and custom models that solve a specific business problem.</p>
						<span class="nrg-service__arrow" aria-hidden="true">→</span>
					</li>
					<li class="nrg-service" data-reveal>
						<span class="nrg-service__num">06.</span>
						<h3 class="nrg-service__title">Data Intelligence</h3>
						<p class="nrg-service__desc">Analytics, visualization, and migration work that turns data into a decision.</p>
						<span class="nrg-service__arrow" aria-hidden="true">→</span>
					</li>
				</ul>
			</div>
		</section>
```

- [ ] **Step 2: Append services CSS**

```css
/* -------------------------------------------------------------
   11. SERVICES
   ------------------------------------------------------------- */
.nrg-services__head { margin-bottom: 80px; max-width: 24ch; }
.nrg-services__title {
    font-family: var(--font-display);
    font-size: clamp(40px, 5vw, 72px);
    line-height: 1.05;
    letter-spacing: -0.04em;
    margin: 0;
}
.nrg-services__list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid var(--rule);
}
.nrg-service {
    position: relative;
    display: grid;
    grid-template-columns: 80px 1fr 1.2fr 40px;
    gap: 32px;
    align-items: center;
    padding: 36px 24px 36px 0;
    border-top: 1px solid var(--rule);
    transition: background-color 200ms ease, padding-left 200ms ease;
    cursor: pointer;
}
.nrg-service::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--accent-soft);
    opacity: 0;
    transition: opacity 200ms ease;
    pointer-events: none;
}
.nrg-service:hover { padding-left: 16px; }
.nrg-service:hover::before { opacity: 1; }
.nrg-service__num {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--muted);
    position: relative;
    z-index: 1;
}
.nrg-service__title {
    font-family: var(--font-display);
    font-size: clamp(22px, 2.4vw, 32px);
    letter-spacing: -0.03em;
    margin: 0;
    color: var(--paper);
    position: relative;
    z-index: 1;
    transition: transform 200ms ease;
}
.nrg-service:hover .nrg-service__title { transform: translateX(8px); }
.nrg-service__desc {
    color: var(--muted);
    margin: 0;
    font-size: 16px;
    position: relative;
    z-index: 1;
}
.nrg-service__arrow {
    font-family: var(--font-mono);
    font-size: 22px;
    color: var(--muted);
    text-align: right;
    transition: color 200ms ease, transform 200ms ease;
    position: relative;
    z-index: 1;
}
.nrg-service:hover .nrg-service__arrow {
    color: var(--accent);
    transform: translateX(6px);
}

@media (max-width: 900px) {
    .nrg-service {
        grid-template-columns: 60px 1fr 32px;
        grid-template-areas: "num title arrow" "num desc arrow";
        row-gap: 8px;
        padding: 28px 16px 28px 0;
    }
    .nrg-service__num { grid-area: num; }
    .nrg-service__title { grid-area: title; }
    .nrg-service__desc { grid-area: desc; }
    .nrg-service__arrow { grid-area: arrow; align-self: center; }
}
```

- [ ] **Step 3: Verify**

Reload. Expected: six full-width rows separated by hairlines. Each row: `01.` mono · big title · description · `→` arrow. Hovering a row: row background tints soft orange, title nudges right, arrow turns orange and shifts right. No SVG icons, no card backgrounds.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/refresh.css
git commit -m "Rewrite services as full-width hairline rows"
```

---

## Task 8: Portfolio section rewrite

**Files:**
- Modify: `index.html` (portfolio section, ~lines 253-425)
- Modify: `assets/css/refresh.css` (append portfolio styles)

- [ ] **Step 1: Replace portfolio HTML**

Locate `<section class="portfolio-section section_padding" id="portfolio">`. Replace through its `</section>` with:

```html
		<section class="nrg-section nrg-work" id="portfolio">
			<div class="nrg-container">
				<span class="nrg-section__label">— 004 / SELECTED WORK</span>
				<header class="nrg-work__head">
					<h2 class="nrg-work__title" data-reveal>Recent case studies.</h2>
					<p class="nrg-work__sub" data-reveal>A small selection of the work we've shipped this year.</p>
				</header>
				<div class="nrg-work__grid">
					<article class="nrg-work__item nrg-work__item--wide" data-reveal>
						<div class="nrg-work__img"><img src="assets/img/portfolio/1.jpg" alt=""></div>
						<div class="nrg-work__meta">
							<span class="nrg-label">2025 · WEB · CASE STUDY</span>
							<h3 class="nrg-work__name">Distribution platform rebuild</h3>
							<p class="nrg-work__desc">Replaced a legacy ordering stack with a modern queue-backed system that scaled to 5× volume.</p>
						</div>
					</article>
					<article class="nrg-work__item" data-reveal>
						<div class="nrg-work__img"><img src="assets/img/portfolio/2.jpg" alt=""></div>
						<div class="nrg-work__meta">
							<span class="nrg-label">2025 · MOBILE · CASE STUDY</span>
							<h3 class="nrg-work__name">On-demand operations app</h3>
							<p class="nrg-work__desc">Native iOS and Android tooling for a field-services team.</p>
						</div>
					</article>
					<article class="nrg-work__item" data-reveal>
						<div class="nrg-work__img"><img src="assets/img/portfolio/3.jpg" alt=""></div>
						<div class="nrg-work__meta">
							<span class="nrg-label">2024 · AI · CASE STUDY</span>
							<h3 class="nrg-work__name">Document intelligence pipeline</h3>
							<p class="nrg-work__desc">Built a model-backed extraction system that cut review time by 70%.</p>
						</div>
					</article>
					<article class="nrg-work__item nrg-work__item--wide" data-reveal>
						<div class="nrg-work__img"><img src="assets/img/portfolio/4.jpg" alt=""></div>
						<div class="nrg-work__meta">
							<span class="nrg-label">2024 · INFRA · CASE STUDY</span>
							<h3 class="nrg-work__name">Multi-region cloud migration</h3>
							<p class="nrg-work__desc">Moved a SaaS product off a single-region monolith with zero downtime.</p>
						</div>
					</article>
					<article class="nrg-work__item nrg-work__item--full" data-reveal>
						<div class="nrg-work__img"><img src="assets/img/portfolio/5.jpg" alt=""></div>
						<div class="nrg-work__meta">
							<span class="nrg-label">2024 · DATA · CASE STUDY</span>
							<h3 class="nrg-work__name">Analytics warehouse and dashboards</h3>
							<p class="nrg-work__desc">A founder-friendly data layer with self-serve dashboards for non-technical teams.</p>
						</div>
					</article>
				</div>
			</div>
		</section>
```

(Copy is a working proposal — the user can adjust project names, descriptions, and tags later. Asymmetric layout: rows 1+2 form a 7/5 row, rows 3+4 form a 5/7 row, row 5 spans full width.)

- [ ] **Step 2: Append portfolio CSS**

```css
/* -------------------------------------------------------------
   12. WORK
   ------------------------------------------------------------- */
.nrg-work__head {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 48px;
    margin-bottom: 64px;
}
.nrg-work__title {
    font-family: var(--font-display);
    font-size: clamp(40px, 5vw, 72px);
    line-height: 1.05;
    letter-spacing: -0.04em;
    margin: 0;
    flex: 1;
}
.nrg-work__sub {
    color: var(--muted);
    max-width: 36ch;
    margin: 0;
    flex: 0 0 auto;
}
.nrg-work__grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 48px 32px;
}
.nrg-work__item {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-decoration: none;
    color: inherit;
}
/* Alternating row widths: row 1 = 7/5, row 2 = 5/7, row 3 = full */
.nrg-work__item:nth-child(1) { grid-column: 1 / 8; }
.nrg-work__item:nth-child(2) { grid-column: 8 / 13; }
.nrg-work__item:nth-child(3) { grid-column: 1 / 6; }
.nrg-work__item:nth-child(4) { grid-column: 6 / 13; }
.nrg-work__item--full { grid-column: 1 / -1; }
.nrg-work__img {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: var(--surface);
}
.nrg-work__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1), filter 300ms ease;
    filter: brightness(0.8);
}
.nrg-work__item:hover .nrg-work__img img {
    transform: scale(1.03);
    filter: brightness(1);
}
.nrg-work__meta { display: flex; flex-direction: column; gap: 8px; }
.nrg-work__name {
    font-family: var(--font-display);
    font-size: clamp(22px, 2.2vw, 28px);
    letter-spacing: -0.03em;
    margin: 0;
    transition: transform 250ms ease;
}
.nrg-work__item:hover .nrg-work__name { transform: translateX(4px); }
.nrg-work__desc {
    color: var(--muted);
    margin: 0;
    font-size: 15px;
    max-width: 48ch;
}

@media (max-width: 900px) {
    .nrg-work__head { flex-direction: column; align-items: start; }
    .nrg-work__grid { grid-template-columns: 1fr; gap: 48px; }
    .nrg-work__item,
    .nrg-work__item--full,
    .nrg-work__item:nth-child(1),
    .nrg-work__item:nth-child(2),
    .nrg-work__item:nth-child(3),
    .nrg-work__item:nth-child(4) { grid-column: 1 / -1; }
}
```

- [ ] **Step 3: Verify**

Reload. Expected: section header has title left, sub-copy right. Below: asymmetric grid with 5 project cards. Row 1: wide (image 1) + narrow (image 2). Row 2: narrow (image 3) + wide (image 4). Row 3: full-width (image 5). Each image slightly darkened by default. Hovering: image brightens + slight zoom, project name shifts right. No carousel dots, no lightbox icons.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/refresh.css
git commit -m "Rewrite portfolio as asymmetric editorial grid"
```

---

## Task 9: Work process section rewrite

**Files:**
- Modify: `index.html` (work section, ~lines 449-508)
- Modify: `assets/css/refresh.css` (append process styles)

- [ ] **Step 1: Replace work process HTML**

Locate `<section class="work-section section_padding pb_0" id="work_process">`. Replace through its `</section>` with:

```html
		<section class="nrg-section nrg-process" id="work_process">
			<div class="nrg-container">
				<span class="nrg-section__label">— 005 / HOW WE WORK</span>
				<header class="nrg-process__head">
					<h2 class="nrg-process__title" data-reveal>A small, deliberate process.</h2>
				</header>
				<ol class="nrg-process__list">
					<li class="nrg-chapter" data-reveal>
						<span class="nrg-chapter__num" aria-hidden="true">01</span>
						<div class="nrg-chapter__body">
							<h3 class="nrg-chapter__title">Discover</h3>
							<p class="nrg-chapter__desc">We start with the actual problem. A short engagement to map the system, talk to your team, and write down what we're really trying to ship.</p>
						</div>
					</li>
					<li class="nrg-chapter" data-reveal>
						<span class="nrg-chapter__num" aria-hidden="true">02</span>
						<div class="nrg-chapter__body">
							<h3 class="nrg-chapter__title">Design & build</h3>
							<p class="nrg-chapter__desc">Tight feedback loops with working software. We ship something usable in week one and iterate from there.</p>
						</div>
					</li>
					<li class="nrg-chapter" data-reveal>
						<span class="nrg-chapter__num" aria-hidden="true">03</span>
						<div class="nrg-chapter__body">
							<h3 class="nrg-chapter__title">Operate</h3>
							<p class="nrg-chapter__desc">Software in production isn't done. We support what we ship, fix what breaks, and hand off only when your team is ready.</p>
						</div>
					</li>
				</ol>
			</div>
		</section>
```

- [ ] **Step 2: Append process CSS**

```css
/* -------------------------------------------------------------
   13. PROCESS
   ------------------------------------------------------------- */
.nrg-process__head { margin-bottom: 80px; max-width: 22ch; }
.nrg-process__title {
    font-family: var(--font-display);
    font-size: clamp(40px, 5vw, 72px);
    line-height: 1.05;
    letter-spacing: -0.04em;
    margin: 0;
}
.nrg-process__list {
    list-style: none;
    margin: 0;
    padding: 0;
}
.nrg-chapter {
    position: relative;
    display: grid;
    grid-template-columns: minmax(160px, 1fr) 2fr;
    gap: 48px;
    align-items: start;
    padding: 64px 0;
    border-top: 1px solid var(--rule);
}
.nrg-chapter:last-child { border-bottom: 1px solid var(--rule); }
.nrg-chapter__num {
    font-family: var(--font-display);
    font-size: clamp(120px, 18vw, 260px);
    line-height: 0.85;
    letter-spacing: -0.06em;
    color: var(--accent-ghost);
    user-select: none;
}
.nrg-chapter__title {
    font-family: var(--font-display);
    font-size: clamp(28px, 3vw, 42px);
    letter-spacing: -0.03em;
    margin: 0 0 16px;
}
.nrg-chapter__desc {
    color: var(--muted);
    margin: 0;
    font-size: 17px;
    max-width: 52ch;
}
@media (max-width: 768px) {
    .nrg-chapter { grid-template-columns: 1fr; gap: 16px; padding: 48px 0; }
}
```

- [ ] **Step 3: Verify**

Reload. Expected: three chapters stacked, hairline dividers between them. Each chapter: massive ghosted orange number on the left, title + description on the right. Numbers are huge but very faint.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/refresh.css
git commit -m "Rewrite process as numbered editorial chapters"
```

---

## Task 10: Team section rewrite

**Files:**
- Modify: `index.html` (team section, ~lines 512-544)
- Modify: `assets/css/refresh.css` (append team styles)

- [ ] **Step 1: Replace team HTML**

Locate `<section class="member-section section_padding pb_0" id="team">`. Replace through its `</section>` with:

```html
		<section class="nrg-section nrg-team" id="team">
			<div class="nrg-container">
				<span class="nrg-section__label">— 006 / TEAM</span>
				<header class="nrg-team__head">
					<h2 class="nrg-team__title" data-reveal>The people behind the work.</h2>
				</header>
				<ul class="nrg-team__grid">
					<li class="nrg-member" data-reveal>
						<div class="nrg-member__photo"><img src="assets/img/member/1.png" alt=""></div>
						<h3 class="nrg-member__name">Hamad Gul</h3>
						<span class="nrg-label">Founder · Engineering</span>
					</li>
					<li class="nrg-member" data-reveal>
						<div class="nrg-member__photo"><img src="assets/img/member/2.png" alt=""></div>
						<h3 class="nrg-member__name">Team member</h3>
						<span class="nrg-label">Senior Engineer</span>
					</li>
					<li class="nrg-member" data-reveal>
						<div class="nrg-member__photo"><img src="assets/img/member/3.png" alt=""></div>
						<h3 class="nrg-member__name">Team member</h3>
						<span class="nrg-label">Product Designer</span>
					</li>
					<li class="nrg-member" data-reveal>
						<div class="nrg-member__photo"><img src="assets/img/member/4.png" alt=""></div>
						<h3 class="nrg-member__name">Team member</h3>
						<span class="nrg-label">AI Engineer</span>
					</li>
				</ul>
			</div>
		</section>
```

(Names other than `Hamad Gul` are working placeholders — replace with real team members.)

- [ ] **Step 2: Append team CSS**

```css
/* -------------------------------------------------------------
   14. TEAM
   ------------------------------------------------------------- */
.nrg-team__head { margin-bottom: 80px; max-width: 22ch; }
.nrg-team__title {
    font-family: var(--font-display);
    font-size: clamp(40px, 5vw, 72px);
    line-height: 1.05;
    letter-spacing: -0.04em;
    margin: 0;
}
.nrg-team__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}
.nrg-member { display: flex; flex-direction: column; gap: 16px; }
.nrg-member__photo {
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background: var(--surface);
}
.nrg-member__photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) brightness(0.85);
    transition: filter 300ms ease;
}
.nrg-member:hover .nrg-member__photo img { filter: grayscale(0) brightness(1); }
.nrg-member__name {
    font-family: var(--font-display);
    font-size: 18px;
    letter-spacing: -0.02em;
    margin: 0;
    transition: color 200ms ease;
}
.nrg-member:hover .nrg-member__name { color: var(--accent); }
@media (max-width: 768px) {
    .nrg-team__grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
```

- [ ] **Step 3: Verify**

Reload. Expected: four portraits side-by-side (2x2 on mobile), all grayscale by default. Below each: name + role label in mono. Hovering: photo returns to color, name turns orange.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/refresh.css
git commit -m "Rewrite team as grayscale contact sheet"
```

---

## Task 11: Contact section rewrite

**Files:**
- Modify: `index.html` (contact section, ~lines 938-998)
- Modify: `assets/css/refresh.css` (append contact styles)

- [ ] **Step 1: Replace contact HTML**

Locate `<section class="contact section_padding" id="contact">`. Replace through its `</section>` with:

```html
		<section class="nrg-section nrg-contact" id="contact">
			<div class="nrg-container">
				<span class="nrg-section__label">— 007 / GET IN TOUCH</span>
				<div class="nrg-contact__grid">
					<div class="nrg-contact__lead">
						<h2 class="nrg-contact__title" data-reveal>Let's build<br>something.</h2>
						<form class="nrg-form" action="assets/contact.php" method="POST" data-reveal>
							<div class="nrg-form__row">
								<label class="nrg-field">
									<span class="nrg-label">Name</span>
									<input type="text" name="name" required>
								</label>
								<label class="nrg-field">
									<span class="nrg-label">Email</span>
									<input type="email" name="email" required>
								</label>
							</div>
							<label class="nrg-field">
								<span class="nrg-label">Project type</span>
								<select name="project_type">
									<option>Custom software</option>
									<option>Web / mobile</option>
									<option>AI / data</option>
									<option>Cloud / infrastructure</option>
									<option>Something else</option>
								</select>
							</label>
							<label class="nrg-field">
								<span class="nrg-label">Message</span>
								<textarea name="message" rows="5" required></textarea>
							</label>
							<button type="submit" class="nrg-btn nrg-btn--filled">
								Send
								<svg class="nrg-btn__arrow" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"/></svg>
							</button>
						</form>
					</div>
					<aside class="nrg-contact__aside" data-reveal>
						<dl class="nrg-meta">
							<div class="nrg-meta__row">
								<dt class="nrg-label">Email</dt>
								<dd>hello@neuragul.com</dd>
							</div>
							<div class="nrg-meta__row">
								<dt class="nrg-label">Based in</dt>
								<dd>Remote · US East</dd>
							</div>
							<div class="nrg-meta__row">
								<dt class="nrg-label">Response time</dt>
								<dd>Within 24 hours</dd>
							</div>
						</dl>
						<p class="nrg-contact__note">We reply to every inquiry, whether or not we're a fit.</p>
					</aside>
				</div>
			</div>
		</section>
```

(Email and location are working values — replace with real ones if different.)

- [ ] **Step 2: Append contact CSS**

```css
/* -------------------------------------------------------------
   15. CONTACT
   ------------------------------------------------------------- */
.nrg-contact__grid {
    display: grid;
    grid-template-columns: 7fr 5fr;
    gap: 80px;
    margin-top: 24px;
}
.nrg-contact__title {
    font-family: var(--font-display);
    font-size: clamp(48px, 6vw, 88px);
    line-height: 1;
    letter-spacing: -0.04em;
    margin: 0 0 56px;
}
.nrg-form { display: flex; flex-direction: column; gap: 28px; }
.nrg-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.nrg-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.nrg-field input,
.nrg-field select,
.nrg-field textarea {
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--rule);
    color: var(--paper);
    font: 400 17px/1.4 var(--font-body);
    padding: 12px 0;
    outline: none;
    transition: border-color 200ms ease;
}
.nrg-field input:focus,
.nrg-field select:focus,
.nrg-field textarea:focus { border-bottom-color: var(--accent); }
.nrg-field textarea { resize: vertical; min-height: 120px; }
.nrg-field select { background-image: linear-gradient(45deg, transparent 50%, var(--muted) 50%), linear-gradient(135deg, var(--muted) 50%, transparent 50%); background-position: calc(100% - 12px) center, calc(100% - 6px) center; background-size: 6px 6px, 6px 6px; background-repeat: no-repeat; padding-right: 28px; }

.nrg-contact__aside {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-self: end;
}
.nrg-meta {
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--rule);
}
.nrg-meta__row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 24px;
    padding: 20px 0;
    border-bottom: 1px solid var(--rule);
}
.nrg-meta__row dd {
    margin: 0;
    font-family: var(--font-display);
    font-size: 18px;
    color: var(--paper);
}
.nrg-contact__note { color: var(--muted); margin: 0; font-size: 14px; }

@media (max-width: 900px) {
    .nrg-contact__grid { grid-template-columns: 1fr; gap: 48px; }
    .nrg-form__row { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Verify**

Reload. Expected: contact section now shows large "Let's build something." headline + form (no background panels, bottom-rule inputs) on the left, contact metadata stacked on the right. Form fields show a subtle orange underline when focused. No `contact-bg1.jpg` / `contact-bg2.jpg` references.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/refresh.css
git commit -m "Rewrite contact as bottom-rule form + metadata aside"
```

---

## Task 12: Footer rewrite

**Files:**
- Modify: `index.html` (footer section, ~lines 1009-1080)
- Modify: `assets/css/refresh.css` (append footer styles)

- [ ] **Step 1: Replace footer HTML**

Locate `<section class="footer-section" id="footer">` (or `<footer>`). Replace through its closing tag with:

```html
		<footer class="nrg-foot" id="footer">
			<div class="nrg-container">
				<div class="nrg-foot__top">
					<div class="nrg-foot__brand">
						<a href="#home" class="nrg-foot__mark">NeuraGul</a>
						<p class="nrg-foot__tag">Software, shipped with intent.</p>
					</div>
					<div class="nrg-foot__cols">
						<div>
							<span class="nrg-label">Company</span>
							<ul><li><a href="#about">About</a></li><li><a href="#team">Team</a></li><li><a href="#contact">Contact</a></li></ul>
						</div>
						<div>
							<span class="nrg-label">Services</span>
							<ul><li><a href="#service">Custom software</a></li><li><a href="#service">Web & mobile</a></li><li><a href="#service">Cloud</a></li><li><a href="#service">AI</a></li></ul>
						</div>
						<div>
							<span class="nrg-label">Resources</span>
							<ul><li><a href="#portfolio">Work</a></li><li><a href="privacy-policy.html">Privacy</a></li></ul>
						</div>
					</div>
				</div>
				<hr class="nrg-rule">
				<div class="nrg-foot__bottom">
					<span>© 2026 NeuraGul Labs</span>
					<span class="nrg-label">v2026 · Made with intent</span>
				</div>
			</div>
		</footer>
```

- [ ] **Step 2: Append footer CSS**

```css
/* -------------------------------------------------------------
   16. FOOTER
   ------------------------------------------------------------- */
.nrg-foot {
    padding: 96px 0 48px;
    border-top: 1px solid var(--rule);
}
.nrg-foot__top {
    display: grid;
    grid-template-columns: 4fr 6fr;
    gap: 64px;
    margin-bottom: 64px;
}
.nrg-foot__mark {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: var(--paper);
    text-decoration: none;
}
.nrg-foot__tag { color: var(--muted); margin: 12px 0 0; max-width: 28ch; }
.nrg-foot__cols {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
}
.nrg-foot__cols ul { list-style: none; padding: 0; margin: 16px 0 0; display: flex; flex-direction: column; gap: 8px; }
.nrg-foot__cols a { color: var(--paper); text-decoration: none; font-size: 15px; transition: color 150ms ease; }
.nrg-foot__cols a:hover { color: var(--accent); }
.nrg-foot__bottom {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 24px;
    margin-top: 48px;
    color: var(--muted);
    font-size: 14px;
}
@media (max-width: 768px) {
    .nrg-foot__top { grid-template-columns: 1fr; gap: 48px; }
    .nrg-foot__cols { grid-template-columns: repeat(2, 1fr); }
    .nrg-foot__bottom { flex-direction: column; align-items: start; gap: 8px; }
}
```

- [ ] **Step 3: Verify**

Reload, scroll to bottom. Expected: footer with wordmark + tagline left, three columns of mono-labeled links right. Below: hairline. Below: copyright left, version label right.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/refresh.css
git commit -m "Rewrite footer as editorial three-row layout"
```

---

## Task 13: Reveal animation

**Files:**
- Create: `assets/js/reveal.js`
- Modify: `index.html` (add script tag)

- [ ] **Step 1: Create `assets/js/reveal.js`**

Write this exact content:

```javascript
(function () {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
            el.classList.add('is-revealed');
        });
        return;
    }

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
            el.classList.add('is-revealed');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
        observer.observe(el);
    });
})();
```

- [ ] **Step 2: Wire `reveal.js` into `index.html`**

Find the existing script block before `</body>` (where you already removed unused scripts in Task 2). Add this line **after** `script.js` and **before** the nav-behavior inline script from Task 3:

```html
		<script src="assets/js/reveal.js"></script>
```

- [ ] **Step 3: Verify reveal behavior**

Reload `index.html`. Expected:
- On first paint: hero headline and sub-block are invisible, fade up over ~400ms
- Scroll down: each subsequent section element with `data-reveal` fades up as it enters the viewport
- Scrolling back up does NOT replay the animation (one-shot)
- DevTools → Settings → Rendering → "Emulate CSS prefers-reduced-motion": all elements appear immediately, no animation

- [ ] **Step 4: Commit**

```bash
git add assets/js/reveal.js index.html
git commit -m "Add IntersectionObserver-based reveal animation"
```

---

## Task 14: Final verification + privacy page regression check

**Files:**
- Read-only: `index.html`, `privacy-policy.html`

- [ ] **Step 1: Walk through index.html at 4 breakpoints**

Open Chrome / Safari with the DevTools device toolbar. For each width, scroll the entire page top to bottom:

- **375px (mobile):** hero stacks, nav becomes hamburger, services rows compact, portfolio stacks to single column, contact form stacks
- **768px (tablet):** transitions happen smoothly, no horizontal scroll
- **1280px (laptop):** the "natural" desktop layout — confirm all sections look as specified
- **1920px (wide desktop):** `.nrg-container` caps at 1280px max-width and sits centered with extra negative space on either side

For each: open DevTools → Console. Expected: no 404 errors, no JS errors.

- [ ] **Step 2: Walk through privacy-policy.html**

Open:
```bash
open "/Users/hamadgul/Projects/NeuraGul - Website/privacy-policy.html"
```

Expected: page renders the way it did before this work began. The body should still use `style.css` (DM Sans + Plus Jakarta Sans, original colors). No regression. Confirm no console errors.

- [ ] **Step 3: Smoke-check all anchor links from the new nav**

From `index.html`, click each nav link in turn: Services, Work, Team, Contact. Each should scroll to the correct section. The hero's "Start a project" should scroll to contact. "View work" should scroll to portfolio.

- [ ] **Step 4: Check hover states one more time**

- Service rows: hover one → background tints orange, title shifts right, arrow turns orange
- Portfolio cards: hover one → image brightens slightly, name shifts right
- Team portraits: hover one → photo returns to color, name turns orange
- Filled button: hover → background lightens to `#FF6F3D`
- Ghost button: hover → underline draws from left to right
- Footer links: hover → text turns orange

- [ ] **Step 5: Final commit (if any tweaks made during verification)**

If steps 1-4 surfaced any small issues that required edits, commit them now:

```bash
git status
git add <files>
git commit -m "Final polish from verification pass"
```

If no edits were needed, skip this step.

---

## Implementation summary checklist (for the executing engineer)

After all 14 tasks:

- [ ] `assets/css/refresh.css` exists with tokens, fonts, buttons, dot-grid, and all 16 numbered sections (01–16)
- [ ] `assets/js/reveal.js` exists with IntersectionObserver behavior
- [ ] `index.html` has refresh.css linked **last** in `<head>`
- [ ] Six unused CSS files (`animate.min.css`, `owl.carousel.min.css`, `owl.theme.default.min.css`, `flipdown.css`, `lightbox.min.css`, `dark-mode.css`) are no longer referenced
- [ ] Seven unused JS files (`wow.min.js`, `owl.carousel.min.js`, `flipdown.js`, `lightbox.min.js`, `magiccursor.js`, `counterup.js`, `jquery.waypoints.min.js`) are no longer referenced
- [ ] Four sections (`#countdown`, `#pricing`, `#faq`, `#blog`) are deleted from HTML
- [ ] Nine sections rewritten (nav, hero, about, services, portfolio, work_process, team, contact, footer)
- [ ] Dark-mode toggle button removed
- [ ] `privacy-policy.html` still renders correctly
- [ ] No 404s, no console errors at any of 4 breakpoints
