# NeuraGul — SEO Action Plan

Ordered by impact ÷ effort. Score today: **86/100**. These get it to ~92+.

## Do now (high impact, low effort — I can do these locally)

- [ ] **1. Unique social images per page.** Set each case study's `og:image` + `twitter:image` to its own portfolio screenshot (`assets/img/portfolio/<slug>.jpg`, already on disk). Add `twitter:image` to all 15 subpages that currently lack it. *(Files: all `work/*/index.html`, `services/*/index.html`.)*
- [ ] **2. Expand the two thin hub titles.**
  - `services/index.html`: `Services — NeuraGul` → `Software Development Services — NeuraGul`
  - `work/index.html`: `Work — NeuraGul` → `Selected Work & Case Studies — NeuraGul`
- [ ] **3. Add `serviceType` to each `Service` JSON-LD** (6 service pages) — one truthful value per page.
- [ ] **4. Add `theme-color` meta** to the `refresh.css` pages for consistent mobile chrome.

## Needs your input (highest strategic value)

- [ ] **5. E-E-A-T + entity signals (finding #3).** Give me:
  - Real social/profile URLs (LinkedIn, GitHub, X) → I'll add `sameAs` to the `Organization` schema.
  - A 2–3 sentence founder/team credential blurb (optional but strong).
  - 1–2 client testimonials with names/companies (optional).

## Bigger project (schedule separately)

- [ ] **6. Finish the labs.css migration (finding #5).** Move the remaining 13 `refresh.css` pages onto `labs.css` so the whole site shares one design system + one font stack. Eliminates the second webfont download and the mid-site typography change. Consider self-hosting fonts to drop the render-blocking `fonts.googleapis.com` request.

## Verify after deploy (needs live URL — not doable in local mode)

- [ ] **7. Re-run `/seo audit https://neuragul.com`** for real Core Web Vitals (CrUX/PageSpeed), security headers, redirect chains, and live link-checking.
- [ ] **8. Validate rich results** in Google's Rich Results Test for a `Service` page and a `CreativeWork` case study.

---
**Want me to knock out items 1–4 now?** They're mechanical edits across the existing HTML — say the word and I'll apply them (kept local per your workflow).
