# TOOLING — local Adobe automation

Scripts to turn the repo's vector masters into true Adobe-native print files, using your own
local Illustrator. This remote container has no Adobe apps, so these are designed to run on YOUR PC.

## Two ways to use them — pick by effort vs. iteration

| | **A. Run the script in Illustrator** | **B. Full Claude-local install** |
|---|---|---|
| Setup | None (just open the `.jsx`) | Install Claude Code, clone repo, PowerShell/COM |
| Effort | ~2 minutes | ~20–30 minutes one-time |
| Who runs it | You: `File ▸ Scripts ▸ Other Script…` | The local agent, via COM |
| One-shot result | True `.ai/.eps/.pdf` + PNG | **Same** files |
| Iteration / debugging | You, by hand (read Desktop log) | Agent fixes errors, tunes trace, matches Pantone, batches |
| Best when | You just want the export | You want ongoing hands-on help across many assets |

**Recommendation:** start with **A** — it gives you the production files in minutes. Move to **B**
only if you want the agent to iterate (retrace a higher-res source, fix script errors, tune spot
colours, or produce the rest of the brand/packaging assets).

> Quality note: with either path, the *artwork* is only as sharp as the source you feed it. The
> repo masters derive from the 160px web logo. The single biggest upgrade is dropping a
> **higher-resolution logo** on your machine and running `image_trace.jsx`.

## Files
- `illustrator/build_master.jsx` — opens the clean vector master, sets brand **spot colours**,
  converts to CMYK, exports `.ai / .eps / print .pdf / 4× .png`. Zero-config via `File ▸ Scripts`.
- `illustrator/image_trace.jsx` — Illustrator's native Image Trace on a higher-res raster you set.

Full step-by-step (Windows 11 first): `LOCAL_SETUP.md`.
