import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { LoanCalculator, LoanDetails, LoanResult } from './domain/LoanCalculator';
import { NumberInput } from './components/NumberInput';
import { Results } from './components/ResultCard';
import { PaymentCharts } from './components/PaymentCharts';
import { CurrencySelect } from './components/CurrencySelect';

const CURRENCY_STORAGE_KEY = 'loan-calculator-currency';

function App() {
  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY);
    return savedCurrency || 'USD';
  });

  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    amount: 100000,
    interestRate: 5,
    tenure: 30
  });

  useEffect(() => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  }, [currency]);

  const results: LoanResult = LoanCalculator.calculate(loanDetails);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold">Loan Calculator</h1>
        </div>

        <div className="bg-zinc-900 p-6 shadow-xl border border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">            
            <NumberInput
              label={`Loan Amount (${currency})`}
              value={loanDetails.amount}
              onChange={(amount) => setLoanDetails({ ...loanDetails, amount })}
              min={0}
              step={1000}
            />
            <CurrencySelect value={currency} onChange={setCurrency} />
            <NumberInput
              label="Interest Rate (%)"
              value={loanDetails.interestRate}
              onChange={(interestRate) => setLoanDetails({ ...loanDetails, interestRate })}
              min={0}
              max={100}
              step={0.1}
            />
            <NumberInput
              label="Loan Term (years)"
              value={loanDetails.tenure}
              onChange={(tenure) => setLoanDetails({ ...loanDetails, tenure })}
              min={1}
              max={50}
              step={1}
            />
          </div>

          <Results results={results} currency={currency} />
        </div>

        <PaymentCharts 
          yearlyBreakdown={results.yearlyBreakdown}
          monthlyBreakdown={results.monthlyBreakdown}
          currency={currency}
        />
      </div>
    </div>
  );
}

export default App;