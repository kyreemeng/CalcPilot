// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://calcpilot.net';

/**
 * Build timestamp used as the sitemap <lastmod> for every URL.
 *
 * Without lastmod, Google has no direct "has this page changed?" signal and
 * falls back to inferring freshness from crawl behaviour. Emitting the build
 * date is the cheapest freshness hint available on a static site.
 */
const BUILD_DATE = new Date();

/** @typedef {'always'|'hourly'|'daily'|'weekly'|'monthly'|'yearly'|'never'} ChangeFreq */

/**
 * Per-path crawl hints. Priority is relative within this site only, so it is
 * used here to express which pages matter, not to request a ranking boost.
 * @param {string} pathname
 * @returns {{ changefreq: ChangeFreq, priority: number }}
 */
function sitemapDefaults(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { changefreq: 'weekly', priority: 1.0 };
  if (path === '/converters') return { changefreq: 'weekly', priority: 0.9 };
  if (path.startsWith('/converters/')) return { changefreq: 'monthly', priority: 0.8 };
  if (['/finance', '/everyday', '/time-date'].includes(path)) return { changefreq: 'weekly', priority: 0.8 };
  if (['/about', '/contact', '/methodology'].includes(path)) return { changefreq: 'monthly', priority: 0.5 };
  if (['/privacy', '/disclaimer'].includes(path)) return { changefreq: 'yearly', priority: 0.3 };
  if (path === '/404' || path === '/404.html') return { changefreq: 'yearly', priority: 0.1 };
  return { changefreq: 'monthly', priority: 0.7 };
}

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/search'),
      serialize(item) {
        const { changefreq, priority } = sitemapDefaults(new URL(item.url).pathname);
        return { ...item, lastmod: BUILD_DATE.toISOString(), changefreq, priority };
      },
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
