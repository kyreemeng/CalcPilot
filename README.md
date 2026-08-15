# CalcPilot

**Precision tools for everyday decisions.**

[CalcPilot](https://calcpilot.net/) is a fast, privacy-first suite of free online calculators and converters — finance, units, time & date, and everyday math. No accounts. No downloads. Instant answers in the browser.

<p align="center">
  <a href="https://calcpilot.net/"><strong>Live site → calcpilot.net</strong></a>
  &nbsp;·&nbsp;
  <a href="https://calcpilot.net/finance">Finance</a>
  &nbsp;·&nbsp;
  <a href="https://calcpilot.net/converters">Converters</a>
  &nbsp;·&nbsp;
  <a href="https://calcpilot.net/methodology">Methodology</a>
</p>

---

## Why CalcPilot

| | |
|---|---|
| **Instant** | All computation runs client-side. Results update as you type — typically under 200ms. |
| **Private by design** | No sign-up, no tracking of your inputs, no server round-trip for the math. |
| **Transparent** | Formulas and methodology are documented so every result is auditable. |
| **Built for the web** | Static Astro site: crawlable URLs, strong SEO, excellent Core Web Vitals. |
| **Mobile-ready** | Touch-friendly layouts, responsive hubs, and a clear reading experience on any screen. |

---

## What's included

### Finance
Mortgage, auto loan, general loan, salary, savings, and compound interest — with amortization schedules, tax/insurance options, and clear payment breakdowns.

### Converters
Currency (reference FX rates), weight, length, temperature, time, data storage, speed, area, and volume — bidirectional where it matters.

### Time & Date
Age, date difference, date add/subtract, and countdown tools for planning without the spreadsheet friction.

### Everyday
Percentage, percentage change, tip, discount, BMI, and BMR & calorie estimators for the calculations people actually need day to day.

Explore the full catalog on the [homepage](https://calcpilot.net/).

---

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) 5 — static site generation |
| Language | TypeScript |
| Styling | Design-token CSS (custom properties; no Tailwind / UI kit) |
| Typography | Geist · Sora · Geist Mono |
| Compute | Pure client-side engines in `src/lib/` |
| Deploy | Static output → CDN (e.g. Vercel) |

No framework hydration tax on calculator pages — interactive logic ships as focused `<script>` modules.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview
npm run check    # Astro + TypeScript
```

Optional environment (see `.env.example`):

```bash
PUBLIC_SITE_URL=https://calcpilot.net
PUBLIC_GOOGLE_SITE_VERIFICATION=
PUBLIC_SAME_AS=
```

---

## Project layout

```
src/
├── components/     # Header, tools (Finance / Converter / Simple), FAQ, SEO helpers
├── data/           # Single source of truth — site, finance tools, converters
├── layouts/        # Base HTML shell (SEO, fonts, JSON-LD)
├── lib/            # Pure engines: finance, convert, FX, format, SEO
├── pages/          # Routes — hubs, dynamic tool pages, trust pages
└── styles/         # Design tokens + component CSS
```

Tool pages follow a config-driven generation model: one dynamic route per family, unique crawlable URLs, and per-tool SEO / FAQ structured data.

---

## Principles

1. **Accuracy first** — Deterministic, testable pure functions; planning estimates only, never financial advice.
2. **Clarity over chrome** — One job per screen; results and amortization should be readable at a glance.
3. **Trust is a product feature** — Privacy, disclaimer, and methodology pages are first-class, not afterthoughts.
4. **Ship for discovery** — Canonical URLs, sitemap, JSON-LD (`WebApplication` + `FAQPage`), and content that earns the click.

---

## Links

- **Website:** [https://calcpilot.net/](https://calcpilot.net/)
- **Repository:** [github.com/kyreemeng/CalcPilot](https://github.com/kyreemeng/CalcPilot)
- **About:** [calcpilot.net/about](https://calcpilot.net/about)
- **Methodology:** [calcpilot.net/methodology](https://calcpilot.net/methodology)

---

## License

Private / all rights reserved unless otherwise stated by the repository owner.

CalcPilot figures are **estimates for planning**. Confirm material decisions with a qualified professional.
