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

/** Full monthly amortization schedule for a fixed-rate, fully-amortizing loan. */
export function amortSchedule(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = Math.max(1, Math.round(years * 12));
  let payment = 0;
  if (r === 0) {
    payment = principal / n;
  } else {
    payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }
  const monthly: { month: number; interest: number; principal: number; balance: number }[] = [];
  let balance = principal;
  for (let m = 1; m <= n; m++) {
    const interest = balance * r;
    const principalPart = payment - interest;
    balance = Math.max(0, balance - principalPart);
    monthly.push({ month: m, interest, principal: principalPart, balance });
  }
  return { payment, monthly };
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
  const sched = amortSchedule(principal, v.rate ?? 0, v.term ?? 5);
  const basePayment = sched.payment;
  const payment = basePayment + (v.extra ?? 0);
  const totalInterest = sched.monthly.reduce((sum, m) => sum + m.interest, 0);
  const fee = v.fee ?? 0;
  const total = principal + totalInterest + fee;

  const all: AmortRow[] = sched.monthly.map((m) => ({
    n: m.month,
    start: m.month === 1 ? principal : sched.monthly[m.month - 2].balance,
    interest: m.interest,
    principal: m.principal,
    end: m.balance,
  }));

  return {
    main: payment,
    subtitle: 'per month',
    values: { pi: basePayment, principal, interest: totalInterest, fee, total },
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

/** Salary — monthly take-home after tax and pre-tax deductions. */
export function computeSalary(v: Record<string, number>): FinanceResult {
  const grossMonthly = (v.annual ?? 0) / 12;
  const deductions = v.deductions ?? 0; // per month
  const tax = grossMonthly * ((v.taxRate ?? 0) / 100);
  const net = grossMonthly - tax - deductions;
  const weekly = (v.annual ?? 0) / 52;
  const hourly = weekly / Math.max(1, v.hoursPerWeek ?? 40);
  return {
    main: net,
    subtitle: 'per month',
    values: { gross: grossMonthly, tax, deductions, net, weekly, hourly },
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
  const grossInterest = gross - totalContrib;
  const tax = grossInterest * ((v.taxRate ?? 0) / 100);
  const interest = grossInterest - tax;
  const main = totalContrib + interest;
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
