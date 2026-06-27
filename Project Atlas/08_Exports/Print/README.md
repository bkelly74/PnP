# PRINT EXPORTS — large-format master

Geometric, resolution-independent vectors of the shield mark for large-format print
(banners, boards, vehicle livery, signage) where edges must stay razor-sharp at scale.

| File | Use |
|------|-----|
| `MDC_Shield_Master_Print.svg` | Full-colour mark (Ink `#F5F7F8` + Green `#8BC63F`) on dark grounds. |
| `MDC_Shield_Mono_Print.svg` | One-colour (`#0A0B0D`) for single-ink / light grounds — recolour as needed. |

## How these differ from `01_Brand/Logo/MDC_Shield_Master.svg`
- The Logo-folder master is a **curve trace** of the live logo — smooth and faithful at screen
  sizes, and it keeps the green's two-tone bevel.
- These print masters are a **geometric reconstruction**: the live logo was traced in polygon
  mode, then every edge was **RDP-regularised to a true straight line**. So they stay perfectly
  crisp at billboard scale (no traced-pixel wobble), at the cost of the green bevel (flat green).

## Honest limitation
Both are derived from the brand's live logo raster (`assets/logo-shield.png`, 390×445 px). The print masters have
**clean straight edges** (resolution-independent), but their vertex *positions* are still measured
from that source. For pixel-exact proportions at the largest scales, request the owner's true
master vector (AI/EPS) and replace these 1:1 (DR-016).
