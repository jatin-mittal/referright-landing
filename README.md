# RightRefer landing page

The public marketing site for RightRefer, built as a static Astro application.

## Design system

Use [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) as the source of truth for visual
tokens, page composition, components, motion, responsiveness, accessibility and
design QA.

## Local development

Requires Node.js `22.12+`.

```sh
npm install
cp .env.example .env
npm run dev
```

The development server runs at `http://localhost:4321`.

## Configuration

| Variable | Purpose | Default |
| --- | --- | --- |
| `PUBLIC_APP_SIGNUP_URL` | Auth handoff used by every call to action | `https://app.rightrefer.com/` |
| `PUBLIC_CONTACT_EMAIL` | Support address in the FAQ and the footer | `rightrefer.team@gmail.com` |

Every call to action points at `PUBLIC_APP_SIGNUP_URL` directly. `signUpWith`
still takes a `SignUpIntent` for call-site clarity, but the intent is not
appended to the URL.

The public origin is fixed to `https://www.rightrefer.com` in
`astro.config.mjs`. Canonical URLs, social metadata, structured-data URLs and
the robots/sitemap output all derive from it. `SITE_URL` is intentionally not
read: an app URL in the deployment environment previously made the landing
page canonicalize to `https://app.rightrefer.com/`. The app handoff remains
independently configurable through `PUBLIC_APP_SIGNUP_URL`.

The public legal pages are available at
`https://www.rightrefer.com/privacy/` and
`https://www.rightrefer.com/terms/`.

### BIMI logo

After deployment, use `https://www.rightrefer.com/logo.svg` as the public
HTTPS logo URL. This square SVG Tiny PS asset uses the RightRefer symbol on a
solid white background and needs no login. Use the `www` URL in the BIMI
record: `https://rightrefer.com/logo.svg` redirects to `www`, while the `www`
URL serves the file directly. Check that the deployed `www` URL returns
HTTP 200 with `Content-Type: image/svg+xml` before publishing a BIMI record.
Hosting the logo alone does not configure BIMI email authentication or
guarantee that mail clients will show it.

### Search indexing after deployment

Deploy a fresh build; changing environment variables alone does not update
this static site's metadata. Remove the obsolete `SITE_URL` deployment variable
to avoid confusion. In Google Search Console, submit
`https://www.rightrefer.com/sitemap-index.xml`, then inspect
`https://www.rightrefer.com/`, run **Test live URL**, and request indexing.
Restart validation for the affected report after the corrected build is live.
The non-www domain should continue permanently redirecting to the www domain.
Google decides whether and when to index; a successful deployment does not
guarantee search placement or clear an existing validation report immediately.

## Analytics

Vercel Web Analytics is injected once through `src/layouts/BaseLayout.astro`.
Enable **Web Analytics** for the project in the Vercel dashboard before
deploying; the `/_vercel/insights/*` routes are provided by Vercel, so a local
`npm run preview` will log one 404 for that script and nothing else.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Generate the production site in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run check` | Check Astro and TypeScript |
| `npm test` | Run responsive and interaction checks in Chromium |

Before the first browser test run, install its browser with
`npx playwright install chromium`. Tests start their own server on port 4322.

## Community feedback

Edit `src/data/stories.json` to update the referral count and review cards.
Each card has a `name` and an approved `review`. Optional fields are `title`, `company`,
`companyLogoUrl`, `role`, `accent`, `photoUrl` and `linkedinUrl`. Local company
logo files are in `public/company-logos/`; store their public path in
`companyLogoUrl`. If the mark needs a different version on a dark background,
set `companyLogoDarkUrl` to its local dark-mode file; otherwise the same mark
is used in both themes. Without a photo, a card shows initials; the official blue
LinkedIn icon appears only with a profile URL. External photo URLs may expire,
so use a stable public image when publishing a review. Keep only public,
display-ready information in this file.

The seven profiles and their companies were supplied for display. Titles
are shown where supplied; the missing job title is not guessed. The current
review wording was approved for publication by the people shown, as confirmed
by the site owner. Add new cards only with approved review text. The 78+
number comes from `referralCount` in the same file.

This is a static Astro site: JSON edits appear after a new build and
deployment, without changing the components.

## Mobile paths and demo motion

Below 768px, the three path choices are icon-free underline tabs that remain
sticky below the site header while the section is being read. They have no
horizontal scrollbar, so every path stays one tap away without returning to
the top. Larger screens keep the compact horizontal pill switch.

Only buttons inside the interactive product-demo windows receive an automatic
glow pulse. The path tabs and real calls to action do not animate. The glow
respects reduced motion. Demo actions are keyboard-accessible, labelled as
examples and resettable; they never create requests or make payments.

### Product copy

The three paths and FAQs use the unified product PRD from
`C:\Project\JobMadeEasy\docs\rightrefer-unified-technical-prd.md`, particularly
sections 0.5, 0.11–0.12, 0.23–0.24, 0.33 and 6.1.1–6.1.2.
LinkedIn sign-in is not employment verification. Appreciation is optional
and chosen before sending. The 48-hour window is a referral deadline, not a
guaranteed response. Reported submission starts a 24-hour dispute window.
The displayed FAQs and FAQ structured data share one content array.
The hero trust strip keeps the owner's supplied wording; its employment and
response claims are not established by the PRD and need reconciliation before
launch.

## Page structure

Five blocks, and adding a sixth is a design decision, not a routine one. See
`DESIGN_SYSTEM.md` §14.

1. `Hero.astro` plus the company marquee, as one opening block.
2. `BetaProof.astro`, the private-beta count and the quote marquee. Proof comes
   before mechanism.
3. `ProductStory.astro`, all three things the product does, as a switch.
4. `Faq.astro`.
5. `ClosingSection.astro`, a plain call to action and the footer.

## What this page ships

- **RightRefer identity.** The three-piece Forward symbol and outlined Louize
  wordmark share geometry in `src/lib/brand.ts`. Copy-ready SVG/PNG/WebP assets
  and the ZIP are organized in [`public/brand_assets`](./public/brand_assets/README.md);
  see [`brand notes`](./docs/brand/README.md) for the design history.

- **No framework runtime.** The page is Astro plus roughly 7 KB of hand-written
  JavaScript across seven small island scripts. There is no React, no animation
  library and no video.
- **One image.** `public/ink-doors-mask.webp` is the hand-inked wall of doors,
  shipped as a single-channel alpha mask and painted with theme tokens, so one
  file serves both themes. It is preloaded, and it is reused by the closing
  section as the page's bookend.
- **Two typefaces.** Louize is self-hosted from `public/Louize.woff2` and used
  for display type and the outlined logo; Inter is loaded from Google Fonts
  for UI and body text.
- **Company logos** in the company marquee use the Simple Icons package.
  Review-card logos are stored in `public/company-logos/`. The Microsoft
  review cards use only the four-square mark beside the company name. These
  marks remain the property of their respective owners and do not imply
  affiliation.

## Launch checklist

- [ ] **Verify the early-release count** in `src/data/stories.json` before
      publication; `referralCount` is currently `78`.
- [ ] **Confirm Louize's production embedding rights**, file provenance and any
      required attribution. If they cannot be confirmed, the fallback is a
      licensed editorial serif chosen before release, with the semantic font
      roles unchanged.
- [ ] **Keep `POLICY` in step with the product.** Every deadline in page copy
      interpolates it, so a policy change in the application is a change here in
      the same pull request.
- [ ] **The openings examples name real employers.** They are explicitly
      illustrative roles, not live listings or a promise that a referral is
      available. Keep that label if the examples change.
