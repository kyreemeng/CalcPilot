// Site-wide registry — brand, navigation, categories, footer, and the
// searchable index of all tools. Imported by layouts and pages.

import { financeTools } from './finance-tools';
import { converterTools } from './converters';

export const brand = 'CalcPilot';
export const siteUrl = (import.meta.env.PUBLIC_SITE_URL || 'https://calcpilot.net').replace(/\/$/, '');
export const repositoryUrl = 'https://github.com/kyreemeng/CalcPilot';

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
  { id: 'finance', name: 'Finance', href: '/finance', blurb: 'Mortgage, loan, salary, savings and compound interest calculators.' },
  { id: 'converters', name: 'Converters', href: '/converters', blurb: 'Weight, length, temperature, time and data unit converters.' },
  { id: 'time-date', name: 'Time & Date', href: '/time-date', blurb: 'Date arithmetic, countdowns and time zone tools.' },
  { id: 'everyday', name: 'Everyday', href: '/everyday', blurb: 'Percentages, tips, BMI and other everyday calculators.' },
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
  { slug: 'tip-calculator', title: 'Tip Calculator', shortDesc: 'Tip amount and total bill, including split.', category: 'everyday', href: '/everyday/tip-calculator' },
  { slug: 'discount-calculator', title: 'Discount Calculator', shortDesc: 'Final price after a percentage discount.', category: 'everyday', href: '/everyday/discount-calculator' },
  { slug: 'bmi-calculator', title: 'BMI Calculator', shortDesc: 'Body mass index and weight category.', category: 'everyday', href: '/everyday/bmi-calculator' },
];

export const allTools: ToolRef[] = [...financeToolRefs, ...converterToolRefs, ...timeDateToolRefs, ...everydayToolRefs];

export const popularSlugs = [
  'mortgage-calculator',
  'loan-calculator',
  'salary-calculator',
  'savings-calculator',
  'compound-calculator',
  'kg-to-lbs-converter',
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
    seoTitle: 'Finance Calculators',
    seoDescription: 'Free mortgage, loan, salary, savings and compound interest calculators with instant results and clear payment breakdowns.',
    lead: 'Personal finance calculators',
    intro: "Planning a major purchase or trying to make sense of your money? CalcPilot's finance calculators turn rough numbers into clear, confident answers. Our mortgage calculator shows your true monthly housing cost including principal, interest, property tax and home insurance, while the loan calculator breaks any fixed-rate borrowing into a simple payment schedule. The salary calculator converts an annual salary into hourly, weekly and monthly figures so you can compare job offers on equal terms, and the savings calculator projects how regular contributions compound toward a goal. Every tool updates the moment you type, needs no account, and shows the formula behind each result so you can trust what you see. Use these estimators to budget, plan and negotiate with confidence, then confirm the final details with a qualified professional before you commit. New to CalcPilot? Start with the mortgage calculator if you are house-hunting, or open the savings calculator to see how small monthly deposits add up over time. All figures are estimates for planning only.",
    toolRefs: financeToolRefs,
  },
  {
    id: 'converters',
    title: 'Converters',
    seoTitle: 'Unit Converters',
    seoDescription: 'Convert kg to lbs, meters to feet, Celsius to Fahrenheit, hours to minutes, and MB to GB instantly in your browser.',
    lead: 'Everyday unit converters',
    intro: "Quick, precise unit conversions for everyday use. Convert kilograms to pounds, meters to feet, Celsius to Fahrenheit, hours to minutes, or megabytes to gigabytes — all in real time, right in your browser. Every converter is bidirectional: type in either box and the other updates instantly, with no buttons to press and no page reloads. Below the converter you will find a quick-reference table of common values and a short explanation of the units, so you can trust the result at a glance. All figures are estimates for everyday and planning use.",
    toolRefs: converterToolRefs,
  },
  {
    id: 'time-date',
    title: 'Time & Date',
    seoTitle: 'Time & Date Calculators',
    seoDescription: 'Calculate exact age, days between dates, date offsets, and event countdowns with free online date tools.',
    lead: 'Date arithmetic and time tools',
    intro: "Plan dates, birthdays and deadlines with simple, instant date tools. Find your exact age, count the days between two dates, add or subtract days, or count down to an important event. Every tool runs right in your browser — pick a date and the answer updates immediately, with no buttons and no page reloads. All results are for everyday and planning use.",
    toolRefs: timeDateToolRefs,
  },
  {
    id: 'everyday',
    title: 'Everyday',
    seoTitle: 'Everyday Calculators',
    seoDescription: 'Free percentage, tip, discount and BMI calculators for everyday math — instant results, no sign-up required.',
    lead: 'Calculators for daily life',
    intro: "Quick calculators for the numbers you use every day. Work out a percentage, split a tip, apply a discount, or check your body mass index. Type a value and the result updates instantly — no account, no sign-up, no downloads. All results are estimates for everyday use.",
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
  'salary-calculator': 'dollar-sign',
  'savings-calculator': 'trending-up',
  'compound-calculator': 'repeat',
  'kg-to-lbs-converter': 'box',
  'length-converter': 'ruler',
  'temperature-converter': 'thermometer',
  'time-converter': 'clock',
  'data-converter': 'database',
  'age-calculator': 'calendar',
  'date-difference-calculator': 'calendar',
  'date-add-calculator': 'calendar',
  'countdown-calculator': 'clock',
  'percentage-calculator': 'percent',
  'tip-calculator': 'dollar-sign',
  'discount-calculator': 'tag',
  'bmi-calculator': 'activity',
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
