// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://calcpilot.net';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/search'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  // Static output (SSG) — every tool page is a unique, crawlable URL.
  output: 'static',
  // Canonical URL normalization: no trailing slashes (consistent canonical + schema URLs).
  trailingSlash: 'never',
  // Build performance: inline small stylesheets to reduce request count (Core Web Vitals)
  build: {
    inlineStylesheets: 'auto',
  },
});
