# N2C Expanded WBS — Data Quality & Integrity Analysis Report

**Source workbook:** `9d102f1d-N2C_Expanded_WBS.xlsx`
**Analysis date:** 2026-06-30
**Scope:** All 17 delivery WBS sheets + 4 reference tabs (`Overview`, `Mapping`, `Roles & SFIA`, `References`)
**Leaf tasks analysed:** 5,526
**Total issues raised:** 5,055 — **2 High · 5,032 Medium · 21 Low**

This report replicates the LTQ functionality-integration analysis approach: a full, traceable issues
list plus a detailed write-up showing the exact trace steps used to derive every finding, so each
result can be reproduced cell-for-cell. The companion artefacts are:

| Artefact | Purpose |
|---|---|
| `N2C_WBS_Issues_Register.xlsx` | Formatted, filterable register — Summary tab + 5,055-row Issue List with cell references |
| `N2C_WBS_Issues_List.csv` | Same issues as plain CSV (full list) |
| `analysis/audit.py` | The reproducible analysis engine — re-run to regenerate every number in this report |

---

## 1. What the workbook is

The N2C Expanded WBS is a 5-year resource/effort model for a managed-service / secure-platform
programme. Each delivery area is a sheet (DLZ, Data Feeds, DARKSTAR OCD, AIP on ACHE Build & Sites
1–3, T&R on ACHE Site 2, Local Site, STRATA, NEXUS, BLACK KNIGHT, Service Management, NOC, Service
Desk, Security, Governance). Every delivery sheet shares an identical 24-column schema:

```
Column1 | Frequency | Optimistic | Most Likely | Pessimistic | Estimate |
Annual Effort (Days) | Annual Effort (% of FTE) | Total FTE to action |
Role 1 | SFIA | … | Role 5 | SFIA5 | Activity | Start Date | End Date | Contract Year | Team
```

### 1.1 The calculation model (reverse-engineered and verified)

The trace below establishes the rules every leaf row is expected to obey. These rules were validated
against known-good rows before being used to test the whole workbook.

| Field | Rule | Verification |
|---|---|---|
| **Estimate** | PERT = `(Optimistic + 4×MostLikely + Pessimistic) / 6` | DLZ R4: (5+40+15)/6 = **10** ✓ |
| **Annual Effort (Days)** | `Estimate × Frequency-multiplier` | DLZ R4: 10 × Monthly(12) = **120** ✓ |
| **Annual Effort (% of FTE)** | `Annual Effort (Days) / 220` | 120 / 220 = **0.5455** ✓ |
| **Total FTE to action** | `% of FTE × (number of named resources)` | DLZ R4: 0.5455 × 2 roles = **1.0909** ✓ |
| **Frequency multipliers** | from `Mapping` tab | Fortnightly 26, Monthly 12, Weekly 52, Quarterly 4, Half-yearly 2, Yearly 1, One-off 1, Daily(Mon-Fri) 253, Daily(24×7) 365, Twice/Three-times-a-week 104/156 |

**Headline positive:** every computed field that *can* be checked against these rules is internally
consistent — **0 PERT errors, 0 Annual-Effort-Days errors, 0 %FTE errors across all 5,526 tasks.**
The arithmetic engine is sound. All the issues below are about **data hygiene, resourcing logic, and
cross-tab integrity**, not broken formulas.

### 1.2 Programme totals derived from the model

| Metric | Value |
|---|---|
| Total annual effort (days, summed across all years) | **41,452 days** |
| Total FTE-to-action (summed) | **304.3 FTE-years** |
| Effort by contract year (days) | Y1 5,540 · Y2 8,383 · Y3 8,524 · Y4 9,664 · Y5 9,307 · (untagged 33) |
| Largest demand roles (FTE) | NOC Engineer 60.4 · Platform Engineer 45.1 · Infrastructure Engineer 39.3 · Security Engineer 20.2 · Security Architect 19.8 |

---

## 2. Methodology — how the analysis was run

1. **Load** the workbook with values resolved (`data_only=True`) so computed cells are read as their
   stored results, not formulas.
2. **Classify** every row: a row is a **leaf task** if its `Frequency` cell is populated; rows with an
   empty Frequency are section/activity headers and are skipped from arithmetic checks.
3. **Track block context** while scanning: any Column1 value containing `CONTRACT YEAR n` sets the
   current block, so each leaf can be tested against the year it sits under.
4. **Apply 14 validation rules** (Section 4) to each leaf, recording every breach with its exact
   `Sheet!Row` location and the evidence that triggered it.
5. **Cross-tab checks**: roles used in the WBS vs the `Roles & SFIA` master list; FTE roll-up vs the
   summary tab; SFIA-level consistency for each role.
6. **Calibrate** noisy checks against ground truth — the contract-year and duplicate checks were
   tightened (see 4.10 / 4.12) to eliminate false positives before publishing counts.

---

## 3. Issue summary

### 3.1 By severity & category

| Severity | Category | Count |
|---|---|---:|
| 🔴 High | End Date before Start Date | 2 |
| 🟠 Medium | Date stored as text (not a real date) | 4,696 |
| 🟠 Medium | Total FTE implies more resources than are named | 308 |
| 🟠 Medium | Contract Year disagrees with its block header | 19 |
| 🟠 Medium | Single resource loaded above 1.0 FTE | 5 |
| 🟠 Medium | WBS demand not reflected in `Roles & SFIA` roll-up | 4 |
| 🟡 Low | Same role used at inconsistent SFIA levels | 14 |
| 🟡 Low | Leaf task missing a Contract Year | 4 |
| 🟡 Low | Exact duplicate row | 3 |
| | **Total** | **5,055** |

### 3.2 By sheet (excluding the bulk date-as-text rows, to expose real hotspots)

| Sheet | Issues (ex. date-text) | Note |
|---|---:|---|
| AIP on ACHE Build Years 2-4 | 153 | Systematic Total-FTE/role mismatch (see 4.5) |
| Local Site Years 1-2 | 28 | Contract-Year tagging errors |
| NEXUS Years 1-5 | 22 | Total-FTE/role mismatch |
| BLACK KNIGHT Years 1-5 | 20 | Total-FTE/role mismatch |
| Roles & SFIA | 18 | SFIA inconsistency + roll-up gaps |
| AIP Site 2 / T&R Site 2 | 16 / 16 | Total-FTE/role mismatch |
| Security Years 1-5 | 12 | End-before-start, over-allocation, duplicates |
| STRATA / AIP Site 3 / Governance | 12 / 12 / 11 | Mixed |

*(Date-as-text dominates raw per-sheet counts; the 9 affected sheets are listed in 4.2.)*

---

## 4. Findings with trace steps

Each finding states the **rule**, the **trace** (how the breach was detected), and **evidence**
(exact cells). Row numbers are the workbook's own 1-based rows.

### 4.1 🔴 End Date before Start Date — 2 occurrences
**Rule:** `End Date ≥ Start Date`.
**Trace:** parse both dates (handling the text-date format in 4.2) → compare → flag where `end < start`.
**Evidence:**
- `Security Years 1-5!R6` — *ITHC - DS OCD*: Start **2026-10-01**, End **2026-07-01** (ends 3 months before it starts).
- `Service Management Years 1-5!R179` — *Process & Policy Review*: Start **2027-04-01**, End **2027-01-01**.

**Impact:** negative durations break any Gantt/scheduling roll-up and signal a copy-paste error in the
date columns. **Fix:** correct the End Date (likely 2027-07-01 and 2027-07-01 / next-FY respectively — confirm with the planner).

### 4.2 🟠 Dates stored as text, not real dates — 4,696 occurrences
**Rule:** date columns should hold real date values, not strings.
**Trace:** read each `Start Date` / `End Date` cell and test its Python type — `datetime` (good) vs
`str` like `"15/03/2027"` (bad). Tally per sheet.
**Evidence — End Date is text on 9 of 17 sheets (every leaf row affected):**

| Sheet | End-Date text rows |
|---|---:|
| AIP on ACHE Site 2 Years 2-5 | 992 |
| T&R on ACHE Site 2 Years 2-5 | 992 |
| AIP on ACHE Site 3 Years 3-5 | 744 |
| DARKSTAR OCD Years 1-2 | 564 |
| AIP on ACHE Site 1 Years 4-5 | 496 |
| Governance Years 1-5 | 369 |
| Service Management Years 1-5 | 343 |
| Service Desk Years 1-5 | 115 |
| Security Years 1-5 | 80 |
| DLZ Years 1-5 | 1 (single stray text cell) |

The remaining 8 sheets store both dates correctly as date values — so the workbook is **internally
inconsistent**: identical columns are typed differently sheet-to-sheet.
**Impact:** text dates don't sort, don't feed date arithmetic, and silently corrupt any cross-sheet
timeline or `MIN/MAX` roll-up. The single stray `DLZ!E…` text cell is the most insidious — it looks
fine but one cell in a column of real dates will break a column-wide formula.
**Fix:** reformat the 9 sheets' date columns to real dates (Text-to-Columns / `DATEVALUE`), and fix
the one stray DLZ cell.

### 4.3 🟠 Total FTE implies more resources than are named — 308 occurrences
**Rule:** `Total FTE to action = % of FTE × (number of Role columns populated)`, so
`Total FTE ÷ % of FTE` should equal the count of named roles.
**Trace:** for each leaf compute `ratio = Total FTE ÷ % of FTE`, round to nearest integer = *implied
resource count*, compare to the number of populated Role1–Role5 cells.
**Distribution of the mismatch:**

| Roles named | Resources implied by Total FTE | Rows |
|---:|---:|---:|
| 1 | 2 | 65 |
| 1 | 3 | 98 |
| 1 | 5 | 30 |
| 2 | 3 | 72 |
| 2 | 5 | 35 |
| 3 | 4 | 8 |

**Evidence:** `AIP on ACHE Build Years 2-4!R4` *Active Directory* — `Total FTE = 3 × %FTE` but only one
role (*Infrastructure Engineer*) is named; same for ADFS/Beyond Trust/Tenable (R5–R7). `DLZ!R25`
*Configuration Management* — `Total FTE = 2 × %FTE`, one *Platform Engineer* named.
**Impact:** either the **Role columns are under-populated** (real people missing from the plan) or the
**Total FTE is overstated** (double-counted demand). 153 of the 308 are in *AIP on ACHE Build* — a
systematic pattern in that sheet, not scattered typos. This directly distorts the 304-FTE programme
total. **Fix:** decide the intended rule per row and reconcile — name the missing resources or
recompute Total FTE from the named roles.

### 4.4 🟠 Contract Year disagrees with its block header — 19 occurrences
**Rule:** a leaf's `Contract Year` should match the `CONTRACT YEAR n` block it sits under.
**Trace:** carry the current block's year while scanning; flag leaves whose `Contract Year` differs.
**Evidence:** all under `Local Site - CONTRACT YEAR 1`: rows tagged Year 2 (`R4–R7, R9–R11`) and Year 3
(`R14–R17, R19…`) — e.g. `Local Site!R4` *Switch Maintenance* tagged Year 2 inside the Year-1 block,
with a Year-1 start date (2026-10-01). STRATA shows the same pattern (Pre-Prod QA / Pipeline
Sustainment tagged Years 2–3 in the Year-1 block).
**Impact:** per-year effort roll-ups mis-bucket this work. The untagged 33 days in §1.2 and these 19
mis-tagged rows mean the Y1–Y5 split is not fully trustworthy until reconciled. **Fix:** align the
`Contract Year` cell to the block, or split the rows into the correct year blocks.

### 4.5 🟠 Single resource loaded above 1.0 FTE — 5 occurrences
**Rule:** a task with one named resource cannot need more than 1.0 FTE of that resource.
**Trace:** flag leaves where `roles named = 1` and `Total FTE > 1.0`.
**Evidence:** `Security Years 1-5!R7, R25, R44, R64, R84` — *Security Assurance (SbD & 453)*, each
**1.63 FTE** against a single *Security Architect* (Daily, 358 days/yr). One named person cannot
deliver 1.63 FTE.
**Impact:** the role is structurally under-resourced every year — this needs ~2 Security Architects,
not 1, or the daily estimate is too high. **Fix:** add the second resource or re-scope the estimate.

### 4.6 🟠 WBS demand not reflected in the `Roles & SFIA` roll-up — 4 occurrences
**Rule:** a role carrying real FTE in the WBS should show non-zero demand in the `Roles & SFIA`
summary tab.
**Trace:** sum each role's FTE across all leaves; cross-check the role's row on `Roles & SFIA`; flag
where WBS FTE > 0.05 but the summary row is all zeros.
**Evidence:** *Security Architect* **~19.8 FTE** in the WBS but **0** in summary (`Roles & SFIA!R27`);
*Service Management Controller* **~12.8 FTE** but the master row (`R41`) is entirely blank; *Software
Lead* ~0.83 and *Business Analyst* ~1.32 likewise 0.
**Impact:** the summary/`Overview` tabs are **stale** — they understate demand for at least these
roles, so any headcount or cost number taken from them is wrong. The `Overview` tab is itself only
"DLZ Contract Year 1" and almost entirely zeros, i.e. a partial roll-up that was never completed.
**Fix:** rebuild the roll-up from the live WBS (e.g. SUMIFS by role), and populate the blank
*Service Management Controller* master row.

### 4.7 🟡 Same role used at inconsistent SFIA levels — 14 roles
**Trace:** collect the set of SFIA levels each role name is paired with across all leaves; flag roles
with >1 distinct level.
**Evidence (examples):** *Platform Engineer* → SFIA 3/4/5/6; *Software Dev* → 3/4/5; *Service Desk
Analyst* → 2/3/4; *Security Architect* → 4/5/6; *Service Management Controller* → 2/3.
**Impact:** mostly legitimate (seniority varies by task) but it prevents a clean role-rate roll-up and
should be confirmed deliberate rather than data drift — especially where the same activity name uses
different levels.

### 4.8 🟡 Leaf task missing a Contract Year — 4 occurrences
**Evidence:** `AIP on ACHE Site 1!R228` *Active Directory*; `Service Management!R24` *Data Feeds*,
`R52` *Problem Reporting*, `R140` *Problem Analysis & Prioritisation*. These contribute the 33
"untagged" days in §1.2. **Fix:** set the Contract Year.

### 4.9 🟡 Exact duplicate rows — 3 occurrences
**Trace:** hash all 24 columns of each leaf within a sheet; flag identical rows.
**Evidence:** `Security Years 1-5` — R81=R61, R82=R62, R83=R63 (*ITHC - AIP on Site 2 / 3 / 1*). The
ITHC block appears twice verbatim. **Impact:** double-counts ITHC effort. **Fix:** delete the
duplicate set (or confirm the second instance belongs to a different year/site and differentiate it).

### 4.10 Calibration note — checks tightened to remove false positives
Two checks were deliberately narrowed so the published counts are trustworthy:
- **Contract Year:** an initial date-derived heuristic produced ~4,400 hits because build sheets start
  off-cycle (Aug) and year boundaries vary. Replaced with the **block-header** comparison → **19** real
  hits (4.4).
- **Duplicates:** a partial-key match flagged ~1,540 rows that are legitimately repeated per-tool
  maintenance lines. Replaced with **all-24-columns-identical** → **3** real duplicates (4.9).

### 4.11 Checks that passed cleanly (negative results worth recording)
- PERT estimate vs `(O+4ML+P)/6` — **0** breaches.
- Annual Effort (Days) vs `Estimate × multiplier` — **0** breaches.
- Annual Effort (% FTE) vs `Days / 220` — **0** breaches.
- Three-point ordering `O ≤ ML ≤ P` — **0** breaches.
- Unknown/blank frequencies — **0** (every Frequency resolves against the `Mapping` tab).
- Roles absent from the master list — **0** (every role used exists in `Roles & SFIA`).

---

## 5. Prioritised remediation plan

| # | Action | Addresses | Effort |
|---|---|---|---|
| 1 | Fix the 2 end-before-start dates | 4.1 (High) | Trivial |
| 2 | Convert text dates → real dates on the 9 sheets; fix the 1 stray DLZ cell | 4.2 (4,696) | Low (bulk) |
| 3 | Reconcile Total FTE vs named roles, starting with AIP Build (153 rows) | 4.3 (308) | Medium — needs planner input |
| 4 | Re-tag the 19 mis-yeared rows + 4 missing-year rows to their block | 4.4 / 4.8 | Low |
| 5 | Resolve the 5 over-1-FTE Security Architect lines (add resource or re-scope) | 4.5 | Decision |
| 6 | Rebuild `Roles & SFIA` / `Overview` roll-ups from the live WBS | 4.6 | Medium |
| 7 | Remove the 3 duplicate ITHC rows | 4.9 | Trivial |
| 8 | Confirm intended SFIA levels per role | 4.7 | Review |

**Bottom line:** the model's maths is solid, but the plan is **not yet decision-ready**. The text-date
typing (4.2), the 308 Total-FTE/role discrepancies (4.3), and the stale roll-up tabs (4.6) mean any
headcount, cost, or timeline figure read straight from the workbook today will be wrong. Items 1–4 and
7 are quick mechanical fixes; items 3, 5 and 6 need a planner's decision before the 304-FTE / 41,452-day
totals can be trusted.

---
*Full line-by-line issue list: `N2C_WBS_Issues_Register.xlsx` (Issue List tab) and `N2C_WBS_Issues_List.csv`.
Re-run `analysis/audit.py` against the source workbook to regenerate every figure in this report.*
