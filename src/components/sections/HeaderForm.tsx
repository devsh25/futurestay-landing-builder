'use client';

import { usePageStore } from '@/store/pageStore';
import ImageUpload from '@/components/ui/ImageUpload';

export default function HeaderForm() {
  const section = usePageStore((s) => s.header);
  const updateSection = usePageStore((s) => s.updateSection);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Header</h3>

      <ImageUpload
        label="Logo"
        value={section.logoUrl}
        onChange={(url) => updateSection('header', { logoUrl: url })}
        placeholder="https://example.com/logo.png"
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Primary CTA Text</label>
        <input
          type="text"
          value={section.primaryCtaText}
          onChange={(e) => updateSection('header', { primaryCtaText: e.target.value })}
          placeholder="Start Free Trial"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Primary CTA URL</label>
        <input
          type="text"
          value={section.primaryCtaUrl}
          onChange={(e) => updateSection('header', { primaryCtaUrl: e.target.value })}
          placeholder="https://example.com/signup"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Secondary CTA Text</label>
        <input
          type="text"
          value={section.secondaryCtaText}
          onChange={(e) => updateSection('header', { secondaryCtaText: e.target.value })}
          placeholder="Book a Call"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Secondary CTA URL</label>
        <input
          type="text"
          value={section.secondaryCtaUrl}
          onChange={(e) => updateSection('header', { secondaryCtaUrl: e.target.value })}
          placeholder="https://example.com/book-call"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={section.sticky}
            onChange={(e) => updateSection('header', { sticky: e.target.checked })}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-700">Sticky Header</span>
        </label>
      </div>
    </div>
  );
}
