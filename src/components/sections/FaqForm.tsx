'use client';

import { usePageStore } from '@/store/pageStore';
import { FaqItem, TextSize } from '@/lib/types';
import SizeSelector from '@/components/ui/SizeSelector';

export default function FaqForm() {
  const section = usePageStore((s) => s.faq);
  const updateSection = usePageStore((s) => s.updateSection);

  const updateItem = (index: number, field: keyof FaqItem, value: string) => {
    const newItems = [...section.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateSection('faq', { items: newItems });
  };

  const addItem = () => {
    updateSection('faq', {
      items: [...section.items, { question: '', answer: '' }],
    });
  };

  const removeItem = (index: number) => {
    const newItems = section.items.filter((_, i) => i !== index);
    updateSection('faq', { items: newItems });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">FAQ</h3>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={section.enabled}
            onChange={(e) => updateSection('faq', { enabled: e.target.checked })}
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
          onChange={(e) => updateSection('faq', { sectionTitle: e.target.value })}
          placeholder="Frequently Asked Questions"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Sizing */}
      <div className="border-t border-slate-100 pt-3 mt-1">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Sizing</p>
        <SizeSelector<TextSize>
          label="Section Title Size"
          value={section.sectionTitleSize}
          onChange={(size) => updateSection('faq', { sectionTitleSize: size })}
          options={['2xl', '3xl', '4xl']}
          type="text"
        />
        <SizeSelector<TextSize>
          label="Question Size"
          value={section.questionSize}
          onChange={(size) => updateSection('faq', { questionSize: size })}
          options={['base', 'lg', 'xl']}
          type="text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">FAQ Items</label>
        <div className="space-y-2">
          {section.items.map((item, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Question</label>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateItem(index, 'question', e.target.value)}
                  placeholder="What is your question?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Answer</label>
                <textarea
                  value={item.answer}
                  onChange={(e) => updateItem(index, 'answer', e.target.value)}
                  placeholder="Provide the answer here"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-y"
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          + Add FAQ Item
        </button>
      </div>
    </div>
  );
}
