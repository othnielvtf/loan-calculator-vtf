interface ResultCardProps {
  title: string;
  value: number;
  currency: string;
}

function ResultCard({ title, value, currency }: ResultCardProps) {
  return (
    <div className="bg-black border border-zinc-800 p-4 rounded-lg">
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <p className="text-xl font-semibold text-white">
        {currency} {value.toLocaleString()}
      </p>
    </div>
  );
}

interface ResultsProps {
  results: {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  };
  currency: string;
}

export function Results({ results, currency }: ResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <ResultCard title="Monthly Payment" value={results.monthlyPayment} currency={currency} />
      <ResultCard title="Total Payment" value={results.totalPayment} currency={currency} />
      <ResultCard title="Total Interest" value={results.totalInterest} currency={currency} />
    </div>
  );
}