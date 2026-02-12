'use client';

import { usePageStore } from '@/store/pageStore';
import { SocialProofBadge } from '@/lib/types';
import ImageUpload from '@/components/ui/ImageUpload';

export default function SocialProofBarForm() {
  const section = usePageStore((s) => s.socialProofBar);
  const updateSection = usePageStore((s) => s.updateSection);

  const updateBadge = (index: number, field: keyof SocialProofBadge, value: string) => {
    const newBadges = [...section.badges];
    newBadges[index] = { ...newBadges[index], [field]: value };
    updateSection('socialProofBar', { badges: newBadges });
  };

  const addBadge = () => {
    updateSection('socialProofBar', {
      badges: [...section.badges, { imageUrl: '', text: '' }],
    });
  };

  const removeBadge = (index: number) => {
    const newBadges = section.badges.filter((_, i) => i !== index);
    updateSection('socialProofBar', { badges: newBadges });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Social Proof Bar</h3>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={section.enabled}
            onChange={(e) => updateSection('socialProofBar', { enabled: e.target.checked })}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-700">Enabled</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Badges</label>
        <div className="space-y-2">
          {section.badges.map((badge, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2">
              <ImageUpload
                label="Badge Image"
                value={badge.imageUrl}
                onChange={(url) => updateBadge(index, 'imageUrl', url)}
                compact
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Text</label>
                <input
                  type="text"
                  value={badge.text}
                  onChange={(e) => updateBadge(index, 'text', e.target.value)}
                  placeholder="Badge description"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="button"
                onClick={() => removeBadge(index)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addBadge}
          className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          + Add Badge
        </button>
      </div>
    </div>
  );
}
