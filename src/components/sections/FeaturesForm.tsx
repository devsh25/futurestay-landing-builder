'use client';

import { usePageStore } from '@/store/pageStore';
import { Feature } from '@/lib/types';
import ImageUpload from '@/components/ui/ImageUpload';

export default function FeaturesForm() {
  const section = usePageStore((s) => s.features);
  const updateSection = usePageStore((s) => s.updateSection);

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...section.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    updateSection('features', { features: newFeatures });
  };

  const addFeature = () => {
    updateSection('features', {
      features: [...section.features, { title: '', description: '', imageUrl: '' }],
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = section.features.filter((_, i) => i !== index);
    updateSection('features', { features: newFeatures });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Features</h3>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={section.enabled}
            onChange={(e) => updateSection('features', { enabled: e.target.checked })}
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
          onChange={(e) => updateSection('features', { sectionTitle: e.target.value })}
          placeholder="Key Features"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Features</label>
        <div className="space-y-2">
          {section.features.map((feature, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeature(index, 'title', e.target.value)}
                  placeholder="Feature title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  placeholder="Describe this feature"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-y"
                />
              </div>
              <ImageUpload
                label="Image"
                value={feature.imageUrl}
                onChange={(url) => updateFeature(index, 'imageUrl', url)}
                compact
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addFeature}
          className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          + Add Feature
        </button>
      </div>
    </div>
  );
}
