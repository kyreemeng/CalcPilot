// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://calcpilot-ten.vercel.app';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/search'),
    }),
  ],
  // Static output (SSG) — every tool page is a unique, crawlable URL.
  output: 'static',
  // Canonical URL normalization: no trailing slashes (consistent canonical + schema URLs).
  trailingSlash: 'never',
});
