// Finance tool registry — single source of truth for the 5 finance calculators.
// Each config drives one unique URL and its full page (form, result, content blocks, SEO).

import type { CurrencyCode } from '../lib/format';
import {
  computeMortgage,
  computeLoan,
  computeSalary,
  computeSavings,
  computeCompound,
  type FinanceResult,
} from '../lib/finance';

export type FinanceToolId = 'mortgage' | 'loan' | 'salary' | 'savings' | 'compound';

export interface FinanceField {
  key: string;
  label: string;
  type: 'money' | 'percent' | 'number' | 'select';
  defaultValue: number | string;
  prefix?: string;
  unit?: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export interface FinanceToolConfig {
  id: FinanceToolId;
  slug: string;
  title: string;
  shortDesc: string;
  h1: string;
  intro: string;
  seo: { title: string; description: string };
  breadcrumb: string[];
  currency: CurrencyCode;
  fields: FinanceField[];
  resultLabel: string;
  subtitle: string;
  breakdown: { key: string; label: string }[];
  donut: { key: string; label: string; color: string }[];
  donutCenter: { valueKey: string; label: string };
  howTo: { title: string; steps: string[] };
  understanding: { title: string; desc: string };
  hasAmortization: boolean;
  amortFirstCol?: string;
  factors: { title: string; cards: { name: string; desc: string }[] };
  examples: { title: string; cards: { title: string; input: string; result: string }[] };
  faqs: { q: string; a: string }[];
  related: string[];
}

const COLORS = {
  primary: '#2563EB',
  accent: '#059669',
  neutral: '#94A3B8',
  warning: '#D97706',
};

export const financeTools: FinanceToolConfig[] = [
  {
    id: 'mortgage',
    slug: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    shortDesc: 'Estimate your monthly payment including tax and insurance.',
    h1: 'Mortgage Calculator',
    intro: 'Estimate your monthly payment including principal, interest, property tax and home insurance. Results update instantly as you type.',
    seo: {
      title: 'Mortgage Calculator — Estimate Your Monthly Payment | CalcPilot',
      description: 'Calculate your monthly mortgage payment with taxes and insurance included. See a full amortization schedule, compare 15- vs 30-year terms, and understand what drives your payment.',
    },
    breadcrumb: ['Home', 'Finance', 'Mortgage Calculator'],
    currency: 'USD',
    fields: [
      { key: 'country', label: 'Country', type: 'select', defaultValue: 'United States', options: ['United States', 'United Kingdom', 'Canada', 'Australia'] },
      { key: 'homePrice', label: 'Home price', type: 'money', defaultValue: 450000, prefix: '$', min: 0, step: 1000 },
      { key: 'downPayment', label: 'Down payment', type: 'money', defaultValue: 90000, prefix: '$', min: 0, step: 1000 },
      { key: 'rate', label: 'Interest rate', type: 'percent', defaultValue: 6.5, unit: '%', min: 0, max: 20, step: 0.1 },
      { key: 'term', label: 'Loan term', type: 'select', defaultValue: '30 years', options: ['15 years', '20 years', '30 years'] },
      { key: 'tax', label: 'Property tax / year', type: 'money', defaultValue: 6000, prefix: '$', min: 0, step: 100 },
      { key: 'insurance', label: 'Home insurance / year', type: 'money', defaultValue: 1800, prefix: '$', min: 0, step: 50 },
    ],
    resultLabel: 'Estimated monthly payment',
    subtitle: 'per month',
    breakdown: [
      { key: 'pi', label: 'Principal & interest' },
      { key: 'tax', label: 'Property tax' },
      { key: 'insurance', label: 'Home insurance' },
    ],
    donut: [
      { key: 'pi', label: 'Principal & interest', color: COLORS.primary },
      { key: 'tax', label: 'Property tax', color: COLORS.accent },
      { key: 'insurance', label: 'Home insurance', color: COLORS.neutral },
    ],
    donutCenter: { valueKey: 'main', label: 'per month' },
    howTo: {
      title: 'How to use this calculator',
      steps: [
        'Enter your home price and down payment — we calculate the financed amount automatically.',
        'Add your interest rate, loan term, and location to apply local tax and insurance rates.',
        'Read your monthly total and breakdown, then compare 30- vs 15-year terms.',
      ],
    },
    understanding: {
      title: 'Understanding your results',
      desc: 'Your payment splits into principal, interest, and escrow. Early payments go mostly to interest; over time more shifts to principal.',
    },
    hasAmortization: true,
    amortFirstCol: 'Year',
    factors: {
      title: 'What factors affect your payment',
      cards: [
        { name: 'Interest rate', desc: 'A higher rate increases the interest portion of each payment and the total cost over the loan\'s life.' },
        { name: 'Loan term', desc: 'A longer term lowers your monthly payment but adds years of interest.' },
        { name: 'Down payment', desc: 'A larger down payment reduces the amount you borrow and can remove mortgage insurance.' },
      ],
    },
    examples: {
      title: 'Worked examples',
      cards: [
        { title: '30-year mortgage', input: '$450,000 home, 20% down, 6.5% APR', result: 'Around $2,900 per month including tax and insurance' },
        { title: '15-year mortgage', input: 'Same home, 15-year term', result: 'Higher monthly payment · much less total interest' },
      ],
    },
    faqs: [
      { q: 'What is included in my monthly mortgage payment?', a: 'Your payment combines principal and interest (P&I) with escrow for property tax and home insurance. The calculator separates each so you can see exactly where your money goes.' },
      { q: 'How is the interest rate applied?', a: 'The annual rate is divided by 12 for a monthly rate, applied to your remaining balance each month. As the balance falls, the interest portion shrinks and principal grows.' },
      { q: 'Should I include taxes and insurance?', a: 'Yes. If you have an escrow account your lender collects tax and insurance monthly. Including them shows your true housing cost, not just the loan payment.' },
      { q: 'Can I compare 15-year vs 30-year terms?', a: 'Change the loan term field and the monthly payment and total interest update instantly, so you can weigh a higher payment against long-term savings.' },
      { q: 'Is this an official mortgage quote?', a: 'No. CalcPilot provides estimates for planning only. Confirm final numbers, rates and fees with your lender before making any financial decisions.' },
    ],
    related: ['loan-calculator', 'salary-calculator', 'savings-calculator'],
  },

  {
    id: 'loan',
    slug: 'loan-calculator',
    title: 'Loan Calculator',
    shortDesc: 'Estimate payments for personal, auto or student loans.',
    h1: 'Loan Calculator',
    intro: 'Estimate your monthly payment for a personal, auto, or student loan. See total interest and how extra payments shorten your term.',
    seo: {
      title: 'Loan Calculator — Monthly Payment & Total Interest | CalcPilot',
      description: 'Calculate your monthly payment for personal, auto, and student loans. See total interest, origination fees, and how extra payments shorten your term.',
    },
    breadcrumb: ['Home', 'Finance', 'Loan Calculator'],
    currency: 'USD',
    fields: [
      { key: 'country', label: 'Country', type: 'select', defaultValue: 'United States', options: ['United States', 'United Kingdom', 'Canada', 'Australia'] },
      { key: 'amount', label: 'Loan amount', type: 'money', defaultValue: 25000, prefix: '$', min: 0, step: 500 },
      { key: 'rate', label: 'Interest rate', type: 'percent', defaultValue: 7.5, unit: '%', min: 0, max: 30, step: 0.1 },
      { key: 'term', label: 'Loan term', type: 'select', defaultValue: '5 years', options: ['1 year', '3 years', '5 years', '7 years', '10 years'] },
      { key: 'extra', label: 'Extra payment / mo', type: 'money', defaultValue: 0, prefix: '$', min: 0, step: 10 },
      { key: 'fee', label: 'Origination fee', type: 'money', defaultValue: 500, prefix: '$', min: 0, step: 50 },
      { key: 'firstPayment', label: 'First payment', type: 'select', defaultValue: 'Sep 2026', options: ['Jan 2026', 'Apr 2026', 'Jul 2026', 'Sep 2026', 'Jan 2027'] },
    ],
    resultLabel: 'Estimated monthly payment',
    subtitle: 'per month',
    breakdown: [
      { key: 'pi', label: 'Principal & interest' },
      { key: 'interest', label: 'Total interest' },
      { key: 'fee', label: 'Origination fee' },
    ],
    donut: [
      { key: 'principal', label: 'Principal', color: COLORS.primary },
      { key: 'interest', label: 'Interest', color: COLORS.accent },
      { key: 'fee', label: 'Origination fee', color: COLORS.neutral },
    ],
    donutCenter: { valueKey: 'total', label: 'total repaid' },
    howTo: {
      title: 'How to use this calculator',
      steps: [
        'Enter your loan amount, interest rate, and term.',
        'Add any origination fee and an optional extra monthly payment.',
        'Read your monthly payment, total interest, and the payment schedule below.',
      ],
    },
    understanding: {
      title: 'Understanding your results',
      desc: 'Your payment covers principal and interest. In the early months, most of each payment goes toward interest; over time a larger share chips away at the balance. The amortization table below shows exactly how that shifts.',
    },
    hasAmortization: true,
    amortFirstCol: 'Payment',
    factors: {
      title: 'What factors affect your payment',
      cards: [
        { name: 'Interest rate', desc: 'A higher rate increases each payment and the total interest over the life of the loan.' },
        { name: 'Loan term', desc: 'A longer term lowers the monthly payment but adds interest.' },
        { name: 'Extra payments', desc: 'Extra monthly payments shorten the term and cut total interest.' },
      ],
    },
    examples: {
      title: 'Worked examples',
      cards: [
        { title: '5-year auto loan', input: '$25,000 at 7.50% APR', result: 'About $503 per month' },
        { title: '3-year loan', input: 'Same amount, shorter term', result: 'Higher payment · less total interest' },
      ],
    },
    faqs: [
      { q: 'How is my monthly loan payment calculated?', a: 'Your payment is calculated from the loan amount, interest rate and term using a standard amortization formula. A longer term lowers the monthly payment but increases total interest paid.' },
      { q: 'What is the origination fee?', a: 'An origination fee is a one-time charge some lenders add for processing the loan. It is shown separately here so you can see its impact on the total cost.' },
      { q: 'Do extra payments shorten my loan?', a: 'Yes. Enter an extra monthly amount and see how it reduces the total interest and the time to pay off the loan.' },
      { q: 'Is this a fixed or variable rate?', a: 'This calculator assumes a fixed rate for the full term. Variable-rate loans will change as the rate adjusts.' },
      { q: 'Is this an official quote?', a: 'No. CalcPilot provides estimates for planning only. Confirm rates and terms with your lender before borrowing.' },
    ],
    related: ['mortgage-calculator', 'salary-calculator', 'savings-calculator'],
  },

  {
    id: 'salary',
    slug: 'salary-calculator',
    title: 'Salary Calculator',
    shortDesc: 'Convert an annual salary to hourly, weekly and monthly pay.',
    h1: 'Salary Calculator',
    intro: 'Convert an annual salary into hourly, weekly and monthly take-home pay after tax and deductions. Results update instantly as you type.',
    seo: {
      title: 'Salary Calculator — Take-Home Pay After Tax | CalcPilot',
      description: 'Convert your annual salary to hourly, weekly and monthly take-home pay. See how much tax is withheld and what actually reaches your bank account.',
    },
    breadcrumb: ['Home', 'Finance', 'Salary Calculator'],
    currency: 'USD',
    fields: [
      { key: 'annual', label: 'Annual salary', type: 'money', defaultValue: 60000, prefix: '$', min: 0, step: 1000 },
      { key: 'payFrequency', label: 'Pay frequency', type: 'select', defaultValue: 'Weekly', options: ['Weekly', 'Bi-weekly', 'Monthly'] },
      { key: 'taxRate', label: 'Effective tax rate', type: 'percent', defaultValue: 22, unit: '%', min: 0, max: 60, step: 0.5 },
      { key: 'hoursPerWeek', label: 'Hours per week', type: 'number', defaultValue: 40, min: 1, max: 100, step: 1 },
      { key: 'deductions', label: 'Pre-tax deductions', type: 'money', defaultValue: 200, unit: '/ mo', prefix: '$', min: 0, step: 10 },
      { key: 'currency', label: 'Currency', type: 'select', defaultValue: 'USD', options: ['USD', 'GBP', 'CAD', 'AUD'] },
    ],
    resultLabel: 'Estimated take-home / month',
    subtitle: 'per month',
    breakdown: [
      { key: 'gross', label: 'Gross pay' },
      { key: 'tax', label: 'Tax withheld' },
      { key: 'net', label: 'Take-home' },
    ],
    donut: [
      { key: 'gross', label: 'Gross pay', color: COLORS.primary },
      { key: 'tax', label: 'Tax withheld', color: COLORS.warning },
      { key: 'net', label: 'Take-home', color: COLORS.accent },
    ],
    donutCenter: { valueKey: 'main', label: 'per month' },
    howTo: {
      title: 'How to use this calculator',
      steps: [
        'Enter your annual salary and pay frequency.',
        'Set your effective tax rate and any pre-tax deductions.',
        'Read your monthly take-home pay, plus the hourly and weekly equivalents.',
      ],
    },
    understanding: {
      title: 'Understanding your results',
      desc: 'Your gross pay is the amount you earn before anything is taken out. Tax and pre-tax deductions reduce that to your take-home pay. Understanding this split helps you budget realistically and compare job offers.',
    },
    hasAmortization: false,
    factors: {
      title: 'What factors affect your take-home pay',
      cards: [
        { name: 'Tax rate', desc: 'A higher effective tax rate reduces your take-home pay.' },
        { name: 'Pay frequency', desc: 'Pay frequency changes your paycheck size, not your annual total.' },
        { name: 'Deductions', desc: 'Pre-tax deductions lower your taxable income and take-home pay.' },
      ],
    },
    examples: {
      title: 'Worked examples',
      cards: [
        { title: 'Annual to monthly', input: '$60,000 per year', result: '$5,000 gross per month' },
        { title: 'Hourly equivalent', input: '40 hours per week', result: 'About $28.85 per hour gross' },
      ],
    },
    faqs: [
      { q: 'What is take-home pay?', a: 'Take-home pay is your earnings after tax and pre-tax deductions are removed — the amount that actually reaches your bank account.' },
      { q: 'How is tax calculated?', a: 'The calculator applies your effective tax rate to your gross pay. Your effective rate is the average you actually pay, not your top marginal bracket.' },
      { q: 'What counts as a pre-tax deduction?', a: 'Retirement contributions, health insurance premiums and similar payroll deductions that are taken before income tax is applied.' },
      { q: 'How does pay frequency change the result?', a: 'Your annual salary is the same regardless of frequency, but the amount per paycheck changes. We show the monthly equivalent for easy comparison.' },
      { q: 'Is this my exact pay?', a: 'No. CalcPilot gives planning estimates only. Use a licensed payroll provider for real figures.' },
    ],
    related: ['savings-calculator', 'compound-calculator'],
  },

  {
    id: 'savings',
    slug: 'savings-calculator',
    title: 'Savings Calculator',
    shortDesc: 'See how regular contributions grow with compound interest.',
    h1: 'Savings Calculator',
    intro: 'Project how your savings grow from a starting balance, regular contributions and compound interest. Results update instantly as you type.',
    seo: {
      title: 'Savings Calculator — Project Your Savings Growth | CalcPilot',
      description: 'Calculate how your savings grow with a starting balance, monthly contributions and compound interest. See contributions vs. interest earned at a glance.',
    },
    breadcrumb: ['Home', 'Finance', 'Savings Calculator'],
    currency: 'USD',
    fields: [
      { key: 'balance', label: 'Starting balance', type: 'money', defaultValue: 10000, prefix: '$', min: 0, step: 500 },
      { key: 'contribution', label: 'Monthly contribution', type: 'money', defaultValue: 500, prefix: '$', min: 0, step: 50 },
      { key: 'rate', label: 'Annual interest rate', type: 'percent', defaultValue: 4.5, unit: '%', min: 0, max: 20, step: 0.1 },
      { key: 'years', label: 'Years to save', type: 'number', defaultValue: 10, min: 1, max: 60, step: 1 },
      { key: 'taxRate', label: 'Tax rate', type: 'percent', defaultValue: 15, unit: '%', min: 0, max: 60, step: 0.5 },
      { key: 'compoundFrequency', label: 'Compound frequency', type: 'select', defaultValue: 'Monthly', options: ['Monthly', 'Quarterly', 'Annually'] },
    ],
    resultLabel: 'Total savings',
    subtitle: 'projected total',
    breakdown: [
      { key: 'principal', label: 'Starting balance' },
      { key: 'contributions', label: 'Total contributions' },
      { key: 'interest', label: 'Interest earned' },
    ],
    donut: [
      { key: 'principal', label: 'Starting balance', color: COLORS.primary },
      { key: 'contributions', label: 'Contributions', color: COLORS.neutral },
      { key: 'interest', label: 'Interest earned', color: COLORS.accent },
    ],
    donutCenter: { valueKey: 'main', label: 'total savings' },
    howTo: {
      title: 'How to use this calculator',
      steps: [
        'Enter your starting balance and monthly contribution.',
        'Set your interest rate, years to save, and tax rate.',
        'Read the projected total and the split between contributions and interest.',
      ],
    },
    understanding: {
      title: 'Understanding your results',
      desc: 'Your savings grow from three sources: the money you start with, the contributions you add, and the interest those earn. Because interest compounds, even modest monthly deposits add up significantly over time.',
    },
    hasAmortization: false,
    factors: {
      title: 'What factors affect your savings',
      cards: [
        { name: 'Interest rate', desc: 'A higher rate means more interest earned on the same balance.' },
        { name: 'Contribution', desc: 'Larger monthly contributions compound into a much bigger total.' },
        { name: 'Time', desc: 'More years give compound interest longer to work.' },
      ],
    },
    examples: {
      title: 'Worked examples',
      cards: [
        { title: '10-year goal', input: '$10,000 to start, $500 per month at 4.50%', result: 'Grows to well over $80,000' },
        { title: 'Small deposits', input: 'Even $100 per month adds up', result: 'Thousands in interest over a decade' },
      ],
    },
    faqs: [
      { q: 'How does compound interest work here?', a: 'Interest is added to your balance each period, and the next period earns interest on both your contributions and prior interest.' },
      { q: 'Does the tax rate apply to everything?', a: 'Tax is applied to the interest earned only, not to your contributions, which is how most savings accounts are taxed.' },
      { q: 'What compound frequency should I choose?', a: 'Monthly is the most common for savings accounts. More frequent compounding grows your balance slightly faster.' },
      { q: 'Can I change my monthly contribution later?', a: 'Yes — edit the contribution field and the projection updates instantly.' },
      { q: 'Is this guaranteed?', a: 'No. CalcPilot gives planning estimates only; check with your bank for actual rates and terms.' },
    ],
    related: ['compound-calculator', 'loan-calculator'],
  },

  {
    id: 'compound',
    slug: 'compound-calculator',
    title: 'Compound Interest Calculator',
    shortDesc: 'See how investments grow with compound interest over time.',
    h1: 'Compound Interest Calculator',
    intro: 'Project the future value of your investments with compound interest and regular contributions. Results update instantly as you type.',
    seo: {
      title: 'Compound Interest Calculator — Future Value | CalcPilot',
      description: 'Calculate the future value of an investment with compound interest and monthly contributions. See how starting early and contributing regularly accelerate growth.',
    },
    breadcrumb: ['Home', 'Finance', 'Compound Interest Calculator'],
    currency: 'USD',
    fields: [
      { key: 'balance', label: 'Starting balance', type: 'money', defaultValue: 10000, prefix: '$', min: 0, step: 500 },
      { key: 'contribution', label: 'Monthly contribution', type: 'money', defaultValue: 200, prefix: '$', min: 0, step: 50 },
      { key: 'rate', label: 'Annual interest rate', type: 'percent', defaultValue: 7.0, unit: '%', min: 0, max: 25, step: 0.1 },
      { key: 'years', label: 'Years to grow', type: 'number', defaultValue: 20, min: 1, max: 60, step: 1 },
      { key: 'compoundFrequency', label: 'Compound frequency', type: 'select', defaultValue: 'Monthly', options: ['Monthly', 'Quarterly', 'Annually'] },
      { key: 'taxRate', label: 'Tax rate', type: 'percent', defaultValue: 15, unit: '%', min: 0, max: 60, step: 0.5 },
    ],
    resultLabel: 'Future value',
    subtitle: 'after 20 years',
    breakdown: [
      { key: 'principal', label: 'Starting balance' },
      { key: 'contributions', label: 'Contributions' },
      { key: 'interest', label: 'Interest earned' },
    ],
    donut: [
      { key: 'principal', label: 'Starting balance', color: COLORS.primary },
      { key: 'contributions', label: 'Contributions', color: COLORS.neutral },
      { key: 'interest', label: 'Interest earned', color: COLORS.accent },
    ],
    donutCenter: { valueKey: 'main', label: 'future value' },
    howTo: {
      title: 'How to use this calculator',
      steps: [
        'Enter your starting balance and monthly contribution.',
        'Set your interest rate, years to grow, and compound frequency.',
        'Read the future value and the split between contributions and interest.',
      ],
    },
    understanding: {
      title: 'Understanding your results',
      desc: 'Compound interest means your interest earns interest. The longer your money stays invested and the more you contribute, the steeper the growth curve becomes — which is why starting early matters.',
    },
    hasAmortization: false,
    factors: {
      title: 'What factors affect your growth',
      cards: [
        { name: 'Interest rate', desc: 'A higher rate compounds faster and grows your balance more.' },
        { name: 'Contribution', desc: 'Regular contributions are the biggest driver of long-term growth.' },
        { name: 'Time', desc: 'More years let compounding do its most powerful work.' },
      ],
    },
    examples: {
      title: 'Worked examples',
      cards: [
        { title: '20-year growth', input: '$10,000 to start, $200 per month at 7.00%', result: 'Grows past $115,000' },
        { title: 'Start early', input: 'The same plan over 30 years', result: 'Compounding adds tens of thousands more' },
      ],
    },
    faqs: [
      { q: 'What is compound interest?', a: 'It is interest earned on both your original money and the interest already added, which makes your balance grow faster over time.' },
      { q: 'How is the future value calculated?', a: 'We compound your starting balance and each monthly contribution at your chosen frequency, then subtract any tax on the interest.' },
      { q: 'Why does a higher frequency grow faster?', a: 'More frequent compounding means interest is added sooner and starts earning its own interest earlier.' },
      { q: 'What happens if I contribute more?', a: 'Increase the monthly contribution and the projection updates immediately to show the long-term difference.' },
      { q: 'Is the result guaranteed?', a: 'No. CalcPilot gives planning estimates only; check with your bank for actual rates and terms.' },
    ],
    related: ['savings-calculator', 'loan-calculator'],
  },
];

export function computeFinance(id: FinanceToolId, values: Record<string, number>): FinanceResult {
  switch (id) {
    case 'mortgage':
      return computeMortgage(values);
    case 'loan':
      return computeLoan(values);
    case 'salary':
      return computeSalary(values);
    case 'savings':
      return computeSavings(values);
    case 'compound':
      return computeCompound(values);
  }
}

/** Parse a tool's default field values into the numeric map expected by computeFinance. */
export function defaultValues(tool: FinanceToolConfig): Record<string, number> {
  const v: Record<string, number> = {};
  const periodsMap: Record<string, number> = { Monthly: 12, Quarterly: 4, Annually: 1 };
  for (const f of tool.fields) {
    if (typeof f.defaultValue === 'number') {
      v[f.key] = f.defaultValue;
    } else if (f.key === 'term') {
      v.term = parseInt(f.defaultValue as string, 10) || 1;
    } else if (f.key === 'compoundFrequency') {
      v.periods = periodsMap[f.defaultValue as string] ?? 12;
    }
  }
  return v;
}

export function getFinanceTool(slug: string): FinanceToolConfig | undefined {
  return financeTools.find((t) => t.slug === slug);
}
