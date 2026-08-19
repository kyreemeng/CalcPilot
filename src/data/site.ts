// Site-wide registry — brand, navigation, categories, footer, and the
// searchable index of all tools. Imported by layouts and pages.

import { financeTools } from './finance-tools';
import { converterTools } from './converters';

export const brand = 'CalcPilot';
export const siteUrl = (import.meta.env.PUBLIC_SITE_URL || 'https://calcpilot.net').replace(/\/$/, '');
export const repositoryUrl = 'https://github.com/kyreemeng/CalcPilot';
const configuredProfiles = (import.meta.env.PUBLIC_SAME_AS || '')
  .split(',')
  .map((url: string) => url.trim())
  .filter((url: string) => /^https?:\/\/\S+$/.test(url));
export const sameAsProfiles = [...new Set([repositoryUrl, ...configuredProfiles])];

export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: 'Finance', href: '/finance' },
  { label: 'Converters', href: '/converters' },
  { label: 'Time & Date', href: '/time-date' },
  { label: 'Everyday', href: '/everyday' },
];

export interface Category {
  id: string;
  name: string;
  href: string;
  blurb: string;
}

export const categories: Category[] = [
  { id: 'finance', name: 'Finance', href: '/finance', blurb: 'Mortgage, auto loan, salary, savings and compound interest calculators.' },
  { id: 'converters', name: 'Converters', href: '/converters', blurb: 'kg to lbs, currency, speed, area, volume and everyday unit converters.' },
  { id: 'time-date', name: 'Time & Date', href: '/time-date', blurb: 'Age, date arithmetic, deadline and countdown tools.' },
  { id: 'everyday', name: 'Everyday', href: '/everyday', blurb: 'Percentages, tips, BMI, BMR and other everyday calculators.' },
];

export interface ToolRef {
  slug: string;
  title: string;
  shortDesc: string;
  category: 'finance' | 'converters' | 'time-date' | 'everyday';
  href: string;
}

export const financeToolRefs: ToolRef[] = financeTools.map((t) => ({
  slug: t.slug,
  title: t.title,
  shortDesc: t.shortDesc,
  category: 'finance',
  href: `/finance/${t.slug}`,
}));

export const converterToolRefs: ToolRef[] = converterTools.map((t) => ({
  slug: t.slug,
  title: t.title,
  shortDesc: t.shortDesc,
  category: 'converters',
  href: `/converters/${t.slug}`,
}));

export const timeDateToolRefs: ToolRef[] = [
  { slug: 'age-calculator', title: 'Age Calculator', shortDesc: 'Find your exact age in years, months and days.', category: 'time-date', href: '/time-date/age-calculator' },
  { slug: 'date-difference-calculator', title: 'Date Difference Calculator', shortDesc: 'Calculate the days between two dates.', category: 'time-date', href: '/time-date/date-difference-calculator' },
  { slug: 'date-add-calculator', title: 'Date Add Calculator', shortDesc: 'Add or subtract days to find a new date.', category: 'time-date', href: '/time-date/date-add-calculator' },
  { slug: 'countdown-calculator', title: 'Countdown Calculator', shortDesc: 'Days remaining until a date.', category: 'time-date', href: '/time-date/countdown-calculator' },
];

export const everydayToolRefs: ToolRef[] = [
  { slug: 'percentage-calculator', title: 'Percentage Calculator', shortDesc: 'Find a percentage of any number.', category: 'everyday', href: '/everyday/percentage-calculator' },
  { slug: 'percentage-change-calculator', title: 'Percentage Change Calculator', shortDesc: 'Calculate percentage increase or decrease.', category: 'everyday', href: '/everyday/percentage-change-calculator' },
  { slug: 'tip-calculator', title: 'Tip Calculator', shortDesc: 'Tip amount and total bill, including split.', category: 'everyday', href: '/everyday/tip-calculator' },
  { slug: 'discount-calculator', title: 'Discount Calculator', shortDesc: 'Final price after a percentage discount.', category: 'everyday', href: '/everyday/discount-calculator' },
  { slug: 'bmi-calculator', title: 'BMI Calculator', shortDesc: 'Body mass index and weight category.', category: 'everyday', href: '/everyday/bmi-calculator' },
  { slug: 'bmr-calorie-calculator', title: 'BMR & Calorie Calculator', shortDesc: 'Estimate BMR and daily calorie needs.', category: 'everyday', href: '/everyday/bmr-calorie-calculator' },
];

export const allTools: ToolRef[] = [...financeToolRefs, ...converterToolRefs, ...timeDateToolRefs, ...everydayToolRefs];

export const popularSlugs = [
  'kg-to-lbs-converter',
  'salary-calculator',
  'mortgage-calculator',
  'auto-loan-calculator',
  'currency-converter',
  'date-difference-calculator',
  'percentage-calculator',
  'bmr-calorie-calculator',
];

export function getToolRef(slug: string): ToolRef | undefined {
  return allTools.find((t) => t.slug === slug);
}

export function getToolTitle(slug: string): string {
  return getToolRef(slug)?.title ?? brand;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Calculators',
    links: [
      { label: 'Finance', href: '/finance' },
      { label: 'Converters', href: '/converters' },
      { label: 'Time & Date', href: '/time-date' },
      { label: 'Everyday', href: '/everyday' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Contact', href: '/contact' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  },
];

export interface Hub {
  id: string;
  title: string;
  /** Page <title> without brand suffix. */
  seoTitle: string;
  /** Meta description, kept under ~155 chars on word boundaries. */
  seoDescription: string;
  lead: string;
  intro: string;
  toolRefs: ToolRef[];
}

export const hubs: Hub[] = [
  {
    id: 'finance',
    title: 'Finance',
    seoTitle: 'Finance Calculators: Salary, Mortgage & Loans',
    seoDescription: 'Free USD salary calculator (hourly to monthly after tax), mortgage, auto loan, savings and compound interest tools. Instant, no sign-up.',
    lead: 'Personal finance calculators',
    intro: "Planning a major purchase or trying to make sense of your money? CalcPilot's finance calculators turn rough numbers into clear, confident answers. The <a href=\"/finance/salary-calculator\">USD salary calculator</a> converts hourly wage to monthly take-home after tax. Our mortgage calculator shows your true monthly housing cost, while the auto loan calculator includes vehicle price, trade-in, tax and fees. The general loan calculator breaks fixed-rate borrowing into a payment schedule, and the savings tools project how regular contributions compound toward a goal. Every tool updates the moment you type, needs no account, and shows the formula behind each result so you can trust what you see. Use these estimators to budget, plan and negotiate with confidence, then confirm final details with a qualified professional before you commit. All figures are estimates for planning only.",
    toolRefs: financeToolRefs,
  },
  {
    id: 'converters',
    title: 'Converters',
    seoTitle: 'Free Unit Converters — kg to lbs, Length, °C & More',
    seoDescription: 'Free kg to lbs converter plus currency, length, temperature, speed, area and volume tools. Bidirectional, instant results, no sign-up.',
    lead: 'Everyday unit converters',
    intro: "Start with the popular <a href=\"/converters/kg-to-lbs-converter\">kg to lbs converter</a> (kilograms to pounds), then convert currency with public ECB reference rates, or switch among speed, area, volume, length, temperature, time and data units. Every converter is bidirectional and updates instantly with no page reloads. Below each tool you will find a quick-reference table, formula notes and answers to common questions. Currency rates are planning references, not bank quotes.",
    toolRefs: converterToolRefs,
  },
  {
    id: 'time-date',
    title: 'Time & Date',
    seoTitle: 'Date Difference & Age Calculators',
    seoDescription: 'Free date difference calculator — exact days between two dates — plus age, date add/subtract and countdown tools. Instant, no sign-up.',
    lead: 'Date arithmetic and time tools',
    intro: "Plan dates, birthdays and deadlines with simple, instant date tools. Use the <a href=\"/time-date/date-difference-calculator\">date difference calculator</a> to count days between two dates, find your exact age, add or subtract days, or count down to an important event. Every tool runs right in your browser — pick a date and the answer updates immediately, with no buttons and no page reloads. All results are for everyday and planning use.",
    toolRefs: timeDateToolRefs,
  },
  {
    id: 'everyday',
    title: 'Everyday',
    seoTitle: 'Free Everyday Calculators — %, Tip, BMI & BMR',
    seoDescription: 'Free percentage, tip, discount, BMI and BMR calculators for everyday math and planning. Instant results with no sign-up.',
    lead: 'Calculators for daily life',
    intro: "Quick calculators for the numbers you use every day. Work out a percentage or percentage change, split a tip, apply a discount, check BMI, or estimate BMR and daily calorie needs. Type a value and the result updates instantly — no account, no sign-up, no downloads. Health results are population-based planning estimates, not medical advice.",
    toolRefs: everydayToolRefs,
  },
];

export function getHub(id: string): Hub | undefined {
  return hubs.find((h) => h.id === id);
}

// Icon name per tool slug (see components/Icon.astro).
export const toolIcons: Record<string, string> = {
  'mortgage-calculator': 'home',
  'loan-calculator': 'credit-card',
  'auto-loan-calculator': 'credit-card',
  'salary-calculator': 'dollar-sign',
  'savings-calculator': 'trending-up',
  'compound-calculator': 'repeat',
  'kg-to-lbs-converter': 'box',
  'length-converter': 'ruler',
  'temperature-converter': 'thermometer',
  'time-converter': 'clock',
  'data-converter': 'database',
  'currency-converter': 'dollar-sign',
  'speed-converter': 'activity',
  'area-converter': 'ruler',
  'volume-converter': 'box',
  'age-calculator': 'calendar',
  'date-difference-calculator': 'calendar',
  'date-add-calculator': 'calendar',
  'countdown-calculator': 'clock',
  'percentage-calculator': 'percent',
  'percentage-change-calculator': 'trending-up',
  'tip-calculator': 'dollar-sign',
  'discount-calculator': 'tag',
  'bmi-calculator': 'activity',
  'bmr-calorie-calculator': 'activity',
};

export const categoryIcons: Record<string, string> = {
  finance: 'trending-up',
  converters: 'refresh-cw',
  'time-date': 'clock',
  everyday: 'shopping-bag',
};

export function toolIcon(slug: string): string {
  return toolIcons[slug] ?? 'box';
}
