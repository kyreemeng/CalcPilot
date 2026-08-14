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
      title: 'kg to lbs Converter — Free Instant Weight Conversion | CalcPilot',
      description: 'Convert kg to lbs instantly with this free bidirectional calculator. Type in either box, see results update in real time, plus a quick-reference conversion table.',
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
      desc: 'The <strong>kilogram (kg)</strong> is the base unit of mass in the <strong>metric system</strong>, used in nearly every country. The <strong>pound (lb)</strong> is a unit of weight used mainly in the <strong>United States</strong> and United Kingdom. One kilogram equals 2.2046 pounds, so to convert kg to lb you multiply by 2.2046; to go the other way you divide by 2.2046. For other everyday conversions, try the <a href="/converters/length-converter">length converter</a> or the <a href="/converters/temperature-converter">temperature converter</a>.',
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
      title: 'Length Converter — Meters to Feet & More (Free) | CalcPilot',
      description: 'Free length converter for meters, feet, inches, and more. Bidirectional — type in either box for instant results, plus a quick-reference metric/imperial table.',
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
      desc: 'The <strong>meter (m)</strong> is the base unit of length in the <strong>metric system</strong>, while the <strong>foot (ft)</strong> is common in the <strong>United States</strong> and UK. One meter equals 3.2808 feet. To convert meters to feet, multiply by 3.2808; to convert back, divide by 3.2808. For weight conversions see the <a href="/converters/kg-to-lbs-converter">kg to lbs converter</a>, or for digital storage try the <a href="/converters/data-converter">data converter</a>.',
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
      title: 'Temperature Converter — °C to °F Instant & Free | CalcPilot',
      description: 'Free Celsius to Fahrenheit converter with the exact formula °F = °C × 9/5 + 32. Bidirectional — type in either box for instant results, plus a reference table.',
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
      title: 'Time Converter — Hours to Minutes & More (Free) | CalcPilot',
      description: 'Free time converter for hours, minutes, seconds, and days. Bidirectional — type in either box for instant results, plus a quick-reference conversion table.',
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
      title: 'Data Converter — MB to GB Instant & Free | CalcPilot',
      description: 'Free data converter for MB, GB, KB, and TB using binary (base-2) units. Bidirectional — type in either box for instant results, plus a reference table.',
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
      desc: 'Computer storage is measured in powers of two, where <strong>1 GB equals 1024 MB</strong> (not 1000). This is the <strong>binary, or IEC, definition</strong> used by operating systems like Windows and macOS. Some manufacturers use decimal units (1 GB = 1000 MB), which is why a drive labelled 1 TB may show slightly less capacity in your OS. For time-based conversions, try the <a href="/converters/time-converter">time converter</a>, or for length see the <a href="/converters/length-converter">length converter</a>.',
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
