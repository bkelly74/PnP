# N2C Expanded WBS — Analysis

Data-quality & integrity analysis of `N2C_Expanded_WBS.xlsx`, run in the same style as the LTQ
functionality-integration planning analysis: a full issues list plus a detailed, reproducible report
with trace steps.

| File | What it is |
|---|---|
| **`N2C_WBS_Analysis_Report.docx`** | Detailed report (Word) — calculation model, methodology, findings with trace steps, remediation plan |
| **`N2C_WBS_Issues_Register.xlsx`** | Formatted register — Summary tab + filterable 5,055-row Issue List with cell references |
| **`N2C_WBS_Issues_List.csv`** | Full issues list as plain CSV |
| **`analysis/audit.py`** | Reproducible analysis engine — re-run against the source workbook to regenerate every figure |

**Headline:** 5,526 leaf tasks across 17 WBS sheets · **5,055 issues** (2 High · 5,032 Medium · 21 Low).
The arithmetic (PERT, annual effort, %FTE) is 100% internally consistent; the issues are data hygiene,
resourcing logic, and cross-tab integrity. Top items: 4,696 dates stored as text on 9 sheets, 308 rows
where Total FTE implies more resources than are named, 2 end-before-start dates, and stale roll-up tabs.

To reproduce: `pip install openpyxl && python3 analysis/audit.py` (point the `F=` path at the source workbook).
