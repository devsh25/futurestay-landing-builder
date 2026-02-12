'use client';

import { usePageStore } from '@/store/pageStore';
import { TrustBadge, TextSize, ImageSize } from '@/lib/types';
import ImageUpload from '@/components/ui/ImageUpload';
import SizeSelector from '@/components/ui/SizeSelector';

export default function HeroForm() {
  const section = usePageStore((s) => s.hero);
  const updateSection = usePageStore((s) => s.updateSection);

  const updateBadge = (index: number, field: keyof TrustBadge, value: string) => {
    const newBadges = [...section.trustBadges];
    newBadges[index] = { ...newBadges[index], [field]: value };
    updateSection('hero', { trustBadges: newBadges });
  };

  const addBadge = () => {
    updateSection('hero', {
      trustBadges: [...section.trustBadges, { icon: '', text: '' }],
    });
  };

  const removeBadge = (index: number) => {
    const newBadges = section.trustBadges.filter((_, i) => i !== index);
    updateSection('hero', { trustBadges: newBadges });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Hero</h3>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Headline</label>
        <input
          type="text"
          value={section.headline}
          onChange={(e) => updateSection('hero', { headline: e.target.value })}
          placeholder="Your compelling headline"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Subtext</label>
        <textarea
          value={section.subtext}
          onChange={(e) => updateSection('hero', { subtext: e.target.value })}
          placeholder="Supporting text for the hero section"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-y"
        />
      </div>

      {/* Sizing */}
      <div className="border-t border-slate-100 pt-3 mt-1">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Sizing</p>
        <SizeSelector<TextSize>
          label="Headline Size"
          value={section.headlineSize}
          onChange={(size) => updateSection('hero', { headlineSize: size })}
          options={['xl', '2xl', '3xl', '4xl']}
          type="text"
        />
        <SizeSelector<TextSize>
          label="Subtext Size"
          value={section.subtextSize}
          onChange={(size) => updateSection('hero', { subtextSize: size })}
          options={['base', 'lg', 'xl']}
          type="text"
        />
        <SizeSelector<ImageSize>
          label="Hero Image Size"
          value={section.heroImageSize}
          onChange={(size) => updateSection('hero', { heroImageSize: size })}
          options={['md', 'lg', 'xl', 'full']}
          type="image"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Primary CTA Text</label>
        <input
          type="text"
          value={section.primaryCtaText}
          onChange={(e) => updateSection('hero', { primaryCtaText: e.target.value })}
          placeholder="Start Free Trial"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Primary CTA URL</label>
        <input
          type="text"
          value={section.primaryCtaUrl}
          onChange={(e) => updateSection('hero', { primaryCtaUrl: e.target.value })}
          placeholder="https://example.com/signup"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Secondary CTA Text</label>
        <input
          type="text"
          value={section.secondaryCtaText}
          onChange={(e) => updateSection('hero', { secondaryCtaText: e.target.value })}
          placeholder="Book a Call"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Secondary CTA URL</label>
        <input
          type="text"
          value={section.secondaryCtaUrl}
          onChange={(e) => updateSection('hero', { secondaryCtaUrl: e.target.value })}
          placeholder="https://example.com/book-call"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <ImageUpload
        label="Hero Image"
        value={section.heroImageUrl}
        onChange={(url) => updateSection('hero', { heroImageUrl: url })}
        placeholder="https://example.com/hero-image.png"
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Trust Badges</label>
        <div className="space-y-2">
          {section.trustBadges.map((badge, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={badge.icon}
                  onChange={(e) => updateBadge(index, 'icon', e.target.value)}
                  placeholder="Icon (e.g. emoji or URL)"
                  className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={badge.text}
                  onChange={(e) => updateBadge(index, 'text', e.target.value)}
                  placeholder="Badge text"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          + Add Trust Badge
        </button>
      </div>
    </div>
  );
}
