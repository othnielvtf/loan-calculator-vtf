interface CurrencySelectProps {
  value: string;
  onChange: (currency: string) => void;
}

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'RM', symbol: 'MYR ', name: 'Malaysian Ringgit'},
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
];

export function CurrencySelect({ value, onChange }: CurrencySelectProps) {
  return (
    <div className="h-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Currency
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg 
                 focus:ring-2 focus:ring-white focus:border-transparent
                 text-gray-100 placeholder-gray-500"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} ({currency.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}