# CHANGELOG — MATCHDAY CLUB® (Project Atlas)

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
