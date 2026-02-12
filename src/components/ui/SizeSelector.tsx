'use client';

import { TEXT_SIZE_LABELS, IMAGE_SIZE_LABELS } from '@/lib/sizePresets';

interface SizeSelectorProps<T extends string> {
  label: string;
  value: T | undefined;
  onChange: (size: T) => void;
  options: T[];
  type: 'text' | 'image';
}

export default function SizeSelector<T extends string>({
  label,
  value,
  onChange,
  options,
  type,
}: SizeSelectorProps<T>) {
  const labels = type === 'text'
    ? (TEXT_SIZE_LABELS as Record<string, string>)
    : (IMAGE_SIZE_LABELS as Record<string, string>);

  return (
    <div className="flex flex-col gap-1.5 mb-3">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <div className="flex rounded-lg border border-slate-200 overflow-hidden">
        {options.map((opt, idx) => {
          const isActive = value === opt;
          // For text type, scale the label font progressively
          const fontSize = type === 'text' ? `${10 + idx * 2}px` : undefined;

          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`flex-1 px-1.5 py-1.5 text-xs font-medium transition-colors ${
                idx < options.length - 1 ? 'border-r border-slate-200' : ''
              } ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
              style={fontSize ? { fontSize } : undefined}
            >
              {labels[opt] ?? opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
