'use client';

import { usePageStore } from '@/store/pageStore';
import ImageUpload from '@/components/ui/ImageUpload';

export default function CtaSectionForm() {
  const section = usePageStore((s) => s.ctaSection);
  const updateSection = usePageStore((s) => s.updateSection);

  const hasTestimonial = section.testimonial !== null;

  const toggleTestimonial = (enabled: boolean) => {
    if (enabled) {
      updateSection('ctaSection', {
        testimonial: { quote: '', authorName: '', authorTitle: '', rating: 5 },
      });
    } else {
      updateSection('ctaSection', { testimonial: null });
    }
  };

  const updateTestimonialField = (field: string, value: string | number) => {
    if (!section.testimonial) return;
    updateSection('ctaSection', {
      testimonial: { ...section.testimonial, [field]: value },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">CTA Section</h3>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={section.enabled}
            onChange={(e) => updateSection('ctaSection', { enabled: e.target.checked })}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-700">Enabled</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Headline</label>
        <input
          type="text"
          value={section.headline}
          onChange={(e) => updateSection('ctaSection', { headline: e.target.value })}
          placeholder="Ready to get started?"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Subtext</label>
        <textarea
          value={section.subtext}
          onChange={(e) => updateSection('ctaSection', { subtext: e.target.value })}
          placeholder="Supporting text for the CTA"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-y"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">CTA Text</label>
        <input
          type="text"
          value={section.ctaText}
          onChange={(e) => updateSection('ctaSection', { ctaText: e.target.value })}
          placeholder="Start Free Trial"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">CTA URL</label>
        <input
          type="text"
          value={section.ctaUrl}
          onChange={(e) => updateSection('ctaSection', { ctaUrl: e.target.value })}
          placeholder="https://example.com/signup"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <ImageUpload
        label="Section Image"
        value={section.imageUrl}
        onChange={(url) => updateSection('ctaSection', { imageUrl: url })}
        placeholder="Upload CTA section image"
      />

      <div className="border-t border-slate-200 pt-4">
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={hasTestimonial}
            onChange={(e) => toggleTestimonial(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-700">Include Testimonial</span>
        </label>

        {hasTestimonial && section.testimonial && (
          <div className="border border-slate-200 rounded-lg p-3 space-y-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Quote</label>
              <textarea
                value={section.testimonial.quote}
                onChange={(e) => updateTestimonialField('quote', e.target.value)}
                placeholder="Customer testimonial quote"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Author Name</label>
              <input
                type="text"
                value={section.testimonial.authorName}
                onChange={(e) => updateTestimonialField('authorName', e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Author Title</label>
              <input
                type="text"
                value={section.testimonial.authorTitle}
                onChange={(e) => updateTestimonialField('authorTitle', e.target.value)}
                placeholder="CEO, Company"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
