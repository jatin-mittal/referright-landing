# RightRefer Landing Page Design System

This document is the visual and interaction source of truth for RightRefer landing pages. Use it before creating or modifying any public-facing page so typography, color, spacing, components, motion, responsiveness, accessibility, and content remain consistent.

The implemented reference is the Astro site in `C:\Project\referright-landing`. When this document and the implementation differ, confirm whether the implementation change was intentional, then update both together.

## 1. Design direction

RightRefer should feel:

- Premium without appearing exclusive or ornamental.
- Human and trustworthy rather than aggressively transactional.
- Calm, spacious, and deliberate.
- Professional without looking like traditional enterprise software.
- Warm enough for relationship-led referrals while remaining credible for large customers.
- Motion-rich only where movement clarifies a journey, state, or opportunity.

The core visual contrast is:

- Warm cream for human, editorial, and explanatory moments.
- Pale blue for discovery, systems, and process.
- Deep blue for trust, proof, and closing moments.
- Orange for brand recognition, calls to action, and active states.

Avoid:

- Dense dashboards as the primary visual language.
- Excessive gradients, glass panels, borders, or shadows.
- Small text used only to appear sophisticated.
- Multiple unrelated accent colors in one component.
- Animation without a communication purpose.
- Generic startup illustrations when a real product story can be shown.

## 2. Technology and design sources

| Area | Source |
| --- | --- |
| Global tokens and component styling | `src/styles/global.css` |
| Page composition and client lifecycle | `src/pages/index.astro` |
| Brand component | `src/components/Brand.astro` |
| Section heading component | `src/components/SectionIntro.astro` |
| Company visualization | `src/components/CompanyField.astro` |
| Community proof | `src/components/TestimonialStage.astro` |
| Animated product stories | `src/components/remotion/RightReferScenes.tsx` |
| Remotion lifecycle and responsive selection | `src/components/remotion/RemotionPlayer.tsx` |
| Metadata and global asset loading | `src/layouts/BaseLayout.astro` |
| Primary logo | `public/rightrefer-logo.png` |
| Typeface | `public/Louize.ttf` |
| Hero media | `public/hero-hands.mp4`, `public/hero-hands-poster.jpeg` |

The site uses handwritten CSS rather than a CSS framework. New work should reuse existing custom properties and selectors before introducing new visual values.

## 3. Brand identity

### 3.1 Product name

Always write the product name as **RightRefer**:

- Capital `R` in `Right`.
- Capital `R` in `Refer`.
- No space.
- Do not use ReferRight, Right Referral, or other variations as the product name.

### 3.2 Logo

Use `/rightrefer-logo.png`, which contains the transparent RightRefer symbol.

Logo rules:

- Preserve the transparent background.
- Use `object-fit: contain`.
- Never stretch, crop, recolor, rotate, or add effects to the artwork.
- Keep the symbol visually aligned with the wordmark.
- Use sufficient surrounding space; do not let adjacent text or edges touch the symbol.
- The current image treatment uses `transform: scale(0.92)` inside its mark container.
- The logo is also the browser favicon.

### 3.3 Wordmark

The HTML wordmark is composed of two spans:

```html
<span class="brand-right">Right</span><span class="brand-refer">Refer</span>
```

Default light-background treatment:

- Both words use brand orange.
- The weight is bold in general branding and `900` in hero/docked controls.

Dark-background treatment:

- `Right` remains orange.
- `Refer` changes to peach `#f3a17c`.
- Use this inverse treatment only on deep-blue backgrounds.

### 3.4 Brand component contexts

The same `Brand.astro` component appears in three contexts:

1. **Hero brand:** centered, transparent, borderless, and split into an independently movable logo plus a stationary wordmark.
2. **Docked logo:** only the logo moves into the fixed top-right cluster; the wordmark remains in its original hero structure.
3. **Footer brand:** inverse treatment on the deep-blue footer.

Do not move or duplicate the hero wordmark during docking. The logo must retain exactly the same rendered size and appearance before, during, and after its transition.

## 4. Color system

### 4.1 Canonical CSS tokens

```css
:root {
  --color-primary: #c43a00;
  --color-primary-hover: #aa3000;
  --color-primary-tint: #fce7db;

  --color-blue-950: #0b2638;
  --color-blue-900: #12384f;
  --color-blue-800: #1b4a65;
  --color-blue-700: #2b6381;
  --color-blue-200: #cddfe7;
  --color-blue-100: #e7f0f4;
  --color-blue-50: #f2f7f9;

  --color-bg: #fff7ed;
  --color-surface: #fffdf9;
  --color-ink: #201812;
  --color-ink-muted: #6b6155;
  --color-border: #e7dccd;
  --color-success: #2f7a4d;
}
```

### 4.2 Supporting colors

| Color | Value | Use |
| --- | --- | --- |
| Accent on dark | `#f3a17c` | Eyebrows and selected brand text on deep-blue surfaces |
| Hero text | `#17120f` | High-contrast headline over treated video |
| Warm text on dark | `#fffaf3` | Buttons and copy on deep-blue panels |
| Prototype note | `#596c75` | Secondary implementation/disclaimer notes |

When the system is refactored, promote repeated supporting colors to named custom properties rather than duplicating raw values.

### 4.3 Usage rules

- Use orange for the primary action, selected state, active progress, link emphasis, and brand accents.
- Use `--color-primary-hover` only for interactive hover/pressed progression.
- Use `--color-primary-tint` for soft orange backgrounds, not large page sections.
- Use deep blue for high-trust proof, metrics, and closing sections.
- Use pale blue for discovery canvases, process explanations, and alternating section rhythm.
- Use success green only for positive completion, refund reassurance, and confirmed submission states.
- Use muted ink for secondary explanatory copy; never use it where contrast becomes marginal.
- Use peach rather than dark orange for text accents on deep-blue surfaces.

### 4.4 Remotion color synchronization

`RightReferScenes.tsx` contains a JavaScript `colors` object because Remotion scenes use inline styles. It mirrors the CSS palette.

Whenever any brand color changes:

1. Update `:root` in `global.css`.
2. Update `colors` in `RightReferScenes.tsx`.
3. Check all Remotion scenes and static components together.

These two palettes must never drift.

## 5. Typography

### 5.1 Font family

All text uses the self-hosted **Louize** typeface:

```css
@font-face {
  font-family: 'Louize';
  src: url('/Louize.ttf') format('truetype');
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
```

Semantic stacks:

```css
--font-display: 'Louize', Georgia, serif;
--font-body: 'Louize', Georgia, serif;
--font-mono: 'Louize', Georgia, serif;
```

The display, body, and mono variables currently resolve to the same font. Their names communicate intent and leave room for a later type-system expansion.

### 5.2 Type hierarchy

| Role | Size | Weight | Line height / spacing |
| --- | --- | --- | --- |
| Hero H1 | `clamp(3.5rem, 6.2vw, 5.7rem)` | `400` | `0.88`, `-0.055em` tracking |
| Section H2 | `clamp(2.25rem, 3.9vw, 3.55rem)` | Display weight | Tight editorial leading |
| Path-card H3 | `clamp(2.05rem, 3.35vw, 3rem)` | Display weight | Tight leading |
| Closing H2 | `clamp(2.7rem, 4.5vw, 4.2rem)` | Display weight | Tight leading |
| Beta metric | `clamp(4.8rem, 8vw, 7.4rem)` | Display emphasis | Compact |
| Hero body | `1.12rem` desktop / `1.02rem` mobile | `600` | `1.66` |
| Section body | About `0.98rem` | Normal/medium | `1.72` |
| Buttons | `0.84rem` base | `700` | Compact |
| Hero wordmark | `52px` desktop/mobile, `46px` at ≤340px | `900` | Louize, no underline |
| Hero CTA | `1.913rem` desktop / `1.756rem` mobile | `900` | Remains in hero |
| Eyebrows/labels | `0.7rem–0.78rem` | `700` | Uppercase, `0.09em–0.15em` tracking |

Mobile adjustments:

- Hero H1 becomes `clamp(2.95rem, 13vw, 3.8rem)`.
- Hero copy becomes `1.02rem`.

### 5.3 Typography rules

- Headlines should be short, editorial, and highly legible.
- Use sentence case for headings and buttons.
- Reserve uppercase plus wide letter spacing for eyebrows, labels, and small navigation cues.
- Keep body copy to a comfortable line length, generally `610px` or less.
- Do not reduce supporting text below the established small-text floor to create visual hierarchy.
- Use weight, spacing, color, and placement before introducing another type size.
- Avoid long bold paragraphs. Bold only the phrase carrying the decision or reassurance.
- Hero underline accents use orange while the letters remain black.

## 6. Layout system

### 6.1 Content shell

The universal content width is:

```css
--shell: min(1180px, calc(100vw - 56px));
```

Apply through:

```css
.section-shell {
  width: var(--shell);
  margin-inline: auto;
}
```

Responsive shell:

- At `1020px` and below: `min(100% - 40px, 860px)`.
- At `700px` and below: `calc(100% - 32px)`.

Do not invent independent max-widths for ordinary sections. Use the shared shell and narrower internal max-widths only for copy readability.

### 6.2 Section spacing

- Standard major-section vertical padding: approximately `116px–120px`.
- Mobile major-section vertical padding: `88px`.
- Hero occupies at least `100svh`.
- Hero content gap: approximately `46px` desktop and `38px` mobile.
- Hero brand and CTA are additionally separated from the content center by `45px` in opposite directions.

Spacing rules:

- Reuse existing gaps before introducing arbitrary values.
- Keep paired columns equal in top/bottom padding.
- Align headings, body copy, and cards to a visible grid.
- Prefer fewer large, intentional spaces to many small corrective margins.
- When two panels communicate equal roles, match their height and internal rhythm.

### 6.3 Grid behavior

- Two-column feature and path layouts collapse to one column on mobile.
- Community proof uses an asymmetric desktop ratio to give testimonials more room.
- Appreciation uses an asymmetric copy/player ratio and collapses progressively.
- Footer uses three columns on desktop and one centered column on mobile.
- Equal-role cards should share row height.

## 7. Section background rhythm

Use alternating backgrounds to separate ideas without adding heavy containers:

1. **Hero:** full-bleed treated video over warm cream.
2. **Companies worth following:** `--color-blue-100`.
3. **Community proof:** `--color-bg`.
4. **Candidate and referrer paths:** `--color-blue-50`.
5. **Signal/product email:** `--color-surface`.
6. **Connected journey:** `--color-blue-100`.
7. **Optional appreciation:** `--color-bg`.
8. **Closing and footer:** `--color-blue-950`.

Do not repeat the same background for several adjacent major sections unless the transition is intentionally seamless. Use hairline borders only where the background transition needs definition.

## 8. Radius, borders, and shadows

### 8.1 Radius tokens

```css
--radius-sm: 12px;
--radius-md: 18px;
--radius-lg: 28px;
--radius-xl: 38px;
```

Usage:

- `12px`: compact controls and small supporting UI.
- `18px`: medium controls and callouts.
- `28px`: primary cards, panels, Remotion frames, metric blocks.
- `38px`: the large company visualization canvas.
- `999px`: buttons, pills, badges, and circular tracks.

### 8.2 Borders

- Default hairline: `1px solid var(--color-border)`.
- Blue panels may use translucent blue borders.
- Glass elements may use translucent white borders.
- Hero brand and Get Started controls are intentionally borderless.
- Spawn zones inside the company canvas must remain invisible: no border and no background.

### 8.3 Shadows

```css
--shadow-soft: 0 22px 70px rgb(42 52 56 / 9%);
--shadow-panel: 0 28px 80px rgb(18 56 79 / 12%);
```

Use `--shadow-soft` for light cards and hover elevation. Use `--shadow-panel` for larger blue panels and product-story frames.

Shadow rules:

- Shadows must be broad and low-opacity.
- Avoid small dark drop shadows.
- Use one dominant elevation level per component.
- Do not combine a strong border, dark shadow, and opaque background on the same element.

## 9. Buttons and interactive links

### 9.1 Solid primary button

Base `.button`:

- Inline flex, vertically centered.
- Minimum height `50px`.
- Pill radius.
- `11px` content gap.
- `0.84rem`, weight `700`.

Primary treatment:

- Background: `--color-primary`.
- Text: `#fffaf3`.
- Shadow: `0 14px 34px rgb(196 58 0 / 24%)`.
- Hover background: `--color-primary-hover`.
- Hover shadow: `0 18px 42px rgb(196 58 0 / 29%)`.

Large treatment:

- Minimum height `56px`.
- Horizontal padding `29px`.

### 9.2 Hero/docked ghost CTA

The hero Get Started control is a special morphing variant:

- Transparent background.
- No border.
- No persistent shadow.
- Brand orange.
- Weight `900`.
- Larger than the previous control treatment while remaining subordinate to the wordmark.
- A subtle repeating horizontal arrow nudge communicates action.
- Hover uses an `8%` tint of the active control color.

Do not replace this with the solid primary button unless the hero design is intentionally redesigned.

### 9.3 Text links

- Weight `700`.
- Compact size near `0.88rem`.
- No default background or border.
- Arrow moves `3px` horizontally on hover.

### 9.4 Icon style

UI arrows and checks use hand-drawn stroke SVGs:

- `16 × 16` or `32 × 32` view boxes.
- Stroke width approximately `1.45–1.7`.
- Rounded line caps and joins.
- No fill unless the icon specifically requires it.

Use Simple Icons only for company marks, not for general interface chrome.

## 10. Hero system

### 10.1 Media treatment

- Video: `/hero-hands.mp4`.
- Poster/reduced-motion frame: `/hero-hands-poster.jpeg`.
- `object-fit: cover`.
- Opacity `0.72`.
- `saturate(0.62) contrast(1.08)`.
- Desktop scale `1.3`.
- Mobile scale `1.42` and `object-position: 56% center`.
- Playback rate is `0.5`.
- Plays exactly once.
- Does not loop.
- Holds the final frame after playback completes.

The hero uses cream radial and linear overlays controlled by local `--hero-darkness: 0.4`. The treatment should keep the image visible while ensuring black text remains readable.

Do not add a visible oval, card, or box behind the entire hero message.

### 10.2 Composition

Order:

1. RightRefer logo and wordmark.
2. Main headline.
3. Supporting copy.
4. Get Started control.
5. Bottom scroll cue on desktop.

The brand and CTA should feel like matching parts of one control system:

- Same boldness.
- Same transparent treatment.
- Complementary visual weight, with the wordmark intentionally larger.
- Equal but opposite vertical offset around the main message.
- The logo size remains unchanged while the wordmark and CTA use independent type sizes.

### 10.3 Headline

Current headline:

> The right Referral.  
> At the Right time.

Rules:

- Text remains black.
- Underline only `Refer` in “Referral” and `Right` in the second line.
- Underline color is brand orange.
- Underline thickness is `0.08em`.
- Underline offset is `0.1em`.
- Maintain the two-line editorial composition.

### 10.4 Supporting copy

Maximum width: `610px`.

Use dark text at approximately `88%` opacity with a soft cream text shadow for readability over the video. Keep the copy direct and outcome-led.

### 10.5 Entrance motion

Use `hero-enter`:

- Start at `opacity: 0` and `translateY(14px)`.
- End at full opacity and original position.
- Duration roughly `650–700ms`.
- Use `--motion-ease`.
- Stagger elements in reading order.

### 10.6 Scroll cue

- Anchored near the hero bottom.
- Uppercase, widely tracked small label.
- Includes a vertical line animated top-to-bottom over `2s`.
- Hidden on mobile.

## 11. Scroll-linked logo dock

The site creates a persistent-header effect without a visible navigation container.

### 11.1 Structure

- The hero brand is split into a logo link and a separate wordmark link.
- A logo-home placeholder preserves the wordmark position when the logo leaves.
- The hero contains the live logo, wordmark, and CTA.
- An empty fixed far-right slot acts as the logo docking target.
- JavaScript physically reparents only the logo.
- The wordmark remains in the hero and scrolls naturally with that section.
- The Get Started CTA remains in the hero and scrolls naturally with it.
- The outer fixed cluster remains visually transparent.

### 11.2 Scroll-linked motion

The logo transition is scrubbed directly by scroll position:

1. The logo remains beside the wordmark until its natural position reaches the top dock line.
2. It is then pinned at the top and moves horizontally toward the far-right slot.
3. It reaches the final far-right position by the end of the hero.
4. Scrolling backward reverses the exact path.
5. At the start boundary it reattaches to its home placeholder with a small fractional-pixel snap tolerance.

Updates are batched through `requestAnimationFrame`. Do not replace this with a threshold-triggered one-time animation; the position must remain proportional to hero scroll progress in both directions.

### 11.3 Final dimensions

Desktop base:

- Logo: `53.68px`.
- Hero wordmark: `52px`.
- Hero brand area: `390px`.
- Hero brand lift: `110px`.
- CTA: `1.913rem`, `250px × 78px`.

Mobile base:

- Logo: `45.6px`, matching its previous mobile size.
- Hero wordmark: `52px`.
- Hero brand area: `min(340px, calc(100vw - 32px))`.
- Hero brand lift: `110px`.
- CTA: `1.756rem`, `210px × 68px`.

Very narrow screens at `340px` reduce the wordmark to `46px`; the logo remains unchanged.

Related properties:

```css
--hero-logo-size: 53.68px;
--hero-brand-font-size: 52px;
--hero-brand-width: 390px;
--hero-brand-lift: 110px;
--hero-cta-font-size: 1.913rem;
--hero-cta-width: 250px;
--hero-cta-height: 78px;
--hero-control-spread: 45px;
--hero-control-color: var(--color-primary);
```

The temporary size slider and color toggle have been removed and must not be restored on public pages.

## 12. Section introduction

`SectionIntro.astro` provides:

- Eyebrow.
- H2 heading.
- Optional supporting copy.
- Left or centered alignment.

Centered intros:

- Heading/copy centered.
- Overall max-width around `700px`.
- Copy max-width around `620px`.

On mobile, centered introductions become left-aligned to improve scanning.

The component currently exposes `light` and `dark` theme classes without implemented CSS variants. Do not rely on the theme prop until those styles exist.

## 13. Companies worth following visualization

### 13.1 Canvas

- Height `440px` desktop and `470px` mobile.
- Completely transparent background.
- No outer border, radius treatment, dotted grid, or glow.
- The pale-blue section background remains visible through the visualization.

Company names/logos and one restrained center caption are visible inside the positioning area.

### 13.2 Spawn zones

There are four internal logical quadrants:

- Top left.
- Top right.
- Bottom left.
- Bottom right.

Rules:

- The zones are structural only.
- Their backgrounds and borders must remain invisible.
- Show exactly eight companies at a time.
- Place exactly two companies in each quadrant.
- Randomize each company within a safe sub-range of its assigned logical slot.
- Prevent clipping and overlap.

### 13.3 Company cards

- Positioned absolutely using `--field-x`, `--field-y`, and `--field-delay`.
- Fade and scale into position over about `480ms`.
- Float vertically by approximately `7px` over `5.4s`.
- Use authentic company SVG marks and brand colors from Simple Icons.
- Use transparent cards with no border or shadow so only the logo and company name remain visible.
- Resting saturation `0.78`; hover saturation `1.2`.

The default cycle is a `480ms` fade-in, `2600ms` fully visible gap, and `480ms` fade-out before the next randomized set. Desktop and mobile use separate bounded random ranges that preserve two companies per quadrant and keep the center caption clear.

Temporary review controls currently expose:

- Shared fade-in/fade-out duration: `100–1800ms`.
- Fully visible time gap between fades: `200–7000ms`.
- Company item scale: `70–170%`.

The controls persist through `sessionStorage`. After final values are approved, lock them into CSS/JavaScript and remove the tuner markup, styles, listeners, and storage keys.

### 13.4 Center caption

- Text: “Opportunities move. RightRefer keeps you close.”
- Positioned at the true center.
- Warm translucent surface, subtle border and broad low-opacity shadow.
- `backdrop-filter: blur(14px)`.
- Company randomization ranges must prevent overlap with it.

## 14. Community proof and testimonials

### 14.1 Layout

Desktop ratio:

- Metric panel: approximately `0.72fr`.
- Testimonial panel: approximately `1.55fr`.

Tablet ratio becomes approximately `0.82fr / 1.4fr`. Mobile stacks vertically.

### 14.2 Beta metric panel

- Deep blue `--color-blue-900`.
- Radius `--radius-lg`.
- Large editorial number.
- Decorative orbit rings at approximately `410px` and `260px`.
- Count-up lasts `1050ms`.
- Use cubic-out progression.
- Trigger once when at least `55%` visible.

If the value is unverified, do not present it as production evidence.

### 14.3 Testimonial marquee

- Transparent outer panel with no border or shadow.
- Individual testimonial cards retain their warm surface, border, accent edge, and shadow.
- Horizontal lanes with left/right fade masks.
- Duplicate each batch for seamless looping.
- Alternate movement direction by lane.
- Duration `25s`, linear, infinite.
- Start paused and play only while visible and the document is active.
- Pause on hover and keyboard focus.

Accent variants:

| Variant | Value |
| --- | --- |
| Blue | `#4d7e98` |
| Orange | `--color-primary` |
| Sage | `#6f927f` |
| Plum | `#846f88` |

The accent drives the card edge and avatar treatment. Do not add more variants unless the palette remains restrained.

Duplicate looping cards must use `aria-hidden="true"` and disappear under reduced motion.

## 15. Candidate and referrer path cards

Use a two-card equal-height grid.

Shared card treatment:

- `--color-surface`.
- Radius `--radius-lg`.
- Default border.
- Seeker image: `/path-seeker.jpeg`.
- Referrer image: `/path-giver.jpeg`.
- Background-image opacity: `0.75`.
- Matching `blur(1px)` and saturation `0.905`.
- Warm directional overlay at `0.495` opacity keeps all content readable.
- Soft decorative radial glow remains below the overlay.
- Hover lift `translateY(-4px)`.
- Hover border `#d5c6b2`.
- Hover shadow `--shadow-soft`.

Semantic variants:

- **Candidate/seeker:** orange accent and `--color-primary-tint` glow.
- **Referrer/giver:** blue-700 accent and `#dbeaf0` glow.

Do not add decorative top-right icons or highlight pills to these cards. The imagery, copy, step number, and one text CTA provide the complete hierarchy.

Do not use red/green to distinguish candidate and referrer roles; orange/blue is the established pair.

## 16. Product-story frames and Remotion scenes

### 16.1 Frame treatment

All product-story frames use:

- `overflow: hidden`.
- Radius `--radius-lg`.
- Shadow `--shadow-panel`.
- Subtle translucent blue border.
- No visible Remotion controls.

Aspect ratios:

| Scene | Desktop | Compact |
| --- | --- | --- |
| Signal/Gmail | `1280 / 800` | `760 / 840` |
| Connected journey | `1280 / 680` | `760 / 900` |
| Appreciation | `900 / 640` | `760 / 700` |

The compact breakpoint is `700px` in both CSS and `RemotionPlayer.tsx`. Keep both values synchronized.

### 16.2 Playback behavior

- `30fps`.
- Autoplay and loop while visible.
- Pause below `25%` viewport visibility.
- Pause while the browser tab is hidden.
- No click-to-play, fullscreen, spacebar, or visible player controls.
- Expose the scene as a descriptive `role="img"` rather than an interactive video.
- Under reduced motion, freeze on the last frame and disable autoplay/loop.

### 16.3 Shared scene primitives

`RightReferScenes.tsx` uses:

- **Card:** warm surface, border, `22px` radius, broad low-opacity shadow.
- **Pill:** blue, orange, green, or neutral; full pill radius; bold compact label.
- **Avatar:** circular initials with semantic color.
- **Brand marks:** Gmail and Microsoft assets.
- **MailTopbar:** simplified Gmail-style chrome.

Scene animation helpers:

- `reveal`: fade plus upward movement, usually `14px`.
- `pop`: fade plus scale from `0.92` to `1`.
- Spring selection: damping `14`, stiffness `145`.

### 16.4 Signal story

Duration: `240` frames / `8s`.

Narrative:

1. A recognizable inbox is shown.
2. Rows populate progressively.
3. A timely role opens.
4. A strong-match and skills-context message explains why it matters.

Keep the story specific enough to feel real but visually simplified enough to understand without interaction.

### 16.5 Connected referral journey

Duration: `210` frames / `7s`.

Stages:

1. Follow Microsoft.
2. Pick referrers.
3. Track referral.

Use orange active badges and progress connectors. The sequence should communicate one connected journey, not three unrelated cards.

### 16.6 Optional appreciation

Duration: `210` frames / `7s`.

Options:

- Coffee.
- Pizza.
- Custom.

Button states:

1. Pay Now — orange.
2. Submit referral request — deep blue.
3. Submitting referral request...
4. Referral request sent successfully — success green.

Always include the independence message:

> Referrers decide independently. Appreciation never guarantees a referral.

## 17. Appreciation section

Desktop ratio:

- Copy: approximately `0.75fr`.
- Product story: approximately `1.25fr`.

The copy side includes:

- Clear explanation that sending a referral request is free.
- Optional appreciation positioned as gratitude, not payment for an outcome.
- Green-dot principle list.
- Refund callout on a pale-blue surface.

Green-dot treatment:

- `7px` circle.
- `--color-success`.
- `5px` soft green halo.

The section must clearly communicate:

1. Referral requests are free.
2. Coffee or another thank-you is optional.
3. Appreciation may encourage engagement.
4. It never guarantees a referral.
5. Referrers make independent decisions.

## 18. Closing section

### 18.1 Background

- `--color-blue-950`.
- Bottom-anchored radial glow.
- Near-white body copy.
- Peach accents.

### 18.2 Decorative field

- Large static rings.
- Three visible pulse dots.
- Slow `18s` field rotation.
- Individual pulse animations around `7s` with staggered delays.

Decorative elements must remain `aria-hidden`.

### 18.3 Feedback message

The closing section is a feedback invitation, not a product-flow recap:

> Your feedback matters. Help us make RightRefer better.

Supporting copy should explain that ideas, friction points, and honest experiences help improve the referral journey.

### 18.4 Write to Us card

- Translucent light background and border.
- `backdrop-filter: blur(12px)`.
- Small `translateY(-2px)` hover lift.
- Arrow follows the shared horizontal-nudge convention.
- Primary label: **Write to Us**.
- Show `hello@referright.com` as the supporting destination.
- Use a direct `mailto:` action rather than introducing a generic contact form.

## 19. Footer

- Lives inside the dark closing section.
- Uses a translucent top border.
- Desktop: three columns for brand, copyright, and Back to top.
- Mobile: one centered column with consistent `18px` spacing.
- Uses the inverse brand variant.

Keep the footer concise. Do not turn it into a large sitemap unless product requirements change.

## 20. Motion system

### 20.1 Canonical easing

```css
--motion-ease: cubic-bezier(0.16, 1, 0.3, 1);
```

This is the default for entrances, lifts, morphing controls, and polished state changes.

### 20.2 Motion inventory

| Motion | Timing | Purpose |
| --- | --- | --- |
| Hero entrance | `650–700ms`, staggered | Establish reading order |
| Logo scroll scrub | Entire remaining hero scroll | Move only the logo continuously to/from the far right |
| CTA arrow nudge | `1.8s` loop | Signal forward action |
| Scroll cue | `2s` loop | Indicate more content below |
| Company fade/position | About `480ms` | Smooth company rotation |
| Company float | `5.4s` loop | Add calm ambient motion |
| Company set rotation | Every `3.6s` | Maintain variety and random placement |
| Testimonial lanes | `25s` linear loop | Show community breadth |
| Metric count | `1050ms` | Emphasize proof |
| Closing field orbit | `18s` loop | Ambient depth |
| Closing dots | About `7s` loop | Subtle network activity |
| Remotion scenes | `7–8s` loops | Demonstrate product stories |

### 20.3 Motion rules

- Prefer transform and opacity.
- Motion should reinforce hierarchy, state, continuity, or progression.
- Ambient loops should be slow and low amplitude.
- Avoid simultaneous high-energy movement in adjacent areas.
- Pause offscreen motion to reduce distraction and resource use.
- Pause motion when the tab is hidden.
- Ensure hover/focus can pause continuously moving text.

## 21. Responsive system

### 21.1 Breakpoints

| Breakpoint | Purpose |
| --- | --- |
| `1020px` | Tablet layout and intermediate grid changes |
| `700px` | Mobile stacking, typography, hero, and compact Remotion scenes |
| `340px` | Very narrow dock and typography corrections |

Do not add a new breakpoint for one component unless the existing three cannot solve the layout cleanly.

### 21.2 Tablet rules at `1020px`

- Shell becomes `min(100% - 40px, 860px)`.
- Hero heading reduces.
- Community proof ratio becomes less asymmetric.
- Appreciation becomes one column.
- Appreciation copy may temporarily use two internal columns.

### 21.3 Mobile rules at `700px`

- Shell becomes `calc(100% - 32px)`.
- Scroll padding becomes `76px`.
- Section padding becomes `88px`.
- Hero heading uses mobile clamp.
- Hero copy reduces slightly but remains readable.
- Hero video is reframed and enlarged.
- Scroll cue disappears.
- Section introductions become left-aligned.
- Company canvas becomes taller.
- Company positions use the mobile coordinate set.
- Multi-column cards stack.
- Product stories use compact compositions.
- Footer becomes centered and stacked.

### 21.4 Very narrow rules at `340px`

- Reduce fixed-cluster right offset.
- Protect wordmark and CTA font size.
- Confirm no horizontal overflow at `320px`.

### 21.5 Required viewport QA

Every design change must be checked at:

- `1440 × 1000`.
- `390 × 844`.
- `320 × 720`.

At each viewport verify:

- No horizontal overflow.
- No clipped text, cards, logos, or controls.
- No company collisions.
- Product stories remain understandable.
- Far-right logo fits while the wordmark and CTA remain in the hero.
- Tap targets remain usable.

## 22. Accessibility

### 22.1 Focus

Global focus treatment:

```css
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 4px;
}
```

Do not remove focus outlines without providing an equally visible replacement.

### 22.2 Skip navigation

The page includes a skip link to `#main-content`. It remains offscreen until keyboard focus.

### 22.3 Decorative content

Use `aria-hidden="true"` for:

- Decorative logo image inside a labelled brand link.
- Spawn-zone structure.
- Orbits, glows, pulse dots, and scroll lines.
- Decorative inline icons.
- Duplicate testimonial cards.

### 22.4 Motion accessibility

Under `prefers-reduced-motion: reduce`:

- Disable smooth scrolling.
- Reduce animations/transitions to effectively instant.
- Reveal all content without entrance motion.
- Pause and reset the hero video.
- Freeze company cards.
- Remove duplicate testimonial cards and stop marquee movement.
- Complete the metric immediately.
- Skip dock FLIP interpolation.
- Freeze Remotion stories on the final frame.

### 22.5 Contrast

- Use dark ink over cream and pale blue.
- Use near-white over deep blue.
- Use peach, not base orange, for smaller accent text on deep blue.
- Do not reduce text opacity when it compromises WCAG AA.
- Check the Gmail/product scenes separately because they use independent inline colors.

### 22.6 Interactive targets

- Primary buttons are at least `50px` high.
- Keep mobile links and buttons comfortably tappable.
- Do not place overlapping invisible elements over interactive controls.

## 23. Content and UX writing

### 23.1 Voice

RightRefer copy should be:

- Clear.
- Warm.
- Professional.
- Specific.
- Honest about uncertainty.
- Focused on context, timing, and human introductions.

Avoid:

- Guarantees.
- Manipulative urgency.
- “Growth hack” language.
- Claims that an appreciation payment buys a referral.
- Awkward phrases such as “increase of getting refers.”

### 23.2 Message hierarchy

Landing-page messaging should repeatedly reinforce:

1. Follow companies that matter.
2. Discover relevant opportunities at the right time.
3. Reach the right person with useful context.
4. Send referral requests for free.
5. Add optional appreciation only when it feels appropriate.
6. Appreciation may improve engagement but never guarantees a referral.
7. Referrers decide independently.

### 23.3 Labels and CTAs

- Use **Get Started** as the primary acquisition CTA.
- Use short, direct labels.
- Avoid multiple competing primary CTAs in one viewport.
- Candidate and referrer paths may use contextual destination links with URL intents.

### 23.4 Proof and legal accuracy

Before public launch:

- Replace prototype testimonials with verified, consented quotes.
- Replace beta metrics with verified data.
- Confirm appreciation amounts and refund wording.
- Add final Privacy and Terms links.
- Confirm trademark and brand-asset usage.
- Do not imply company affiliation through example logos.

## 24. Asset rules

| Asset | Purpose |
| --- | --- |
| `/rightrefer-logo.png` | Transparent RightRefer symbol and favicon |
| `/Louize.ttf` | Site-wide variable typeface |
| `/hero-hands.mp4` | Hero background video |
| `/hero-hands-poster.jpeg` | Hero loading and reduced-motion frame |
| `/gmail-icon.svg` | Gmail product-story mark |
| `/microsoft-logo.svg` | Microsoft product-story mark |
| Simple Icons package | Example company marks |

Asset requirements:

- Optimize images and video before adding them.
- Provide a poster for video.
- Keep logo transparency.
- Use SVG for interface/brand marks when licensing and quality allow.
- Include dimensions or aspect-ratio constraints to avoid layout shift.
- Company logos remain the property of their owners and do not imply affiliation.

## 25. Implementation conventions

- Reuse CSS custom properties instead of repeating raw values.
- Use `.section-shell` for page width.
- Use established section backgrounds in the documented rhythm.
- Use existing radius and shadow tokens.
- Use contextual modifier classes for semantic variants.
- Keep decorative layers in pseudo-elements when they do not require content semantics.
- Use `client:visible` for heavy product-story islands.
- Pause animation and media when offscreen.
- Keep desktop and mobile JavaScript breakpoints synchronized with CSS.
- Preserve type safety in scripts and React components.
- Keep comments limited to logic that is not self-explanatory.

## 26. Known implementation debt and pre-launch cleanup

These items are documented so they are not copied into future pages accidentally:

1. `InboxMatchDemo.astro` and `ProductFlow.astro` are unused experimental components and should not be treated as canonical.
2. `SectionIntro.astro` exposes theme classes without matching CSS.
3. The closing field renders five dots while two are permanently hidden.
4. The CSS palette and Remotion palette are duplicated and require synchronized edits.
5. The motion easing is duplicated as a JavaScript string in the dock FLIP logic.
6. The `700px` breakpoint is duplicated between CSS and `RemotionPlayer.tsx`.
7. Prototype notes, testimonial copy, metrics, and payment terms require production verification.
8. Hero and docked CTA selectors contain near-duplicate declarations and can be consolidated during a safe refactor.

Do not “clean up” these items casually while making unrelated visual changes. Refactor them deliberately and verify all contexts.

## 27. New landing-page blueprint

When creating another RightRefer landing page, use this sequence unless the content requires a justified variation:

1. Full-height editorial hero with one primary CTA.
2. Discovery or opportunity visualization on pale blue.
3. Proof or trust section on cream.
4. Two-path or audience explanation on very pale blue.
5. Product signal/demo on warm surface.
6. Connected process story on pale blue.
7. Reassurance, policy, or appreciation explanation on cream.
8. Deep-blue closing with one contact or conversion action.
9. Compact inverse footer.

Each section should answer one primary question. Do not place several unrelated product stories into one section.

## 28. Design QA checklist

### Brand

- [ ] Product name is written as RightRefer.
- [ ] The transparent official logo is used without distortion.
- [ ] Hero, docked, and footer branding feel like one system.
- [ ] Dark-background wordmark uses the inverse treatment.

### Color

- [ ] Colors come from the documented palette.
- [ ] Orange is reserved for brand/action/active emphasis.
- [ ] Deep-blue text combinations meet contrast requirements.
- [ ] CSS and Remotion palettes match.

### Typography

- [ ] Louize loads locally.
- [ ] Heading hierarchy follows the established fluid scale.
- [ ] Small text remains readable.
- [ ] Copy line lengths are controlled.
- [ ] Bold emphasis is selective and meaningful.

### Layout

- [ ] All major content uses the shared shell.
- [ ] Section spacing is consistent.
- [ ] Paired panels align in height and internal rhythm.
- [ ] Background bands follow an intentional sequence.
- [ ] No arbitrary one-off spacing values were added unnecessarily.

### Components

- [ ] Buttons use the correct solid or hero/docked variant.
- [ ] Cards use the established radii, borders, and shadows.
- [ ] Company visualization and company items have no visible card background.
- [ ] Company spawn zones remain invisible.
- [ ] Exactly eight company cards appear, two per quadrant.
- [ ] Testimonial outer panel is transparent while individual cards remain styled.
- [ ] Product-story frames use the correct aspect and lifecycle.
- [ ] Appreciation messaging includes free request, optional gratitude, and no guarantee.
- [ ] Closing section uses the feedback message and Write to Us CTA.

### Motion

- [ ] Motion explains hierarchy, state, or progression.
- [ ] Offscreen and hidden-tab motion pauses.
- [ ] Reduced-motion behavior is complete.
- [ ] Continuous text movement pauses on hover/focus.
- [ ] Animation remains calm and does not compete across sections.

### Responsive

- [ ] Checked at `1440 × 1000`.
- [ ] Checked at `390 × 844`.
- [ ] Checked at `320 × 720`.
- [ ] No horizontal overflow.
- [ ] Logo moves continuously with hero scroll and reverses to its exact home position.
- [ ] CTA remains in the hero at all widths.
- [ ] Text, logos, and company cards are not clipped.

### Accessibility

- [ ] Focus rings are visible.
- [ ] The skip link works.
- [ ] Decorative elements are hidden from assistive technology.
- [ ] Interactive elements have useful labels.
- [ ] Contrast passes WCAG AA.
- [ ] Tap targets remain usable on mobile.

### Production readiness

- [ ] Testimonials and metrics are verified.
- [ ] Appreciation/refund wording matches the actual workflow.
- [ ] Final Privacy and Terms links exist.
- [ ] CTA destinations use the production signup URL.
- [ ] Company and third-party brand assets follow usage guidelines.

---

Treat uniformity as a product-quality requirement, not merely a styling preference. Any new component should look as though it has always belonged to RightRefer: warm, composed, human, credible, and precise.
