// Converter registry — single source of truth for the 5 unit converters.
// All converters are bidirectional and compute client-side (<200ms).

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
  related: string[];
}

export const converterTools: ConverterConfig[] = [
  {
    id: 'weight',
    slug: 'kg-to-lbs-converter',
    title: 'kg to lbs Converter',
    shortDesc: 'Convert kilograms to pounds instantly.',
    h1: 'kg to lbs Converter',
    intro: 'Convert kilograms to pounds instantly. Type a value in either box and the other updates in real time — no buttons, no waiting.',
    seo: {
      title: 'kg to lbs Converter — Instant Weight Conversion | CalcPilot',
      description: 'Convert kilograms to pounds instantly with a bidirectional converter. Type in either box and see the result update in real time, plus a quick-reference conversion table.',
    },
    breadcrumb: ['Home', 'Converters', 'Weight'],
    a: { label: 'Kilograms (kg)', unit: 'kg', placeholder: '0', defaultValue: '1' },
    b: { label: 'Pounds (lb)', unit: 'lb', placeholder: '0', defaultValue: '2.2046' },
    factor: 2.2046226218,
    formula: '1 kg = 2.2046 lb',
    resultUnit: 'lb',
    precision: 4,
    note: 'Precise to 4 decimal places. Values sync as you type.',
    howTo: {
      title: 'How to use this converter',
      steps: [
        'Enter a value in the Kilograms box — for example 1 kg.',
        'Read the Pounds result, or type in the Pounds box to convert the other way.',
        'Use Swap units to flip the direction, or clear a box to start over.',
      ],
    },
    understanding: {
      title: 'Understanding kilograms and pounds',
      desc: 'The kilogram is the base unit of mass in the metric system, used almost everywhere in the world. The pound is a unit of weight used mainly in the US and UK. One kilogram equals 2.2046 pounds, so to convert kg to lb you multiply by 2.2046; to go the other way you divide by 2.2046.',
    },
    commonTable: {
      header: ['Kilograms (kg)', 'Pounds (lb)'],
      rows: [
        ['1 kg', '2.2046 lb'],
        ['5 kg', '11.0231 lb'],
        ['10 kg', '22.0462 lb'],
        ['20 kg', '44.0925 lb'],
        ['50 kg', '110.2311 lb'],
      ],
    },
    related: ['length-converter', 'temperature-converter', 'time-converter'],
  },

  {
    id: 'length',
    slug: 'length-converter',
    title: 'Length Converter',
    shortDesc: 'Convert meters, feet, miles and kilometers.',
    h1: 'Length Converter',
    intro: 'Convert between meters and feet instantly. Type a value in either box and the other updates in real time.',
    seo: {
      title: 'Length Converter — Meters to Feet & More | CalcPilot',
      description: 'Convert meters to feet (and back) instantly with a bidirectional length converter. Includes a quick-reference table for common metric and imperial lengths.',
    },
    breadcrumb: ['Home', 'Converters', 'Length'],
    a: { label: 'Meters (m)', unit: 'm', placeholder: '0', defaultValue: '1' },
    b: { label: 'Feet (ft)', unit: 'ft', placeholder: '0', defaultValue: '3.2808' },
    factor: 3.280839895,
    formula: '1 m = 3.2808 ft',
    resultUnit: 'ft',
    precision: 4,
    note: 'Precise to 4 decimal places. Values sync as you type.',
    howTo: {
      title: 'How to use this converter',
      steps: [
        'Enter a value in the Meters box — for example 1 m.',
        'Read the Feet result, or type in the Feet box to convert the other way.',
        'Use Swap units to flip the direction, or clear a box to start over.',
      ],
    },
    understanding: {
      title: 'Understanding meters and feet',
      desc: 'The meter is the base unit of length in the metric system, while the foot is common in the US and UK. One meter equals 3.2808 feet. To convert meters to feet, multiply by 3.2808; to convert back, divide by 3.2808.',
    },
    commonTable: {
      header: ['Meters (m)', 'Feet (ft)'],
      rows: [
        ['1 m', '3.2808 ft'],
        ['10 m', '32.8084 ft'],
        ['100 m', '328.0840 ft'],
        ['1 km', '3,280.8399 ft'],
        ['1 mile', '5,280 ft'],
      ],
    },
    related: ['kg-to-lbs-converter', 'temperature-converter', 'data-converter'],
  },

  {
    id: 'temperature',
    slug: 'temperature-converter',
    title: 'Temperature Converter',
    shortDesc: 'Convert Celsius to Fahrenheit instantly.',
    h1: 'Temperature Converter',
    intro: 'Convert between Celsius and Fahrenheit instantly. Type a value in either box and the other updates in real time.',
    seo: {
      title: 'Temperature Converter — Celsius to Fahrenheit | CalcPilot',
      description: 'Convert Celsius to Fahrenheit (and back) instantly with the offset formula °F = °C × 9/5 + 32. Includes a quick-reference table of common temperatures.',
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
      desc: 'Celsius and Fahrenheit are both temperature scales, but they use different zero points. Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F). Because the scales are offset, converting is not a simple multiplication — you use the formula °F = °C × 9/5 + 32.',
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
    related: ['length-converter', 'time-converter', 'kg-to-lbs-converter'],
  },

  {
    id: 'time',
    slug: 'time-converter',
    title: 'Time Converter',
    shortDesc: 'Convert hours to minutes and more.',
    h1: 'Time Converter',
    intro: 'Convert between hours and minutes instantly. Type a value in either box and the other updates in real time.',
    seo: {
      title: 'Time Converter — Hours to Minutes & More | CalcPilot',
      description: 'Convert hours to minutes (and back) instantly with a bidirectional time converter. Includes a quick-reference table for common time units.',
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
      desc: 'An hour is exactly 60 minutes, and a day is 24 hours. Time uses a base-60 system, so to convert hours to minutes you multiply by 60; to convert back you divide by 60.',
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
    related: ['length-converter', 'data-converter', 'kg-to-lbs-converter'],
  },

  {
    id: 'data',
    slug: 'data-converter',
    title: 'Data Converter',
    shortDesc: 'Convert megabytes to gigabytes (base-2).',
    h1: 'Data Converter',
    intro: 'Convert between megabytes and gigabytes instantly using binary (base-2) units. Type a value in either box and the other updates in real time.',
    seo: {
      title: 'Data Converter — MB to GB (Base-2) | CalcPilot',
      description: 'Convert megabytes to gigabytes instantly using binary (base-2) units. Includes a quick-reference table for KB, MB, GB and TB.',
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
      desc: 'Computer storage is traditionally measured in powers of two, where 1 GB equals 1024 MB (not 1000). This is the binary, or IEC, definition used by operating systems. Some manufacturers use decimal units (1000), which is why a drive labelled 1 TB may show slightly less in your OS.',
    },
    commonTable: {
      header: ['Unit', 'Equivalent'],
      rows: [
        ['1 KB', '1,024 bytes'],
        ['1 MB', '1,024 KB'],
        ['1 GB', '1,024 MB'],
        ['1 TB', '1,024 GB'],
        ['1 byte', '8 bits'],
      ],
    },
    related: ['length-converter', 'time-converter', 'kg-to-lbs-converter'],
  },
];

export function getConverterTool(slug: string): ConverterConfig | undefined {
  return converterTools.find((t) => t.slug === slug);
}
