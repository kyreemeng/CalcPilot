# CalcPilot

Personal-finance calculators and everyday unit converters — an Astro static site built from the Ardot design
`Calculator Web Prototype` (fileId `714769294030310`).

- **Framework**: [Astro](https://astro.build) 5 (SSG, static output)
- **Language**: TypeScript
- **Styling**: design-token CSS custom properties (no UI framework, no Tailwind)
- **Fonts**: Geist (display/UI), Sora (body), Geist Mono (figures) — via Google Fonts
- **Compute**: 100% client-side, instant (<200ms), no backend

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:4321)
npm run build      # production build → dist/
npm run preview    # preview the build
npm run check      # astro check (type-check .astro files)
```

## Directory structure

```
CalcPilot/
├── astro.config.mjs          # Astro config (site URL, sitemap)
├── package.json
├── tsconfig.json
├── public/                   # static assets, served as-is
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── styles/
    │   └── global.css        # design tokens + all component styles + breakpoints
    ├── layouts/
    │   └── Base.astro        # <html> shell: head/SEO/fonts/JSON-LD + Header/Footer
    ├── components/
    │   ├── Header.astro      # brand + nav + search + mobile menu
    │   ├── Footer.astro      # dark footer + link columns + copyright
    │   ├── Breadcrumb.astro
    │   ├── Icon.astro        # inline SVG icon set
    │   ├── CategoryCard.astro
    │   ├── ToolCard.astro
    │   ├── FAQ.astro         # <details> accordion (keyboard + aria)
    │   ├── RelatedCards.astro
    │   ├── DisclaimerSnippet.astro
    │   ├── Donut.astro       # SVG donut chart
    │   ├── FinanceTool.astro # full finance tool page body + client compute
    │   ├── ConverterTool.astro # bidirectional converter + client compute
    │   └── TrustLayout.astro # shared trust-page shell (title + body card)
    ├── data/                 # single source of truth (content + config)
    │   ├── site.ts           # brand, nav, categories, footer, hubs, tool index
    │   ├── finance-tools.ts  # 5 finance calculator configs
    │   └── converters.ts     # 5 converter configs
    ├── lib/                  # pure, client-safe logic
    │   ├── format.ts         # money / number / percent formatting
    │   ├── finance.ts        # amortization + 5 finance engines
    │   ├── convert.ts        # bidirectional + offset conversion
    │   ├── donut.ts          # donut chart geometry
    │   ├── icons.ts          # SVG icon path registry
    │   └── seo.ts            # JSON-LD builders (WebApplication + FAQPage)
    └── pages/                # routes (see below)
```

## Page routes

| Route | File | Notes |
|---|---|---|
| `/` | `pages/index.astro` | Home (hero + categories + popular tools) |
| `/finance` | `pages/[category]/index.astro` | Finance Hub (5 tools) |
| `/converters` | `pages/[category]/index.astro` | Converters Hub (5 converters) |
| `/time-date` | `pages/[category]/index.astro` | Time & Date Hub (planned) |
| `/everyday` | `pages/[category]/index.astro` | Everyday Hub (planned) |
| `/finance/mortgage-calculator` | `pages/finance/[slug].astro` | Mortgage Calculator |
| `/finance/loan-calculator` | `pages/finance/[slug].astro` | Loan Calculator |
| `/finance/salary-calculator` | `pages/finance/[slug].astro` | Salary Calculator |
| `/finance/savings-calculator` | `pages/finance/[slug].astro` | Savings Calculator |
| `/finance/compound-calculator` | `pages/finance/[slug].astro` | Compound Interest Calculator |
| `/converters/kg-to-lbs-converter` | `pages/converters/[slug].astro` | kg ↔ lbs |
| `/converters/length-converter` | `pages/converters/[slug].astro` | Length (m ↔ ft) |
| `/converters/temperature-converter` | `pages/converters/[slug].astro` | Temperature (°C ↔ °F, offset) |
| `/converters/time-converter` | `pages/converters/[slug].astro` | Time (hr ↔ min) |
| `/converters/data-converter` | `pages/converters/[slug].astro` | Data (MB ↔ GB, base-2) |
| `/about` | `pages/about.astro` | Trust page |
| `/privacy` | `pages/privacy.astro` | Trust page |
| `/disclaimer` | `pages/disclaimer.astro` | Trust page |
| `/contact` | `pages/contact.astro` | Trust page |
| `/search` | `pages/search.astro` | Client-side tool search |
| `404` | `pages/404.astro` | Not found |

The 10 tool pages use the PRD R-01 "tool-page generation framework": a single dynamic route per family
(`finance/[slug].astro`, `converters/[slug].astro`) driven by the config in `data/finance-tools.ts` and
`data/converters.ts`. Each config maps to one unique, crawlable URL with its own SEO metadata and JSON-LD.

## Design tokens

Defined in `src/styles/global.css` as CSS custom properties (source: Ardot variable set "CalcPilot Tokens").
Colors (`--primary` `#2563EB`, `--accent` `#059669`, `--text-primary` `#0F172A`, `--bg-page` `#F8FAFC`, …),
radii (`8/12/16/999`), an 8-pt spacing scale, `--container-max: 1120px`, `--touch-target: 48px`, and the
font stacks. Responsive breakpoints: tablet `≤1119px` (2-col calc collapses, 2-col grids), mobile `≤767px`
(1-col grids, hamburger nav, larger type scales down).

## Calculator logic

Pure functions in `src/lib/` (client-safe, deterministic):

- `finance.ts` — mortgage (P&I + tax + insurance + yearly amortization), loan (monthly payment + total interest
  + origination fee + monthly amortization), salary (take-home after tax + pre-tax deductions), savings/compound
  (future value with compounding frequency + interest tax).
- `convert.ts` — generic linear conversion with an optional **offset** (temperature uses `°F = °C × 9/5 + 32`;
  data uses base-2 `1024`).

Interactivity is implemented with small bundled `<script>` modules inside `FinanceTool.astro` and
`ConverterTool.astro` — no framework, no hydration cost, instant updates on input.
