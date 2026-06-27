# TYPOGRAPHY — THE MATCH DAY CLUB

Observed from the live site (matchdayclub.co.uk), 2026-06-27. The brand pairs **Anton**
(display) with **Archivo** (body) — both Google Fonts / SIL Open Font License, zero licence cost.
This corrects the earlier "Archivo-only" assumption (DR-011 amended by DR-014).

## Roles
| Role | Typeface | Notes |
|------|----------|-------|
| Display / Wordmark | **Anton** | Single weight, condensed, heavy caps. Used for "MATCH DAY", headlines, section titles. |
| Body / UI | **Archivo** | Weights 400/600/700/800/900 in use on site. Paragraphs, labels, buttons. |

CSS as served:
```
--font-display: "Anton", -apple-system, BlinkMacSystemFont, sans-serif;
--font: "Archivo", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```
Loaded via: `fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;600;700;800;900`.

## Wordmark construction
- `THE` — Anton, small, **Green** `#8BC63F`, tracked.
- `MATCH DAY` — Anton, large, Ink `#F5F7F8`.
- `CLUB` — Archivo ExtraBold (800), small, wide-tracked, Ink, set beneath.
- **Outlined to vector** in `MDC_Wordmark.svg` and `MDC_Corporate_Logo.svg` — the glyph outlines
  were generated from the actual font files (opentype.js), so the lockup is true vector with **no
  live-text/font dependency** on press. Licences retained: `Anton-OFL.txt`, `Archivo-OFL.txt` (both SIL OFL).

## Rules
- Anton for display only — never body (it is caps-only and tires at small sizes).
- Archivo carries everything else; keep generous tracking on small all-caps labels.
- Licence retained at `Archivo-OFL.txt`; Anton is likewise SIL OFL.
