// SEO landing-page registry.
//
// Two families of pages live here, both rendered by /converters/[slug]:
//
//  1. SeoConversionPage — a full pair-converter page for a distinct keyword
//     (e.g. "kilos to pounds", "lbs to kg"). Each carries its own table scale,
//     worked examples, common-value answers, FAQ set and internal-link cluster,
//     so no two pages are near-duplicates.
//
//  2. SeoValuePage — a single-magnitude answer page (e.g. "60 kg to lbs") for a
//     high-volume numeric query. Short, direct, and deliberately narrow.
//
// Page architecture follows the pillar → cluster → long-tail tree: the head
// term is served by the homepage and the category hub, second-level terms by
// cluster pages, third-level long-tail by these inner pages.

import {
  LB_PER_KG,
  KG_PER_LB,
  KG_PER_STONE,
  MB_PER_GB,
  fmt,
  headlineValue,
  makeFactorRows,
  range,
  round,
  sameMagnitude,
  type ConversionRow,
  type SameMagnitudeRow,
} from '../lib/convert-tables';

/** Trim a magnitude to its natural precision ("24,000" / "11.79" / "2.415"). */
function mag(value: number): string {
  return round(value, 6).toLocaleString('en-US', { maximumFractionDigits: 6, useGrouping: true });
}

export interface InternalLink {
  anchor: string;
  href: string;
  note: string;
}

export interface ValueBlock {
  /** H3 heading, phrased exactly as a search query. */
  heading: string;
  /** One-line direct answer. */
  answer: string;
  /** Optional link to the dedicated page for this magnitude. */
  href?: string;
  linkLabel?: string;
}

export interface SeoConversionPage {
  slug: string;
  kind: 'conversion';
  /** Primary target query. */
  primaryKeyword: string;
  /** Other queries the page is written to cover. */
  keywords: string[];
  title: string;
  h1: string;
  seo: { title: string; description: string };
  lead: string;
  category: 'weight' | 'data';
  categoryLabel: string;
  from: { label: string; unit: string; defaultValue: number };
  to: { label: string; unit: string; defaultValue: number };
  factor: number;
  offset?: number;
  precision: number;
  formula: string;
  reverseFormula: string;
  explanation: string;
  examples: { label: string; calculation: string; result: string }[];
  table: { caption: string; header: [string, string, string]; rows: ConversionRow[] };
  valueBlocks: ValueBlock[];
  faqs: { q: string; a: string }[];
  internalLinks: InternalLink[];
  related: string[];
  source: { label: string; url: string };
}

export interface SeoValuePage {
  slug: string;
  kind: 'value';
  primaryKeyword: string;
  keywords: string[];
  title: string;
  h1: string;
  seo: { title: string; description: string };
  lead: string;
  /** The single answer this page exists to give. */
  answer: string;
  from: { label: string; unit: string };
  to: { label: string; unit: string };
  /** Pre-filled widget values for this magnitude. */
  defaultFrom: number;
  defaultTo: number;
  factor: number;
  precision: number;
  formula: string;
  explanation: string;
  table: { caption: string; header: [string, string, string]; rows: ConversionRow[] };
  /** The same magnitude restated across every unit the site covers. */
  unitBreakdown: SameMagnitudeRow[];
  faqs: { q: string; a: string }[];
  internalLinks: InternalLink[];
  related: string[];
}

/* ------------------------------------------------------------------ */
/* Shared internal-link cluster for the weight family                  */
/* ------------------------------------------------------------------ */

const WEIGHT_CLUSTER: InternalLink[] = [
  { anchor: 'kg to lbs converter', href: '/converters/kg-to-lbs-converter', note: 'the main kilograms-to-pounds tool' },
  { anchor: 'kilos to pounds converter', href: '/converters/kilos-to-pounds-converter', note: 'the everyday “kilos” wording' },
  { anchor: 'lbs to kg converter', href: '/converters/lbs-to-kg-converter', note: 'reverse direction, pounds to kilograms' },
  { anchor: 'kilograms to pounds converter', href: '/converters/kilograms-to-pounds-converter', note: 'full unit names, for shipping and freight weights' },
  { anchor: 'pounds to kg converter', href: '/converters/pounds-to-kg-converter', note: 'pounds back into kilograms' },
  { anchor: 'pounds to kilograms converter', href: '/converters/pounds-to-kilograms-converter', note: 'spelled-out pounds to kilograms' },
  { anchor: 'kg to stone converter', href: '/converters/kg-to-stone-converter', note: 'UK body weight in stones and pounds' },
  { anchor: 'all weight converters', href: '/converters', note: 'every unit converter on CalcPilot' },
];

/** The cluster minus the page itself — no self-links. */
function weightClusterExcept(slug: string): InternalLink[] {
  return WEIGHT_CLUSTER.filter((link) => !link.href.endsWith(`/${slug}`));
}

const DATA_CLUSTER: InternalLink[] = [
  { anchor: 'MB to GB converter', href: '/converters/data-converter', note: 'megabytes to gigabytes in binary units' },
  { anchor: 'GB to MB converter', href: '/converters/gb-to-mb-converter', note: 'gigabytes to megabytes, the reverse direction' },
  { anchor: 'all data converters', href: '/converters', note: 'every unit converter on CalcPilot' },
];

/* ------------------------------------------------------------------ */
/* Value-block builders (arithmetic stays consistent across the page)  */
/* ------------------------------------------------------------------ */

function kgToLbsAnswer(kg: number): string {
  return `${mag(kg)} kilograms equals ${fmt(kg * LB_PER_KG, 2)} pounds (${mag(kg)} × 2.2046226218).`;
}

function lbsToKgAnswer(lb: number): string {
  return `${mag(lb)} pounds equals ${fmt(lb * KG_PER_LB, 2)} kilograms (${mag(lb)} × 0.45359237).`;
}

/** Dedicated long-tail page for a round magnitude, if one exists. */
const ROUND_KG_PAGES: Record<number, string> = {
  1: '1-kg-to-lbs',
  10: '10-kg-to-lbs',
  50: '50-kg-to-lbs',
  60: '60-kg-to-lbs',
  100: '100-kg-to-lbs',
};

function kgBlock(kg: number): ValueBlock {
  const target = ROUND_KG_PAGES[kg];
  return {
    heading: `${mag(kg)} kg to lbs`,
    answer: kgToLbsAnswer(kg),
    ...(target ? { href: `/converters/${target}`, linkLabel: `Open the ${mag(kg)} kg to lbs page` } : {}),
  };
}

function lbsBlock(lb: number): ValueBlock {
  return { heading: `${mag(lb)} lbs to kg`, answer: lbsToKgAnswer(lb) };
}

/* ------------------------------------------------------------------ */
/* 1. Kilos to pounds — easiest keyword in the family, and rising      */
/* ------------------------------------------------------------------ */

const kilosToPounds: SeoConversionPage = {
  slug: 'kilos-to-pounds-converter',
  kind: 'conversion',
  primaryKeyword: 'kilos to pounds',
  keywords: ['kilos to lbs', 'kilo to pounds', 'convert kilos to pounds', 'kilos in pounds', '70 kilos in pounds'],
  title: 'Kilos to Pounds Converter',
  h1: 'Kilos to Pounds Converter',
  seo: {
    title: `Kilos to Pounds Converter | 1 kilo = ${headlineValue(LB_PER_KG, 5)} lb`,
    description:
      'Convert kilos to pounds instantly. 1 kilo equals 2.2046226218 pounds. Learn how to convert kilos to lbs with a kilo-to-pound chart and the exact formula.',
  },
  lead: 'Convert kilos to pounds instantly — a free kilos to lbs weight converter with a full conversion chart and the exact formula. One kilo equals 2.2046 pounds.',
  category: 'weight',
  categoryLabel: 'Weight',
  from: { label: 'Kilos (kg)', unit: 'kg', defaultValue: 70 },
  to: { label: 'Pounds (lbs)', unit: 'lb', defaultValue: 154.32 },
  factor: LB_PER_KG,
  precision: 4,
  formula: '1 kilo = 2.2046 pounds',
  reverseFormula: 'pounds ÷ 2.2046226218 = kilos',
  explanation:
    '<strong>A kilo is the everyday word for a kilogram (kg)</strong>, the base unit of mass in the metric system. A <strong>pound (lb / lbs)</strong> is the imperial and US customary unit of weight. Converting kilos to pounds is therefore the same calculation as kilograms to pounds — multiply by <strong>2.2046226218</strong>. The word “kilos” shows up most often in body-weight and gym talk: someone describing their <strong>weight</strong> in kilos, a 20-kilo barbell plate, or a 5-kilo bag of rice. People also abbreviate it to “kilo to pounds” or “kilos to lbs”; all three spellings use the same factor. Because a kilo is a little more than twice a pound, a useful mental shortcut is to <strong>double the kilos and add about 10%</strong> — 70 kilos is roughly 154 pounds. For the full unit names, see the <a href="/converters/kilograms-to-pounds-converter">kilograms to pounds converter</a>; to go the other way, use the <a href="/converters/lbs-to-kg-converter">lbs to kg converter</a>.',
  examples: [
    { label: '1 kilo in pounds', calculation: '1 × 2.2046226218', result: '2.2046 lb' },
    { label: '5 kilos in pounds', calculation: '5 × 2.2046226218', result: '11.0231 lb' },
    { label: '70 kilos in pounds', calculation: '70 × 2.2046226218', result: '154.3236 lb' },
    { label: '100 kilos in pounds', calculation: '100 × 2.2046226218', result: '220.4623 lb' },
  ],
  table: {
    caption: 'Kilos to pounds chart',
    header: ['Kilos (kg)', 'Pounds (lbs)', 'Pounds back to kilos'],
    rows: makeFactorRows({
      values: [1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 120, 150, 200],
      factor: LB_PER_KG,
      fromUnit: 'kg',
      toUnit: 'lb',
    }),
  },
  valueBlocks: [
    kgBlock(1),
    kgBlock(5),
    kgBlock(10),
    kgBlock(50),
    kgBlock(70),
    kgBlock(100),
  ],
  faqs: [
    {
      q: 'How many pounds is 1 kilo?',
      a: 'One kilo equals 2.2046226218 pounds, usually rounded to 2.2046 pounds. A kilo is a little more than twice as heavy as a pound.',
    },
    {
      q: 'Is “kilo” the same as “kilogram”?',
      a: 'Yes. “Kilo” is the informal short form of kilogram (kg). In everyday speech a kilo and a kilogram are the same unit, and kilos to pounds uses the same factor as kilograms to pounds.',
    },
    {
      q: 'What is the kilos to pounds formula?',
      a: 'Multiply kilos by 2.2046226218. For example, 70 kilos × 2.2046226218 = 154.3236 pounds. To go from pounds back to kilos, divide by the same factor.',
    },
    {
      q: 'How many kilos are in a pound?',
      a: 'One pound equals 0.45359237 kilograms, so it takes about 2.2 pounds to make one kilo.',
    },
    {
      q: 'How do I convert kilos to pounds in my head?',
      a: 'Double the kilos and add roughly 10%. For example, 70 kilos → 140, plus about 14, gives approximately 154 pounds. The exact answer is 154.32 pounds.',
    },
    {
      q: 'What is 70 kilos in pounds?',
      a: '70 kilos equals 154.3236 pounds. Type 70 in the kilos box above, or read it directly from the chart on this page.',
    },
    {
      q: 'Is a kilo heavier than a pound?',
      a: 'Yes. One kilo weighs about 2.2 pounds, so a kilo is heavier than a pound — roughly 2.2 times the weight.',
    },
  ],
  internalLinks: weightClusterExcept('kilos-to-pounds-converter'),
  related: ['kg-to-lbs-converter', 'lbs-to-kg-converter', 'kilograms-to-pounds-converter'],
  source: { label: 'NIST SI mass guidance', url: 'https://www.nist.gov/pml/owm/si-units-mass' },
};

/* ------------------------------------------------------------------ */
/* 2. LBS to KG — the biggest single query in the family               */
/* ------------------------------------------------------------------ */

const lbsToKg: SeoConversionPage = {
  slug: 'lbs-to-kg-converter',
  kind: 'conversion',
  primaryKeyword: 'lbs to kg',
  keywords: ['lbs to kg', 'pounds to kilograms', 'lbs in kg', 'convert lbs to kg', '150 lbs in kg', '200 lbs to kg'],
  title: 'LBS to KG Converter',
  h1: 'LBS to KG Converter',
  seo: {
    title: `LBS to KG Converter | 1 lb = ${fmt(KG_PER_LB, 8)} kg`,
    description:
      'Convert lbs to kg instantly. 1 pound equals exactly 0.45359237 kilograms. Learn how to convert lbs to kg with a full lbs-to-kg chart and the reverse formula.',
  },
  lead: 'Convert lbs to kg instantly — a free pounds to kilograms converter with a full lbs to kg chart and the exact reverse formula. One pound equals 0.45359237 kilograms.',
  category: 'weight',
  categoryLabel: 'Weight',
  from: { label: 'Pounds (lbs)', unit: 'lb', defaultValue: 150 },
  to: { label: 'Kilograms (kg)', unit: 'kg', defaultValue: 68.0389 },
  factor: KG_PER_LB,
  precision: 4,
  formula: '1 lb = 0.45359237 kg',
  reverseFormula: 'kilograms × 2.2046226218 = pounds',
  explanation:
    '<strong>“lbs” and “lb” both mean pound</strong> — the plural and singular abbreviations of the same unit of weight. Converting <strong>lbs to kg</strong> means multiplying by <strong>0.45359237</strong>, the exact number of kilograms in one international avoirdupois pound. This is the direction people need most often when reading a US label, a gym plate, or a body-weight number and then reporting it in metric: 150 lbs is 68.04 kg, and 200 lbs is 90.72 kg. The exact factor is a definition, not an approximation, so results are identical whether you call the unit pounds, pounds-mass or lbs. To go from kilograms back to pounds, multiply by 2.2046226218 — or use the <a href="/converters/kg-to-lbs-converter">kg to lbs converter</a>. The same chart also answers the reversed reading, listed in the third column below, so “150 kg to lbs” is covered without leaving the page.',
  examples: [
    { label: '1 lb in kg', calculation: '1 × 0.45359237', result: '0.4536 kg' },
    { label: '100 lbs in kg', calculation: '100 × 0.45359237', result: '45.3592 kg' },
    { label: '150 lbs in kg', calculation: '150 × 0.45359237', result: '68.0389 kg' },
    { label: '200 lbs in kg', calculation: '200 × 0.45359237', result: '90.7185 kg' },
  ],
  table: {
    caption: 'LBS to KG chart',
    header: ['Pounds (lbs)', 'Kilograms (kg)', 'Kilograms back to lbs'],
    rows: makeFactorRows({
      values: [1, 2, 5, 10, 20, 25, 50, 75, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 220, 250, 300],
      factor: KG_PER_LB,
      fromUnit: 'lb',
      toUnit: 'kg',
    }),
  },
  valueBlocks: [lbsBlock(1), lbsBlock(10), lbsBlock(100), lbsBlock(150), lbsBlock(200), lbsBlock(300)],
  faqs: [
    { q: 'How many kg is 1 lb?', a: 'One pound equals exactly 0.45359237 kilograms. Multiply any pound value by that factor to get kilograms.' },
    { q: 'Is lbs the same as pounds?', a: 'Yes. “lb” is the singular abbreviation and “lbs” the plural — both mean pound. LBS to KG and pounds to kilograms are the same conversion.' },
    {
      q: 'What is 150 lbs in kg?',
      a: '150 pounds equals 68.0389 kilograms (150 × 0.45359237). Read the same value from the chart on this page.',
    },
    { q: 'What is 200 lbs in kg?', a: '200 pounds equals 90.7185 kilograms. Type 200 in the pounds box above for the live result.' },
    { q: 'What is the lbs to kg formula?', a: 'Kilograms = pounds × 0.45359237. To reverse it, kilograms × 2.2046226218 = pounds.' },
    {
      q: 'Why is the factor 0.45359237 and not 0.45?',
      a: '0.45359237 is the exact number of kilograms in one international avoirdupois pound. Rounding to 0.45 introduces about a 0.8% error, which matters for shipping and medical figures.',
    },
  ],
  internalLinks: weightClusterExcept('lbs-to-kg-converter'),
  related: ['kg-to-lbs-converter', 'kilos-to-pounds-converter', 'pounds-to-kg-converter'],
  source: { label: 'NIST SI mass guidance', url: 'https://www.nist.gov/pml/owm/si-units-mass' },
};

/* ------------------------------------------------------------------ */
/* 3. Kilograms to pounds — the largest head term in the family        */
/* ------------------------------------------------------------------ */

const kilogramsToPounds: SeoConversionPage = {
  slug: 'kilograms-to-pounds-converter',
  kind: 'conversion',
  primaryKeyword: 'kilograms to pounds',
  keywords: ['kilograms to pounds', 'kilogram to pound', 'convert kilograms to pounds', 'kg to pounds', '1000 kg to lbs'],
  title: 'Kilograms to Pounds Converter',
  h1: 'Kilograms to Pounds Converter',
  seo: {
    title: `Kilograms to Pounds Converter | 1 kg = ${headlineValue(LB_PER_KG, 5)} lb`,
    description:
      'Convert kilograms to pounds instantly. 1 kilogram equals 2.2046226218 pounds. Learn how to convert kg to lbs with a full chart, worked examples and the formula.',
  },
  lead: 'Convert kilograms to pounds instantly — a free kilogram to pound converter with a full chart, worked examples and the exact formula. One kilogram equals 2.2046226218 pounds.',
  category: 'weight',
  categoryLabel: 'Weight',
  from: { label: 'Kilograms (kg)', unit: 'kg', defaultValue: 100 },
  to: { label: 'Pounds (lb)', unit: 'lb', defaultValue: 220.4623 },
  factor: LB_PER_KG,
  precision: 4,
  formula: '1 kilogram = 2.2046226218 pounds',
  reverseFormula: 'pounds ÷ 2.2046226218 = kilograms',
  explanation:
    '<strong>The kilogram (kg) is the SI base unit of mass and the standard unit of weight in almost every country.</strong> The <strong>pound (lb)</strong> is used mainly in the United States and, for body weight, in the United Kingdom. Converting <strong>kilograms to pounds</strong> means multiplying by <strong>2.2046226218</strong>, the exact number of pounds in one kilogram. This direction is the one that matters for freight and logistics: shipping labels, airline baggage allowances, pallet weights and industrial specifications are quoted in kilograms, while US-facing paperwork expects pounds. That is also why the head term carries a very high search volume — 1,000 kg equals 2,204.62 lb, and getting the exact figure rather than a rounded one avoids costly errors on customs forms. Every row below is computed from the exact definition, and the third column answers the reverse reading so you do not need a second page for pounds to kilograms. For the informal everyday wording, see the <a href="/converters/kilos-to-pounds-converter">kilos to pounds converter</a>.',
  examples: [
    { label: '1 kilogram in pounds', calculation: '1 × 2.2046226218', result: '2.2046 lb' },
    { label: '20 kilograms in pounds', calculation: '20 × 2.2046226218', result: '44.0925 lb' },
    { label: '500 kilograms in pounds', calculation: '500 × 2.2046226218', result: '1,102.3113 lb' },
    { label: '1,000 kilograms in pounds', calculation: '1,000 × 2.2046226218', result: '2,204.6226 lb' },
  ],
  table: {
    caption: 'Kilograms to pounds chart',
    header: ['Kilograms (kg)', 'Pounds (lb)', 'Pounds back to kilograms'],
    rows: makeFactorRows({
      values: [1, 2, 5, 10, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 500, 1000],
      factor: LB_PER_KG,
      fromUnit: 'kg',
      toUnit: 'lb',
    }),
  },
  valueBlocks: [kgBlock(1), kgBlock(20), kgBlock(70), kgBlock(100), { heading: '1,000 kg to lbs', answer: kgToLbsAnswer(1000) }, { heading: '25 kg to lbs', answer: kgToLbsAnswer(25) }],
  faqs: [
    { q: 'How many pounds is 1 kilogram?', a: 'One kilogram equals exactly 2.2046226218 pounds, commonly rounded to 2.2046 pounds.' },
    { q: 'What is the formula to convert kilograms to pounds?', a: 'Pounds = kilograms × 2.2046226218. For example, 20 kg × 2.2046226218 = 44.0925 lb.' },
    {
      q: 'How many pounds are in 1,000 kilograms?',
      a: '1,000 kilograms equals 2,204.6226 pounds — the figure used for tonne-to-pound freight and shipping conversions.',
    },
    { q: 'Which countries use pounds instead of kilograms?', a: 'The United States uses pounds for everyday weight. The United Kingdom uses pounds and stones for body weight while officially using kilograms, and most other countries use kilograms.' },
    { q: 'Is a kilogram heavier than a pound?', a: 'Yes. One kilogram is about 2.2 times heavier than one pound, since 1 lb is only 0.45359237 kg.' },
    { q: 'Does this converter round the results?', a: 'The live tool shows four decimal places, and the chart below rounds to two for readability. Both are calculated from the exact 2.2046226218 factor.' },
  ],
  internalLinks: weightClusterExcept('kilograms-to-pounds-converter'),
  related: ['kg-to-lbs-converter', 'kilos-to-pounds-converter', 'lbs-to-kg-converter'],
  source: { label: 'NIST SI mass guidance', url: 'https://www.nist.gov/pml/owm/si-units-mass' },
};

/* ------------------------------------------------------------------ */
/* 4. Pounds to KG — abbreviated form                                  */
/* ------------------------------------------------------------------ */

const poundsToKg: SeoConversionPage = {
  slug: 'pounds-to-kg-converter',
  kind: 'conversion',
  primaryKeyword: 'pounds to kg',
  keywords: ['pounds to kg', 'pounds to kilos', 'convert pounds to kg', 'how many kg in a pound', '180 pounds in kg'],
  title: 'Pounds to KG Converter',
  h1: 'Pounds to KG Converter',
  seo: {
    title: `Pounds to KG Converter | 1 lb = ${fmt(KG_PER_LB, 8)} kg`,
    description:
      'Convert pounds to kg instantly. 1 pound equals exactly 0.45359237 kilograms. Learn how to convert lbs to kg with a body-weight chart and the exact formula.',
  },
  lead: 'Convert pounds to kg instantly with the exact 0.45359237 factor, including a body-weight chart and worked examples. One pound equals 0.45359237 kilograms.',
  category: 'weight',
  categoryLabel: 'Weight',
  from: { label: 'Pounds (lb)', unit: 'lb', defaultValue: 180 },
  to: { label: 'Kilograms (kg)', unit: 'kg', defaultValue: 81.6466 },
  factor: KG_PER_LB,
  precision: 4,
  formula: '1 pound = 0.45359237 kg',
  reverseFormula: 'kilograms × 2.2046226218 = pounds',
  explanation:
    'This page converts <strong>pounds to kg</strong> — the abbreviated form of the same calculation as pounds to kilograms. You need it whenever a US figure has to be reported in metric weight: a 180-pound body weight becomes 81.65 kg, a 45-pound suitcase becomes 20.41 kg, and a 25-pound bag of feed becomes 11.34 kg. The factor <strong>0.45359237</strong> is exact by definition, so there is nothing to approximate. A fast estimate is to <strong>halve the pounds and subtract about 10%</strong> of the result: 180 lbs → 90, minus 9, gives roughly 81 kg, against the exact 81.6466 kg. If you need the spelled-out unit names, the <a href="/converters/pounds-to-kilograms-converter">pounds to kilograms converter</a> covers the same math; for the opposite direction, use the <a href="/converters/lbs-to-kg-converter">lbs to kg converter</a>.',
  examples: [
    { label: '10 pounds in kg', calculation: '10 × 0.45359237', result: '4.5359 kg' },
    { label: '45 pounds in kg', calculation: '45 × 0.45359237', result: '20.4117 kg' },
    { label: '180 pounds in kg', calculation: '180 × 0.45359237', result: '81.6466 kg' },
    { label: '300 pounds in kg', calculation: '300 × 0.45359237', result: '136.0777 kg' },
  ],
  table: {
    caption: 'Pounds to kg chart',
    header: ['Pounds (lb)', 'Kilograms (kg)', 'Kilograms back to pounds'],
    rows: makeFactorRows({
      values: [...range(1, 20), 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100],
      factor: KG_PER_LB,
      fromUnit: 'lb',
      toUnit: 'kg',
    }),
  },
  valueBlocks: [lbsBlock(10), lbsBlock(45), lbsBlock(150), lbsBlock(180), lbsBlock(200), lbsBlock(250)],
  faqs: [
    { q: 'How many kg is one pound?', a: 'One pound equals exactly 0.45359237 kilograms, usually rounded to 0.4536 kg.' },
    { q: 'What is 180 pounds in kg?', a: '180 pounds equals 81.6466 kilograms (180 × 0.45359237). Enter 180 in the pounds box above for the live result.' },
    { q: 'How many pounds make a kilogram?', a: 'One kilogram equals 2.2046226218 pounds, so it takes just over 2.2 pounds to make one kilogram.' },
    { q: 'How do I convert pounds to kg quickly?', a: 'Halve the pounds, then subtract about 10% of that half. For 180 lbs: 90 − 9 ≈ 81 kg, versus the exact 81.6466 kg.' },
    { q: 'Is a 23 kg baggage allowance over 50 pounds?', a: 'Yes. 23 kg equals 50.7063 pounds, so a 23 kg allowance is just over the common 50 lb limit.' },
  ],
  internalLinks: weightClusterExcept('pounds-to-kg-converter'),
  related: ['lbs-to-kg-converter', 'pounds-to-kilograms-converter', 'kg-to-lbs-converter'],
  source: { label: 'NIST SI mass guidance', url: 'https://www.nist.gov/pml/owm/si-units-mass' },
};

/* ------------------------------------------------------------------ */
/* 5. Pounds to kilograms — spelled-out form, international context    */
/* ------------------------------------------------------------------ */

const poundsToKilograms: SeoConversionPage = {
  slug: 'pounds-to-kilograms-converter',
  kind: 'conversion',
  primaryKeyword: 'pounds to kilograms',
  keywords: ['pounds to kilograms', 'convert pounds to kilograms', 'pound to kilogram', 'pounds into kilograms', 'lbs to kilograms'],
  title: 'Pounds to Kilograms Converter',
  h1: 'Pounds to Kilograms Converter',
  seo: {
    title: `Pounds to Kilograms Converter | 1 lb = ${fmt(KG_PER_LB, 8)} kg`,
    description:
      'Convert pounds to kilograms instantly. 1 pound equals exactly 0.45359237 kilograms. Learn how to convert with a metric weight chart and airline baggage values.',
  },
  lead: 'Convert pounds to kilograms instantly. This page spells out both unit names for labels, forms and international paperwork, using the exact 0.45359237 factor.',
  category: 'weight',
  categoryLabel: 'Weight',
  from: { label: 'Pounds', unit: 'lb', defaultValue: 50 },
  to: { label: 'Kilograms', unit: 'kg', defaultValue: 22.6796 },
  factor: KG_PER_LB,
  precision: 4,
  formula: '1 pound = 0.45359237 kilograms',
  reverseFormula: 'kilograms × 2.2046226218 = pounds',
  explanation:
    'Use this page when you need <strong>pounds to kilograms</strong> written out in full rather than abbreviated. That happens on medical records, customs declarations, courier forms and product labels, where “lb” is expanded to “pounds” and “kg” to “kilograms”. The arithmetic is identical to every other pounds-to-metric conversion: multiply by <strong>0.45359237</strong>. The values most often needed are the airline baggage thresholds, because carriers publish them in kilograms while US passengers read them in pounds: <strong>50 pounds equals 22.6796 kilograms</strong>, 44 pounds equals 19.9581 kilograms, and 70 pounds — a common US domestic limit — equals 31.7515 kilograms. The kilogram is the international unit of mass, so a spelled-out figure is also the safer choice when a form is read outside the United States. For the short-form version of the same conversion, see the <a href="/converters/pounds-to-kg-converter">pounds to kg converter</a>.',
  examples: [
    { label: '1 pound in kilograms', calculation: '1 × 0.45359237', result: '0.4536 kg' },
    { label: '44 pounds in kilograms', calculation: '44 × 0.45359237', result: '19.9581 kg' },
    { label: '50 pounds in kilograms', calculation: '50 × 0.45359237', result: '22.6796 kg' },
    { label: '70 pounds in kilograms', calculation: '70 × 0.45359237', result: '31.7515 kg' },
  ],
  table: {
    caption: 'Pounds to kilograms chart',
    header: ['Pounds', 'Kilograms', 'Kilograms back to pounds'],
    rows: makeFactorRows({
      values: [1, 2, 5, 10, 15, 20, 25, 30, 40, 44, 50, 60, 70, 80, 90, 100, 120, 150, 200, 250, 300, 400, 500],
      factor: KG_PER_LB,
      fromUnit: 'lb',
      toUnit: 'kg',
    }),
  },
  valueBlocks: [lbsBlock(20), lbsBlock(44), { heading: '50 lbs to kilograms', answer: lbsToKgAnswer(50) }, lbsBlock(100), lbsBlock(150), lbsBlock(500)],
  faqs: [
    { q: 'How do you convert pounds to kilograms?', a: 'Multiply the pound value by 0.45359237. For example, 50 pounds × 0.45359237 = 22.6796 kilograms.' },
    { q: 'How many kilograms is 50 pounds?', a: '50 pounds equals 22.6796 kilograms — the standard airline checked-baggage allowance of 23 kg is equivalent to about 50.7 pounds.' },
    { q: 'How many kilograms is 70 pounds?', a: '70 pounds equals 31.7515 kilograms.' },
    { q: 'Is a kilogram bigger than a pound?', a: 'Yes. One kilogram equals 2.2046226218 pounds, so a kilogram is more than twice a pound.' },
    { q: 'What is the difference between pounds to kg and pounds to kilograms?', a: 'None. “Pounds” is the full name and “lb” or “lbs” is its abbreviation; “kilograms” is the full name and “kg” its abbreviation. Both pages run the same calculation.' },
  ],
  internalLinks: weightClusterExcept('pounds-to-kilograms-converter'),
  related: ['pounds-to-kg-converter', 'lbs-to-kg-converter', 'kilograms-to-pounds-converter'],
  source: { label: 'NIST SI mass guidance', url: 'https://www.nist.gov/pml/owm/si-units-mass' },
};

/* ------------------------------------------------------------------ */
/* 6. KG to stone — UK body weight                                     */
/* ------------------------------------------------------------------ */

const kgToStone: SeoConversionPage = {
  slug: 'kg-to-stone-converter',
  kind: 'conversion',
  primaryKeyword: 'kg to stone',
  keywords: ['kg to stone', 'kilograms to stones', 'kg to st', '70 kg in stone', '80 kg in stone'],
  title: 'KG to Stone Converter',
  h1: 'KG to Stone Converter',
  seo: {
    title: `KG to Stone Converter | 1 kg ≈ ${fmt(1 / KG_PER_STONE, 6)} st`,
    description:
      'Convert kg to stone instantly. 1 kilogram equals about 0.157473 stone. Learn how to convert kg to st with a chart, stones-and-pounds notes and the exact formula.',
  },
  lead: 'Convert kg to stone instantly — a free kilograms to stones converter with a chart and the formula. One kilogram equals 0.157473 stone, and one stone equals 6.35029 kg.',
  category: 'weight',
  categoryLabel: 'Weight',
  from: { label: 'Kilograms (kg)', unit: 'kg', defaultValue: 70 },
  to: { label: 'Stones (st)', unit: 'st', defaultValue: 11.0231 },
  factor: 1 / KG_PER_STONE,
  precision: 4,
  formula: '1 kg = 0.157473 stone',
  reverseFormula: 'kilograms ÷ 6.35029318 = stones',
  explanation:
    'The <strong>stone (st)</strong> is a traditional British unit of weight still used for body weight in the United Kingdom and Ireland. One stone equals <strong>14 pounds</strong> or <strong>6.35029318 kilograms exactly</strong>. Converting <strong>kg to stone</strong> therefore means dividing kilograms by 6.35029318, which is the same as multiplying by 0.157473. Body weight is usually quoted as <strong>stones and pounds</strong> rather than a decimal, so a 70 kg adult is 11 stone 0 pounds (11.0231 stone), and 80 kg is 12 stone 8.4 pounds (12.5978 stone). To turn the decimal into stones and pounds, multiply the fraction after the decimal point by 14. Stones are the one common unit where a kilogram figure does not fully replace the local convention, so UK readers converting a metric scale or a doctor’s note into a familiar number need this specific conversion. For pounds instead of stones, use the <a href="/converters/kg-to-lbs-converter">kg to lbs converter</a>.',
  examples: [
    { label: '1 kg in stone', calculation: '1 ÷ 6.35029318', result: '0.1575 st' },
    { label: '60 kg in stone', calculation: '60 ÷ 6.35029318', result: '9.4484 st' },
    { label: '70 kg in stone', calculation: '70 ÷ 6.35029318', result: '11.0231 st' },
    { label: '100 kg in stone', calculation: '100 ÷ 6.35029318', result: '15.7473 st' },
  ],
  table: {
    caption: 'Kilograms to stones chart',
    header: ['Kilograms (kg)', 'Stones (st)', 'Stones back to kilograms'],
    rows: makeFactorRows({
      values: [...range(1, 20), 25, 30, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130],
      factor: 1 / KG_PER_STONE,
      fromUnit: 'kg',
      toUnit: 'st',
      toDigits: 4,
      reverseDigits: 2,
    }),
  },
  valueBlocks: [
    { heading: '60 kg to stone', answer: '60 kilograms equals 9.4484 stone — 9 stone 6.3 pounds.' },
    { heading: '70 kg to stone', answer: '70 kilograms equals 11.0231 stone — 11 stone 0.3 pounds.' },
    { heading: '75 kg to stone', answer: '75 kilograms equals 11.8105 stone — 11 stone 11.3 pounds.' },
    { heading: '80 kg to stone', answer: '80 kilograms equals 12.5978 stone — 12 stone 8.4 pounds.' },
    { heading: '90 kg to stone', answer: '90 kilograms equals 14.1726 stone — 14 stone 2.4 pounds.' },
    { heading: '100 kg to stone', answer: '100 kilograms equals 15.7473 stone — 15 stone 10.5 pounds.' },
  ],
  faqs: [
    { q: 'How many kg in a stone?', a: 'One stone equals exactly 6.35029318 kilograms, and one stone equals 14 pounds.' },
    { q: 'How do I convert kg to stone?', a: 'Divide the kilograms by 6.35029318. For example, 70 kg ÷ 6.35029318 = 11.0231 stone.' },
    { q: 'How do I write 70 kg in stones and pounds?', a: '70 kg is 11.0231 stone. Multiply the decimal 0.0231 by 14 to get 0.3 pounds, so 70 kg is 11 stone 0.3 pounds.' },
    { q: 'Is stone still used in the UK?', a: 'Yes. Body weight in the United Kingdom is still commonly given in stones and pounds, even though official measurements use kilograms.' },
    { q: 'What is 80 kg in stone?', a: '80 kilograms equals 12.5978 stone, which is 12 stone 8.4 pounds.' },
    { q: 'Are there stones in the US?', a: 'No. The stone is not a US customary unit; body weight in the United States is stated in pounds.' },
  ],
  internalLinks: weightClusterExcept('kg-to-stone-converter'),
  related: ['kg-to-lbs-converter', 'kilos-to-pounds-converter', 'lbs-to-kg-converter'],
  source: { label: 'NIST SI mass guidance', url: 'https://www.nist.gov/pml/owm/si-units-mass' },
};

/* ------------------------------------------------------------------ */
/* 7. GB to MB — data storage, high ad value                           */
/* ------------------------------------------------------------------ */

const gbToMb: SeoConversionPage = {
  slug: 'gb-to-mb-converter',
  kind: 'conversion',
  primaryKeyword: 'gb to mb',
  keywords: ['gb to mb', 'gigabytes to megabytes', '1 gb to mb', 'how many mb in a gb', '1000 mb to gb', 'kb to mb to gb to tb'],
  title: 'GB to MB Converter',
  h1: 'GB to MB Converter',
  seo: {
    title: `GB to MB Converter | 1 GB = ${fmt(MB_PER_GB, 0)} MB`,
    description:
      'Convert GB to MB instantly. 1 GB equals 1,024 MB in binary units. Learn how the 1,000 vs 1,024 difference changes the answer, with a full chart and explanation.',
  },
  lead: 'Convert GB to MB instantly — a free gigabytes to megabytes converter with a full chart and the 1,000 vs 1,024 explanation. In binary units one GB equals 1,024 MB.',
  category: 'data',
  categoryLabel: 'Data',
  from: { label: 'Gigabytes (GB)', unit: 'GB', defaultValue: 1 },
  to: { label: 'Megabytes (MB)', unit: 'MB', defaultValue: 1024 },
  factor: 1024,
  precision: 4,
  formula: '1 GB = 1,024 MB (binary)',
  reverseFormula: 'megabytes ÷ 1,024 = gigabytes',
  explanation:
    'Storage sizes follow two conventions, and the difference is the reason <strong>GB to MB</strong> is confusing. Operating systems and this converter use <strong>binary multiples</strong>, where <strong>1 GB equals 1,024 MB</strong>. Drive manufacturers and network specs usually use <strong>decimal SI multiples</strong>, where 1 GB equals exactly 1,000 MB. That gap is why a 500 GB drive shows up as roughly 465 GB in a file manager. Going the other way, 1,000 MB equals 0.9766 GB in binary terms — a number that catches people out when they are checking a data plan or a download estimate. Strict IEC terminology calls the binary quantities <strong>MiB</strong> and <strong>GiB</strong>, though consumer products almost never use those names. Every value in the chart below is in binary units and the third column converts megabytes back to gigabytes, so the reverse query is covered on the same page. The wider chain — <strong>KB to MB to GB to TB</strong> — divides by 1,024 at each step. See also the <a href="/converters/data-converter">MB to GB converter</a>.',
  examples: [
    { label: '1 GB in MB', calculation: '1 × 1,024', result: '1,024 MB' },
    { label: '2 GB in MB', calculation: '2 × 1,024', result: '2,048 MB' },
    { label: '5 GB in MB', calculation: '5 × 1,024', result: '5,120 MB' },
    { label: '100 GB in MB', calculation: '100 × 1,024', result: '102,400 MB' },
  ],
  table: {
    caption: 'GB to MB chart',
    header: ['Gigabytes (GB)', 'Megabytes (MB)', 'Megabytes back to gigabytes'],
    rows: makeFactorRows({
      values: [0.1, 0.25, 0.5, 1, 1.5, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
      factor: 1024,
      fromUnit: 'GB',
      toUnit: 'MB',
      fromDigits: 2,
      toDigits: 0,
      reverseDigits: 4,
    }),
  },
  valueBlocks: [
    { heading: '1 GB to MB', answer: '1 gigabyte equals 1,024 megabytes in binary units (1 × 1,024).' },
    { heading: '2 GB to MB', answer: '2 gigabytes equals 2,048 megabytes (2 × 1,024).' },
    { heading: '5 GB to MB', answer: '5 gigabytes equals 5,120 megabytes (5 × 1,024).' },
    { heading: '128 GB to MB', answer: '128 gigabytes equals 131,072 megabytes (128 × 1,024).' },
    { heading: '1000 MB to GB', answer: '1,000 megabytes equals 0.9766 GB in binary units. Under the decimal convention, 1,000 MB is exactly 1 GB.' },
    { heading: '1024 MB to GB', answer: '1,024 megabytes equals exactly 1 GB in binary units — this is the definition the operating system uses.' },
  ],
  faqs: [
    { q: 'How many MB are in a GB?', a: 'In binary units, 1 GB equals 1,024 MB. Manufacturers using decimal SI units treat 1 GB as exactly 1,000 MB, which is why a labelled capacity reads lower in a file manager.' },
    { q: 'How do I convert GB to MB?', a: 'Multiply gigabytes by 1,024. For example, 5 GB × 1,024 = 5,120 MB. To reverse it, divide megabytes by 1,024.' },
    { q: 'Is 1 GB 1,000 MB or 1,024 MB?', a: 'Both conventions are in use: 1,024 MB under the binary convention that operating systems report, and 1,000 MB under the decimal convention used by storage manufacturers and network specs.' },
    { q: 'What is 1,000 MB in GB?', a: 'In binary units 1,000 MB is 0.9766 GB. Under the decimal convention it is exactly 1 GB.' },
    { q: 'How do I convert KB to MB to GB to TB?', a: 'Divide by 1,024 at each step with binary units: 1,024 KB = 1 MB, 1,024 MB = 1 GB, 1,024 GB = 1 TB.' },
    { q: 'Does this converter use GB or GiB?', a: 'It uses the common operating-system convention of treating GB as 1,024 MB. Strict IEC terminology calls that binary quantity a GiB.' },
  ],
  internalLinks: DATA_CLUSTER.filter((link) => !link.href.endsWith('/gb-to-mb-converter')),
  related: ['data-converter', 'time-converter', 'length-converter'],
  source: { label: 'NIST prefixes for binary multiples', url: 'https://www.nist.gov/pml/owm/metric-si-prefixes' },
};

export const seoConversionPages: SeoConversionPage[] = [
  kilosToPounds,
  lbsToKg,
  kilogramsToPounds,
  poundsToKg,
  poundsToKilograms,
  kgToStone,
  gbToMb,
];

/* ------------------------------------------------------------------ */
/* Long-tail value pages                                               */
/* ------------------------------------------------------------------ */

interface ValuePageSeed {
  kg: number;
  title: string;
  lead: string;
  explanation: string;
  tableValues: number[];
  tableCaption: string;
  faqs: { q: string; a: string }[];
  related: string[];
}

function buildValuePage(seed: ValuePageSeed): SeoValuePage {
  const { kg } = seed;
  const lbs = kg * LB_PER_KG;
  const lbsRounded = fmt(lbs, 2);
  /**
   * "1 kilograms" is wrong, and the 1 kg page is the highest-traffic round
   * number in the family, so the singular form is not cosmetic here.
   */
  const kgWord = kg === 1 ? 'kilogram' : 'kilograms';
  const answer = `${mag(kg)} ${kgWord} equals ${lbsRounded} pounds.`;
  /**
   * Decimal magnitudes (2.47, 24.6, …) need matching table precision, or the
   * "from" column would print "2 kg" and "25 kg" instead of the searched
   * decimals. Integers keep the historical 0-decimal tables.
   */
  const fromDigits = Math.max(
    0,
    ...seed.tableValues.map((v) => {
      const s = String(v);
      return s.includes('.') ? s.split('.')[1].length : 0;
    }),
  );
  return {
    slug: `${kg}-kg-to-lbs`,
    kind: 'value',
    primaryKeyword: `${mag(kg)} kg to lbs`,
    keywords: [`${kg} kg to lbs`, `${kg}kg in lbs`, `convert ${kg} kg to pounds`, `${kg} kilograms in pounds`],
    title: seed.title,
    h1: `${mag(kg)} kg to lbs`,
    seo: {
      // Answer-first title: the query leads, the computed result follows, and
      // the spelled-out variant covers the "kilograms to pounds" phrasing. The
      // brand suffix was dropped — an unestablished brand spends ~12 characters
      // of every title on recognition it does not yet have.
      title: `${mag(kg)} kg to lbs ≈ ${headlineValue(lbs)} lb (Kilograms to Pounds)`,
      // First sentence is the answer (removes uncertainty), second sentence
      // promises the method (gives a reason to click even though the answer
      // was already shown). Matches the pattern in the competitor teardown.
      description: `${mag(kg)} ${kgWord} equals ${lbsRounded} pounds. Learn how to convert ${mag(kg)} kg to lbs with the exact 2.2046226218 factor, a nearby-value chart and the formula.`,
    },
    lead: `${seed.lead} ${mag(kg)} ${kgWord} equals ${lbsRounded} pounds.`,
    answer,
    from: { label: 'Kilograms (kg)', unit: 'kg' },
    to: { label: 'Pounds (lb)', unit: 'lb' },
    defaultFrom: kg,
    defaultTo: Number(lbs.toFixed(4)),
    factor: LB_PER_KG,
    precision: 4,
    formula: `${mag(kg)} kg × 2.2046226218 = ${lbsRounded} lb`,
    explanation: seed.explanation,
    table: {
      caption: seed.tableCaption,
      header: ['Kilograms (kg)', 'Pounds (lb)', 'Pounds back to kilograms'],
      rows: makeFactorRows({ values: seed.tableValues, factor: LB_PER_KG, fromUnit: 'kg', toUnit: 'lb', fromDigits }),
    },
    unitBreakdown: sameMagnitude(kg),
    faqs: seed.faqs,
    internalLinks: [
      { anchor: 'kg to lbs converter', href: '/converters/kg-to-lbs-converter', note: 'convert any kilogram value' },
      { anchor: 'kilos to pounds converter', href: '/converters/kilos-to-pounds-converter', note: 'the everyday “kilos” wording' },
      { anchor: 'lbs to kg converter', href: '/converters/lbs-to-kg-converter', note: 'reverse direction' },
      { anchor: 'all weight converters', href: '/converters', note: 'every unit converter on CalcPilot' },
    ],
    related: seed.related,
  };
}

const valuePageSeeds: ValuePageSeed[] = [
  {
    kg: 1,
    title: '1 kg to lbs',
    lead: 'One kilogram is the reference point for the whole kg-to-pound conversion, so this page states it exactly.',
    explanation:
      'The single most-searched value in the kilogram-to-pound family is <strong>1 kg to lbs</strong>, because it is the factor people memorise before doing anything else. <strong>1 kilogram equals 2.2046226218 pounds</strong>, usually shortened to 2.2046 or 2.2. That number is a definition rather than a measurement, so it does not vary by location, material or rounding convention. From it, every other value in the family follows by multiplication: 5 kg is 11.0231 lb, 10 kg is 22.0462 lb and 100 kg is 220.4623 lb. If you only remember one figure from this site, remember 2.2 pounds per kilogram and treat the extra 0.0046 as a correction you apply when accuracy matters.',
    tableValues: range(1, 10),
    tableCaption: 'Small kilogram values in pounds',
    faqs: [
      { q: 'How many pounds is 1 kg?', a: '1 kilogram equals exactly 2.2046226218 pounds, or 2.2046 pounds to four decimal places.' },
      { q: 'Is 1 kg exactly 2.2 lbs?', a: 'Not quite. 2.2 is a rounded approximation; the exact value is 2.2046226218 pounds, about 0.2% higher.' },
      { q: 'How many kg is 1 lb?', a: '1 pound equals exactly 0.45359237 kilograms, so 1 kg is a little more than 2.2 pounds.' },
    ],
    related: ['kg-to-lbs-converter', 'kilos-to-pounds-converter', '10-kg-to-lbs'],
  },
  {
    kg: 10,
    title: '10 kg to lbs',
    lead: 'Ten kilograms is a common bag, dumbbell and luggage weight, and it converts to a tidy figure.',
    explanation:
      '<strong>10 kilograms equals 22.0462 pounds.</strong> Ten kilograms is the standard metric increment for dumbbells, rice bags, suitcase allowances and shipping cartons, which is why the query appears so often on its own. The arithmetic is a straight multiplication by <strong>2.2046226218</strong>: 10 × 2.2046226218 = 22.046226218. Because the result lands close to a round 22 pounds, 10 kg is the value where the “double it and add 10%” shortcut (20 + 2 = 22 lb) works best — the exact answer is only 0.0462 pounds higher.',
    tableValues: [1, 2, 5, 10, 15, 20, 25, 30, 40, 50],
    tableCaption: 'Kilograms around 10 kg in pounds',
    faqs: [
      { q: 'What is 10 kg in lbs?', a: '10 kilograms equals 22.0462 pounds (10 × 2.2046226218).' },
      { q: 'Is 10 kg about 22 lbs?', a: 'Yes. 10 kg is 22.0462 lb, so 22 lb is a good rounding for everyday use.' },
      { q: 'How many pounds is a 10 kg dumbbell?', a: 'A 10 kg dumbbell is 22.0462 lb, equivalent to two 11 lb plates when converting from an imperial set.' },
    ],
    related: ['kg-to-lbs-converter', 'kilos-to-pounds-converter', '50-kg-to-lbs'],
  },
  {
    kg: 50,
    title: '50 kg to lbs',
    lead: 'Fifty kilograms is the classic airline baggage threshold and a common body-weight milestone.',
    explanation:
      '<strong>50 kilograms equals 110.2311 pounds.</strong> This value shows up constantly in two contexts: airline baggage, where 50 kg is a generous premium-cabin allowance, and body weight, where 50 kg is a common milestone on the metric side of a scale. The exact conversion is 50 × <strong>2.2046226218</strong> = 110.23113109 pounds. Note that 110 lb is not the same as 50 kg — treating the two as equal introduces a 0.21% error, which is small for luggage but not for anything measured on a calibrated scale.',
    tableValues: [10, 20, 25, 30, 40, 45, 50, 55, 60, 75, 100],
    tableCaption: 'Kilograms around 50 kg in pounds',
    faqs: [
      { q: 'What is 50 kg in lbs?', a: '50 kilograms equals 110.2311 pounds (50 × 2.2046226218).' },
      { q: 'Is 50 kg the same as 110 lbs?', a: 'Not exactly. 50 kg is 110.2311 lb, so 110 lb is a close but slightly low rounding.' },
      { q: 'How many pounds is a 50 kg suitcase?', a: 'A 50 kg suitcase weighs 110.2311 lb, which is well above the typical 23 kg allowance on most airlines.' },
    ],
    related: ['kg-to-lbs-converter', 'kilos-to-pounds-converter', '60-kg-to-lbs'],
  },
  {
    kg: 60,
    title: '60 kg to lbs',
    lead: 'Sixty kilograms is one of the most frequently converted body-weight values on the metric scale.',
    explanation:
      '<strong>60 kilograms equals 132.2774 pounds.</strong> Sixty kilos is a very common adult body weight on metric scales, and the same figure appears in gym-loading and shipping contexts. The conversion is 60 × <strong>2.2046226218</strong> = 132.277357308 pounds. The third column below lets you read the calculation backwards, so 60 pounds in kilograms (27.2155 kg) is answered without switching pages. The value sits between the two most-searched body-weight milestones: 50 kg is 110.23 lb and 70 kg is 154.32 lb.',
    tableValues: [50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 100],
    tableCaption: 'Body weights around 60 kg in pounds',
    faqs: [
      { q: 'What is 60 kg in lbs?', a: '60 kilograms equals 132.2774 pounds (60 × 2.2046226218).' },
      { q: 'Is 60 kg equal to 132 lbs?', a: '60 kg is 132.2774 lb, so 132 lb is a slight understatement — the difference is about 0.28 pounds.' },
      { q: 'What is 60 pounds in kg?', a: '60 pounds equals 27.2155 kilograms (60 × 0.45359237).' },
    ],
    related: ['kg-to-lbs-converter', 'kilos-to-pounds-converter', '100-kg-to-lbs'],
  },
  {
    kg: 100,
    title: '100 kg to lbs',
    lead: 'One hundred kilograms is a round metric ton-fraction that converts to a memorable imperial figure.',
    explanation:
      '<strong>100 kilograms equals 220.4623 pounds.</strong> This is the value that anchors the whole family: once you know 100 kg is about 220 lb, most mental estimates become possible, because dividing by 100 gives the per-kilogram rate you already know (2.2046 lb). The exact result is 100 × <strong>2.2046226218</strong> = 220.46226218 pounds. One hundred kilograms is also the reference weight in shipping and in Olympic weightlifting totals, where kilograms are the official unit and pounds appear only in commentary.',
    tableValues: [80, 85, 90, 95, 100, 105, 110, 120, 150, 200],
    tableCaption: 'Kilograms around 100 kg in pounds',
    faqs: [
      { q: 'What is 100 kg in lbs?', a: '100 kilograms equals 220.4623 pounds (100 × 2.2046226218).' },
      { q: 'Is 100 kg exactly 220 lb?', a: 'No. 100 kg is 220.4623 lb, so 220 lb is 0.46 pounds light.' },
      { q: 'How many pounds is 100 kg in stones?', a: '100 kg is 220.4623 lb, which is 15 stone 10.5 pounds. Use the kg to stone converter for the full breakdown.' },
    ],
    related: ['kg-to-lbs-converter', 'kilograms-to-pounds-converter', 'kg-to-stone-converter'],
  },
  {
    // GSC top query in the whole export: "2.47kg in pounds" — 40 impressions at
    // position 7.05. This page exists because Google already demonstrated the
    // demand, not to farm decimals.
    kg: 2.47,
    title: '2.47 kg to lbs',
    lead: 'A value like 2.47 kg comes straight off a scale, a product label or a shipping manifest, so it deserves the exact figure rather than a rounded one.',
    explanation:
      '<strong>2.47 kilograms equals 5.4454 pounds.</strong> The arithmetic is a straight multiplication: 2.47 × <strong>2.2046226218</strong> = 5.445417876 lb, and the tail past four decimals never matters in everyday use. People arrive at this exact decimal from a digital kitchen or luggage scale, a baby’s birth weight, or a courier label — and they need the precise figure, because rounding 2.47 to “about 2.5 kg” already shifts the result by 0.07 pounds. In smaller units, 2.47 kg is 2,470 grams or about 87.1 ounces. Read in reverse, 5.4454 lb ÷ 2.2046226218 = 2.47 kg — the <a href="/converters/lbs-to-kg-converter">lbs to kg converter</a> does that directly. Nearby magnitudes are in the chart below: 2.4 kg is 5.2911 lb, 2.5 kg is 5.5116 lb, and the <a href="/converters/2.6-kg-to-lbs">2.6 kg to lbs</a> page covers the next decimal up.',
    tableValues: [2.2, 2.3, 2.4, 2.45, 2.47, 2.5, 2.55, 2.6],
    tableCaption: 'Kilogram values around 2.47 kg in pounds',
    faqs: [
      { q: 'What is 2.47 kg in lbs?', a: '2.47 kilograms equals 5.4454 pounds (2.47 × 2.2046226218 = 5.445417876).' },
      {
        q: 'Is 2.47 kg the same as 5.45 pounds?',
        a: 'Almost — 5.45 lb is the four-decimal answer 5.4454 lb rounded to two decimals, an error of less than 0.005 pounds.',
      },
      { q: 'How many grams is 2.47 kg?', a: '2.47 kilograms is 2,470 grams, or about 87.1 ounces.' },
      { q: 'What is 2.47 lbs in kg?', a: '2.47 pounds equals 1.1204 kilograms (2.47 × 0.45359237).' },
    ],
    related: ['kg-to-lbs-converter', '2.6-kg-to-lbs', 'lbs-to-kg-converter'],
  },
  {
    // Second GSC cluster: "2.6 kg to pounds", "2.6 kgs in pounds",
    // "2.6 kilograms to pounds", "what is 2.6 kg in lbs", "2.6 kilos to
    // pounds" — 17 impressions combined, position ~41–51.
    kg: 2.6,
    title: '2.6 kg to lbs',
    lead: 'Two point six kilograms is a one-hand-carry weight — a small dog, a mid-size laptop bag — and the query is searched in more phrasings than almost any other decimal.',
    explanation:
      '<strong>2.6 kilograms equals 5.7320 pounds.</strong> Every phrasing of the question — “2.6 kg to pounds”, “2.6 kgs in pounds”, “2.6 kilograms to pounds”, “what is 2.6 kg in lbs”, “2.6 kilos to pounds” — resolves to the same multiplication: 2.6 × <strong>2.2046226218</strong> = 5.732018817 lb. The mental shortcut works well here: double 2.6 to get 5.2, add about 10% (0.52), and you land at 5.72 — within 0.02 pounds of the exact figure. In smaller units, 2.6 kg is 2,600 grams or about 91.7 ounces, which reads as 5 pounds 11.7 ounces on a US kitchen or nursery scale. Going the other way, 5.732 lb ÷ 2.2046226218 = 2.6 kg. The chart below covers the neighbouring decimals, and the <a href="/converters/2.47-kg-to-lbs">2.47 kg to lbs</a> page handles the next decimal down.',
    tableValues: [2.3, 2.4, 2.5, 2.55, 2.6, 2.65, 2.7, 2.75, 2.8],
    tableCaption: 'Kilogram values around 2.6 kg in pounds',
    faqs: [
      { q: 'What is 2.6 kg in lbs?', a: '2.6 kilograms equals 5.7320 pounds (2.6 × 2.2046226218 = 5.732018817).' },
      {
        q: 'What is 2.6 kg in pounds and ounces?',
        a: '2.6 kg is 5.7320 lb, which is 5 pounds 11.7 ounces (0.7320 × 16 = 11.7 oz).',
      },
      { q: 'How many ounces is 2.6 kg?', a: '2.6 kilograms is about 91.7 ounces — 2,600 grams divided by 28.3495 grams per ounce.' },
      { q: 'What is 2.6 lbs in kg?', a: '2.6 pounds equals 1.1793 kilograms (2.6 × 0.45359237).' },
    ],
    related: ['kg-to-lbs-converter', '2.47-kg-to-lbs', 'lbs-to-kg-converter'],
  },
  {
    // Third GSC value: "24.6 kg to lbs" — 5 impressions at position 42.20.
    kg: 24.6,
    title: '24.6 kg to lbs',
    lead: 'Twenty-four point six kilograms sits just above the classic 23 kg checked-baggage allowance, which is the most common reason this exact value gets searched.',
    explanation:
      '<strong>24.6 kilograms equals 54.2337 pounds.</strong> The exact result is 24.6 × <strong>2.2046226218</strong> = 54.23371649 lb. Baggage is the everyday case that lands people on this page: most airlines allow 23 kg (50.7063 lb) per checked bag, so a 24.6 kg suitcase is roughly 1.6 kg — 3.5 pounds — over the limit, which is where overweight fees start. The same magnitude reads as the weight of a large dog or a seven- to eight-year-old child. In other units, 24.6 kg is 24,600 grams, about 867.7 ounces, or 3.8739 stone (3 st 12.2 lb in the stones-and-pounds format UK scales use). To reverse it, 54.2337 lb ÷ 2.2046226218 = 24.6 kg, or use the <a href="/converters/lbs-to-kg-converter">lbs to kg converter</a>; for the UK body-weight format, the <a href="/converters/kg-to-stone-converter">kg to stone converter</a> handles stones directly.',
    tableValues: [23.6, 23.8, 24, 24.2, 24.4, 24.6, 24.8, 25, 25.2],
    tableCaption: 'Kilogram values around 24.6 kg in pounds',
    faqs: [
      { q: 'What is 24.6 kg in lbs?', a: '24.6 kilograms equals 54.2337 pounds (24.6 × 2.2046226218 = 54.23371649).' },
      {
        q: 'Is 24.6 kg over the checked baggage limit?',
        a: 'Usually yes. The standard allowance is 23 kg (50.7063 lb), so 24.6 kg is about 1.6 kg or 3.5 pounds over — into overweight-fee territory on most carriers.',
      },
      {
        q: 'How many stones is 24.6 kg?',
        a: '24.6 kg is 3.8739 stone, which reads as 3 stone 12.2 pounds in the stones-and-pounds format.',
      },
      { q: 'What is 24.6 lbs in kg?', a: '24.6 pounds equals 11.1584 kilograms (24.6 × 0.45359237).' },
    ],
    related: ['kg-to-lbs-converter', '2.6-kg-to-lbs', 'kg-to-stone-converter'],
  },
];

export const seoValuePages: SeoValuePage[] = valuePageSeeds.map(buildValuePage);

/** Look up a page rendered by /converters/[slug] from either family. */
export function getSeoPage(slug: string): SeoConversionPage | SeoValuePage | undefined {
  return seoConversionPages.find((p) => p.slug === slug) ?? seoValuePages.find((p) => p.slug === slug);
}
