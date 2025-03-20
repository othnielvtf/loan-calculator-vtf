interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput({ label, value, onChange, min, max, step }: NumberInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min={min}
        max={max}
        step={step}
        className="w-full px-4 py-2 bg-black border border-zinc-800 rounded-lg 
                   focus:ring-2 focus:ring-white focus:border-transparent
                   text-gray-100 placeholder-gray-500"
      />
    </div>
  );
}