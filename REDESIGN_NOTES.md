# PennyX redesign: implementation notes

Implements `PennyX Landing Page – Art Direction & Redesign Brief` (P0–P3). Not yet run:
this was edited without network access, so `npm install`, `npm run build`, `npm test`
and a visual pass in a browser are still to do.

## Check first (could not be verified without a browser)
- Hero at 1280 / 1440 / 1920: 24px clearance between heading glyphs and artwork strokes;
  heading, full artwork and primary button visible together at 1440×800. Tune
  `lg:mt-24` and `lg:mr-[-6vw]` on the scene box in `Hero.tsx` if the tower crowds line 1.
- `HeroRoute.tsx` starts from the east road stub (computed from the artwork geometry,
  screen point 259.8, 410 in viewBox units). Confirm in the render that this is the stub you want.
- Platform sticky scene: scroll-driven state is set at 1/3 and 2/3 of the scene.
- About: crop is `viewBox="-130 255 300 195"`; adjust if the fountain is off-centre.

## Deviations from the brief
- Hero heading size on mobile: `clamp(1.75rem, 8.4vw, 3rem)` (brief: 9vw) so "Buy and sell USDT," stays on one line at 360px.
- How It Works: the page rail runs straight through; the horizontal route branches from it (T-junction) rather than the rail turning 90°.
- About → Final CTA: the rail ends under the fountain via a horizontal run; the Final CTA elbow joins the first curve's left end. The separate 80px "drop from the coin" is not built.
- `ScrollTrigger` scrub windows follow the brief but are untuned.

## Needs team confirmation
- **Sell flow** (`SELL_STAGES` in `Demo.tsx`) is placeholder copy; no numeric rate is shown for selling.
- "Sell · USDT → payout": payout currency not stated anywhere.
- Legal footer links still point to `#top`.

## Not done
- Preloading Space Grotesk 600 (needs the self-hosted font file URL).
- Optional mobile sticky "Open PennyX" bar.
