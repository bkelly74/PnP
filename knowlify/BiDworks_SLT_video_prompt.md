# BiDworks — SLT explainer video (Knowlify)

Assets for a ~90-second, senior-leadership-level explainer introducing **BiDworks**.
Contents: (1) critique of the first generated cut, (2) the improved Knowlify prompt,
(3) the voiceover script, (4) the storyboard. One illustrative worked example runs through
every scene so numbers stay consistent.

> Source of features: *BiDworks User Guide* (illustrative POC). The Lead-to-Quote → Jira
> resourcing push is a released-but-undocumented feature; wording here is from the product
> owner's description — sanity-check against actual behaviour before publishing.

**Running example (illustrative):** *Maritime ISR Support (OPP-417) · price £4.8m · win 62% ·
14 roles · 24-month phasing.* Use these figures everywhere numbers appear.

---

## 1. Critique of the first cut (what to fix)

The first generated video (92s, 1080p, navy/orange) matched length and palette but read as a
generic text-to-video template. Concrete problems:

1. **Narration shown as word-by-word subtitles** — ~45 mid-sentence caption swaps in 90s
   ("DEFEND — USUALLY", "ACROSS DOZENS OF"). Reads like auto-captions.
2. **Tiny centered visuals in a navy void** — ~70% of the frame wasted; some seconds near-blank.
3. **Inconsistent invented numbers** — the same curve showed £1.0m → £4.7m → £4.8m; the exec
   card jumped £0.0m → £4.8m. Fatal for a finance-literate audience.
4. **No per-scene headline / hierarchy** — nothing anchors the six key messages.
5. **Generic icons, no product** — a blank "BiDworks" browser box; the Jira beat was a bare
   To Do/In Progress/Done board.
6. **No motion craft** — elements pop in/out with no easing or through-line.

**Fixes enforced below:** designed titles (no rolling subtitles), 6 held scenes (~15s each),
one locked worked example, full-frame visuals, one bold headline per scene.

---

## 2. Improved Knowlify prompt (paste this)

```
Create a premium, executive-level (SLT) explainer video, exactly ~90 seconds, introducing
"BiDworks" — a bid-and-estimating platform for defence and government contractors.

HARD RULES (do not deviate)
- Do NOT display the narration as rolling/word-by-word subtitles. Show only the designed
  on-screen text specified per scene: one bold HEADLINE plus one short support line.
- Exactly 6 scenes, each held ~15 seconds. No rapid micro-cuts.
- Full-frame visuals that fill the 1920x1080 canvas — never small centered thumbnails.
- Use ONE consistent worked example throughout; every number must match it exactly:
  Maritime ISR Support (OPP-417), price £4.8m, win probability 62%, 14 roles, 24-month phasing.
- UK spelling. Deep navy background (#0B1E3B) with a single orange accent used sparingly.
- Smooth eases and a left-to-right through-line between scenes. Professional, confident VO.

SCENE 1 (0-15s)
Headline: "Bidding you can defend"
Support: "From opportunity to submission — one source of truth"
Visual (full-frame): scattered spreadsheets dissolve as a clean BiDworks dashboard glides in.
VO: "Defence bids turn complex requirements into a price you have to defend — usually spread
across dozens of untraceable spreadsheets. BiDworks replaces that, running the entire bid
lifecycle as a single source of truth."

SCENE 2 (15-30s)
Headline: "Every figure, re-verified"
Support: "Graded by GBP-per-year impact, to the exact cell"
Visual: a Lead-to-Quote workbook; a verification pass ticks lines green; one flagged callout
reads "'DLZ Years 1-5'!I25 - £4.8k/yr".
VO: "Its Lead-to-Quote engine turns three-point estimates into priced, time-phased demand —
then re-derives every figure and grades any error by its pounds-per-year impact, down to the
exact cell."

SCENE 3 (30-45s)
Headline: "Build once, reuse everywhere"
Support: "Governed library - salary data never stored"
Visual: rate cards flow through a 'preview to approve' gate into a library; a shield chip
"salary never stored"; a report stamped "v2.3 - audit-ready".
VO: "Rate cards and estimating know-how are harvested into a governed, reusable library —
personal salary data never stored — and every calculation is pinned to a versioned,
audit-ready formula."

SCENE 4 (45-60s)
Headline: "Governed to sign-off"
Support: "Seven gates - escalation - immutable trail"
Visual: seven approval gates lock in sequence 1 to 7; the high-value gate shows an escalation
flag; a cost-to-price bar builds up to £4.8m.
VO: "Bids clear seven approval gates, with high-value escalation and permanent sign-off. And
pricing is defensible by design, including SSRO-compliant single-source rates."

SCENE 5 (60-78s)
Headline: "Resourcing straight into Jira"
Support: "Portfolio demand, long before award"
Visual: the Lead-to-Quote role-by-month profile animates as bars, an arrow carries it into a
Jira timeline; a portfolio capacity view flags an amber gap.
VO: "And BiDworks pushes the resourcing profile straight from Lead-to-Quote into Jira — an
accurate, forward view of demand and capacity gaps across the whole portfolio, long before
award."

SCENE 6 (78-90s)
Headline: "One source of truth, lead to quote"
Support: "BiDworks - bidding you can defend"
Visual: the Executive one-pager holds steady - Price £4.8m, Win 62%, Gate status all ticked -
then a clean logo lockup.
VO: "Faster bids. Defensible numbers. Full governance. BiDworks — bidding you can defend."

END FRAME
On-screen text: "BiDworks - bidding you can defend." (leave space for a logo)
```

---

## 3. Voiceover script (~160 words, ~90s)

> Deliver at a measured, confident executive pace. UK spelling.

1. *(Problem + what it is)* "Defence bids turn complex requirements into a price you have to
   defend — usually spread across dozens of untraceable spreadsheets. BiDworks replaces that,
   running the entire bid lifecycle as a single source of truth."
2. *(Lead-to-Quote + verification)* "Its Lead-to-Quote engine turns three-point estimates into
   priced, time-phased demand — then re-derives every figure and grades any error by its
   pounds-per-year impact, down to the exact cell."
3. *(Reuse + transparency)* "Rate cards and estimating know-how are harvested into a governed,
   reusable library — personal salary data never stored — and every calculation is pinned to a
   versioned, audit-ready formula."
4. *(Governance + pricing)* "Bids clear seven approval gates, with high-value escalation and
   permanent sign-off. And pricing is defensible by design, including SSRO-compliant
   single-source rates."
5. *(Jira forecasting)* "And BiDworks pushes the resourcing profile straight from Lead-to-Quote
   into Jira — an accurate, forward view of demand and capacity gaps across the whole
   portfolio, long before award."
6. *(Close)* "Faster bids. Defensible numbers. Full governance. BiDworks — bidding you can
   defend."

---

## 4. Storyboard (hand to Knowlify or an editor)

| # | Time | Headline (big) | Support (small) | Visual (full-frame) | Data shown |
|---|---|---|---|---|---|
| 1 | 0-15s | Bidding you can defend | From opportunity to submission | Spreadsheets dissolve → BiDworks dashboard | — |
| 2 | 15-30s | Every figure, re-verified | Graded by £/yr, to the exact cell | L2Q workbook; green ticks; flagged cell callout | 'DLZ Years 1-5'!I25 · £4.8k/yr |
| 3 | 30-45s | Build once, reuse everywhere | Governed library · salary never stored | Rate cards → approve gate → library; shield chip | v2.3 · audit-ready |
| 4 | 45-60s | Governed to sign-off | 7 gates · escalation · immutable | Gates lock 1→7; escalation flag; cost→price bar | Price £4.8m |
| 5 | 60-78s | Resourcing straight into Jira | Portfolio demand, before award | L2Q role×month → arrow → Jira timeline; amber gap | 14 roles · 24 months |
| 6 | 78-90s | One source of truth, lead to quote | BiDworks · bidding you can defend | Exec one-pager + logo lockup | £4.8m · 62% · gates ✓ |

**Art direction:** full-bleed visuals; one bold headline per scene, never rolling subtitles;
consistent grid; deep-navy `#0B1E3B` + one orange accent; smooth eases, left-to-right
through-line; the sample numbers locked everywhere.

---

## 5. Recommended production path

Knowlify (text-to-video) will always look templated. For a board-grade asset, screen-record the
real BiDworks UI — the SLT pipeline view, the L2Q Resource Demand grid, the push into Jira, and
the Executive one-pager — and cut it in Descript / CapCut / After Effects with kinetic titles and
a professional (or high-quality AI) voice. Real UI plus one consistent example looks far more
premium than any generated template, and it proves the product rather than drawing it.
