'use client';

import { usePageStore } from '@/store/pageStore';
import { Step } from '@/lib/types';
import ImageUpload from '@/components/ui/ImageUpload';

export default function StepsForm() {
  const section = usePageStore((s) => s.steps);
  const updateSection = usePageStore((s) => s.updateSection);

  const updateStep = (index: number, field: keyof Step, value: string) => {
    const newSteps = [...section.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    updateSection('steps', { steps: newSteps });
  };

  const addStep = () => {
    const nextNumber = String(section.steps.length + 1);
    updateSection('steps', {
      steps: [...section.steps, { stepNumber: nextNumber, title: '', description: '', iconUrl: '' }],
    });
  };

  const removeStep = (index: number) => {
    const newSteps = section.steps.filter((_, i) => i !== index);
    updateSection('steps', { steps: newSteps });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Steps</h3>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={section.enabled}
            onChange={(e) => updateSection('steps', { enabled: e.target.checked })}
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
          onChange={(e) => updateSection('steps', { sectionTitle: e.target.value })}
          placeholder="How It Works"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Steps</label>
        <div className="space-y-2">
          {section.steps.map((step, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Step Number</label>
                <input
                  type="text"
                  value={step.stepNumber}
                  onChange={(e) => updateStep(index, 'stepNumber', e.target.value)}
                  placeholder="1"
                  className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(index, 'title', e.target.value)}
                  placeholder="Step title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={step.description}
                  onChange={(e) => updateStep(index, 'description', e.target.value)}
                  placeholder="Describe this step"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-y"
                />
              </div>
              <ImageUpload
                compact
                label="Icon"
                value={step.iconUrl}
                onChange={(url) => updateStep(index, 'iconUrl', url)}
                placeholder="Upload step icon"
              />
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addStep}
          className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          + Add Step
        </button>
      </div>
    </div>
  );
}
