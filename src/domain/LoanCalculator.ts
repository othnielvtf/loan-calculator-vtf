export interface LoanDetails {
  amount: number;
  interestRate: number;
  tenure: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  yearlyBreakdown: YearlyBreakdown[];
  monthlyBreakdown: MonthlyBreakdown[];
}

export interface YearlyBreakdown {
  year: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface MonthlyBreakdown {
  month: number;
  year: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export class LoanCalculator {
  static calculate(details: LoanDetails): LoanResult {
    const monthlyRate = details.interestRate / 100 / 12;
    const numberOfPayments = details.tenure * 12;
    
    const monthlyPayment =
      (details.amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - details.amount;

    const monthlyBreakdown: MonthlyBreakdown[] = [];
    const yearlyBreakdown: YearlyBreakdown[] = [];
    
    let remainingBalance = details.amount;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    let currentYear = 1;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;

      monthlyBreakdown.push({
        month: month % 12 === 0 ? 12 : month % 12,
        year: Math.ceil(month / 12),
        principalPaid: Math.round(principalPayment * 100) / 100,
        interestPaid: Math.round(interestPayment * 100) / 100,
        remainingBalance: Math.max(0, Math.round(remainingBalance * 100) / 100)
      });

      if (month % 12 === 0 || month === numberOfPayments) {
        yearlyBreakdown.push({
          year: currentYear,
          principalPaid: Math.round(yearlyPrincipal * 100) / 100,
          interestPaid: Math.round(yearlyInterest * 100) / 100,
          remainingBalance: Math.max(0, Math.round(remainingBalance * 100) / 100)
        });
        yearlyPrincipal = 0;
        yearlyInterest = 0;
        currentYear++;
      }
    }

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      yearlyBreakdown,
      monthlyBreakdown
    };
  }
}