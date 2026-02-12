'use client';

import { usePageStore } from '@/store/pageStore';
import { Stat, TextSize } from '@/lib/types';
import SizeSelector from '@/components/ui/SizeSelector';

export default function StatsForm() {
  const section = usePageStore((s) => s.stats);
  const updateSection = usePageStore((s) => s.updateSection);

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const newStats = [...section.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    updateSection('stats', { stats: newStats });
  };

  const addStat = () => {
    updateSection('stats', {
      stats: [...section.stats, { value: '', label: '' }],
    });
  };

  const removeStat = (index: number) => {
    const newStats = section.stats.filter((_, i) => i !== index);
    updateSection('stats', { stats: newStats });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Stats</h3>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={section.enabled}
            onChange={(e) => updateSection('stats', { enabled: e.target.checked })}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-700">Enabled</span>
        </label>
      </div>

      {/* Sizing */}
      <div className="border-t border-slate-100 pt-3 mt-1">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Sizing</p>
        <SizeSelector<TextSize>
          label="Value Size"
          value={section.valueSize}
          onChange={(size) => updateSection('stats', { valueSize: size })}
          options={['2xl', '3xl', '4xl']}
          type="text"
        />
        <SizeSelector<TextSize>
          label="Label Size"
          value={section.labelSize}
          onChange={(size) => updateSection('stats', { labelSize: size })}
          options={['sm', 'base', 'lg']}
          type="text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Stats</label>
        <div className="space-y-2">
          {section.stats.map((stat, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(index, 'value', e.target.value)}
                  placeholder="100+"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  placeholder="Happy customers"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="button"
                onClick={() => removeStat(index)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addStat}
          className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          + Add Stat
        </button>
      </div>
    </div>
  );
}
