# LOCAL SETUP — run Claude on your Windows 11 PC and drive Illustrator/Photoshop

This session runs in a remote Linux container that **cannot reach your PC or your Adobe apps**.
To use the Illustrator/Photoshop you bought, run Claude Code **locally** so the agent executes on
your machine, with access to your files and your apps.

> Platform: **Windows 11**. (macOS notes at the bottom.)

---

## 1. Install Claude Code on Windows 11

```powershell
winget install Anthropic.ClaudeCode
# or native installer:  irm https://claude.ai/install.ps1 | iex
claude --version
claude doctor                      # checks install + auth
```
Tips: [Git for Windows](https://git-scm.com/downloads/win) is recommended (gives Claude a Bash
shell; otherwise it uses PowerShell). WSL 2 also works and sandboxes better, **but** Adobe apps run
on native Windows — so if you want the agent to drive Illustrator, run `claude` in **native
PowerShell**, not inside WSL.

## 2. Get this repo onto your PC

```powershell
git clone <your PnP repo URL>
cd PnP
git checkout claude/project-atlas-matchday-7cuy8y
claude                              # start Claude Code in this folder
```
The local agent can now read/write `Project Atlas\**` and run commands on your PC.

## 3. Drive Illustrator — Method A (reliable, version-proof)

No COM, no version specifics. With **Illustrator open**:
1. `File ▸ Scripts ▸ Other Script…`
2. Pick `Project Atlas\00_Admin\Tooling\illustrator\build_master.jsx`.
3. It runs and writes a log to your **Desktop** (`mdc_illustrator_log.txt`).

(Or copy the `.jsx` into Illustrator's Scripts presets folder so it shows directly in the
`File ▸ Scripts` submenu — typically
`C:\Program Files\Adobe\Adobe Illustrator 2026\Presets\en_US\Scripts\`. The version folder name
matches your install.)

Before running, open the `.jsx` and set the `REPO` path in its CONFIG block to your repo, e.g.
`var REPO = "C:/Users/<you>/PnP/Project Atlas";` (ExtendScript accepts forward slashes on Windows).

## 4. Drive Illustrator — Method B (full automation, for the local agent)

Illustrator exposes a **COM** object, so the agent can run a `.jsx` from PowerShell without you
clicking. Illustrator must be **open**.

```powershell
# 1) find the exact ProgID on your machine (versions vary):
Get-ChildItem 'HKLM:\SOFTWARE\Classes' -ErrorAction SilentlyContinue |
  Where-Object { $_.PSChildName -like 'Illustrator.Application*' } | Select-Object PSChildName

# 2) run a .jsx (DoJavaScript takes the script as a string):
$ai = New-Object -ComObject Illustrator.Application      # or the version-specific ProgID from step 1
$jsx = Get-Content ".\Project Atlas\00_Admin\Tooling\illustrator\build_master.jsx" -Raw
$ai.DoJavaScript($jsx)
```
If `New-Object -ComObject Illustrator.Application` errors, use the exact ProgID from step 1 (e.g.
`Illustrator.Application.29`). **Ask the local Claude agent to do step 1 first, then run step 2** —
it will resolve the version automatically and read the Desktop log to confirm success.

Photoshop is the same pattern via `Photoshop.Application` (it also supports `File ▸ Scripts`).

## 5. What to ask the local agent

> "Make sure Illustrator is open. Find the Illustrator COM ProgID, fix the CONFIG paths in
> `build_master.jsx` for this PC, run it via PowerShell, read `Desktop\mdc_illustrator_log.txt`,
> and confirm the `.ai/.eps/.pdf` exported into `08_Exports\Print`. Then help me match the green
> to a Pantone from my fan deck."

## Gotchas (Windows)
- **App must be running** — no headless Illustrator/Photoshop.
- **ProgID varies by version** — use the discovery command above; don't hard-code.
- **Errors don't surface in the shell** — the scripts log to the Desktop; have the agent read it.
- **UAC / first COM use** may prompt once to allow automation.
- **Pantone** — scripts set *approximate* CMYK; confirm exact spot colours against a physical book.
- **Source resolution** — masters derive from the site's 390px logo. A higher-res *original* would
  sharpen them via `image_trace.jsx`, but it is optional; the current masters are production-usable.

## What's in this kit
- `illustrator/build_master.jsx` — clean vector → true `.ai/.eps/.pdf` + 4× PNG with brand **spot colours**.
- `illustrator/image_trace.jsx` — Illustrator's native Image Trace on a higher-res source you supply.

## macOS (if you switch)
Install: `curl -fsSL https://claude.ai/install.sh | bash`. Drive Illustrator with
`osascript -e 'tell application "Adobe Illustrator" to do javascript (read file POSIX file "/abs/path.jsx")'`,
or `File ▸ Scripts ▸ Other Script…`. Grant Automation/Accessibility permission on first use.

## Docs
- Claude Code: https://code.claude.com/docs/en/quickstart · https://code.claude.com/docs/en/setup
- Illustrator scripting: https://helpx.adobe.com/illustrator/using/automation-scripts.html
- Photoshop scripting: https://helpx.adobe.com/photoshop/using/scripting.html
