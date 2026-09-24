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
  table: { from: string; to: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
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
      { from: '1 cm', to: '0.3937 in' },
      { from: '2 cm', to: '0.7874 in' },
      { from: '5 cm', to: '1.9685 in' },
      { from: '10 cm', to: '3.9370 in' },
      { from: '20 cm', to: '7.8740 in' },
      { from: '30 cm', to: '11.8110 in' },
      { from: '50 cm', to: '19.6850 in' },
      { from: '100 cm', to: '39.3701 in' },
    ],
    faqs: [
      { q: 'How do I convert cm to inches?', a: 'Divide the centimeter value by 2.54. For example, 10 cm ÷ 2.54 = 3.9370 inches.' },
      { q: 'How many inches are in one centimeter?', a: 'One centimeter equals approximately 0.3937007874 inches.' },
      { q: 'Is 2.54 cm exactly one inch?', a: 'Yes. The international inch is defined as exactly 2.54 centimeters.' },
      { q: 'What is 30 cm in inches?', a: '30 centimeters equals approximately 11.8110 inches.' },
    ],
    related: ['length-converter', 'meters-to-feet', 'kg-to-lbs-converter'],
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
      { from: '1 m', to: '3.2808 ft' },
      { from: '2 m', to: '6.5617 ft' },
      { from: '3 m', to: '9.8425 ft' },
      { from: '5 m', to: '16.4042 ft' },
      { from: '10 m', to: '32.8084 ft' },
      { from: '20 m', to: '65.6168 ft' },
      { from: '50 m', to: '164.0420 ft' },
      { from: '100 m', to: '328.0840 ft' },
    ],
    faqs: [
      { q: 'How do I convert meters to feet?', a: 'Divide meters by 0.3048, or multiply by approximately 3.28084.' },
      { q: 'How many feet are in one meter?', a: 'One meter equals approximately 3.280839895 feet.' },
      { q: 'What is 10 meters in feet?', a: '10 meters equals approximately 32.8084 feet.' },
      { q: 'Is one foot exactly 0.3048 meters?', a: 'Yes. The international foot is defined as exactly 0.3048 meters.' },
    ],
    related: ['length-converter', 'cm-to-inches', 'area-converter'],
    source: {
      label: 'NIST SI length guidance',
      url: 'https://www.nist.gov/pml/owm/si-units-length',
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
      { from: '-40 °C', to: '-40 °F' },
      { from: '-10 °C', to: '14 °F' },
      { from: '0 °C', to: '32 °F' },
      { from: '10 °C', to: '50 °F' },
      { from: '20 °C', to: '68 °F' },
      { from: '25 °C', to: '77 °F' },
      { from: '37 °C', to: '98.6 °F' },
      { from: '100 °C', to: '212 °F' },
    ],
    faqs: [
      { q: 'What is the Celsius to Fahrenheit formula?', a: 'Multiply Celsius by 9/5, then add 32: °F = °C × 9/5 + 32.' },
      { q: 'What is 20 Celsius in Fahrenheit?', a: '20 °C equals 68 °F.' },
      { q: 'What is 37 Celsius in Fahrenheit?', a: '37 °C equals 98.6 °F.' },
      { q: 'When are Celsius and Fahrenheit equal?', a: 'The two scales are equal at −40: −40 °C = −40 °F.' },
    ],
    related: ['temperature-converter', 'cm-to-inches', 'kg-to-lbs-converter'],
    source: {
      label: 'NIST SI temperature guidance',
      url: 'https://www.nist.gov/pml/owm/si-units-temperature',
    },
  },
];

export function getPairConversion(slug: string): PairConversionConfig | undefined {
  return pairConversions.find((item) => item.slug === slug);
}
