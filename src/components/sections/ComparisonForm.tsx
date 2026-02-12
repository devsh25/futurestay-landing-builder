'use client';

import { usePageStore } from '@/store/pageStore';
import { ComparisonRow } from '@/lib/types';

export default function ComparisonForm() {
  const section = usePageStore((s) => s.comparison);
  const updateSection = usePageStore((s) => s.updateSection);

  const updateColumn = (index: number, value: string) => {
    const newColumns = [...section.columns];
    newColumns[index] = value;
    updateSection('comparison', { columns: newColumns });
  };

  const addColumn = () => {
    const newColumns = [...section.columns, ''];
    const newRows = section.rows.map((row) => ({
      ...row,
      values: [...row.values, ''],
    }));
    updateSection('comparison', { columns: newColumns, rows: newRows });
  };

  const removeColumn = (index: number) => {
    const newColumns = section.columns.filter((_, i) => i !== index);
    const newRows = section.rows.map((row) => ({
      ...row,
      values: row.values.filter((_, i) => i !== index),
    }));
    updateSection('comparison', { columns: newColumns, rows: newRows });
  };

  const updateRow = (rowIndex: number, field: 'feature', value: string) => {
    const newRows = [...section.rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [field]: value };
    updateSection('comparison', { rows: newRows });
  };

  const updateRowValue = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...section.rows];
    const newValues = [...newRows[rowIndex].values];
    newValues[colIndex] = value;
    newRows[rowIndex] = { ...newRows[rowIndex], values: newValues };
    updateSection('comparison', { rows: newRows });
  };

  const addRow = () => {
    const emptyValues = section.columns.map(() => '');
    const newRow: ComparisonRow = { feature: '', values: emptyValues };
    updateSection('comparison', { rows: [...section.rows, newRow] });
  };

  const removeRow = (index: number) => {
    const newRows = section.rows.filter((_, i) => i !== index);
    updateSection('comparison', { rows: newRows });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Comparison</h3>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={section.enabled}
            onChange={(e) => updateSection('comparison', { enabled: e.target.checked })}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-700">Enabled</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Section Title</label>
        <input
          type="text"
          value={section.sectionTitle}
          onChange={(e) => updateSection('comparison', { sectionTitle: e.target.value })}
          placeholder="How We Compare"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Columns</label>
        <div className="space-y-2">
          {section.columns.map((col, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={col}
                onChange={(e) => updateColumn(index, e.target.value)}
                placeholder={`Column ${index + 1}`}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {section.columns.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeColumn(index)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addColumn}
          className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          + Add Column
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Rows</label>
        <div className="space-y-2">
          {section.rows.map((row, rowIndex) => (
            <div key={rowIndex} className="border border-slate-200 rounded-lg p-3 space-y-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Feature Name</label>
                <input
                  type="text"
                  value={row.feature}
                  onChange={(e) => updateRow(rowIndex, 'feature', e.target.value)}
                  placeholder="Feature name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {section.columns.map((col, colIndex) => (
                <div key={colIndex}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {col || `Column ${colIndex + 1}`}
                  </label>
                  <input
                    type="text"
                    value={row.values[colIndex] || ''}
                    onChange={(e) => updateRowValue(rowIndex, colIndex, e.target.value)}
                    placeholder="Value"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => removeRow(rowIndex)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          + Add Row
        </button>
      </div>
    </div>
  );
}
