# RightRefer landing page

The public marketing site for RightRefer, built as a static Astro application.

## Design system

Use [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) as the source of truth for visual tokens, page composition, components, motion, responsiveness, accessibility, and design QA.

## Local development

Requires Node.js `22.12+`.

```sh
npm install
copy .env.example .env
npm run dev
```

The development server runs at `http://localhost:4321`.

## Configuration

| Variable | Purpose | Default |
| --- | --- | --- |
| `SITE_URL` | Production landing-page origin used for canonical URLs and the sitemap | `https://www.rightrefer.com` |
| `PUBLIC_APP_SIGNUP_URL` | Auth handoff used by all calls to action | `/signup` |
| `PUBLIC_BETA_REFERRALS` | Successfully referred people shown in the beta social-proof metric | `48` |

Seeker and giver buttons append `intent=seeker` or `intent=giver` to the configured signup URL.

## Analytics

Vercel Web Analytics is injected once through `src/layouts/BaseLayout.astro`. Enable **Web Analytics** for the project in the Vercel dashboard before deploying; the `/_vercel/insights/*` routes are provided by Vercel and are not available in a local static preview.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Generate the production site in `dist/` |
| `npm run preview` | Preview the production build |

## Launch assumptions

- The product name is **RightRefer**.
- The transparent RightRefer mark is served from `public/rightrefer-logo.webp`; a right-sized PNG variant is used as the favicon.
- The site-wide Louize typeface is self-hosted as WOFF2 from `public/Louize.woff2`.
- The hero uses the optimized `public/hero-hands.mp4` video once, holds on its final frame, and uses `hero-hands-poster.webp` as its loading and reduced-motion frame.
- As the hero scrolls away, only the logo moves continuously toward the far-right dock; scrolling backward returns it beside the wordmark. The wordmark and Get Started CTA remain in the hero.
- The Built for both sides cards lazy-load `public/path-seeker.webp` and `public/path-giver.webp` as blurred, overlaid imagery.
- Company logos are rendered from the CC0-licensed Simple Icons package. They remain the property of their respective owners and do not imply affiliation.
- The Gmail and Microsoft marks used in the product stories are served from `public/gmail-icon.svg` and `public/microsoft-logo.svg`; usage must follow their respective brand guidelines.
- Product-story animations use three client-visible Remotion Player islands: the timely-opportunity email, the connected referral journey, and optional appreciation. Players pause when offscreen.
- Testimonial copy is prototype content and must be replaced with verified, consented customer quotes before a public launch.
- `PUBLIC_BETA_REFERRALS` must be replaced with verified beta data before launch.
- The optional appreciation amount and two-day refund message must match the final payments workflow and published terms.
- CTA destinations are configured through `PUBLIC_APP_SIGNUP_URL`.
- Add links to the final hosted privacy policy and terms before public launch.
