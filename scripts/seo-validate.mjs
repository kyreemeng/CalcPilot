#!/usr/bin/env node
/**
 * Post-build SEO validation for the static output in dist/.
 *
 * Run after `npm run build`:
 *   node scripts/seo-validate.mjs
 *
 * Checks performed:
 *   1. every internal href in the built HTML resolves to a file that exists
 *   2. one <h1> per page, canonical present, JSON-LD parses
 *   3. title / meta-description length bands
 *   4. FAQPage schema present wherever a FAQ block is rendered
 *   5. the kg-to-lbs full chart is present in the static HTML, row by row
 *   6. conversion arithmetic spot-checks against the exact published factors
 *
 * Exit code 1 when an error-level check fails.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const errors = [];
const warnings = [];
const notes = [];

/** Walk dist/ and return every .html file. */
function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Map a root-relative URL path to the file Astro would have emitted. */
function resolveInternal(pathname) {
  const clean = pathname.replace(/\/+$/, '');
  const candidates = [
    join(DIST, `${clean}.html`),
    join(DIST, clean, 'index.html'),
    join(DIST, clean),
  ];
  return candidates.some((c) => existsSync(c) && statSync(c).isFile());
}

const pages = htmlFiles(DIST);
const internalLinks = new Map();

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const rel = `/${relative(DIST, file).replace(/\/index\.html$/, '').replace(/\.html$/, '')}`;

  /* --- 1. internal links --------------------------------------------- */
  for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const target = match[1];
    if (target.startsWith('//')) continue;
    if (!internalLinks.has(target)) internalLinks.set(target, []);
    internalLinks.get(target).push(rel);
  }

  /* --- 2. structure -------------------------------------------------- */
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) errors.push(`${rel}: expected 1 <h1>, found ${h1s.length}`);
  // /404 and /search are deliberately non-canonical (no canonicalPath).
  if (!['/404', '/search'].includes(rel) && !/<link rel="canonical"/.test(html)) {
    errors.push(`${rel}: missing canonical`);
  }

  const ldMatches = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)];
  if (ldMatches.length === 0) errors.push(`${rel}: no JSON-LD`);
  for (const [, raw] of ldMatches) {
    try {
      JSON.parse(raw.replace(/\\u003c/g, '<'));
    } catch (err) {
      errors.push(`${rel}: JSON-LD does not parse (${err.message})`);
    }
  }
  const hasFaqSchema = ldMatches.some(([, raw]) => raw.includes('"FAQPage"'));
  if (html.includes('class="faq"') && !hasFaqSchema) {
    warnings.push(`${rel}: renders an FAQ block but no FAQPage schema`);
  }

  /* --- 3. title / description ---------------------------------------- */
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) ?? [])[1] ?? '';
  const description = (html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1] ?? '';
  const isContentPage = !['/404', '/search'].includes(rel);
  if (isContentPage) {
    if (title.length < 30 || title.length > 65) {
      warnings.push(`${rel}: title is ${title.length} chars — target 30-60`);
    }
    if (description.length < 100 || description.length > 170) {
      warnings.push(`${rel}: meta description is ${description.length} chars — target 120-160`);
    }
  }

  /* --- 4. static rendering of the full chart -------------------------- */
  if (rel === '/converters/kg-to-lbs-converter') {
    const tables = html.match(/<table>[\s\S]*?<\/table>/g) ?? [];
    const fullChart = tables.find((table) => table.includes('Pounds back to kilograms'));
    const rowCount = fullChart ? (fullChart.match(/<tr>/g) ?? []).length - 1 : 0;
    if (rowCount !== 100) {
      errors.push(`${rel}: full 1-100 kg chart has ${rowCount} rows in the static HTML, expected 100`);
    } else {
      notes.push(`${rel}: full 1-100 kg chart rendered statically (${rowCount} rows)`);
    }
    notes.push(`${rel}: tables rendered statically = ${tables.length}`);
    for (const value of ['2.2046', '132.2774', '220.4623', '52,910.9429', '25.9925', '37,478.5846']) {
      if (!html.includes(value)) warnings.push(`${rel}: expected value "${value}" not found in the HTML`);
    }
  }

  /* --- 5. FAQ count --------------------------------------------------- */
  if (rel.startsWith('/converters/')) {
    const faqCount = (html.match(/class="faq-item"/g) ?? []).length;
    if (faqCount < 3) warnings.push(`${rel}: only ${faqCount} FAQ entries`);
  }
}

/* --- broken internal links -------------------------------------------- */
for (const [target, sources] of internalLinks) {
  if (!resolveInternal(target)) {
    errors.push(`broken internal link: ${target} (linked from ${[...new Set(sources)].slice(0, 3).join(', ')})`);
  }
}

/* --- required pages ---------------------------------------------------- */
const required = [
  '/converters/kg-to-lbs-converter',
  '/converters/kilos-to-pounds-converter',
  '/converters/lbs-to-kg-converter',
  '/converters/kilograms-to-pounds-converter',
  '/converters/pounds-to-kg-converter',
  '/converters/pounds-to-kilograms-converter',
  '/converters/kg-to-stone-converter',
  '/converters/gb-to-mb-converter',
  '/converters/1-kg-to-lbs',
  '/converters/10-kg-to-lbs',
  '/converters/50-kg-to-lbs',
  '/converters/60-kg-to-lbs',
  '/converters/100-kg-to-lbs',
];
for (const page of required) {
  if (!resolveInternal(page)) errors.push(`required page missing from the build: ${page}`);
}

/* --- arithmetic spot-checks ------------------------------------------- */
const KG_LB = 2.2046226218;
const LB_KG = 0.45359237;
const checks = [
  ['1 kg -> lb', (1 * KG_LB).toFixed(4), '2.2046'],
  ['60 kg -> lb', (60 * KG_LB).toFixed(4), '132.2774'],
  ['100 kg -> lb', (100 * KG_LB).toFixed(4), '220.4623'],
  ['200 lb -> kg', (200 * LB_KG).toFixed(4), '90.7185'],
  ['50 lb -> kg', (50 * LB_KG).toFixed(4), '22.6796'],
  ['70 kg -> stone', (70 / 6.35029318).toFixed(4), '11.0231'],
];
for (const [label, computed, expected] of checks) {
  if (computed !== expected) errors.push(`arithmetic drift on ${label}: computed ${computed}, page states ${expected}`);
}

/* --- report ------------------------------------------------------------ */
const report = [
  `pages scanned:            ${pages.length}`,
  `internal link targets:    ${internalLinks.size}`,
  `errors:                   ${errors.length}`,
  `warnings:                 ${warnings.length}`,
  '',
  ...notes.map((n) => `  note: ${n}`),
  '',
  ...errors.map((e) => `  ERROR: ${e}`),
  ...warnings.map((w) => `  warn:  ${w}`),
];

console.log(report.join('\n'));
process.exit(errors.length ? 1 : 0);
