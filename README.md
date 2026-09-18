# webcodersevvy — Portfolio

Premium personal portfolio for **Sewak Singh ("Sevvy")**, freelance web designer
& developer specializing in Shopify, headless commerce, Webflow, Framer,
frontend development, and performance optimization.

- **Brand:** Technical + Creative — monochrome, editorial, architectural,
  typography-driven. Background `#F4F4F4`, ink `#000000`, Hot Red `#FF0000`
  (selective) with functional derivative `--accent-strong: #B30000` for
  WCAG AA small text (pure red on paper is 3.6:1 — graphics/large-type only).
- **Primary conversion:** project inquiry (`/contact`).
- **Status:** All content currently ships as explicit `[Placeholder]` shells —
  no fabricated clients, metrics, testimonials, or credentials (spec §20).

## Stack

| Layer    | Choice                                              |
| -------- | --------------------------------------------------- |
| Site     | Astro 7 (static output), TypeScript (strict)        |
| Islands  | Solid.js (`MobileMenu`, `WorkFilter`, `ContactForm`)|
| State    | Nanostores · Validation Zod (content + forms)       |
| Motion   | WAAPI + IntersectionObserver, Lenis (idle, desktop) |
| Reserved | GSAP + Motion installed, intentionally unbundled    |
| Styling  | Vanilla CSS + design tokens (`src/styles/`)         |
| Fonts    | Melodrama via Astro Fonts API (Fontshare, OFL)      |
| Body/Mono| Mona Sans + Space Mono via Fontsource (self-hosted) |
| Content  | Astro content collections (Markdown + Zod schema)   |
| SEO      | Sitemap, robots, canonical, OG, JSON-LD             |

Client JS budget: **< 50KB** — currently ~2.5KB static/page, islands hydrate
on demand, Lenis loads idle + fine-pointer only.

## Project structure

```
astro.config.mjs          # site, integrations, Fonts API (Melodrama)
src/
  components/             # Astro static components + Solid islands (.tsx)
  content/work/           # 12 case studies (01–12, Markdown + Zod frontmatter)
  content.config.ts       # work schema (glob loader)
  data/services.ts        # single source for services (home + /services)
  layouts/BaseLayout.astro# head, SEO/OG, <Font>, Enhancements
  lib/validation.ts       # inquirySchema (Zod source of truth)
  pages/                  # /, /work, /work/[slug], /services, /about,
                          # /process, /contact, /404
  stores/ui.ts            # Nanostores (mobile menu)
  styles/                 # tokens.css, global.css, rows.css
public/
  images/work/            # 24 Pexels photos (build-time, credited in captions)
  robots.txt, favicon.svg, og-default.png
scripts/
  make-og.mjs + og-image.svg  # OG image generator (sharp): node scripts/make-og.mjs
```

## Case-study schema

`client, projectType, services[], stack[], year, role, featured, status,
description, deliverables[], evidence[{image, alt, caption}], placeholderNotes`.
Pages render challenge → approach → design → technology → implementation →
outcome, visual evidence figures, and prev/next navigation.

## Scripts

| Command               | Purpose                                  |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | local dev server                         |
| `npm run check`       | `astro check` (must be 0 errors)         |
| `npm run build`       | static build to `dist/` (19 pages)       |
| `npm run preview`     | preview production build                 |
| `node scripts/make-og.mjs` | regenerate `public/og-default.png` |

## Accessibility / performance / SEO

- WCAG 2.2 AA target: landmarks, skip link, `:focus-visible` ring,
  `aria-current`, menu focus trap + focus return, validated form with
  `role="alert"` errors, 44px targets, `prefers-reduced-motion` kills all
  motion (CSS + JS gate; `html.fx` set only when animating).
- Images lazy + `async` decode, 16/9 CLS-safe cropping, self-hosted
  subset fonts with `swap` and metric-matched fallbacks.
- Per-route titles/descriptions/canonicals, OG/Twitter cards, JSON-LD
  (`ProfessionalService` home; `CreativeWork` + `BreadcrumbList` cases).

## TODO (needs owner input)

Domain purchase (`TODO(domain)` x N) · contact email + form handler
(`TODO(forms)` — currently validated `mailto:` draft) · real projects,
screenshots, testimonials, bio/photo, availability, socials · Adobe Fonts
fully removed in favor of Melodrama.

## Acceptance

`astro check` clean, `astro build` 19 pages, `accept.py` (temp tooling, not
committed): 0 failures — routes, links, meta/OG/JSON-LD, one-H1, contrast
pairs (all ≥ AA), JS budgets. Browser click/keyboard/Lighthouse pass still
recommended on first deploy. Deploys anywhere static: `dist/`.
