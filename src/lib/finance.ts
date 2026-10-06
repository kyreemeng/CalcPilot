// Financial calculator engines (pure, client-safe).
// All functions are deterministic and run entirely in the browser for
// instant (<200ms) results — no server round-trip required.

export interface AmortRow {
  n: number; // year number (mortgage) or payment number (loan)
  start: number;
  interest: number;
  principal: number;
  end: number;
}

export interface FinanceResult {
  main: number; // the big headline number
  subtitle: string; // "per month" / "projected total" / "after 20 years"
  values: Record<string, number>; // keyed numeric values for breakdown + donut
  amortization?: AmortRow[];
  amortFirstCol?: string; // "Year" | "Payment"
}

/**
 * Monthly amortization schedule for a fixed-rate, fully-amortizing loan.
 *
 * `extraMonthly` is added on top of the scheduled payment. When it is set the
 * loop stops as soon as the balance clears, so a shorter `monthly` array is
 * what proves the term actually shortened — previously the extra payment only
 * inflated the headline figure and the interest total ignored it entirely.
 */
export function amortSchedule(principal: number, annualRate: number, years: number, extraMonthly = 0) {
  const r = annualRate / 100 / 12;
  const n = Math.max(1, Math.round(years * 12));
  let scheduled = 0;
  if (r === 0) {
    scheduled = principal / n;
  } else {
    scheduled = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }
  const extra = Math.max(0, extraMonthly);
  const payment = scheduled + extra;
  const monthly: { month: number; interest: number; principal: number; balance: number }[] = [];
  let balance = principal;
  for (let m = 1; m <= n; m++) {
    if (extra > 0 && balance <= 0) break;
    const interest = balance * r;
    let principalPart = payment - interest;
    // A shortened schedule ends on a partial payment rather than overpaying.
    if (extra > 0 && principalPart > balance) principalPart = balance;
    balance = Math.max(0, balance - principalPart);
    monthly.push({ month: m, interest, principal: principalPart, balance });
  }
  return { payment, scheduled, monthly };
}

/** Mortgage — monthly P&I + property tax + home insurance, with yearly amortization. */
export function computeMortgage(v: Record<string, number>): FinanceResult {
  const principal = Math.max(0, (v.homePrice ?? 0) - (v.downPayment ?? 0));
  const sched = amortSchedule(principal, v.rate ?? 0, v.term ?? 30);
  const pi = sched.payment;
  const tax = (v.tax ?? 0) / 12;
  const insurance = (v.insurance ?? 0) / 12;

  const years = Math.max(1, Math.round(v.term ?? 30));
  const yearly: AmortRow[] = [];
  let bal = principal;
  for (let y = 1; y <= years; y++) {
    const start = bal;
    let interest = 0;
    let principalPart = 0;
    const from = (y - 1) * 12;
    for (let m = from; m < Math.min(from + 12, sched.monthly.length); m++) {
      interest += sched.monthly[m].interest;
      principalPart += sched.monthly[m].principal;
    }
    bal = sched.monthly[Math.min(from + 11, sched.monthly.length - 1)].balance;
    yearly.push({ n: y, start, interest, principal: principalPart, end: bal });
  }

  return {
    main: pi + tax + insurance,
    subtitle: 'per month',
    values: { pi, tax, insurance },
    amortization: yearly,
    amortFirstCol: 'Year',
  };
}

/** Loan — fixed-rate personal/auto/student loan with origination fee. */
export function computeLoan(v: Record<string, number>): FinanceResult {
  const principal = Math.max(0, v.amount ?? 0);
  const extra = Math.max(0, v.extra ?? 0);
  const sched = amortSchedule(principal, v.rate ?? 0, v.term ?? 5, extra);
  const payment = sched.payment;
  const totalInterest = sched.monthly.reduce((sum, m) => sum + m.interest, 0);
  const fee = v.fee ?? 0;
  const total = principal + totalInterest + fee;
  // With an extra payment the loan clears early, so say so rather than
  // repeating the nominal term back to the user.
  const months = sched.monthly.length;
  const years = months / 12;
  const termLabel = years >= 1
    ? `${Number.isInteger(years) ? years : years.toFixed(1)} years`
    : `${months} months`;

  const all: AmortRow[] = sched.monthly.map((m) => ({
    n: m.month,
    start: m.month === 1 ? principal : sched.monthly[m.month - 2].balance,
    interest: m.interest,
    principal: m.principal,
    end: m.balance,
  }));

  return {
    main: payment,
    subtitle: extra > 0 ? `per month · paid off in ${termLabel}` : 'per month',
    values: { pi: payment, principal, interest: totalInterest, fee, total },
    amortization: all,
    amortFirstCol: 'Payment',
  };
}

/** Auto loan — financed vehicle price after down payment, trade-in, tax and fees. */
export function computeAutoLoan(v: Record<string, number>): FinanceResult {
  const price = Math.max(0, v.vehiclePrice ?? 0);
  const downPayment = Math.max(0, v.downPayment ?? 0);
  const tradeIn = Math.max(0, v.tradeIn ?? 0);
  const salesTax = price * (Math.max(0, v.salesTax ?? 0) / 100);
  const fees = Math.max(0, v.fees ?? 0);
  const vehicleBalance = Math.max(0, price - downPayment - tradeIn);
  const principal = Math.max(0, price + salesTax + fees - downPayment - tradeIn);
  const sched = amortSchedule(principal, Math.max(0, v.rate ?? 0), Math.max(1, v.term ?? 5));
  const totalInterest = sched.monthly.reduce((sum, month) => sum + month.interest, 0);
  const taxFees = salesTax + fees;
  const total = principal + totalInterest;
  const amortization: AmortRow[] = sched.monthly.map((month) => ({
    n: month.month,
    start: month.month === 1 ? principal : sched.monthly[month.month - 2].balance,
    interest: month.interest,
    principal: month.principal,
    end: month.balance,
  }));

  return {
    main: sched.payment,
    subtitle: 'per month',
    values: { principal, vehicleBalance, interest: totalInterest, taxFees, total },
    amortization,
    amortFirstCol: 'Payment',
  };
}

/** Salary — monthly take-home after tax and pre-tax deductions.
 *  Prefer hourly wage when provided (GSC intent: "X an hour is how much a month after taxes").
 *  Fall back to annual salary when hourly is zero. */
export function computeSalary(v: Record<string, number>): FinanceResult {
  const hours = Math.max(1, v.hoursPerWeek ?? 40);
  const hourlyWage = Math.max(0, v.hourly ?? 0);
  const annualFromHourly = hourlyWage * hours * 52;
  const annual = annualFromHourly > 0 ? annualFromHourly : Math.max(0, v.annual ?? 0);
  const grossMonthly = annual / 12;
  const deductions = v.deductions ?? 0; // per month
  const tax = grossMonthly * ((v.taxRate ?? 0) / 100);
  const net = grossMonthly - tax - deductions;
  const weekly = annual / 52;
  const hourly = hourlyWage > 0 ? hourlyWage : weekly / hours;
  return {
    main: net,
    subtitle: 'per month after tax',
    values: { gross: grossMonthly, tax, deductions, net, weekly, hourly, annual },
  };
}

/** Savings / Compound — future value of a balance plus regular contributions. */
function computeGrowth(v: Record<string, number>, subtitle: string): FinanceResult {
  const periods = v.periods ?? 12; // compounding periods per year
  const r = (v.rate ?? 0) / 100 / periods;
  const n = Math.max(1, Math.round((v.years ?? 0) * periods));
  const balance = v.balance ?? 0;
  const contribution = v.contribution ?? 0;
  const perPeriod = contribution * 12 / periods; // preserve annual contribution
  const fvBalance = balance * Math.pow(1 + r, n);
  const fvContrib = r === 0 ? perPeriod * n : perPeriod * ((Math.pow(1 + r, n) - 1) / r);
  const gross = fvBalance + fvContrib;
  const totalContrib = contribution * (v.years ?? 0) * 12;
  // Interest is what the balance grew by, so the money paid in has to come out:
  // both the starting balance and the contributions. Subtracting only the
  // contributions counted the starting balance as earnings, taxed it, and then
  // dropped it from the headline — which no longer matched the ring.
  const grossInterest = gross - balance - totalContrib;
  const tax = grossInterest * ((v.taxRate ?? 0) / 100);
  const interest = grossInterest - tax;
  const main = balance + totalContrib + interest;
  return {
    main,
    subtitle,
    values: { principal: balance, contributions: totalContrib, interest },
  };
}

export function computeSavings(v: Record<string, number>): FinanceResult {
  return computeGrowth(v, 'projected total');
}

export function computeCompound(v: Record<string, number>): FinanceResult {
  return computeGrowth(v, `after ${v.years ?? 20} years`);
}
