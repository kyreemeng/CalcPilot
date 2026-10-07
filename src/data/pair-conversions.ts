export interface PairConversionConfig {
  slug: string;
  title: string;
  h1: string;
  shortDesc: string;
  seo: { title: string; description: string };
  lead: string;
  from: { label: string; unit: string; defaultValue: number };
  to: { label: string; unit: string; defaultValue: number };
  factor: number;
  offset?: number;
  precision: number;
  formula: string;
  reverseFormula: string;
  explanation: string;
  examples: { label: string; calculation: string; result: string }[];
  table: { from: string; to: string; reverse: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  /** Internal-link cluster rendered near the foot of the page. */
  internalLinks?: { anchor: string; href: string; note: string }[];
  source: { label: string; url: string };
}

export const pairConversions: PairConversionConfig[] = [
  {
    slug: 'cm-to-inches',
    title: 'cm to Inches Converter',
    h1: 'cm to Inches Converter',
    shortDesc: 'Convert centimeters to inches with the exact 2.54 cm factor.',
    seo: {
      title: 'cm to Inches Converter | 1 in = 2.54 cm',
      description:
        'Convert cm to inches instantly. 1 inch equals exactly 2.54 centimeters. Learn how to convert cm to inches — inches = cm ÷ 2.54 — with worked examples and a chart.',
    },
    lead:
      'Convert centimeters to inches instantly using the exact international definition: one inch equals 2.54 centimeters.',
    from: { label: 'Centimeters', unit: 'cm', defaultValue: 10 },
    to: { label: 'Inches', unit: 'in', defaultValue: 3.937 },
    factor: 1 / 2.54,
    precision: 4,
    formula: 'inches = centimeters ÷ 2.54',
    reverseFormula: 'centimeters = inches × 2.54',
    explanation:
      'Centimeters belong to the metric system, while inches are used in the US customary and imperial systems. The relationship is exact: 1 inch equals 2.54 centimeters. To convert cm to inches, divide by 2.54. For example, 30 cm ÷ 2.54 = 11.8110 inches. This fixed definition makes the result suitable for everyday dimensions, screen sizes, clothing measurements, and technical planning.',
    examples: [
      { label: '10 cm to inches', calculation: '10 ÷ 2.54', result: '3.9370 in' },
      { label: '30 cm to inches', calculation: '30 ÷ 2.54', result: '11.8110 in' },
      { label: '100 cm to inches', calculation: '100 ÷ 2.54', result: '39.3701 in' },
    ],
    table: [
      { from: '1 cm', to: '0.3937 in', reverse: '1 in = 2.54 cm' },
      { from: '2 cm', to: '0.7874 in', reverse: '2 in = 5.08 cm' },
      { from: '5 cm', to: '1.9685 in', reverse: '5 in = 12.70 cm' },
      { from: '10 cm', to: '3.9370 in', reverse: '10 in = 25.40 cm' },
      { from: '15 cm', to: '5.9055 in', reverse: '15 in = 38.10 cm' },
      { from: '20 cm', to: '7.8740 in', reverse: '20 in = 50.80 cm' },
      { from: '30 cm', to: '11.8110 in', reverse: '30 in = 76.20 cm' },
      { from: '50 cm', to: '19.6850 in', reverse: '50 in = 127.00 cm' },
      { from: '80 cm', to: '31.4961 in', reverse: '80 in = 203.20 cm' },
      { from: '100 cm', to: '39.3701 in', reverse: '100 in = 254.00 cm' },
      { from: '150 cm', to: '59.0551 in', reverse: '150 in = 381.00 cm' },
    ],
    faqs: [
      { q: 'How do I convert cm to inches?', a: 'Divide the centimeter value by 2.54. For example, 10 cm ÷ 2.54 = 3.9370 inches.' },
      { q: 'How many inches are in one centimeter?', a: 'One centimeter equals approximately 0.3937007874 inches.' },
      { q: 'Is 2.54 cm exactly one inch?', a: 'Yes. The international inch is defined as exactly 2.54 centimeters.' },
      { q: 'What is 30 cm in inches?', a: '30 centimeters equals approximately 11.8110 inches.' },
      { q: 'How many centimeters is 6 inches?', a: '6 inches equals 15.24 centimeters (6 × 2.54).' },
      { q: 'What is 170 cm in inches?', a: '170 centimeters equals 66.9291 inches — about 5 feet 7 inches in US height notation.' },
    ],
    related: ['length-converter', 'meters-to-feet', 'kg-to-lbs-converter'],
    internalLinks: [
      { anchor: 'length converter', href: '/converters/length-converter', note: 'mm, cm, m, km, in, ft, yd and mi in one tool' },
      { anchor: 'meters to feet converter', href: '/converters/meters-to-feet', note: 'the other everyday length pair' },
      { anchor: 'area converter', href: '/converters/area-converter', note: 'the same definitions, squared, for land and rooms' },
      { anchor: 'all unit converters', href: '/converters', note: 'every converter category on CalcPilot' },
    ],
    source: {
      label: 'NIST Handbook 44, Appendix C',
      url: 'https://www.nist.gov/pml/owm/si-units-length',
    },
  },
  {
    slug: 'meters-to-feet',
    title: 'Meters to Feet Converter',
    h1: 'Meters to Feet Converter',
    shortDesc: 'Convert meters to feet with the exact 0.3048 m per foot definition.',
    seo: {
      title: 'Meters to Feet Converter | 1 m = 3.28084 ft',
      description:
        'Convert meters to feet instantly. 1 meter equals about 3.28084 feet. Learn how to convert m to ft — feet = meters ÷ 0.3048 — with worked examples and a chart.',
    },
    lead:
      'Convert meters to feet instantly using the exact definition: one international foot equals 0.3048 meters.',
    from: { label: 'Meters', unit: 'm', defaultValue: 1 },
    to: { label: 'Feet', unit: 'ft', defaultValue: 3.2808 },
    factor: 1 / 0.3048,
    precision: 4,
    formula: 'feet = meters ÷ 0.3048',
    reverseFormula: 'meters = feet × 0.3048',
    explanation:
      'The meter is the SI base unit of length. The international foot is defined as exactly 0.3048 meters. To convert meters to feet, divide by 0.3048, or multiply by approximately 3.280839895. For example, 10 meters equals 32.8084 feet. Use this conversion for height, room dimensions, construction estimates, sports distances, and travel planning.',
    examples: [
      { label: '1 meter to feet', calculation: '1 ÷ 0.3048', result: '3.2808 ft' },
      { label: '5 meters to feet', calculation: '5 ÷ 0.3048', result: '16.4042 ft' },
      { label: '10 meters to feet', calculation: '10 ÷ 0.3048', result: '32.8084 ft' },
    ],
    table: [
      { from: '1 m', to: '3.2808 ft', reverse: '1 ft = 0.30 m' },
      { from: '1.5 m', to: '4.9213 ft', reverse: '1.5 ft = 0.46 m' },
      { from: '1.6 m', to: '5.2493 ft', reverse: '1.6 ft = 0.49 m' },
      { from: '1.7 m', to: '5.5774 ft', reverse: '1.7 ft = 0.52 m' },
      { from: '1.8 m', to: '5.9055 ft', reverse: '1.8 ft = 0.55 m' },
      { from: '2 m', to: '6.5617 ft', reverse: '2 ft = 0.61 m' },
      { from: '3 m', to: '9.8425 ft', reverse: '3 ft = 0.91 m' },
      { from: '5 m', to: '16.4042 ft', reverse: '5 ft = 1.52 m' },
      { from: '10 m', to: '32.8084 ft', reverse: '10 ft = 3.05 m' },
      { from: '20 m', to: '65.6168 ft', reverse: '20 ft = 6.10 m' },
      { from: '50 m', to: '164.0420 ft', reverse: '50 ft = 15.24 m' },
      { from: '100 m', to: '328.0840 ft', reverse: '100 ft = 30.48 m' },
    ],
    faqs: [
      { q: 'How do I convert meters to feet?', a: 'Divide meters by 0.3048, or multiply by approximately 3.28084.' },
      { q: 'How many feet are in one meter?', a: 'One meter equals approximately 3.280839895 feet.' },
      { q: 'What is 10 meters in feet?', a: '10 meters equals approximately 32.8084 feet.' },
      { q: 'Is one foot exactly 0.3048 meters?', a: 'Yes. The international foot is defined as exactly 0.3048 meters.' },
      {
        q: 'What is 1.8 m in feet and inches?',
        a: '1.8 meters is 5.9055 feet, which reads as about 5 feet 10.9 inches — a common adult height conversion.',
      },
      { q: 'What is 6 feet in meters?', a: '6 feet equals 1.8288 meters (6 × 0.3048).' },
    ],
    related: ['length-converter', 'cm-to-inches', 'area-converter'],
    internalLinks: [
      { anchor: 'length converter', href: '/converters/length-converter', note: 'mm, cm, m, km, in, ft, yd and mi in one tool' },
      { anchor: 'cm to inches converter', href: '/converters/cm-to-inches', note: 'the exact 2.54 cm per inch pair' },
      { anchor: 'area converter', href: '/converters/area-converter', note: 'square metres, acres and hectares' },
      { anchor: 'all unit converters', href: '/converters', note: 'every converter category on CalcPilot' },
    ],
    source: {
      label: 'NIST SI length guidance',
      url: 'https://www.nist.gov/pml/owm/si-units-length',
    },
  },
  {
    slug: 'liters-to-gallons',
    title: 'Liters to Gallons Converter',
    h1: 'Liters to Gallons Converter',
    shortDesc: 'Convert liters to US gallons with the exact 3.785411784 L definition.',
    seo: {
      title: 'Liters to Gallons Converter | 1 L = 0.26417 gal',
      description:
        'Convert liters to gallons instantly. 1 US gallon equals exactly 3.785411784 liters, so 1 liter is 0.2642 gallons. Chart, formula, US vs imperial.',
    },
    lead:
      'Convert liters to US gallons instantly using the exact definition: one US liquid gallon equals 3.785411784 liters.',
    from: { label: 'Liters', unit: 'L', defaultValue: 1 },
    to: { label: 'US gallons', unit: 'US gal', defaultValue: 0.2642 },
    factor: 1 / 3.785411784,
    precision: 4,
    formula: 'gallons = liters ÷ 3.785411784',
    reverseFormula: 'liters = gallons × 3.785411784',
    explanation:
      'The liter is the metric unit of volume; the <strong>US liquid gallon</strong> is the US customary unit used at the fuel pump, on milk jugs and in recipes. The relationship is exact: <strong>1 US gallon equals 3.785411784 liters</strong>, so to convert liters to gallons you divide by 3.785411784, or multiply by 0.2641720524. For example, 10 L ÷ 3.785411784 = 2.6417 gallons. Watch the convention: a <strong>UK imperial gallon is about 4.546 liters</strong> — roughly 20% larger than a US gallon — so a figure converted with the wrong gallon is wrong by a fifth. Fuel economy, camping water containers and cross-border recipes are the cases where this page gets used most. For other volume units (quarts, cups, fluid ounces, cubic metres), use the <a href="/converters/volume-converter">liter and volume converter</a>.',
    examples: [
      { label: '1 liter to gallons', calculation: '1 ÷ 3.785411784', result: '0.2642 US gal' },
      { label: '10 liters to gallons', calculation: '10 ÷ 3.785411784', result: '2.6417 US gal' },
      { label: '5 gallons to liters', calculation: '5 × 3.785411784', result: '18.9271 L' },
    ],
    table: [
      { from: '1 L', to: '0.2642 gal', reverse: '1 gal = 3.79 L' },
      { from: '2 L', to: '0.5283 gal', reverse: '2 gal = 7.57 L' },
      { from: '3 L', to: '0.7925 gal', reverse: '3 gal = 11.36 L' },
      { from: '4 L', to: '1.0567 gal', reverse: '4 gal = 15.14 L' },
      { from: '5 L', to: '1.3209 gal', reverse: '5 gal = 18.93 L' },
      { from: '10 L', to: '2.6417 gal', reverse: '10 gal = 37.85 L' },
      { from: '15 L', to: '3.9626 gal', reverse: '15 gal = 56.78 L' },
      { from: '20 L', to: '5.2834 gal', reverse: '20 gal = 75.71 L' },
      { from: '50 L', to: '13.2086 gal', reverse: '50 gal = 189.27 L' },
      { from: '100 L', to: '26.4172 gal', reverse: '100 gal = 378.54 L' },
    ],
    faqs: [
      { q: 'How many liters are in a gallon?', a: 'One US liquid gallon equals exactly 3.785411784 liters. A UK imperial gallon is larger, at about 4.546 liters.' },
      { q: 'How many gallons is 1 liter?', a: 'One liter equals 0.2641720524 US gallons, usually rounded to 0.2642.' },
      { q: 'What is 10 liters in gallons?', a: '10 liters equals 2.6417 US gallons (10 ÷ 3.785411784).' },
      { q: 'Are US and imperial gallons the same?', a: 'No. A US gallon is about 3.785 liters; an imperial (UK) gallon is about 4.546 liters — roughly 20% more. This converter uses US gallons.' },
      { q: 'How many liters is 5 gallons?', a: '5 US gallons equals 18.9271 liters (5 × 3.785411784).' },
    ],
    related: ['volume-converter', 'area-converter', 'length-converter'],
    internalLinks: [
      { anchor: 'liter and volume converter', href: '/converters/volume-converter', note: 'L, mL, m³, US gal, qt, cup, fl oz and ft³' },
      { anchor: 'all unit converters', href: '/converters', note: 'every converter category on CalcPilot' },
    ],
    source: {
      label: 'NIST SI volume guidance',
      url: 'https://www.nist.gov/pml/owm/si-units-volume',
    },
  },
  {
    slug: 'celsius-to-fahrenheit',
    title: 'Celsius to Fahrenheit Converter',
    h1: 'Celsius to Fahrenheit Converter',
    shortDesc: 'Convert Celsius to Fahrenheit with the exact offset formula.',
    seo: {
      title: 'Celsius to Fahrenheit | Formula: F = (C × 9/5) + 32',
      description:
        'Convert Celsius to Fahrenheit instantly. The formula is °F = °C × 9/5 + 32. Learn how to convert °C to °F with worked examples and a temperature chart.',
    },
    lead:
      'Convert Celsius to Fahrenheit instantly with the exact offset formula, including common weather, body, freezing, and boiling temperatures.',
    from: { label: 'Celsius', unit: '°C', defaultValue: 20 },
    to: { label: 'Fahrenheit', unit: '°F', defaultValue: 68 },
    factor: 9 / 5,
    offset: 32,
    precision: 1,
    formula: '°F = °C × 9/5 + 32',
    reverseFormula: '°C = (°F − 32) × 5/9',
    explanation:
      'Celsius and Fahrenheit use different zero points and degree sizes, so temperature conversion needs both multiplication and an offset. Multiply Celsius by 9/5, then add 32. Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F) at standard atmospheric pressure. The two scales have the same numerical value at −40.',
    examples: [
      { label: '20 °C to Fahrenheit', calculation: '20 × 9/5 + 32', result: '68 °F' },
      { label: '37 °C to Fahrenheit', calculation: '37 × 9/5 + 32', result: '98.6 °F' },
      { label: '100 °C to Fahrenheit', calculation: '100 × 9/5 + 32', result: '212 °F' },
    ],
    table: [
      { from: '-40 °C', to: '-40 °F', reverse: '-40 °F = -40 °C' },
      { from: '-10 °C', to: '14 °F', reverse: '14 °F = -10 °C' },
      { from: '0 °C', to: '32 °F', reverse: '32 °F = 0 °C' },
      { from: '10 °C', to: '50 °F', reverse: '50 °F = 10 °C' },
      { from: '20 °C', to: '68 °F', reverse: '68 °F = 20 °C' },
      { from: '25 °C', to: '77 °F', reverse: '77 °F = 25 °C' },
      { from: '30 °C', to: '86 °F', reverse: '86 °F = 30 °C' },
      { from: '37 °C', to: '98.6 °F', reverse: '98.6 °F = 37 °C' },
      { from: '38 °C', to: '100.4 °F', reverse: '100.4 °F = 38 °C' },
      { from: '100 °C', to: '212 °F', reverse: '212 °F = 100 °C' },
    ],
    faqs: [
      { q: 'What is the Celsius to Fahrenheit formula?', a: 'Multiply Celsius by 9/5, then add 32: °F = °C × 9/5 + 32.' },
      { q: 'What is 20 Celsius in Fahrenheit?', a: '20 °C equals 68 °F.' },
      { q: 'What is 37 Celsius in Fahrenheit?', a: '37 °C equals 98.6 °F.' },
      { q: 'When are Celsius and Fahrenheit equal?', a: 'The two scales are equal at −40: −40 °C = −40 °F.' },
      { q: 'What is 30 degrees Celsius in Fahrenheit?', a: '30 °C equals 86 °F (30 × 9/5 + 32).' },
      { q: 'What is 100 Fahrenheit in Celsius?', a: '100 °F equals 37.8 °C ((100 − 32) × 5/9) — just above normal body temperature.' },
    ],
    related: ['temperature-converter', 'cm-to-inches', 'kg-to-lbs-converter'],
    internalLinks: [
      { anchor: 'temperature converter', href: '/converters/temperature-converter', note: 'bidirectional °C, °F and Kelvin tool' },
      { anchor: 'all unit converters', href: '/converters', note: 'every converter category on CalcPilot' },
    ],
    source: {
      label: 'NIST SI temperature guidance',
      url: 'https://www.nist.gov/pml/owm/si-units-temperature',
    },
  },
];

export function getPairConversion(slug: string): PairConversionConfig | undefined {
  return pairConversions.find((item) => item.slug === slug);
}
