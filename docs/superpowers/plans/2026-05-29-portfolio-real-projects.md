# Real Portfolio Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 5 placeholder case studies in the homepage portfolio with 3 real projects (PackShip, New York Fine Foods, a restaurant ordering portal), using real visuals and outbound links.

**Architecture:** Static site edit — generate 3 new 16:10 image pairs (`webp`+`jpg`), rewrite the `#portfolio` markup in `index.html` to 3 cards (two as outbound `<a>`, one non-linked `<article>`), adjust the `.nrg-work__grid` `:nth-child` span rules for a 3-item "hero + two" layout, and delete the old placeholder images.

**Tech Stack:** Plain HTML + CSS (`refresh.css`); image tooling `magick`/`convert`, `cwebp`, `sips` (all confirmed installed). Spec: `docs/superpowers/specs/2026-05-29-portfolio-real-projects-design.md`.

**Note on testing:** This repo has no JS test runner. "Verify" steps use `git`, `grep`, `magick identify`, and visual inspection in a browser. Commit after each task. Work on `main`, local commits only — do **not** push (user pushes explicitly).

---

### Task 1: Generate the PackShip hero image (composed device row)

**Files:**
- Create: `assets/img/portfolio/packship.jpg`
- Create: `assets/img/portfolio/packship.webp`

- [ ] **Step 1: Build the composite (dark on-brand panel + 3 rounded phone shots)**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
SRC="$HOME/Desktop/PackShip Files/App Store iPhone Screenshots"
mkdir -p /tmp/ps

# On-brand vertical gradient base, 1600x1000 (16:10): ink -> deep blue
magick -size 1600x1000 gradient:'#0a0a0b'-'#101b3a' /tmp/ps/bg.png

# Resize each screenshot to 820px tall and round its corners (radius 34)
for n in 01_hero 04_3d 06_rates; do
  magick "$SRC/$n.png" -resize x820 /tmp/ps/$n.r.png
  W=$(magick identify -format '%w' /tmp/ps/$n.r.png)
  H=$(magick identify -format '%h' /tmp/ps/$n.r.png)
  magick /tmp/ps/$n.r.png \
    \( -size ${W}x${H} xc:none -fill white -draw "roundrectangle 0,0,$((W-1)),$((H-1)),34,34" \) \
    -alpha set -compose DstIn -composite /tmp/ps/$n.round.png
done

# Composite the three phones across the panel, centered, ~420px apart
magick /tmp/ps/bg.png \
  /tmp/ps/01_hero.round.png  -gravity center -geometry -420+0 -composite \
  /tmp/ps/04_3d.round.png    -gravity center -geometry +0+0   -composite \
  /tmp/ps/06_rates.round.png -gravity center -geometry +420+0 -composite \
  /tmp/ps/packship.png
```

- [ ] **Step 2: Export jpg + webp into the portfolio dir**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
magick /tmp/ps/packship.png -quality 84 assets/img/portfolio/packship.jpg
cwebp -q 82 /tmp/ps/packship.png -o assets/img/portfolio/packship.webp
```

- [ ] **Step 3: Verify dimensions and that both files exist**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
magick identify assets/img/portfolio/packship.jpg assets/img/portfolio/packship.webp
```
Expected: both report `1600x1000`. Open `assets/img/portfolio/packship.jpg` in Preview and confirm three phone screenshots sit cleanly on the dark/blue panel with no clipping. If a screenshot crops oddly, swap which of `01_hero`/`04_3d`/`06_rates`/`02_build`/`05_library` are used in Step 1.

- [ ] **Step 4: Commit**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
git add assets/img/portfolio/packship.jpg assets/img/portfolio/packship.webp
git commit -m "Add PackShip portfolio hero image (composed device row)"
```

---

### Task 2: Generate the New York Fine Foods image

**Files:**
- Create: `assets/img/portfolio/nyff.jpg`
- Create: `assets/img/portfolio/nyff.webp`

- [ ] **Step 1: Pick the best source frame and inspect it**

```bash
open "$HOME/Projects/newyorkfinefoods/public/hero/1.jpg" \
     "$HOME/Projects/newyorkfinefoods/public/OGImage.png"
```
Choose the most representative, photogenic frame (prefer `hero/1.jpg`; fall back to `hero/2.jpg`…`hero/5.jpg` or `OGImage.png`). Set `NYFF_SRC` to that path in Step 2.

- [ ] **Step 2: Crop to 16:10 (1200x750) and export jpg + webp**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
NYFF_SRC="$HOME/Projects/newyorkfinefoods/public/hero/1.jpg"   # adjust if a different frame looks better
magick "$NYFF_SRC" -resize 1200x750^ -gravity center -extent 1200x750 -quality 84 assets/img/portfolio/nyff.jpg
cwebp -q 82 assets/img/portfolio/nyff.jpg -o assets/img/portfolio/nyff.webp
```

- [ ] **Step 3: Verify**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
magick identify assets/img/portfolio/nyff.jpg assets/img/portfolio/nyff.webp
```
Expected: both `1200x750`. Eyeball `nyff.jpg` — the crop should center the subject, not cut off key content.

- [ ] **Step 4: Commit**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
git add assets/img/portfolio/nyff.jpg assets/img/portfolio/nyff.webp
git commit -m "Add New York Fine Foods portfolio image"
```

---

### Task 3: Generate the restaurant-ordering-portal mock image

A custom on-brand UI mock (no stock photography). Primary method: render a small HTML mock with headless Chrome. Fallback: a `magick`-drawn browser-window card.

**Files:**
- Create (temp): `/tmp/pizzeria-mock.html`
- Create: `assets/img/portfolio/pizzeria.jpg`
- Create: `assets/img/portfolio/pizzeria.webp`

- [ ] **Step 1: Write the HTML mock (1200x750 viewport, on-brand dark + blue accent)**

Write this to `/tmp/pizzeria-mock.html`:

```html
<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;box-sizing:border-box;font-family:-apple-system,"Segoe UI",Inter,sans-serif}
  html,body{width:1200px;height:750px;background:#0a0a0b;overflow:hidden}
  .frame{position:absolute;inset:48px;background:#101114;border:1px solid rgba(250,250,247,.10);
    border-radius:16px;overflow:hidden;box-shadow:0 40px 120px rgba(20,60,180,.25)}
  .bar{height:46px;display:flex;align-items:center;gap:8px;padding:0 18px;
    background:#16171b;border-bottom:1px solid rgba(250,250,247,.08)}
  .dot{width:11px;height:11px;border-radius:50%}
  .url{margin-left:14px;font-size:12px;color:#9a9aa2;background:#0e0f12;
    padding:5px 14px;border-radius:8px;letter-spacing:.02em}
  .body{display:flex;height:calc(100% - 46px)}
  .menu{flex:1;padding:40px 44px}
  .eyebrow{font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:.12em;
    text-transform:uppercase;color:#2E6BE6}
  h1{color:#fafaf7;font-size:46px;letter-spacing:-.03em;margin:14px 0 8px}
  .sub{color:#9a9aa2;font-size:15px;margin-bottom:34px}
  .row{display:flex;justify-content:space-between;align-items:center;
    padding:18px 0;border-top:1px solid rgba(250,250,247,.07)}
  .row .n{color:#fafaf7;font-size:17px}
  .row .d{color:#7c7c83;font-size:13px;margin-top:3px}
  .row .p{color:#fafaf7;font-family:"JetBrains Mono",monospace;font-size:15px}
  .cart{width:330px;background:#0e0f12;border-left:1px solid rgba(250,250,247,.08);padding:40px 32px}
  .cart h2{color:#fafaf7;font-size:14px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:22px}
  .ci{display:flex;justify-content:space-between;color:#b9b9c0;font-size:14px;margin-bottom:14px}
  .tot{display:flex;justify-content:space-between;color:#fafaf7;font-size:18px;
    margin:22px 0;padding-top:18px;border-top:1px solid rgba(250,250,247,.10)}
  .btn{display:block;text-align:center;background:#2E6BE6;color:#fff;font-weight:600;
    padding:15px;border-radius:10px;font-size:15px}
  .pos{margin-top:18px;text-align:center;font-size:12px;color:#7c7c83}
</style></head><body>
  <div class="frame">
    <div class="bar">
      <span class="dot" style="background:#ff5f57"></span>
      <span class="dot" style="background:#febc2e"></span>
      <span class="dot" style="background:#28c840"></span>
      <span class="url">joespizza.order</span>
    </div>
    <div class="body">
      <div class="menu">
        <div class="eyebrow">Order online</div>
        <h1>Joe's Pizza</h1>
        <div class="sub">Pickup or delivery — straight to the kitchen.</div>
        <div class="row"><div><div class="n">Margherita</div><div class="d">San Marzano, fresh mozzarella, basil</div></div><div class="p">$18</div></div>
        <div class="row"><div><div class="n">Pepperoni</div><div class="d">Aged mozzarella, cup pepperoni</div></div><div class="p">$21</div></div>
        <div class="row"><div><div class="n">Garlic Knots</div><div class="d">Six, with marinara</div></div><div class="p">$7</div></div>
      </div>
      <div class="cart">
        <h2>Your order</h2>
        <div class="ci"><span>1× Margherita</span><span>$18.00</span></div>
        <div class="ci"><span>1× Garlic Knots</span><span>$7.00</span></div>
        <div class="tot"><span>Total</span><span>$25.00</span></div>
        <div class="btn">Pay &amp; place order</div>
        <div class="pos">Lands in Square POS · SMS when ready</div>
      </div>
    </div>
  </div>
</body></html>
```

- [ ] **Step 2: Screenshot it, preferring headless Chrome; otherwise use the magick fallback**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ -x "$CHROME" ]; then
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size=1200,750 --screenshot=/tmp/pizzeria.png \
    "file:///tmp/pizzeria-mock.html"
else
  # Fallback: draw an on-brand browser-window card directly with ImageMagick
  magick -size 1200x750 xc:'#0a0a0b' \
    \( -size 1104x654 xc:'#101114' -bordercolor '#1c1d22' -border 1 \) -gravity center -composite \
    -fill '#16171b' -draw "rectangle 48,48 1152,94" \
    -fill '#ff5f57' -draw "circle 74,71 74,76" \
    -fill '#febc2e' -draw "circle 96,71 96,76" \
    -fill '#28c840' -draw "circle 118,71 118,76" \
    -fill '#2E6BE6' -font Helvetica -pointsize 13 -draw "text 150,200 'ORDER ONLINE'" \
    -fill '#fafaf7' -pointsize 46 -draw "text 150,250 \"Joe's Pizza\"" \
    -fill '#9a9aa2' -pointsize 16 -draw "text 150,290 'Pickup or delivery — straight to the kitchen.'" \
    -fill '#2E6BE6' -draw "roundrectangle 820,560 1110,610 10,10" \
    -fill '#ffffff' -pointsize 16 -draw "text 880,592 'Pay & place order'" \
    /tmp/pizzeria.png
fi
magick identify /tmp/pizzeria.png
```
Expected: `/tmp/pizzeria.png` is `1200x750`. Open it and confirm it reads as a clean, on-brand storefront/checkout mock.

- [ ] **Step 3: Export jpg + webp**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
magick /tmp/pizzeria.png -resize 1200x750 -quality 86 assets/img/portfolio/pizzeria.jpg
cwebp -q 84 assets/img/portfolio/pizzeria.jpg -o assets/img/portfolio/pizzeria.webp
magick identify assets/img/portfolio/pizzeria.jpg assets/img/portfolio/pizzeria.webp
```
Expected: both `1200x750`.

- [ ] **Step 4: Commit**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
git add assets/img/portfolio/pizzeria.jpg assets/img/portfolio/pizzeria.webp
git commit -m "Add restaurant ordering portal portfolio mock image"
```

---

### Task 4: Rewrite the portfolio markup (`index.html`)

**Files:**
- Modify: `index.html` — the `.nrg-work__grid` block (currently lines ~194-260, the 5 `<article>` items inside `<section id="portfolio">`).

- [ ] **Step 1: Replace the 5 placeholder items with 3 real ones**

In `index.html`, replace the entire `<div class="nrg-work__grid"> … </div>` contents (the five `<article class="nrg-work__item …">` blocks) with exactly:

```html
				<div class="nrg-work__grid">
					<a class="nrg-work__item nrg-work__item--full" href="https://apps.apple.com/app/id6754204899" target="_blank" rel="noopener" data-reveal>
						<div class="nrg-work__img">
							<picture>
								<source srcset="assets/img/portfolio/packship.webp" type="image/webp">
								<img src="assets/img/portfolio/packship.jpg" alt="PackShip iOS app — packing form, 3D box view, and carrier rate comparison screens" width="1600" height="1000" loading="lazy" decoding="async">
							</picture>
						</div>
						<div class="nrg-work__meta">
							<span class="nrg-label">2026 · MOBILE · iOS APP</span>
							<h3 class="nrg-work__name">PackShip</h3>
							<p class="nrg-work__desc">A shipping companion that finds the right box with a real-time 3D packing view and compares live UPS, FedEx, and USPS rates.</p>
						</div>
					</a>
					<a class="nrg-work__item" href="https://www.newyorkfinefoods.com" target="_blank" rel="noopener" data-reveal>
						<div class="nrg-work__img">
							<picture>
								<source srcset="assets/img/portfolio/nyff.webp" type="image/webp">
								<img src="assets/img/portfolio/nyff.jpg" alt="New York Fine Foods — catering and events website" width="1200" height="750" loading="lazy" decoding="async">
							</picture>
						</div>
						<div class="nrg-work__meta">
							<span class="nrg-label">2026 · WEB · CLIENT SITE</span>
							<h3 class="nrg-work__name">New York Fine Foods</h3>
							<p class="nrg-work__desc">A cinematic site for a NYC catering, pizza-truck, and mobile-bar brand — media galleries, service menus, and booking inquiries.</p>
						</div>
					</a>
					<article class="nrg-work__item" data-reveal>
						<div class="nrg-work__img">
							<picture>
								<source srcset="assets/img/portfolio/pizzeria.webp" type="image/webp">
								<img src="assets/img/portfolio/pizzeria.jpg" alt="Restaurant ordering portal — online menu and checkout mock" width="1200" height="750" loading="lazy" decoding="async">
							</picture>
						</div>
						<div class="nrg-work__meta">
							<span class="nrg-label">2026 · WEB · PRODUCT</span>
							<h3 class="nrg-work__name">Restaurant ordering portal</h3>
							<p class="nrg-work__desc">Commission-free online ordering that plugs into a restaurant's existing Square POS — orders, payments, and SMS updates, with no third-party fees.</p>
						</div>
					</article>
				</div>
```

- [ ] **Step 2: Verify no placeholder references remain**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
grep -nE "portfolio/[1-5]\.(jpg|webp)|Distribution platform|On-demand operations|Document intelligence|Multi-region cloud|Analytics warehouse" index.html
```
Expected: **no output** (all placeholder image refs and names are gone).

- [ ] **Step 3: Verify the new structure is present and well-formed**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
grep -c 'class="nrg-work__item' index.html        # expect 3
grep -n 'id6754204899\|newyorkfinefoods.com' index.html   # expect 2 outbound links
```
Expected: 3 items; both outbound links present.

- [ ] **Step 4: Commit**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
git add index.html
git commit -m "Replace 5 placeholder case studies with 3 real projects"
```

---

### Task 5: Adjust the WORK grid CSS for the 3-item layout

**Files:**
- Modify: `assets/css/refresh.css` — the span rules under section `12. WORK` (currently lines ~768-774).

- [ ] **Step 1: Replace the `:nth-child` span rules**

Find this block in `assets/css/refresh.css`:

```css
/* Alternating row widths: row 1 = 7/5, row 2 = 5/7, row 3 = full */
.nrg-work__item:nth-child(1) { grid-column: 1 / 8; }
.nrg-work__item:nth-child(2) { grid-column: 8 / 13; }
.nrg-work__item:nth-child(3) { grid-column: 1 / 6; }
.nrg-work__item:nth-child(4) { grid-column: 6 / 13; }
.nrg-work__item--full { grid-column: 1 / -1; }
```

Replace it with:

```css
/* 3 real projects: row 1 = full-width hero, row 2 = 7/5 */
.nrg-work__item:nth-child(1) { grid-column: 1 / -1; }   /* PackShip — hero */
.nrg-work__item:nth-child(2) { grid-column: 1 / 8; }    /* New York Fine Foods */
.nrg-work__item:nth-child(3) { grid-column: 8 / 13; }   /* Restaurant ordering portal */
.nrg-work__item--full { grid-column: 1 / -1; }
```

(`--full` is kept so the hero's class is harmless/explicit, and it now agrees with `:nth-child(1)` rather than being out-specified.)

- [ ] **Step 2: Verify the mobile collapse rule still applies**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
grep -n "nrg-work__grid" assets/css/refresh.css
```
Confirm a `@media (max-width: …)` rule sets `.nrg-work__grid { grid-template-columns: 1fr; }` (or equivalent single-column) — if the existing mobile rule referenced the old item widths, ensure all three cards stack full-width on mobile. If no single-column rule exists, add inside the existing `@media (max-width: 768px)` block:

```css
    .nrg-work__grid { grid-template-columns: 1fr; }
    .nrg-work__item:nth-child(1),
    .nrg-work__item:nth-child(2),
    .nrg-work__item:nth-child(3) { grid-column: 1 / -1; }
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
git add assets/css/refresh.css
git commit -m "Retune work grid spans for 3-item hero+two layout"
```

---

### Task 6: Remove old placeholder images and final verification

**Files:**
- Delete: `assets/img/portfolio/1.jpg`…`5.jpg` and `1.webp`…`5.webp`

- [ ] **Step 1: Confirm the old images are unreferenced, then delete them**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
grep -rn "portfolio/[1-5]\.\(jpg\|webp\)" index.html privacy-policy.html assets/css 2>/dev/null
# Expected: no output. Only delete if nothing references them:
git rm assets/img/portfolio/1.jpg assets/img/portfolio/2.jpg assets/img/portfolio/3.jpg assets/img/portfolio/4.jpg assets/img/portfolio/5.jpg \
       assets/img/portfolio/1.webp assets/img/portfolio/2.webp assets/img/portfolio/3.webp assets/img/portfolio/4.webp assets/img/portfolio/5.webp
```
(If some numbered files don't exist, drop them from the `git rm` list — list `assets/img/portfolio/` first with `ls`.)

- [ ] **Step 2: Visual verification in a browser**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
open index.html
```
Scroll to `— 004 / SELECTED WORK` and confirm:
- PackShip spans full width as the hero; NYFF (left) and Restaurant ordering portal (right) sit in the row below.
- All three images load (no broken-image icons), cropped cleanly at 16:10.
- Hover lifts the image brightness/scale and nudges the name (existing `.nrg-work__item:hover` behavior).
- Clicking PackShip opens the App Store URL in a new tab; clicking New York Fine Foods opens `newyorkfinefoods.com`; the Restaurant card is not clickable.
- Narrow the window below 768px: all three cards stack in a single column and the section labels don't overlap.

- [ ] **Step 3: Commit**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
git add -A
git commit -m "Remove unused placeholder portfolio images"
```

- [ ] **Step 4: Report status (do not push)**

Summarize what changed and confirm everything verified. Leave commits local on `main`; the user pushes when ready (push-to-main deploys to GitHub Pages).

---

## Self-review notes

- **Spec coverage:** layout (Task 5), 3-card markup + links + copy (Task 4), 3 images incl. PackShip composite / NYFF crop / Pizzeria mock (Tasks 1-3), old-image removal (Task 6), mobile stacking (Task 5 Step 2 + Task 6 Step 2). All spec sections covered.
- **Names/paths consistent:** image basenames `packship` / `nyff` / `pizzeria` used identically in Tasks 1-4; dimensions (`1600x1000` hero, `1200x750` others) match the `width`/`height` attrs in the markup and the `aspect-ratio: 16/10` container.
- **No placeholders:** every code/command step contains the actual content.
