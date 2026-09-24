// Converter registry — single source of truth for unit converters.
// All converters are bidirectional and compute client-side (<200ms).

import {
  LB_PER_KG,
  makeFactorRows,
  range,
  fmt,
  headlineValue,
  CM_PER_IN,
  KM_PER_MILE,
  M2_PER_ACRE,
  L_PER_US_GAL,
  MB_PER_GB,
  type ConversionRow,
} from '../lib/convert-tables';

export interface ConverterUnit {
  label: string;
  unit: string;
  /** Multiply a value by this factor to convert it to the converter's base unit. */
  factor: number;
}

export interface ValueBlock {
  heading: string;
  answer: string;
  href?: string;
  linkLabel?: string;
}

export interface InternalLink {
  anchor: string;
  href: string;
  note: string;
}

export interface ConverterConfig {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  h1: string;
  intro: string;
  seo: { title: string; description: string };
  breadcrumb: string[];
  /** Left (primary) unit box. */
  a: { label: string; unit: string; placeholder: string; defaultValue: string };
  /** Right (secondary) unit box. */
  b: { label: string; unit: string; placeholder: string; defaultValue: string };
  /** b = a * factor + offset */
  factor: number;
  offset?: number;
  formula: string;
  resultUnit: string;
  precision: number;
  note: string;
  howTo: { title: string; steps: string[] };
  understanding: { title: string; desc: string };
  commonTable: { header: [string, string]; rows: [string, string][] };
  faqs: { q: string; a: string }[];
  related: string[];
  /** Optional heading override for the commonTable section. */
  tableTitle?: string;
  /**
   * Optional full-scale table. Rendered at build time with every row in the
   * HTML — never paginated behind an "expand" control, because JS-injected
   * rows are not reliably indexed.
   */
  fullTable?: { caption: string; header: [string, string, string]; rows: ConversionRow[] };
  /** Optional snippet-targeted answer blocks, one H3 per searched magnitude. */
  valueBlocks?: { title: string; blocks: ValueBlock[] };
  /** Optional internal-link cluster rendered near the foot of the page. */
  internalLinks?: { title: string; links: InternalLink[] };
  /** Target keywords this page is built around (reporting + QA). */
  keywords?: string[];
  /** Optional multi-unit mode. Fixed A/B converters omit this for backward compatibility. */
  units?: ConverterUnit[];
  defaultFromUnit?: string;
  defaultToUnit?: string;
  /** Enables user-supplied exchange rates; no market rates are bundled. */
  currency?: {
    currencies: { code: string; name: string }[];
    defaultFrom: string;
    defaultTo: string;
    defaultRate: string;
  };
}

export const converterTools: ConverterConfig[] = [
  {
    id: 'weight',
    slug: 'kg-to-lbs-converter',
    title: 'KG to LBS Converter',
    shortDesc: 'Convert kilograms to pounds (kg to lbs) instantly, with a full chart.',
    h1: 'KG to LBS Converter',
    intro: 'Convert kilograms (kg) to pounds (lbs) instantly — free weight converter with a full kg-to-lbs conversion chart and the exact formula. 1 kilogram equals 2.2046226218 pounds.',
    seo: {
      // Leads with the abbreviated query form deliberately: the spelled-out
      // "Kilograms to Pounds Converter" title belongs to the dedicated
      // kilograms-to-pounds landing page, so the two do not compete with an
      // identical <title> in the same SERP.
      title: `KG to LBS Converter | 1 kg = ${headlineValue(LB_PER_KG, 5)} lb`,
      description: 'Convert kilograms to pounds instantly. 1 kilogram equals 2.2046226218 pounds. Learn how to convert kg to lbs — full 1 to 100 kg chart and the exact formula.',
    },
    breadcrumb: ['Home', 'Converters', 'Weight'],
    a: { label: 'Kilograms (kg)', unit: 'kg', placeholder: '0', defaultValue: '1' },
    b: { label: 'Pounds (lb)', unit: 'lb', placeholder: '0', defaultValue: '2.2046' },
    factor: LB_PER_KG,
    formula: '1 kg = 2.2046 lb',
    resultUnit: 'lb',
    precision: 4,
    note: 'Precise to 4 decimal places. Values sync as you type.',
    keywords: [
      'kg to lbs',
      'kg to lb',
      'kilograms to pounds',
      '24000 kg to lbs',
      '22000 kg to lbs',
      '17000 kg to lbs',
      '11793 kg to lbs',
      '11.79 kg to lbs',
      '2.415 kg to lbs',
      '2.47 kg to lbs',
      '60 kg to lbs',
      '100 kg to lbs',
    ],
    howTo: {
      title: 'How to use this converter',
      steps: [
        'Enter a value in the Kilograms box — for example 1 kg, 70 kg, or 24000 kg.',
        'Read the Pounds (lb) result instantly, or type in the Pounds box to convert lb back to kg.',
        'Use Swap units to flip the direction, or clear a box to start over.',
      ],
    },
    understanding: {
      title: 'Understanding kilograms and pounds',
      desc: 'The <strong>kilogram (kg)</strong> is the base unit of mass in the <strong>metric system</strong>, used in nearly every country. The <strong>pound (lb / lbs)</strong> is a unit of weight used mainly in the <strong>United States</strong> and United Kingdom — people often search “kilo vs pounds” when comparing body weight or shipping mass. One kilogram equals <strong>2.2046226218 pounds</strong>, so to convert kg to lb you multiply by that factor; to go the other way you divide. “lb” and “lbs” mean the same unit (pound / pounds). For length or temperature, try the <a href="/converters/length-converter">length converter</a> or the <a href="/converters/temperature-converter">temperature converter</a>.',
    },
    tableTitle: 'Most-searched kg to lbs values',
    commonTable: {
      header: ['Kilograms (kg)', 'Pounds (lb)'],
      rows: [
        ['1 kg', '2.2046 lb'],
        ['2.415 kg', '5.3242 lb'],
        ['2.47 kg', '5.4454 lb'],
        ['2.6 kg', '5.7320 lb'],
        ['11.79 kg', '25.9925 lb'],
        ['24.6 kg', '54.2337 lb'],
        ['60 kg', '132.2774 lb'],
        ['100 kg', '220.4623 lb'],
        ['211 kg', '465.1754 lb'],
        ['11,793 kg', '25,999.1146 lb'],
        ['17,000 kg', '37,478.5846 lb'],
        ['22,000 kg', '48,501.6977 lb'],
        ['24,000 kg', '52,910.9429 lb'],
      ],
    },
    valueBlocks: {
      title: 'Common kg to lbs conversions',
      blocks: [
        {
          heading: '1 kg to lbs',
          answer: '1 kilogram equals 2.2046 pounds.',
          href: '/converters/1-kg-to-lbs',
          linkLabel: 'Open the 1 kg to lbs page',
        },
        {
          heading: '2 kg to lbs',
          answer: '2 kilograms equals 4.4092 pounds (2 × 2.2046226218).',
        },
        {
          heading: '5 kg to lbs',
          answer: '5 kilograms equals 11.0231 pounds (5 × 2.2046226218).',
        },
        {
          heading: '2.415 kg to lbs',
          answer: '2.415 kilograms equals 5.3242 pounds (2.415 × 2.2046226218).',
        },
        {
          heading: '2.47 kg to lbs',
          answer: '2.47 kilograms equals 5.4454 pounds (2.47 × 2.2046226218).',
        },
        {
          heading: '2.6 kg to lbs',
          answer: '2.6 kilograms equals 5.7320 pounds (2.6 × 2.2046226218).',
        },
        {
          heading: '10 kg to lbs',
          answer: '10 kilograms equals 22.0462 pounds.',
          href: '/converters/10-kg-to-lbs',
          linkLabel: 'Open the 10 kg to lbs page',
        },
        {
          heading: '11.79 kg to lbs',
          answer: '11.79 kilograms equals 25.9925 pounds (11.79 × 2.2046226218).',
        },
        {
          heading: '24.6 kg to lbs',
          answer: '24.6 kilograms equals 54.2337 pounds (24.6 × 2.2046226218).',
        },
        {
          heading: '211 kg to lbs',
          answer: '211 kilograms equals 465.1754 pounds (211 × 2.2046226218).',
        },
        {
          heading: '50 kg to lbs',
          answer: '50 kilograms equals 110.2311 pounds.',
          href: '/converters/50-kg-to-lbs',
          linkLabel: 'Open the 50 kg to lbs page',
        },
        {
          heading: '60 kg to lbs',
          answer: '60 kilograms equals 132.2774 pounds.',
          href: '/converters/60-kg-to-lbs',
          linkLabel: 'Open the 60 kg to lbs page',
        },
        {
          heading: '100 kg to lbs',
          answer: '100 kilograms equals 220.4623 pounds.',
          href: '/converters/100-kg-to-lbs',
          linkLabel: 'Open the 100 kg to lbs page',
        },
        {
          heading: '11,793 kg to lbs',
          answer: '11,793 kilograms equals 25,999.1146 pounds (11,793 × 2.2046226218).',
        },
        {
          heading: '17,000 kg to lbs',
          answer: '17,000 kilograms equals 37,478.5846 pounds (17,000 × 2.2046226218).',
        },
        {
          heading: '22,000 kg to lbs',
          answer: '22,000 kilograms equals 48,501.6977 pounds (22,000 × 2.2046226218).',
        },
        {
          heading: '24,000 kg to lbs',
          answer: '24,000 kilograms equals 52,910.9429 pounds (24,000 × 2.2046226218).',
        },
      ],
    },
    fullTable: {
      caption: 'Full kg to lbs conversion chart (1 to 100 kg)',
      header: ['Kilograms (kg)', 'Pounds (lb)', 'Pounds back to kilograms'],
      rows: makeFactorRows({ values: range(1, 100), factor: LB_PER_KG, fromUnit: 'kg', toUnit: 'lb' }),
    },
    faqs: [
      {
        q: 'How many pounds is 1 kg?',
        a: '1 kilogram equals exactly 2.2046226218 pounds, usually written as 2.2046 lb. Type 1 in the kilograms box above to see the precise live result.',
      },
      {
        q: 'What is 60 kg in lbs?',
        a: '60 kilograms equals 132.2774 pounds (60 × 2.2046226218 = 132.277357308). There is a dedicated 60 kg to lbs page with a nearby-value chart.',
      },
      {
        q: 'What is the kg to lbs formula?',
        a: 'Multiply kilograms by 2.2046226218 to get pounds. Divide pounds by the same factor to get kilograms. Example: 70 kg × 2.2046226218 = 154.3236 lb.',
      },
      {
        q: 'How many pounds is 100 kg?',
        a: '100 kilograms equals 220.4623 pounds (100 × 2.2046226218). For the full breakdown in stones, use the kg to stone converter.',
      },
      {
        q: 'What is 24000 kg in lbs?',
        a: '24,000 kilograms × 2.2046226218 = 52,910.9429 pounds. Type 24000 in the kilograms box above to see the exact live result.',
      },
      {
        q: 'What is 22000 kg in lbs?',
        a: '22,000 kilograms × 2.2046226218 = 48,501.6977 pounds.',
      },
      {
        q: 'What is 11.79 kg in lbs?',
        a: '11.79 kilograms × 2.2046226218 = 25.9925 pounds.',
      },
      {
        q: 'How do I convert pounds back to kilograms?',
        a: 'Divide the number of pounds by 2.2046226218. For example, 10 lb ÷ 2.2046226218 = 4.5359 kg. The lbs to kg converter does this directly.',
      },
      {
        q: 'Is kg to lb the same as kg to lbs?',
        a: 'Yes. “lb” is the singular abbreviation and “lbs” is the plural form of pounds. The conversion factor is identical.',
      },
      {
        q: 'Kilo vs pounds — which is heavier?',
        a: 'One kilogram is heavier than one pound: 1 kg ≈ 2.2046 lb, so a kilo is a little more than twice a pound.',
      },
      {
        q: 'What is 70 kg in lbs?',
        a: '70 kilograms is about 154.32 pounds. Type 70 in the kilograms box above, or use the conversion chart on this page.',
      },
      {
        q: 'How do I convert kg to stone and lbs?',
        a: 'Convert kilograms to pounds first, then divide pounds by 14 (one stone = 14 lb). Example: 70 kg ≈ 154.32 lb ≈ 11 stone 0.3 lb. The kg to stone converter does this directly.',
      },
      {
        q: 'Are kilograms a measure of mass or weight?',
        a: 'A kilogram is formally a unit of mass. In everyday use, people often say weight when referring to a mass measured in kilograms.',
      },
    ],
    internalLinks: {
      title: 'More weight converters',
      links: [
        { anchor: 'lbs to kg converter', href: '/converters/lbs-to-kg-converter', note: 'reverse direction, pounds to kilograms' },
        { anchor: 'kilos to pounds converter', href: '/converters/kilos-to-pounds-converter', note: 'the everyday “kilos” wording' },
        { anchor: 'kilograms to pounds converter', href: '/converters/kilograms-to-pounds-converter', note: 'full unit names, for shipping and freight weights' },
        { anchor: 'kg to stone converter', href: '/converters/kg-to-stone-converter', note: 'UK body weight in stones and pounds' },
        { anchor: 'all weight converters', href: '/converters', note: 'every unit converter on CalcPilot' },
      ],
    },
    related: ['lbs-to-kg-converter', 'kilos-to-pounds-converter', 'kilograms-to-pounds-converter'],
  },

  {
    id: 'length',
    slug: 'length-converter',
    title: 'Length Converter',
    shortDesc: 'Convert cm to inches, meters to feet, miles and kilometers.',
    h1: 'Length Converter',
    intro: 'Convert cm to inches, meters to feet, kilometers to miles, and more. Choose any two units — results update as you type.',
    seo: {
      title: `Length Converter | 1 in = ${fmt(CM_PER_IN, 2)} cm (Feet, Miles)`,
      description: 'Free length converter: cm to inches, meters to feet, km to miles. Learn how to convert with the exact 2.54 cm per inch definition, plus a conversion chart.',
    },
    breadcrumb: ['Home', 'Converters', 'Length'],
    a: { label: 'From value', unit: 'm', placeholder: '0', defaultValue: '1' },
    b: { label: 'To value', unit: 'ft', placeholder: '0', defaultValue: '3.2808' },
    factor: 3.280839895,
    formula: '1 m = 3.2808 ft',
    resultUnit: 'ft',
    precision: 4,
    note: 'Select any two supported length units. Results update as you type.',
    units: [
      { label: 'Millimeters', unit: 'mm', factor: 0.001 },
      { label: 'Centimeters', unit: 'cm', factor: 0.01 },
      { label: 'Meters', unit: 'm', factor: 1 },
      { label: 'Kilometers', unit: 'km', factor: 1000 },
      { label: 'Inches', unit: 'in', factor: 0.0254 },
      { label: 'Feet', unit: 'ft', factor: 0.3048 },
      { label: 'Yards', unit: 'yd', factor: 0.9144 },
      { label: 'Miles', unit: 'mi', factor: 1609.344 },
    ],
    defaultFromUnit: 'm',
    defaultToUnit: 'ft',
    howTo: {
      title: 'How to use this converter',
      steps: [
        'Choose the unit you are converting from — for example centimeters or meters.',
        'Enter the value, then choose the destination unit such as inches or feet.',
        'Use Swap units to reverse the pair and keep the equivalent value.',
      ],
    },
    understanding: {
      title: 'Understanding length units',
      desc: 'The <strong>meter (m)</strong> is the SI base unit of length. Everyday searches often need <strong>cm to inches</strong> (1 inch = 2.54 cm exactly) or <strong>meters to feet</strong> (1 m ≈ 3.2808 ft). This converter maps every value to meters first, then to the unit you selected. For weight, use the <a href="/converters/kg-to-lbs-converter">kg to lbs converter</a>; for temperature, try the <a href="/converters/temperature-converter">Celsius to Fahrenheit converter</a>.',
    },
    commonTable: {
      header: ['Length', 'Equivalent'],
      rows: [
        ['1 cm', '0.3937 in'],
        ['10 cm', '3.9370 in'],
        ['1 m', '3.2808 ft'],
        ['1 m', '39.3701 in'],
        ['1 ft', '30.48 cm'],
        ['1 km', '0.6214 mi'],
        ['1 mile', '1.6093 km'],
      ],
    },
    faqs: [
      { q: 'How do I convert cm to inches?', a: 'Divide centimeters by 2.54. One inch is exactly 2.54 cm, so 10 cm ≈ 3.937 inches. Select Centimeters and Inches in the converter above.' },
      { q: 'How many feet are in one meter?', a: 'One meter equals approximately 3.2808 feet (exactly 3.280839895 ft). Select Meters and Feet to convert meters to feet instantly.' },
      { q: 'How do I convert feet to meters?', a: 'Multiply feet by 0.3048. For example, 10 feet is exactly 3.048 meters.' },
      { q: 'How many centimeters are in an inch?', a: 'There are exactly 2.54 centimeters in one inch.' },
      { q: 'How many meters are in a kilometer?', a: 'There are exactly 1,000 meters in one kilometer. One mile is about 1.6093 km.' },
    ],
    related: ['cm-to-inches', 'meters-to-feet', 'temperature-converter'],
  },

  {
    id: 'temperature',
    slug: 'temperature-converter',
    title: 'Temperature Converter',
    shortDesc: 'Convert Celsius to Fahrenheit instantly.',
    h1: 'Celsius to Fahrenheit Converter',
    intro: 'Convert Celsius to Fahrenheit (and back) with the formula °F = °C × 9/5 + 32. Type in either box for an instant result and a conversion chart below.',
    seo: {
      // Hub-style title: this is the multi-unit temperature tool, so the
      // dedicated celsius-to-fahrenheit page owns the formula-led title.
      title: 'Temperature Converter | °C, °F & Kelvin',
      description: 'Convert temperatures between Celsius, Fahrenheit and Kelvin. Learn how to convert with the formula °F = °C × 9/5 + 32, plus a conversion chart.',
    },
    breadcrumb: ['Home', 'Converters', 'Temperature'],
    a: { label: 'Celsius (°C)', unit: '°C', placeholder: '0', defaultValue: '0' },
    b: { label: 'Fahrenheit (°F)', unit: '°F', placeholder: '32', defaultValue: '32' },
    factor: 9 / 5,
    offset: 32,
    formula: '°F = °C × 9/5 + 32',
    resultUnit: '°F',
    precision: 1,
    note: 'Uses the offset formula — temperature is not a simple ratio.',
    howTo: {
      title: 'How to use this converter',
      steps: [
        'Enter a value in the Celsius box — for example 0 °C.',
        'Read the Fahrenheit result, or type in the Fahrenheit box to convert the other way.',
        'Use Swap units to flip the direction, or clear a box to start over.',
      ],
    },
    understanding: {
      title: 'Understanding Celsius and Fahrenheit',
      desc: '<strong>Celsius (°C)</strong> and <strong>Fahrenheit (°F)</strong> are both temperature scales, but they use different zero points. Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F). Because the scales are offset, converting is not a simple multiplication — you use the formula <strong>°F = °C × 9/5 + 32</strong>. For other unit conversions, try the <a href="/converters/kg-to-lbs-converter">weight converter</a> or the <a href="/converters/length-converter">length converter</a>.',
    },
    commonTable: {
      header: ['Celsius (°C)', 'Fahrenheit (°F)'],
      rows: [
        ['0 °C', '32 °F'],
        ['20 °C', '68 °F'],
        ['37 °C', '98.6 °F'],
        ['100 °C', '212 °F'],
        ['-40 °C', '-40 °F'],
      ],
    },
    faqs: [
      { q: 'What is the formula for Celsius to Fahrenheit?', a: 'Multiply the Celsius value by 9/5, then add 32. The formula is °F = °C × 9/5 + 32.' },
      { q: 'At what temperature are Celsius and Fahrenheit equal?', a: 'Celsius and Fahrenheit have the same numerical value at -40 degrees.' },
      { q: 'What is normal body temperature in Fahrenheit?', a: 'The commonly cited average is 98.6 °F, which equals 37 °C, although normal body temperature varies by person and measurement method.' },
      { q: 'Why can’t temperature be converted with a simple factor?', a: 'Celsius and Fahrenheit have different zero points as well as different degree sizes, so the conversion requires both multiplication and an offset.' },
      { q: 'What is 20 °C in Fahrenheit?', a: '20 °C = 68 °F. The chart below also lists 0 °C = 32 °F, 37 °C = 98.6 °F, and 100 °C = 212 °F.' },
    ],
    related: ['celsius-to-fahrenheit', 'length-converter', 'kg-to-lbs-converter'],
  },

  {
    id: 'time',
    slug: 'time-converter',
    title: 'Time Converter',
    shortDesc: 'Convert hours to minutes and more.',
    h1: 'Time Converter',
    intro: 'Convert between hours and minutes instantly. Type a value in either box and the other updates in real time.',
    seo: {
      title: 'Time Converter | Hours, Minutes, Days & Seconds',
      description: 'Free time converter for hours, minutes, seconds, and days. Learn how to convert between time units — type in either box for instant results, plus a reference table.',
    },
    breadcrumb: ['Home', 'Converters', 'Time'],
    a: { label: 'Hours (hr)', unit: 'hr', placeholder: '0', defaultValue: '1' },
    b: { label: 'Minutes (min)', unit: 'min', placeholder: '0', defaultValue: '60' },
    factor: 60,
    formula: '1 hr = 60 min',
    resultUnit: 'min',
    precision: 2,
    note: 'Precise to 2 decimal places. Values sync as you type.',
    howTo: {
      title: 'How to use this converter',
      steps: [
        'Enter a value in the Hours box — for example 1 hr.',
        'Read the Minutes result, or type in the Minutes box to convert the other way.',
        'Use Swap units to flip the direction, or clear a box to start over.',
      ],
    },
    understanding: {
      title: 'Understanding hours and minutes',
      desc: 'An <strong>hour (h)</strong> is exactly 60 <strong>minutes (min)</strong>, and a day is 24 hours. Time uses a <strong>base-60 system</strong> inherited from ancient Babylonian mathematics, so to convert hours to minutes you multiply by 60; to convert back you divide by 60. For date-based calculations, try the <a href="/time-date/age-calculator">age calculator</a> or the <a href="/time-date/date-difference-calculator">date difference calculator</a>.',
    },
    commonTable: {
      header: ['Hours (hr)', 'Minutes (min)'],
      rows: [
        ['1 hr', '60 min'],
        ['1 day', '1,440 min'],
        ['1 week', '168 hr'],
        ['1 min', '60 sec'],
        ['1 year', '365 days'],
      ],
    },
    faqs: [
      { q: 'How many minutes are in an hour?', a: 'There are exactly 60 minutes in one hour.' },
      { q: 'How many seconds are in a day?', a: 'A 24-hour day contains 86,400 seconds.' },
      { q: 'Why is time divided into units of 60?', a: 'The base-60 convention has roots in ancient Babylonian mathematics and remains the basis for minutes and seconds.' },
      { q: 'Does this converter account for daylight saving time?', a: 'No. It converts durations, not clock times or time zones, so daylight saving changes do not apply.' },
    ],
    related: ['length-converter', 'data-converter', 'kg-to-lbs-converter'],
  },

  {
    id: 'data',
    slug: 'data-converter',
    title: 'MB to GB Data Converter',
    shortDesc: 'Convert KB, MB, GB and TB (kilo to mega and beyond).',
    h1: 'Data Converter — KB, MB, GB & TB',
    intro: 'Convert data sizes from kilo to mega, mega to giga, and beyond using binary (base-2) units. Type a value in either box and the other updates in real time — for example 1024 KB = 1 MB.',
    seo: {
      title: 'MB to GB Converter | 1 GB = 1,024 MB (KB, TB)',
      description: 'Convert MB to GB and KB to MB using binary units. 1 GB = 1,024 MB. Learn how the 1,000 vs 1,024 difference changes the answer, with a KB–MB–GB–TB chart.',
    },
    breadcrumb: ['Home', 'Converters', 'Data'],
    a: { label: 'Megabytes (MB)', unit: 'MB', placeholder: '0', defaultValue: '1024' },
    b: { label: 'Gigabytes (GB)', unit: 'GB', placeholder: '0', defaultValue: '1' },
    factor: 1 / 1024,
    formula: '1024 MB = 1 GB',
    resultUnit: 'GB',
    precision: 4,
    note: 'Uses binary base-2 units (1024), not decimal (1000).',
    howTo: {
      title: 'How to use this converter',
      steps: [
        'Enter a value in the Megabytes box — for example 1024 MB.',
        'Read the Gigabytes result, or type in the Gigabytes box to convert the other way.',
        'Use Swap units to flip the direction, or clear a box to start over.',
      ],
    },
    understanding: {
      title: 'Understanding MB and GB (base-2)',
      desc: 'This calculator uses binary multiples, where <strong>1 GB equals 1,024 MB</strong>. Under that convention, <strong>1,000 MB equals 0.9766 GB</strong>. Storage manufacturers commonly use decimal SI multiples instead, where 1,000 MB equals 1 GB. Strict IEC terminology calls the binary quantities MiB and GiB. For time-based conversions, try the <a href="/converters/time-converter">time converter</a>, or for length see the <a href="/converters/length-converter">length converter</a>.',
    },
    commonTable: {
      header: ['Unit', 'Equivalent'],
      rows: [
        ['1 KB', '1,024 bytes'],
        ['1 MB', '1,024 KB'],
        ['1,000 MB', '0.9766 GB (binary)'],
        ['1,024 MB', '1 GB (binary)'],
        ['1 GB', '1,024 MB'],
        ['1 TB', '1,024 GB'],
        ['1 byte', '8 bits'],
      ],
    },
    faqs: [
      { q: 'How many megabytes are in a gigabyte?', a: 'This converter uses binary units, where 1 GB equals 1,024 MB.' },
      { q: 'What is 1000 MB in GB?', a: 'Using binary units, 1,000 MB is 0.9765625 GB. Using the decimal convention used by many storage manufacturers, 1,000 MB is exactly 1 GB.' },
      { q: 'How do I convert KB to MB to GB to TB?', a: 'With binary multiples, divide by 1,024 at each step: 1,024 KB = 1 MB, 1,024 MB = 1 GB, and 1,024 GB = 1 TB.' },
      { q: 'Why do storage manufacturers sometimes use 1,000 MB per GB?', a: 'Drive manufacturers commonly use decimal SI units, while many operating systems report storage using binary multiples. The two conventions produce different displayed capacities.' },
      { q: 'What is the difference between a bit and a byte?', a: 'A byte contains 8 bits. Internet speeds are often stated in bits per second, while file sizes are usually stated in bytes.' },
      { q: 'Does this converter use GB or GiB?', a: 'It follows the common operating-system convention of treating GB as 1,024 MB. Strict IEC terminology would call that binary quantity a GiB.' },
    ],
    related: ['length-converter', 'time-converter', 'kg-to-lbs-converter'],
  },
  {
    id: 'speed',
    slug: 'speed-converter',
    title: 'Speed Converter',
    shortDesc: 'Convert m/s, km/h, mph, knots, and ft/s.',
    h1: 'Speed Converter',
    intro: 'Convert between meters per second, kilometers per hour, miles per hour, knots, and feet per second with instant bidirectional results.',
    seo: {
      title: `Speed Converter | 1 mile/h = ${fmt(KM_PER_MILE, 6)} km/h`,
      description: 'Convert speed units including m/s, km/h, mph, knots, and ft/s. Learn how to convert between them — choose any two units for an instant result with formulas.',
    },
    breadcrumb: ['Home', 'Converters', 'Speed'],
    a: { label: 'From value', unit: 'm/s', placeholder: '0', defaultValue: '10' },
    b: { label: 'To value', unit: 'km/h', placeholder: '0', defaultValue: '36' },
    factor: 3.6,
    formula: '10 m/s = 36 km/h',
    resultUnit: 'km/h',
    precision: 4,
    note: 'Select any two supported speed units. Results update as you type.',
    units: [
      { label: 'Meters per second', unit: 'm/s', factor: 1 },
      { label: 'Kilometers per hour', unit: 'km/h', factor: 1 / 3.6 },
      { label: 'Miles per hour', unit: 'mph', factor: 0.44704 },
      { label: 'Knots', unit: 'kn', factor: 0.5144444444444445 },
      { label: 'Feet per second', unit: 'ft/s', factor: 0.3048 },
    ],
    defaultFromUnit: 'm/s',
    defaultToUnit: 'km/h',
    howTo: {
      title: 'How to convert speed units',
      steps: [
        'Choose the unit you are converting from and enter the speed.',
        'Choose the destination unit to see the converted value instantly.',
        'Use Swap units to reverse the selected units and keep the equivalent value.',
      ],
    },
    understanding: {
      title: 'Understanding speed units',
      desc: '<strong>Meters per second (m/s)</strong> is the SI unit of speed, while <strong>kilometers per hour (km/h)</strong> and <strong>miles per hour (mph)</strong> are common for road speeds. A <strong>knot</strong> is one nautical mile per hour and is widely used in aviation and marine navigation. This converter first maps each value to m/s, then converts from that shared base unit. For distance measurements, use the <a href="/converters/length-converter">length converter</a>.',
    },
    commonTable: {
      header: ['Speed', 'Equivalent'],
      rows: [
        ['1 m/s', '3.6 km/h'],
        ['10 m/s', '22.3694 mph'],
        ['60 mph', '96.5606 km/h'],
        ['1 knot', '1.852 km/h'],
        ['1 ft/s', '0.3048 m/s'],
      ],
    },
    faqs: [
      { q: 'How do I convert meters per second to kilometers per hour?', a: 'Multiply meters per second by 3.6. For example, 10 m/s equals 36 km/h.' },
      { q: 'How many kilometers per hour is 60 mph?', a: '60 miles per hour is approximately 96.5606 kilometers per hour.' },
      { q: 'What is a knot?', a: 'A knot is one nautical mile per hour. It equals exactly 1.852 km/h or approximately 1.1508 mph.' },
      { q: 'Which speed unit is the SI standard?', a: 'Meters per second (m/s) is the SI derived unit for speed.' },
    ],
    related: ['length-converter', 'time-converter', 'area-converter'],
  },
  {
    id: 'area',
    slug: 'area-converter',
    title: 'Area Converter',
    shortDesc: 'Convert metric, imperial, and land area units.',
    h1: 'Area Converter',
    intro: 'Convert square meters, square kilometers, square feet, square yards, acres, hectares, and square miles instantly.',
    seo: {
      title: `Area Converter | 1 acre = ${headlineValue(M2_PER_ACRE)} m²`,
      description: 'Free area converter for m², km², ft², yd², acres, hectares, and mi². Learn how to convert — 1 acre is 4,046.86 m². Select any two units for a fast result.',
    },
    breadcrumb: ['Home', 'Converters', 'Area'],
    a: { label: 'From value', unit: 'm²', placeholder: '0', defaultValue: '100' },
    b: { label: 'To value', unit: 'ft²', placeholder: '0', defaultValue: '1076.391' },
    factor: 10.7639104167,
    formula: '100 m² = 1,076.391 ft²',
    resultUnit: 'ft²',
    precision: 4,
    note: 'All area factors are normalized through square meters.',
    units: [
      { label: 'Square meters', unit: 'm²', factor: 1 },
      { label: 'Square kilometers', unit: 'km²', factor: 1_000_000 },
      { label: 'Square feet', unit: 'ft²', factor: 0.09290304 },
      { label: 'Square yards', unit: 'yd²', factor: 0.83612736 },
      { label: 'Acres', unit: 'acre', factor: 4046.8564224 },
      { label: 'Hectares', unit: 'ha', factor: 10_000 },
      { label: 'Square miles', unit: 'mi²', factor: 2_589_988.110336 },
    ],
    defaultFromUnit: 'm²',
    defaultToUnit: 'ft²',
    howTo: {
      title: 'How to convert area units',
      steps: [
        'Select the original area unit and type the measurement.',
        'Select the unit you need; the equivalent area appears immediately.',
        'Swap the units to reverse the conversion without re-entering the value.',
      ],
    },
    understanding: {
      title: 'Understanding area conversion',
      desc: 'Area measures a two-dimensional surface, so linear conversion factors must be <strong>squared</strong>. One foot is 0.3048 meters, but one square foot is 0.09290304 square meters. <strong>Acres</strong> and <strong>hectares</strong> are commonly used for land: one hectare is 10,000 m², while one acre is about 4,046.86 m². For one-dimensional measurements, use the <a href="/converters/length-converter">length converter</a>.',
    },
    commonTable: {
      header: ['Area', 'Equivalent'],
      rows: [
        ['1 m²', '10.7639 ft²'],
        ['100 m²', '1,076.391 ft²'],
        ['1 acre', '4,046.8564 m²'],
        ['1 hectare', '2.4711 acres'],
        ['1 mi²', '640 acres'],
      ],
    },
    faqs: [
      { q: 'How many square feet are in one square meter?', a: 'One square meter equals approximately 10.7639 square feet.' },
      { q: 'How many acres are in a hectare?', a: 'One hectare equals approximately 2.4711 acres.' },
      { q: 'Why are area conversion factors squared?', a: 'Area has two dimensions. Converting both length and width means the linear conversion factor is applied twice.' },
      { q: 'How many acres are in one square mile?', a: 'There are exactly 640 acres in one square mile.' },
    ],
    related: ['length-converter', 'volume-converter', 'speed-converter'],
  },
  {
    id: 'volume',
    slug: 'volume-converter',
    title: 'Liter & Volume Converter',
    shortDesc: 'Convert liters, gallons, cups, fluid ounces, and more.',
    h1: 'Liter & Volume Converter',
    intro: 'Convert volume into liters (litres), milliliters, cubic meters, US gallons, quarts, cups, fluid ounces, and cubic feet instantly.',
    seo: {
      title: `Liter Converter | 1 US gal = ${fmt(L_PER_US_GAL, 6)} L`,
      description: 'Convert volume into liters or litres, mL, m³, US gallons, quarts, cups, fluid ounces, and ft³. Learn how to convert — 1 US gallon is 3.785412 liters.',
    },
    breadcrumb: ['Home', 'Converters', 'Volume'],
    a: { label: 'From value', unit: 'L', placeholder: '0', defaultValue: '1' },
    b: { label: 'To value', unit: 'US gal', placeholder: '0', defaultValue: '0.2642' },
    factor: 0.2641720524,
    formula: '1 L = 0.2642 US gal',
    resultUnit: 'US gal',
    precision: 4,
    note: 'US customary liquid units are used; UK imperial units differ.',
    units: [
      { label: 'Liters', unit: 'L', factor: 1 },
      { label: 'Milliliters', unit: 'mL', factor: 0.001 },
      { label: 'Cubic meters', unit: 'm³', factor: 1000 },
      { label: 'US gallons', unit: 'US gal', factor: 3.785411784 },
      { label: 'US quarts', unit: 'US qt', factor: 0.946352946 },
      { label: 'US cups', unit: 'US cup', factor: 0.2365882365 },
      { label: 'US fluid ounces', unit: 'US fl oz', factor: 0.0295735295625 },
      { label: 'Cubic feet', unit: 'ft³', factor: 28.316846592 },
    ],
    defaultFromUnit: 'L',
    defaultToUnit: 'US gal',
    howTo: {
      title: 'How to convert volume units',
      steps: [
        'Choose the source volume unit and enter the amount.',
        'Choose the destination unit to calculate the equivalent volume.',
        'Use Swap units to reverse the conversion; check the US-unit note when using recipes.',
      ],
    },
    understanding: {
      title: 'Understanding volume units',
      desc: '<strong>Liters and milliliters</strong> are metric volume units, while US gallons, quarts, cups, and fluid ounces are US customary liquid measures. This page uses <strong>US units</strong>: one US gallon is 3.785411784 liters. UK imperial gallons and fluid ounces are larger and should not be substituted. Cubic units describe the volume of a three-dimensional space; one cubic meter equals 1,000 liters. For surface measurements, try the <a href="/converters/area-converter">area converter</a>.',
    },
    commonTable: {
      header: ['Volume', 'Equivalent'],
      rows: [
        ['1 L', '0.2642 US gal'],
        ['1 US gal', '3.7854 L'],
        ['1 US qt', '4 US cups'],
        ['1 US cup', '8 US fl oz'],
        ['1 m³', '1,000 L'],
      ],
    },
    faqs: [
      { q: 'How many liters are in a US gallon?', a: 'One US liquid gallon equals exactly 3.785411784 liters.' },
      { q: 'Are liter and litre the same unit?', a: 'Yes. Liter is the US spelling and litre is the international spelling. Both use the symbol L and represent the same volume.' },
      { q: 'How do I convert volume into litres?', a: 'Select the source unit and Liters (L) as the destination. The converter maps the source value through its published factor and shows the equivalent litres instantly.' },
      { q: 'How many milliliters are in a liter?', a: 'There are exactly 1,000 milliliters in one liter.' },
      { q: 'Are US and UK gallons the same?', a: 'No. A US gallon is about 3.785 liters, while a UK imperial gallon is about 4.546 liters. This converter uses US customary units.' },
      { q: 'How many fluid ounces are in a US cup?', a: 'One US customary cup contains 8 US fluid ounces.' },
    ],
    related: ['area-converter', 'length-converter', 'kg-to-lbs-converter'],
  },
  {
    id: 'currency',
    slug: 'currency-converter',
    title: 'Currency Converter',
    shortDesc: 'Convert currencies with public reference rates or your own rate.',
    h1: 'Currency Converter',
    intro: 'Convert between major currencies using a public ECB reference rate (Frankfurter), with a CDN fallback. You can still override the rate manually for bank quotes or accounting records.',
    seo: {
      title: 'Currency Converter | Manual & Live FX Rates',
      description: 'Convert USD, EUR, GBP, JPY and more with public ECB reference rates. Learn how to set the exact rate for your case, with a manual override and no sign-up.',
    },
    breadcrumb: ['Home', 'Converters', 'Currency'],
    a: { label: 'Amount', unit: 'USD', placeholder: '0', defaultValue: '100' },
    b: { label: 'Converted amount', unit: 'EUR', placeholder: '0', defaultValue: '86.453' },
    factor: 0.86453,
    formula: '1 USD = market EUR rate',
    resultUnit: 'EUR',
    precision: 4,
    note: 'Uses public reference rates by default. Override the rate for bank quotes or fees.',
    currency: {
      currencies: [
        { code: 'USD', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'CNY', name: 'Chinese Yuan' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'CHF', name: 'Swiss Franc' },
        { code: 'HKD', name: 'Hong Kong Dollar' },
        { code: 'SGD', name: 'Singapore Dollar' },
        { code: 'INR', name: 'Indian Rupee' },
        { code: 'KRW', name: 'South Korean Won' },
      ],
      defaultFrom: 'USD',
      defaultTo: 'EUR',
      defaultRate: '0.86453',
    },
    howTo: {
      title: 'How to convert currency',
      steps: [
        'Choose the source and destination currencies, then enter the amount.',
        'Wait for the public reference rate to load, or click Refresh market rate.',
        'Optionally edit the rate to match a bank quote, then swap currencies if needed.',
      ],
    },
    understanding: {
      title: 'Understanding reference exchange rates',
      desc: 'By default this tool loads a <strong>public reference rate</strong> from <a href="https://www.frankfurter.app/docs" rel="noopener noreferrer">Frankfurter</a> (ECB daily rates). If that request fails, it falls back to the open <a href="https://github.com/fawazahmed0/currency-api#readme" rel="noopener noreferrer">currency-api</a> CDN. Both sources are planning references — banks, cards and payment apps may add fees or spreads. Edit the rate field whenever you need a specific quote. Related planning tools include the <a href="/finance/salary-calculator">salary calculator</a> and <a href="/finance/loan-calculator">loan calculator</a>.',
    },
    commonTable: {
      header: ['Example', 'Notes'],
      rows: [
        ['USD → EUR', 'Uses the latest ECB reference rate when available'],
        ['Manual override', 'Edit the rate field to match your bank or invoice'],
        ['Refresh market rate', 'Reloads Frankfurter, then currency-api fallback'],
        ['Swap currencies', 'Reloads the market rate unless you are in manual mode'],
        ['Fees & spreads', 'Not included — add them separately for real costs'],
      ],
    },
    faqs: [
      { q: 'Where do the exchange rates come from?', a: 'The converter first requests Frankfurter (European Central Bank daily reference rates). If that fails, it falls back to the open fawazahmed0 currency-api CDN listed in public-apis.' },
      { q: 'Are these live bank quotes?', a: 'No. They are public reference rates for planning. Retail FX quotes often include fees, spreads or card markups that this tool does not apply.' },
      { q: 'Can I enter my own rate?', a: 'Yes. Edit the rate field at any time. Click Refresh market rate to discard the override and reload a public reference rate.' },
      { q: 'What does “1 FROM = RATE TO” mean?', a: 'It means one unit of the source currency buys the entered number of destination-currency units. The amount is multiplied by that rate.' },
      { q: 'Does the result include bank fees?', a: 'No. The conversion uses only the displayed rate. Add any provider fees or spreads separately.' },
    ],
    related: ['salary-calculator', 'loan-calculator', 'percentage-calculator'],
  },
];

export function getConverterTool(slug: string): ConverterConfig | undefined {
  return converterTools.find((t) => t.slug === slug);
}
