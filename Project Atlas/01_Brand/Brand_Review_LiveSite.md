# BRAND REVIEW — `matchdayclub.co.uk` vs. CURRENT MARKS

_Session 003 · 2026-06-27 · Status: **AWAITING SOURCE** (live site unreachable from this environment)._

## Purpose
Compare the **live brand** presented at `matchdayclub.co.uk` against the **current house marks**
established under Project Atlas (Shield, Performance Mark, wordmark, palette, type), and record
where they align, diverge, or conflict.

## Why this is not yet filled in
The live site could not be fetched from this session:

| Route | Result |
|-------|--------|
| `WebFetch https://matchdayclub.co.uk` | HTTP 403 (gateway) |
| `curl` (browser UA), apex + `www` | `CONNECT tunnel failed, response 403` |
| Agent-proxy status | `connect_rejected` logged for `matchdayclub.co.uk:443` and `www.…:443` |
| `WebSearch` | Domain not indexed; no brand assets surfaced |

The environment's egress policy denies the domain at the CONNECT layer (same blocker first logged
in Session 002). This is an environment constraint, **not** a property of the site.

### To unblock (either is sufficient)
1. **Widen the network policy** to allow `matchdayclub.co.uk` (+ `www`) and re-run in a fresh session, **or**
2. **Paste the source** here: homepage screenshot(s), logo file(s), and the live colour/type values
   (the intake checklist below lists exactly what's needed).

---

## Current house marks (the baseline we review against)
Authoritative sources in this repo:

| Element | Spec | Source file |
|---------|------|-------------|
| Brand name / wordmark | `MATCHDAY` Expanded Bold + `CLUB` Expanded Regular, wide-tracked, outlined | `01_Brand/Logo/MDC_Wordmark.svg`, `MDC_Corporate_Logo.svg` |
| Corporate identity | Shield + wordmark lockup | `01_Brand/Logo/MDC_Corporate_Logo.svg` |
| Product identity | Shield only | `01_Brand/Logo/MDC_Product_Identity.svg` |
| Performance Mark | Ascending chevron, constant perpendicular stroke (production-safe) | `01_Brand/Logo/MDC_Performance_Mark.svg` |
| Shield geometry | 1000-unit grid, symmetric about x=500, point at (500,880) | `01_Brand/Logo/MDC_Shield_Master.svg` |
| Atlas Black | `#0E0E0E` — primary | `01_Brand/Color/MDC_Color_System.md` |
| Bone | `#ECE8E1` — reverse/ground | `01_Brand/Color/MDC_Color_System.md` |
| Graphite | `#2A2A2A` — secondary surfaces | `01_Brand/Color/MDC_Color_System.md` |
| Pitch (accent) | `#14342B` — heritage accent, <10% of any composition | `01_Brand/Color/MDC_Color_System.md` |
| Typeface | Archivo superfamily (SIL OFL) | `01_Brand/Typography/MDC_Typography.md` |
| Positioning | "Sells preparation, not accessories" — premium performance | `01_Brand/Brand_Standards.md` §1 |

---

## Comparison scaffold _(fill the middle column from the live site, then judge)_

| Dimension | Current house mark | Observed on `matchdayclub.co.uk` | Verdict |
|-----------|--------------------|----------------------------------|---------|
| Brand name + exact styling | `MATCHDAY CLUB` (two words, all caps, tracked) | _TBD_ | _align / drift / conflict_ |
| Tagline / strapline | "preparation, not accessories" (internal positioning) | _TBD_ | _TBD_ |
| Logo form | Shield + chevron | _TBD_ | _TBD_ |
| Primary colour | Atlas Black `#0E0E0E` | _TBD (hex)_ | _TBD_ |
| Ground / reverse | Bone `#ECE8E1` | _TBD (hex)_ | _TBD_ |
| Accent | Pitch `#14342B`, sparing | _TBD (hex)_ | _TBD_ |
| Headline typeface | Archivo Expanded | _TBD_ | _TBD_ |
| Body typeface | Archivo | _TBD_ | _TBD_ |
| Tone / positioning | Premium performance (Nike/Castore tier) | _TBD_ | _TBD_ |
| Product range | _per Standards §1_ | _TBD_ | _TBD_ |

### Findings _(to write once the middle column is populated)_
- **Aligned:** …
- **Drift (minor, tolerable):** …
- **Conflict (needs a decision):** …
- **Recommendation:** evolve toward / hold / migrate the live site to the house system.

---

## Intake checklist — exactly what to paste to complete this review
1. Homepage screenshot (full, desktop) + mobile if available.
2. The logo as used live (SVG/PNG, or a clear crop).
3. Exact colour values (hex from CSS/inspector, or named swatches).
4. Fonts used for headline and body (name, or a screenshot of the type).
5. The verbatim brand name styling, tagline, and nav/product labels.
6. Anything time-sensitive (a current campaign, seasonal palette, etc.).
