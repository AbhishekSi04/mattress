Custom Mattress PNG Assets — Image Generation Prompt

Goal: Create high-quality PNG assets to visually compose a custom mattress preview in the builder UI. Each PNG should be exported with transparent background and consistent perspective so layers stack naturally.

1) Overview of required assets
- mattress-base.png — top-down (slightly isometric) mattress outline showing box-edge and subtle shadow. Size: 2000x1200 px, transparent background.
- cover-top.png — fabric texture for the mattress cover (stitched pattern), tileable, transparent outside the mattress shape.
- layer-comfort.png — illustration of a comfort foam layer (soft, plush texture). 2000x400 px.
- layer-transition.png — transitional foam layer (denser texture). 2000x300 px.
- layer-support.png — coil/core support layer (visual with subtle spring icons). 2000x300 px.
- layer-placeholder.png — generic layer tile for quick prototyping.
- size-labels (twin, full, queen, king) as separate 400x100 PNGs.

2) Visual style and constraints
- Perspective: Use a mild isometric/top-down perspective where the mattress width is horizontal and the depth height is short; layers should be horizontal bars that stack vertically when rendered.
- Lighting: soft studio lighting from top-left. Use subtle drop shadows so stacked layers have clear separation.
- Color palette: soft neutral base (off-white, light gray) for cover; distinct but harmonious pastel accents for layers (e.g., soft cream, gentle blue, mint green).
- Text and icons: use clean sans-serif (Inter or Roboto). Include small iconography for support layer (spring), cooling indicators for top layers (snowflake), etc.
- Output: export PNGs with transparent backgrounds at 300 DPI. Also provide WebP versions optionally.

3) Layer composition notes
- All layer PNGs should share the same width and horizontal alignment so they can be stacked without repositioning. Provide 2000px width and variable height (approx 200-400px) for each layer.
- Each layer should include a subtle front bevel and inner texture to suggest material (foam vs coil).

4) Naming and variations
- Provide "_soft", "_medium", "_firm" variations for major layer types (comfort, transition, support). Example: layer-comfort_soft.png, layer-comfort_medium.png
- Provide a neutral grayscale version for printing or UIs that require muted colors.

5) Example prompt for an image generator (one-per-asset)

"Create a 2000x400 PNG of a plush comfort foam mattress layer designed for stacking in a top-down isometric mattress builder UI. The layer should have a soft cream color, subtle fabric texture, and a gentle beveled front edge. Lighting from top-left, soft shadows, transparent background. Include a small snowflake cooling icon in the right corner. Export at 300 DPI with transparent background."

6) Deliverables
- PNG files named exactly as in section (1).
- Optional SVGs for icons (spring, snowflake).
- A preview PSD/FIG file with layers aligned for final adjustments.

Use these prompts with your preferred image generation tool (Midjourney, DALL·E, Stable Diffusion with img2img, or Figma/Illustrator). Adjust the color and texture parameters to keep assets consistent across the set.
