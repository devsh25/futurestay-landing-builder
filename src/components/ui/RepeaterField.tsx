'use client';

import { ReactNode } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface RepeaterFieldProps<T> {
  label: string;
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, item: T) => void;
  renderItem: (item: T, index: number, onChange: (updated: T) => void) => ReactNode;
  addLabel?: string;
}

export default function RepeaterField<T>({
  label,
  items,
  onAdd,
  onRemove,
  onUpdate,
  renderItem,
  addLabel = 'Add item',
}: RepeaterFieldProps<T>) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute right-2 top-2 rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Remove"
            >
              <Trash2 size={14} />
            </button>
            <div className="pr-8">
              {renderItem(item, index, (updated) => onUpdate(index, updated))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1.5 self-start rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
      >
        <Plus size={14} />
        {addLabel}
      </button>
    </div>
  );
}
