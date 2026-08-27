# BRAND REVIEW — `matchdayclub.co.uk` vs. PRIOR ATLAS MARKS

_Session 005 · 2026-06-27 · Status: **COMPLETED** — site reachable; review done and acted on._

## Outcome
The site became reachable this session (egress now returns HTTP 200; the Session 002–003 block
is lifted). The live brand was fetched and observed directly. **The prior Atlas identity did not
resemble the real brand** — it was invented while the site was unreachable. Per the owner's
direction, Atlas has been **realigned to the live brand** in this same session.

## What the live brand actually is
- **Name:** *The Match Day Club* (stylised `THE` · `MATCH DAY` · `CLUB`).
- **Product:** monthly subscription box for young footballers (12–17). Two tiers — Starter £15.99/mo,
  Pro £24.99/mo (founder pricing). ~£40+ retail value, ~8 items. Pre-launch, founder waitlist.
- **Tagline:** "Elevate your game. Every month."
- **Founder:** Jack, 17, full back; academy trialist (West Ham, Southampton, Chelsea, Crystal Palace, Watford).
- **Tone:** youth-athletic, built-by-players, transparent value, parent-reassuring, gamified (streaks/badges/levels).

## Observed marks (sources captured from the live site)
| Element | Live value | Source |
|---------|-----------|--------|
| Logo | Double-keyline shield + "MD" monogram, green down-chevron + two-tone green accent stroke | `assets/logo-shield.png` (390×445; small variant 160×183 also exists) |
| Wordmark | `THE` (green) · `MATCH DAY` · `CLUB`, on the box lockup | hero + `assets/box-photo.jpg` |
| Display type | **Anton** | `fonts.googleapis.com/css2?family=Anton` |
| Body type | **Archivo** (400–900) | `…&family=Archivo:wght@400;600;700;800;900` |
| Ground | `#0A0B0D` | CSS `--bg` / `theme-color` |
| Ink | `#F5F7F8` | CSS `--ink` |
| Green (signal) | `#8BC63F` (bright `#A6E24A`, deep `#6AA62E`) | CSS `--green*` |
| Surfaces | `#15181C` / `#1B1F25` / `#23282F` | CSS `--surface*` |

## Comparison — prior Atlas vs. live (the gap)
| Dimension | Prior Atlas (invented) | Live brand | Verdict |
|-----------|------------------------|-----------|---------|
| Brand name | "MATCHDAY CLUB" (one word) | "The Match Day Club" (three words) | **Conflict → fixed** |
| Logo form | Solid shield + single up-chevron | Outlined shield + "M" monogram + green chevron/stem | **Conflict → fixed** |
| Primary colour | Atlas Black `#0E0E0E` | Ground `#0A0B0D` | Close → aligned |
| Accent | "Pitch" dark green `#14342B`, sparing | Bright lime `#8BC63F`, core signal | **Conflict → fixed** |
| Display type | Archivo only | **Anton** + Archivo | **Conflict → fixed** |
| Body type | Archivo | Archivo | Aligned |
| Positioning | Premium kit "preparation" (Nike/Castore tier) | Monthly box for 12–17s, built-by-players | **Conflict → fixed** |

## Action taken (Session 005)
- Mark redrawn to the live shield/monogram; palette, type, name and positioning corrected across
  `01_Brand/**` and `08_Exports/**`. Invented chevron marks archived to `99_Archive/`.
- Decisions DR-006/007/008-naming superseded; see `00_Admin/DECISION_REGISTER.md` (DR-013…016).

## Mark accuracy
- The repo mark is **vector-traced (potrace) directly from the live logo raster** — the geometry
  is taken from the real artwork, not hand-drawn. Two-tone green bevel preserved (`#8BC63F` / `#6AA62E`).
- The wordmark lockup is live Anton/Archivo text (outline for production).

## Open item
- For print-critical reproduction, request the owner's **master vector** (AI/SVG/EPS) and exact
  wordmark kerning to replace the trace 1:1 (the trace is from the 390px site asset, so curves are clean
  but ultimately limited by that resolution).
