# NeuraGul — SEO Full Audit Report

**Scope:** Local static build (`/Users/hamadgul/Projects/NeuraGul - Website`), 16 indexable pages + 2 utility pages
**Method:** LLM-first analysis of local HTML source (no live network fetch — `local` mode)
**Date:** 2026-07-07
**Overall score:** **86 / 100 — Good** (up from 72 at the 2026-07 audit)

> Confidence labels: **Confirmed** = verified in source. **Likely** = strong inference. **Env-limited** = needs a live URL/API (not run in local mode).

---

## Score by category

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 25% | 92 | Canonicals, sitemap, robots, clean directory URLs, mobile viewport — all solid |
| Content Quality / E-E-A-T | 20% | 78 | Strong copy; missing author/team, testimonials, `sameAs` social proof |
| On-Page SEO | 15% | 88 | 1 H1/page, unique titles + descriptions; two hub titles are thin |
| Schema / Structured Data | 15% | 85 | Org + WebSite + Breadcrumb + Service + CreativeWork; no `sameAs`/`offers` |
| Performance (CWV) | 10% | 80 | Video + images optimized; two font stacks, render-blocking Google Fonts |
| Image Optimization | 10% | 85 | WebP+JPG `<picture>`, dimensions set, lazy; shared generic OG image |
| AI Search Readiness (GEO) | 5% | 95 | Excellent `llms.txt`; AI crawlers allowed |

---

## What's already excellent ✅

- **Every page has exactly one `<h1>`** and a unique, self-referencing absolute `<link rel="canonical">`.
- **Unique `<title>` and `<meta description>` on all 16 indexable pages**, descriptions mostly 80–153 chars (in range).
- **Clean directory URLs** (`/services/<slug>/`, `/work/<slug>/`) with `.nojekyll` present.
- **Structured data depth:** homepage `Organization` + `WebSite`; hubs `BreadcrumbList`; each service page `Service` + `BreadcrumbList` + `Organization`; each case study `CreativeWork` + `BreadcrumbList` + `Organization`.
- **`sitemap.xml`** lists all 16 URLs with `lastmod`, correctly **excludes** the noindexed `privacy-policy.html`, and is referenced from `robots.txt`.
- **`llms.txt`** is comprehensive and current (services, work, process, contact) — strong GEO signal.
- **`privacy-policy.html`** (PackShip's policy) is correctly `robots: noindex` and kept out of the sitemap.
- **Images:** portfolio uses `<picture>` WebP+JPG with `width`/`height` + `loading="lazy" decoding="async"`; hero video autoplay is native-in-markup (iOS-safe) with reduced-motion/data-saver guards.
- **Accessibility-correct alt:** nav/footer logos use `alt=""` with an `aria-label` on the parent link (avoids double screen-reader announcement) — the 27 "empty alt" hits are **not** a defect.

---

## Findings (ranked by impact ÷ effort)

### 🔴 1. Every page shares one generic social image — **Confirmed**
- **Evidence:** all 16 pages set `og:image = /assets/img/hero-poster.jpg`. Only the homepage sets `twitter:image`; the other 15 pages omit it.
- **Impact:** case studies and services share on social/Slack/iMessage with a generic dark poster instead of the actual product screenshots. Lower social CTR; weaker link previews when work gets shared.
- **Fix:** point each case study's `og:image`/`twitter:image` at its own portfolio screenshot (they already exist, e.g. `assets/img/portfolio/packship.jpg`, `nymm.jpg`). Add `twitter:image` (can equal `og:image`) to all subpages. Give service pages a per-category or at least a services-hub OG image.

### ⚠️ 2. Hub-page titles leave keyword space unused — **Confirmed**
- **Evidence:** `Services — NeuraGul` (19 chars) and `Work — NeuraGul` (15 chars). Titles can run ~55–60 chars before truncation.
- **Impact:** these two pages target broad intent ("software development services", "software agency portfolio") but the titles carry no descriptive/keyword text.
- **Fix:** e.g. `Software Development Services — NeuraGul` and `Selected Work & Case Studies — NeuraGul`.

### ⚠️ 3. Organization schema lacks `sameAs` and E-E-A-T signals — **Confirmed**
- **Evidence:** homepage `Organization` has no `sameAs` (social/GitHub/LinkedIn), no `address`, no `founder`/team. No author or testimonial content site-wide.
- **Impact:** limits Knowledge-Panel eligibility and entity confidence; E-E-A-T now applies to all competitive queries (Dec 2025). This is the single biggest content-side gap.
- **Fix:** add `sameAs: [...]` with real LinkedIn/GitHub/X profiles; add a short "who we are" / founder credential block; consider client testimonials with attribution. **Needs user-supplied URLs/content.**

### ⚠️ 4. `Service` schema is minimal — **Confirmed**
- **Evidence:** service pages carry `name`, `description`, `url`, `provider`, `areaServed: "US"` only.
- **Impact:** correct but shallow — misses `serviceType` and (if you ever quote ranges) `offers`.
- **Fix:** add `"serviceType"` per page (e.g. "AI consulting", "Custom software development"). Keep it truthful; skip `offers` unless you publish pricing.

### ⚠️ 5. Two font stacks + design system split across the site — **Likely (perf/consistency)**
- **Evidence:** `index.html`, `work/packship`, `work/new-york-mobile-mechanic` load `labs.css` + **Bricolage Grotesque / Instrument Sans**; the other 13 pages load `refresh.css` + **Geist / JetBrains Mono**.
- **Impact:** users crossing between homepage and a service page re-download a second webfont set (extra render-blocking requests + CLS risk), and the brand typography visibly changes. Mid-migration state (per project notes).
- **Fix:** finish the labs.css migration so all pages share one CSS + one font stack; until then, at minimum `preconnect` is present (good) — consider `font-display: swap` (already in the query string) and self-hosting to cut the render-blocking `fonts.googleapis.com` round-trip.

### ℹ️ 6. Minor / informational
- **`theme-color`** meta is on `labs.css` pages but absent on `refresh.css` pages — trivially inconsistent mobile chrome color.
- **No image sitemap / no `<changefreq>`/`<priority>`** — Google ignores the latter two; not worth adding.
- **robots.txt** is `Allow: /` for `*`, which already permits GPTBot/ClaudeBot/PerplexityBot — correct given the GEO intent. No change needed.

---

## Environment limitations

Run in `local` mode against source files. **Not measured** (need the live URL + APIs): real Core Web Vitals / PageSpeed field data (CrUX), HTTP response/security headers, redirect chains, live 404 link-checking, and rendered-DOM verification. Re-run `/seo audit https://neuragul.com` for those. Performance score above is inferred from markup, not field data (**Likely**).

---

## Verdict

The on-page and technical foundation is genuinely strong — this reads as a site that already had one audit's worth of fixes applied. The remaining wins are **off-page/entity signals** (finding #3) and **social-share polish** (#1), plus finishing the CSS/design migration (#5). See `ACTION-PLAN.md` for the ordered task list.
