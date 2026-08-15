// Structured data (JSON-LD) builders.
// Satisfies PRD R-11 (rich results) — Organization + WebSite + BreadcrumbList
// + WebApplication + HowTo + FAQPage. Each builder returns flat schema objects;
// the Base layout wraps them into a single @graph.

import type { FinanceToolConfig } from '../data/finance-tools';
import type { ConverterConfig } from '../data/converters';
import { siteUrl, brand, sameAsProfiles } from '../data/site';

function faqEntities(faqs: { q: string; a: string }[]) {
  return faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
}

/** Site-wide Organization entity (knowledge panel / brand signals). */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: brand,
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/logo-icon.png`, width: 512, height: 512 },
    description: 'Free online calculators and unit converters for finance, everyday math, and measurement. No sign-up, instant results.',
    sameAs: sameAsProfiles,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${siteUrl}/contact`,
    },
  };
}

/** Site-wide WebSite entity. */
export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: brand,
    url: siteUrl,
    inLanguage: 'en',
    publisher: { '@id': `${siteUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Page entity linking each URL to the site and publisher graph. */
export function webPageJsonLd(url: string, title: string, description: string): Record<string, unknown> {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** BreadcrumbList schema for a page's trail. */
export function breadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}

/** HowTo schema for a tool's "How to use" steps (rich results). */
function howToJsonLd(steps: string[], title: string): Record<string, unknown> {
  return {
    '@type': 'HowTo',
    name: `How to use the ${title}`,
    step: steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    })),
  };
}

/** Finance tool page schema: WebApplication + HowTo + FAQPage. */
export function financeJsonLd(tool: FinanceToolConfig): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebApplication',
      name: tool.title,
      url: `${siteUrl}/finance/${tool.slug}`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: tool.seo.description,
      featureList: ['Instant calculation', 'Amortization schedule', 'Payment breakdown', 'No sign-up required', 'Mobile friendly'],
      audience: { '@type': 'Audience', audienceType: 'General public' },
      isAccessibleForFree: true,
    },
    howToJsonLd(tool.howTo.steps, tool.title),
  ];
  if (tool.faqs.length) {
    graph.push({ '@type': 'FAQPage', mainEntity: faqEntities(tool.faqs) });
  }
  return graph;
}

/** Converter tool page schema: WebApplication + HowTo + FAQPage. */
export function converterJsonLd(tool: ConverterConfig): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebApplication',
      name: tool.title,
      url: `${siteUrl}/converters/${tool.slug}`,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: tool.seo.description,
      featureList: ['Bidirectional conversion', 'Instant results', 'Common conversion table', 'No sign-up required', 'Mobile friendly'],
      audience: { '@type': 'Audience', audienceType: 'General public' },
      isAccessibleForFree: true,
    },
    howToJsonLd(tool.howTo.steps, tool.title),
  ];
  if (tool.faqs.length) {
    graph.push({ '@type': 'FAQPage', mainEntity: faqEntities(tool.faqs) });
  }
  return graph;
}

/** Generic WebApplication JSON-LD for simple tools (time/date + everyday). */
export function simpleJsonLd(
  name: string,
  path: string,
  category: string,
  description: string,
  extras: { howToSteps?: string[]; faqs?: { q: string; a: string }[] } = {},
): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebApplication',
      name,
      url: `${siteUrl}${path}`,
      applicationCategory: category,
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description,
    },
  ];
  if (extras.howToSteps?.length) {
    graph.push(howToJsonLd(extras.howToSteps, name));
  }
  if (extras.faqs?.length) {
    graph.push({ '@type': 'FAQPage', mainEntity: faqEntities(extras.faqs) });
  }
  return graph;
}
