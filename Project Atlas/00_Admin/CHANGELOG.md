# CHANGELOG — THE MATCH DAY CLUB (Project Atlas)

## 2026-06-27 — Session 005d (Geometric master for large-format print)
A zoom test showed that any trace of the 160px source wobbles at billboard scale (curve and
polygon alike). So a **geometric, straight-edge master** was built for large-format print.
### Tooling / method
- Traced the live logo in **polygon mode** (potrace, `optCurve:false`, high upscale), then
  **RDP-regularised** every outline so wobbly traced edges collapse to true straight lines
  (the pen-tool-on-a-template approach). Verified via vector-outline render.
### Added
- `08_Exports/Print/MDC_Shield_Master_Print.svg` — full-colour geometric master (straight edges).
- `08_Exports/Print/MDC_Shield_Mono_Print.svg` — one-colour geometric master.
- `08_Exports/Print/README.md` — when to use the print masters vs the digital master + honest limits.
### Decisions
- DR-017: two master forms — curve (digital) + geometric (print).
### Notes
- Both still derive from the 160px live raster; edges are now clean/straight, but the owner's true
  master vector is still the way to get pixel-exact proportions at the largest scales.

## 2026-06-27 — Session 005c (Outline the wordmark from the real fonts)
The wordmark was converted from live text to **true vector outlines** of the real typefaces.
### Tooling
- Installed `opentype.js`; fetched the actual font files (Anton-Regular.ttf from Google Fonts;
  Archivo ExtraBold static TTF). Generated glyph outlines for `THE` / `MATCH DAY` (Anton) and
  `CLUB` (Archivo 800) with manual letter-spacing, positioned to the live lockup.
### Changed
- `MDC_Wordmark.svg` — rebuilt as outlined glyph paths (was live text). Verified vs the live box lockup.
- `MDC_Corporate_Logo.svg` / `08_Exports/Web/MDC_Corporate_Logo_Reverse.svg` — traced shield +
  outlined wordmark; no font dependency on press; dark and light versions.
### Added
- `01_Brand/Typography/Anton-OFL.txt` — Anton licence retained (SIL OFL) alongside Archivo's.
### Docs
- Typography + Brand Standards updated: wordmark is now outlined/production-ready.

## 2026-06-27 — Session 005b (Vector-trace the mark from live artwork)
After realignment, the mark was upgraded from a hand reconstruction to a **vector trace taken
directly from the live logo** — the local equivalent of Illustrator's Image Trace.
### Tooling
- Installed `sharp` + `potrace` (pure-JS). Upscaled the live logo (160×183 → 1500px, lanczos3),
  split it into ink / bright-green / deep-green channel masks, traced each with potrace, and
  recoloured to the exact brand hexes. Integer-rounded paths; shared via `<defs>`+`<use>`.
### Changed
- `MDC_Shield_Master.svg` / `MDC_Product_Identity.svg` / `MDC_Performance_Mark.svg` (one-colour) /
  `MDC_Shield_Construction.svg` / `08_Exports/Web/MDC_Shield_Reverse.svg` — rebuilt from the trace.
- `MDC_Corporate_Logo.svg` — traced shield + wordmark; canvas widened so the lockup never clips.
- `01_Brand/Usage/*` — clear-space / minimum-size / misuse rebuilt on the traced mark.
- Captured the true **asymmetric "MD" monogram** and the **two-tone green bevel** (`#8BC63F`/`#6AA62E`).
### Docs
- DR-016 updated (mark is traced, not reconstructed); Brand Standards / Colour / Review refreshed.
### Verified
- Trace rendered side-by-side against the live logo (near-identical); all SVGs well-formed.

## 2026-06-27 — Session 005 (Realignment to the live brand)
The live site became reachable; the prior identity was found to be invented and was realigned
to the real brand (matchdayclub.co.uk) per the owner's direction.
### Captured
- Live-brand source: logo raster, product photography, CSS palette, fonts, positioning copy.
### Changed
- `MDC_Shield_Master.svg` / `MDC_Product_Identity.svg` — redrawn as the double-keyline shield +
  hollow "M" monogram + green down-chevron + green accent stroke (reconstruction from live raster).
- `MDC_Performance_Mark.svg` — repurposed to the one-colour (single-ink) build of the mark.
- `MDC_Shield_Construction.svg` — construction grid for the new mark.
- `MDC_Wordmark.svg` / `MDC_Corporate_Logo.svg` — "THE MATCH DAY CLUB" in Anton + Archivo.
- `08_Exports/Web/*` — reverse (dark-on-light) exports for the new mark + lockup.
- `MDC_Color_System.md` — dark ground `#0A0B0D` + lime signal `#8BC63F` (real CSS values).
- `MDC_Typography.md` — Anton (display) + Archivo (body).
- `Brand_Standards.md` — rewritten to the real position (monthly box for 12–17s).
- `Brand_Review_LiveSite.md` — completed with observed marks + the prior-vs-live gap.
- `01_Brand/Usage/*` — clear-space / minimum-size / misuse rebuilt on the new mark.
### Decisions
- DR-013 (palette), DR-014 (type: Anton+Archivo), DR-015 (M-monogram mark), DR-016 (name + reconstruction).
- DR-006 and DR-007 superseded.
### Archived
- `99_Archive/MDC_Shield_Master_chevron_v1.svg`, `MDC_Performance_Mark_chevron_v1.svg` (invented marks).
### QA
- Mark reconstruction verified side-by-side against the live logo; all SVGs well-formed; diagrams rendered (Chromium).
### Open
- Request the owner's master logo vector to replace the reconstruction 1:1 (DR-016).

## 2026-06-27 — Session 004 (Usage rules — clear space, minimum size, misuse)
### Added
- `01_Brand/Usage/MDC_Clearspace.svg` — clear-space diagram; keep-out = X on all sides (X = chevron stroke height, 130u).
- `01_Brand/Usage/MDC_Minimum_Size.svg` — minimum-size diagram; digital 24px / embroidery 25mm floors, shown to relative scale.
- `01_Brand/Usage/MDC_Misuse.svg` — six prohibited treatments (stretch, rotate, recolour, shadow, outline, low contrast).
- `01_Brand/Usage/MDC_Usage.md` — consolidated logo usage rules.
### Changed
- Brand Standards §3 (clear space + minimum size) and §6 (Misuse) completed and linked to the diagrams.
### Decisions
- DR-012 locked: clear-space unit X = chevron stroke height (130u); min-size floors 24px / 25mm.
### QA
- All three diagrams rendered (Chromium) and verified against master geometry; well-formed XML; PASS at 9.5.
- SVG is source of truth (DR-009); render PNGs were QA-only and not committed.

## 2026-06-27 — Session 003 (Live-site brand review — blocked, scaffold staged)
### Added
- `01_Brand/Brand_Review_LiveSite.md` — comparison scaffold (house marks vs. live site), with the egress-block evidence and an intake checklist to complete the review.
### Notes
- `matchdayclub.co.uk` fetch attempted via WebFetch, curl (browser UA, apex + www), and WebSearch. All denied at the gateway (403 CONNECT) or not indexed. Block re-confirmed against the agent-proxy status endpoint. No live marks could be observed; review left as AWAITING SOURCE rather than fabricated.

## 2026-06-27 — Session 002 (Typeface lock + outlined wordmark)
### Added
- `01_Brand/Logo/MDC_Wordmark.svg` — wordmark outlined to vector (Archivo).
- `01_Brand/Logo/MDC_Corporate_Logo.svg` — rebuilt with outlined wordmark (replaces draft).
- `08_Exports/Web/MDC_Corporate_Logo_Reverse.svg` — reverse corporate lockup.
- `01_Brand/Typography/MDC_Typography.md` — type system spec.
- `01_Brand/Typography/Archivo-OFL.txt` — font licence retained in project.
### Changed
- Brand Standards §5 (Typography) filled in.
- Draft corporate logo archived → `99_Archive/MDC_Corporate_Logo_v1_draft.svg`.
### Decisions
- DR-011 locked (Archivo, SIL OFL); DR-008 resolved by it.
### QA
- Wordmark + Corporate Identity now PASS at 9.5.

## 2026-06-27 — Session 001 (Foundation)
### Added
- Project Atlas folder structure (00_Admin … 99_Archive).
- Root `CLAUDE.md` governance rule.
- Admin spine: PROJECT_STATUS, DECISION_REGISTER, ROADMAP, CHANGELOG.
- `01_Brand/Logo/MDC_Shield_Master.svg` — Master Shield, clean vector, 1000-grid.
- `01_Brand/Logo/MDC_Shield_Construction.svg` — Shield with construction grid.
- `01_Brand/Logo/MDC_Performance_Mark.svg` — chevron, manufacturing version.
- `01_Brand/Logo/MDC_Product_Identity.svg` — shield only.
- `01_Brand/Logo/MDC_Corporate_Logo.svg` — shield + wordmark (draft typography).
- `08_Exports/Web/MDC_Shield_Reverse.svg` — reverse/mono colourway.
- `01_Brand/Color/MDC_Color_System.md` — palette + values.
- `01_Brand/Brand_Standards.md` — Standards Manual (sections 1–4 drafted).
### Decisions
- DR-006, DR-007, DR-008, DR-009, DR-010 locked.
### QA
- Shield + Performance Mark passed at ≥9.5. Corporate logo on HOLD pending typeface lock.
