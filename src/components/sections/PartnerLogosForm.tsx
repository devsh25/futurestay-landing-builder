'use client';

import { usePageStore } from '@/store/pageStore';
import { PartnerLogo } from '@/lib/types';
import ImageUpload from '@/components/ui/ImageUpload';

export default function PartnerLogosForm() {
  const section = usePageStore((s) => s.partnerLogos);
  const updateSection = usePageStore((s) => s.updateSection);

  const updateLogo = (index: number, field: keyof PartnerLogo, value: string) => {
    const newLogos = [...section.logos];
    newLogos[index] = { ...newLogos[index], [field]: value };
    updateSection('partnerLogos', { logos: newLogos });
  };

  const addLogo = () => {
    updateSection('partnerLogos', {
      logos: [...section.logos, { name: '', imageUrl: '' }],
    });
  };

  const removeLogo = (index: number) => {
    const newLogos = section.logos.filter((_, i) => i !== index);
    updateSection('partnerLogos', { logos: newLogos });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Partner Logos</h3>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={section.enabled}
            onChange={(e) => updateSection('partnerLogos', { enabled: e.target.checked })}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-700">Enabled</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Logos</label>
        <div className="space-y-2">
          {section.logos.map((logo, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={logo.name}
                  onChange={(e) => updateLogo(index, 'name', e.target.value)}
                  placeholder="Partner name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <ImageUpload
                label="Logo Image"
                value={logo.imageUrl}
                onChange={(url) => updateLogo(index, 'imageUrl', url)}
                compact
              />
              <button
                type="button"
                onClick={() => removeLogo(index)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addLogo}
          className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          + Add Logo
        </button>
      </div>
    </div>
  );
}
