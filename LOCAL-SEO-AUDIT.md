# NeuraGul — Local SEO Audit ("near me" readiness)

**Target queries:** "web developer near me", "web design agency near me", "software developer near me", "app developer near me", and city-qualified variants ("web design agency NYC", "custom software developer New York").
**Date:** 2026-07-07
**Local SEO readiness score:** **15 / 100 — Critical** (the site is built as a national/remote agency, not a local one — by design)

> This is a *different* scorecard from the general audit (86/100). A site can be technically excellent and still be invisible for "near me" queries. That's exactly what's happening here.

---

## The one thing you must understand first

**"Near me" queries trigger Google's Local Pack (the map with 3 businesses).** That pack is populated **only** from **Google Business Profile (GBP)** listings tied to a **verified location**. There is no on-page trick, no schema, and no keyword that puts you in the map pack without a GBP.

- **No GBP → you cannot appear in the map pack. Full stop.**
- Below the pack sits "localized organic" — regular blue links, re-ranked by the searcher's location. You *can* win there with on-page local signals, but it's the minority of clicks for "near me" intent, and it still favors businesses with local footprints.

So local SEO for you is gated on one strategic decision (see the end). Everything below measures where you stand today.

---

## Current state — what I found in the source

| Local ranking factor | Status | Evidence |
|---|---|---|
| **Google Business Profile** | ❌ None / unmanaged | No GBP signals; no `hasMap`, no map embed, no reviews |
| **Phone number (NAP)** | 🔴 Absent | No `tel:` link or phone anywhere on the site — only client case-study copy mentions "phone" |
| **Physical address / NAP** | 🔴 Absent | Only "Remote · US East" and "NYC / Remote" eyebrow; no street address, city, or `PostalAddress` |
| **LocalBusiness / ProfessionalService schema** | 🔴 Not used | Only `Organization` + `Service`, with `areaServed: "US"` (nation-wide, not local) |
| **Geo signals** (`geo`, `GeoCoordinates`, map) | 🔴 None | No coordinates, no embedded Google Map |
| **City in title / H1 / content** | 🔴 Minimal | Homepage `<h1>` = "We build software that ships." No city. "NYC" appears once as an eyebrow label |
| **Location / city landing pages** | 🔴 None | No `/nyc/`, `/new-york/`, or "web design agency in [city]" pages |
| **Reviews / ratings** | 🔴 None on-site | No testimonials, no `AggregateRating`, no review schema |
| **Local citations** (directories, NAP consistency) | ❓ Unknown (off-site) | Can't verify from source; likely none given no NAP exists to cite |
| **Local relevance already present** | 🟡 Partial asset | Case studies (New York Mobile Mechanic "across the five boroughs", New York Fine Foods) prove you *do* local SEO — good sales proof, weak self-signal |

**Bottom line:** every load-bearing local ranking factor is missing. The site tells Google "national software agency, remote," which is a coherent story — just not one that ranks for "near me."

---

## Findings, ranked

### 🔴 1. No Google Business Profile — the single blocking issue
Without a verified GBP you are structurally excluded from the map pack for every "near me" query. This is ~40–50% of the visible real estate and most of the click intent for these searches. **Nothing else in local SEO matters until this exists.** GBP verification requires a real address (a storefront, an office, or a **home address used as a hidden Service-Area Business**).

### 🔴 2. No phone number anywhere
"Call" is the primary conversion action for local service searches, and a consistent phone number is a core NAP citation signal. You currently offer only an email + a Formspree form. Even for a remote agency, a business line (Google Voice works) materially helps local trust and GBP.

### 🔴 3. No NAP and no `LocalBusiness`/`ProfessionalService` schema
There is no Name-Address-Phone block for Google to read or for directories to cite, and the schema declares a national `Organization`. For local intent you'd want `ProfessionalService` (a `LocalBusiness` subtype) with `address`, `geo`, `areaServed` set to your metro, `telephone`, and `openingHours`.

### 🔴 4. Zero location targeting in content
The homepage and service pages never name a city for *NeuraGul*. Titles, H1s, and body copy are geography-free. Localized organic can't rank you for "web design agency NYC" when the phrase and its intent appear nowhere on the page.

### ⚠️ 5. No location landing pages
For a metro strategy you'd typically want a primary "Web Design & Software Development in [City]" page (and, if multi-area, a small set of neighborhood/borough pages — capped and uniquely written; **warning at 30+, hard stop at 50+ pages**). None exist today.

### 🟡 6. You already have local proof you're not using for yourself
NYMM and NYFF are NYC local-SEO wins in your own portfolio. That's excellent E-E-A-T *if* you decide to sell local — "we rank NYC service businesses; here's the proof." Right now it only advertises the service, it doesn't localize NeuraGul.

---

## The two honest paths

Your "NYC / Remote" positioning is currently trying to have it both ways, and for local search that means winning neither. Pick a lane:

**Path A — Compete locally (NYC / five boroughs).** Worth it if you want local leads and will stand up a GBP. Requires: a verifiable address (home/office/SAB), a phone line, `ProfessionalService` schema, a city-targeted homepage/landing page, GBP + citations, and reviews. Realistically 6–12 weeks to start showing in the pack; your NYMM/NYFF case studies are strong ammunition.

**Path B — Stay national/remote, skip "near me."** Perfectly valid — most successful dev agencies rank for *non-geo* intent instead: "custom software development agency," "hire React Native developers," "AI consulting firm," "fractional engineering team." Here you drop local entirely and double down on service + comparison + thought-leadership content. "Near me" is simply the wrong battlefield.

The deciding question is below — the action plan forks completely on your answer, so I've held it rather than guess.
