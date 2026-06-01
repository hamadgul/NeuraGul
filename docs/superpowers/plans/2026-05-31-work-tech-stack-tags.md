# Work Card Tech-Stack Tags Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a row of outlined mono "pill" tags showing each project's tech stack (or skills, for the PM case study) under every card in the "Selected work" section.

**Architecture:** Pure addition — one `<ul class="nrg-work__stack">` appended inside each card's existing `.nrg-work__meta`, after the description, plus ~16 lines of CSS in the WORK section of `refresh.css`. Sharp-cornered hairline chips in JetBrains Mono, matching the site's editorial design language. No JS, no new files, no layout shift.

**Tech Stack:** Static HTML + CSS (`index.html`, `assets/css/refresh.css`). Verification via headless Chrome + Chrome DevTools Protocol (the project's established visual-verify loop — no unit-test framework exists).

**Design spec:** `docs/superpowers/specs/2026-05-31-work-tech-stack-tags-design.md`

**Workflow note:** Per repo convention, work directly on `main` and keep changes local. Do NOT push. The final commit is local only; the user pushes to deploy when ready.

---

## File Structure

- **Modify** `assets/css/refresh.css` — add `.nrg-work__stack` + `.nrg-work__stack li` + hover rules to the WORK section (after the `.nrg-work__desc` rule, currently ending at line 824, before the `@media (max-width: 1080px)` at line 826).
- **Modify** `index.html` — insert one `<ul>` per card inside `.nrg-work__meta`, immediately after each `.nrg-work__desc` `</p>` (6 cards: lines 203, 217, 230, 243, 256, 269).

Indentation in `index.html` is **tabs**. The `<p class="nrg-work__desc">` lines sit at 7 tabs of indent; each new `<ul>` must use the **same 7-tab indent**.

---

## Task 1: Add the tag-chip CSS

**Files:**
- Modify: `assets/css/refresh.css` (insert after the `.nrg-work__desc { … }` block that ends at line 824)

- [ ] **Step 1: Add the CSS rules**

Insert these rules immediately after the closing `}` of `.nrg-work__desc` (line 824) and before the `@media (max-width: 1080px)` block (line 826):

```css
.nrg-work__stack {
    list-style: none;
    margin: 4px 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.nrg-work__stack li {
    font-family: var(--font-mono);
    font-size: 11.5px;
    letter-spacing: 0.04em;
    color: var(--muted);
    padding: 5px 10px;
    border: 1px solid var(--rule);
    border-radius: 0;
    white-space: nowrap;
    transition: border-color 250ms ease, color 250ms ease;
}
.nrg-work__item:hover .nrg-work__stack li {
    border-color: var(--accent-ghost);
    color: var(--paper);
}
```

- [ ] **Step 2: Verify the CSS parses (no stray braces)**

Run:
```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website" && \
  awk '{o+=gsub(/{/,"{"); c+=gsub(/}/,"}")} END{print "open="o" close="c}' assets/css/refresh.css
```
Expected: `open=` and `close=` counts are **equal** (balanced braces).

---

## Task 2: Insert the tag lists into the six cards

**Files:**
- Modify: `index.html` (one insertion per card)

Each step adds one `<ul>` directly after that card's `.nrg-work__desc` `</p>`. Use the desc `<p>…</p>` line as the unique anchor; keep the 7-tab indentation on the new `<ul>` line. The tag text is verbatim from the user.

- [ ] **Step 1: PackShip** (after line 203)

Anchor (existing line):
```html
							<p class="nrg-work__desc">An AI-powered shipping companion that sizes items from a photo, finds the right box with a real-time 3D packing view, and compares live UPS, FedEx, and USPS rates.</p>
```
Add this line immediately after it (same 7-tab indent):
```html
							<ul class="nrg-work__stack" aria-label="Built with"><li>React Native</li><li>TypeScript</li><li>JavaScript</li><li>threeJS</li><li>Postgres</li><li>Redis</li></ul>
```

- [ ] **Step 2: New York Fine Foods** (after line 217)

Anchor:
```html
							<p class="nrg-work__desc">A cinematic site for a NYC catering, pizza-truck, and mobile-bar brand — media galleries, service menus, and booking inquiries.</p>
```
Add after it:
```html
							<ul class="nrg-work__stack" aria-label="Built with"><li>TypeScript</li><li>NextJS</li><li>JavaScript</li></ul>
```

- [ ] **Step 3: Vintus** (after line 230)

Anchor:
```html
							<p class="nrg-work__desc">The e-commerce platform for a leading wine import company — inventory management, order processing, and customer relationship tools.</p>
```
Add after it:
```html
							<ul class="nrg-work__stack" aria-label="Built with"><li>WordPress</li><li>PHP</li><li>Python</li></ul>
```

- [ ] **Step 4: Restaurant ordering portal** (after line 243)

Anchor:
```html
							<p class="nrg-work__desc">Commission-free online ordering that plugs into a restaurant's existing Square POS — orders, payments, and SMS updates, with no third-party fees.</p>
```
Add after it:
```html
							<ul class="nrg-work__stack" aria-label="Built with"><li>TypeScript</li><li>Square SDK</li><li>Delivery APIs</li></ul>
```

- [ ] **Step 5: Real-World Data Pipeline** (after line 256) — note `aria-label="Skills"`

Anchor:
```html
							<p class="nrg-work__desc">Led Product Management at Freenome for a 0→1 ETL pipeline that standardized diverse real-world data into a single Common Data Model for early cancer detection.</p>
```
Add after it:
```html
							<ul class="nrg-work__stack" aria-label="Skills"><li>Product Management</li><li>Agile</li><li>Planning</li></ul>
```

- [ ] **Step 6: Landscape Drainage Proz** (after line 269)

Anchor (the desc starts on line 269; match the full `<p>…</p>`):
```html
							<p class="nrg-work__desc">Tripled a client's online sales through a Shopify storefront buildout paired with SEO and conversion work, spanning CTA design and implementation.</p>
```
Add after it:
```html
							<ul class="nrg-work__stack" aria-label="Built with"><li>Shopify</li><li>Custom Liquid</li><li>SEO</li><li>Google Ads</li></ul>
```

> If the Landscape desc text differs slightly from the anchor above (it was truncated in
> one survey), open lines 268–270 and match the actual `</p>`; insert the `<ul>` right after it.

- [ ] **Step 7: Confirm six lists were added**

Run:
```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website" && grep -c 'nrg-work__stack' index.html
```
Expected: `6`

---

## Task 3: Visual verification (desktop + mobile)

**Files:**
- Create (temporary): `/tmp/verify_stack.mjs`

- [ ] **Step 1: Write the CDP verification script**

Create `/tmp/verify_stack.mjs`:
```js
// Renders the work grid with reveals forced visible and screenshots it.
// Run with: node --experimental-websocket /tmp/verify_stack.mjs <wsUrl> <outPath>
const ws = new WebSocket(process.argv[2]); let id = 0; const p = {};
const send = (m, pr = {}) => new Promise(r => { const i = ++id; p[i] = r; ws.send(JSON.stringify({ id: i, method: m, params: pr })); });
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && p[m.id]) { p[m.id](m.result); delete p[m.id]; } };
ws.onopen = async () => {
  await send('Page.enable'); await send('Runtime.enable');
  await send('Runtime.evaluate', { expression: `document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-revealed'));document.querySelectorAll('img').forEach(i=>{const s=i.currentSrc||i.src;i.loading='eager';i.src='';i.src=s;});'ok'` });
  await new Promise(r => setTimeout(r, 1500));
  const y = await send('Runtime.evaluate', { expression: `Math.round(document.querySelector('.nrg-work__grid').getBoundingClientRect().top + scrollY - 20)`, returnByValue: true });
  const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: y.result.value, width: (await send('Runtime.evaluate',{expression:'innerWidth',returnByValue:true})).result.value, height: 1500, scale: 1 } });
  require('fs').writeFileSync(process.argv[3], Buffer.from(r.data, 'base64'));
  ws.close(); process.exit(0);
};
```

- [ ] **Step 2: Render at desktop width (3 cards/row)**

Run:
```bash
pkill -f "remote-debugging-port=9222" 2>/dev/null; sleep 1
cd "/Users/hamadgul/Projects/NeuraGul - Website"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --remote-debugging-port=9222 --hide-scrollbars --window-size=1280,900 "file:///Users/hamadgul/Projects/NeuraGul%20-%20Website/index.html" >/tmp/chrome.log 2>&1 &
sleep 2
WS=$(curl -s http://localhost:9222/json | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{console.log(JSON.parse(d).find(x=>x.type==='page').webSocketDebuggerUrl)})")
node --experimental-websocket /tmp/verify_stack.mjs "$WS" /tmp/stack_desktop.png
sips -s format jpeg /tmp/stack_desktop.png --out /tmp/stack_desktop.jpg >/dev/null 2>&1
```
Then **Read `/tmp/stack_desktop.jpg`** and confirm: pills appear under every card's description, wrap cleanly to a second row where needed (e.g. PackShip's 6 tags), are sharp-cornered hairline chips in mono, and align left under the desc. No overflow past the card width.

- [ ] **Step 3: Render at mobile width (1 card/row)**

Run:
```bash
pkill -f "remote-debugging-port=9222" 2>/dev/null; sleep 1
cd "/Users/hamadgul/Projects/NeuraGul - Website"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --remote-debugging-port=9222 --hide-scrollbars --window-size=420,900 "file:///Users/hamadgul/Projects/NeuraGul%20-%20Website/index.html" >/tmp/chrome.log 2>&1 &
sleep 2
WS=$(curl -s http://localhost:9222/json | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{console.log(JSON.parse(d).find(x=>x.type==='page').webSocketDebuggerUrl)})")
node --experimental-websocket /tmp/verify_stack.mjs "$WS" /tmp/stack_mobile.png
sips -s format jpeg /tmp/stack_mobile.png --out /tmp/stack_mobile.jpg >/dev/null 2>&1
```
Then **Read `/tmp/stack_mobile.jpg`** and confirm pills wrap without horizontal overflow on a narrow card.

- [ ] **Step 4: Clean up temp artifacts**

Run:
```bash
pkill -f "remote-debugging-port=9222" 2>/dev/null
rm -f /tmp/verify_stack.mjs /tmp/stack_desktop.* /tmp/stack_mobile.* /tmp/chrome.log
```

---

## Task 4: Commit (local only)

**Files:**
- Modify: `index.html`, `assets/css/refresh.css`

- [ ] **Step 1: Stage only the two touched files and the spec/plan**

```bash
cd "/Users/hamadgul/Projects/NeuraGul - Website"
git add index.html assets/css/refresh.css \
  docs/superpowers/specs/2026-05-31-work-tech-stack-tags-design.md \
  docs/superpowers/plans/2026-05-31-work-tech-stack-tags.md
```

> NOTE: there may be other unrelated uncommitted changes in the working tree (a contact
> whitespace fix in `refresh.css`, regenerated `rwd-pipeline.{jpg,webp}`). Staging
> `refresh.css` will include the whitespace fix too — that's fine if bundling, but if the
> user wants the tags isolated, use `git add -p assets/css/refresh.css` and stage only the
> `.nrg-work__stack` hunk.

- [ ] **Step 2: Commit**

```bash
git commit -m "Add tech-stack / skill tags under each Work card"
```
Expected: commit succeeds on `main`. Do **not** push.

---

## Self-Review

- **Spec coverage:** Markup (Task 2) ✓, CSS incl. hover (Task 1) ✓, sharp `border-radius:0` ✓, data mapping for all 6 cards verbatim ✓, RWD `aria-label="Skills"` ✓ (Task 2 Step 5), responsive/no-media-query ✓ (verified Task 3 Step 3), reveal-with-card ✓ (no extra reveal added), zero-layout-shift (pills below desc) ✓.
- **Placeholder scan:** none — every step has exact code/commands.
- **Consistency:** class names `.nrg-work__stack` / `.nrg-work__stack li` identical in Task 1 (CSS) and Task 2 (markup); count check (Task 2 Step 7) and brace check (Task 1 Step 2) guard against typos.
