# WEB DESIGN SYSTEM — THE MATCH DAY CLUB

Editorial, dark, confident. Large whitespace, performance-led photography, one green signal.
Tokens: `mdc-tokens.css`. Components: `MDC_Web_Components.svg`. Page layout: `MDC_Homepage_Wireframe.svg`.

## Foundations
- **Ground:** dark by default (`--bg #0A0B0D`). The brand lives on near-black; white is an accent.
- **Colour:** see `mdc-tokens.css` (mirrors the live CSS). Green is a **signal** — CTAs, hovers,
  highlights, the logo stroke — never a large fill. Accent on <10% of any view.
- **Type:** **Anton** display + **Archivo** body. Display in Anton caps for hero/section heads;
  Archivo 400–800 for everything else. Scale is fluid (`clamp`) — see `--fs-*`.
- **Grid:** max width `--maxw 1200px`, fluid `--gutter`. 12-col on desktop, 4-col on mobile.
- **Spacing:** 8-pt scale (`--s-*`). Be generous — whitespace is the premium cue.
- **Radius:** `--radius 18` (cards), `--radius-lg 26` (feature cards), pill buttons.
- **Motion:** subtle, `--ease cubic-bezier(.2,.7,.2,1)`, `--dur .25s`. Lift on hover (translateY -1px),
  green brighten. No bouncy/gimmick motion. Respect `prefers-reduced-motion`.

## Components (`MDC_Web_Components.svg`)
- **Nav** — sticky, `--bg-2`; logo left, links centre/right, **Join the Club** (green pill) right.
- **Buttons** — primary (green, dark text), ghost (ink outline), disabled (muted outline).
- **Pills** — status/labels on `--surface-2` with bright-green text (e.g. "Founder pricing").
- **Tier card** — green top rule, Anton price, ticked feature list, full-width CTA. "Most popular" flag.
- **Item card** — name (Anton), one-line why, retail value in green (transparency).
- **Input + CTA** — pill field + green submit; email capture is the primary conversion.
- **Stats / streak** — big green number, dot streak tracker (gamification).

## Page layout (`MDC_Homepage_Wireframe.svg`)
Nav → Hero (Anton headline + email capture + hero box image) → trust strip → The Promise (5 value
cards) → What's in the box (transparency grid) → Choose your box (two tiers) → How it works (3
steps) → Streak/levels → For parents / FAQ → footer.

## Photography & art direction
- **Performance-led:** real players, real kit, motion and sweat — not stocky studio gloss.
- **Product on matte black**, top-light, single green prop accent; matches the box system.
- Keep imagery dark-keyed so the UI stays on-ground; green only as a real-world accent in shot.
- Duotone/dark grade option for editorial bands; never heavy filters or clichés.

## Accessibility
- Body text (`--ink` on `--bg`) and green-on-dark CTAs meet **WCAG AA**. Do **not** put green text
  on white or small green-on-dark text below AA — switch to ink.
- Visible `:focus-visible` ring (`--green-glow`). Hit areas ≥ 44px. Honour reduced-motion.
- Don't rely on green alone to convey state (pair with text/icon).

## Responsive
- Mobile-first; nav collapses to a sheet; tier cards stack; hero image moves below the headline.
- Fluid type/space tokens scale without breakpoints; add breakpoints only for layout reflow.
