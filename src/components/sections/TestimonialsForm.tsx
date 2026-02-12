'use client';

import { usePageStore } from '@/store/pageStore';
import { Testimonial, TextSize } from '@/lib/types';
import SizeSelector from '@/components/ui/SizeSelector';

export default function TestimonialsForm() {
  const section = usePageStore((s) => s.testimonials);
  const updateSection = usePageStore((s) => s.updateSection);

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string | number) => {
    const newTestimonials = [...section.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    updateSection('testimonials', { testimonials: newTestimonials });
  };

  const addTestimonial = () => {
    updateSection('testimonials', {
      testimonials: [
        ...section.testimonials,
        { quote: '', authorName: '', authorTitle: '', rating: 5 },
      ],
    });
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = section.testimonials.filter((_, i) => i !== index);
    updateSection('testimonials', { testimonials: newTestimonials });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Testimonials</h3>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={section.enabled}
            onChange={(e) => updateSection('testimonials', { enabled: e.target.checked })}
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
          onChange={(e) => updateSection('testimonials', { sectionTitle: e.target.value })}
          placeholder="What Our Customers Say"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Sizing */}
      <div className="border-t border-slate-100 pt-3 mt-1">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Sizing</p>
        <SizeSelector<TextSize>
          label="Section Title Size"
          value={section.sectionTitleSize}
          onChange={(size) => updateSection('testimonials', { sectionTitleSize: size })}
          options={['2xl', '3xl', '4xl']}
          type="text"
        />
        <SizeSelector<TextSize>
          label="Quote Size"
          value={section.quoteSize}
          onChange={(size) => updateSection('testimonials', { quoteSize: size })}
          options={['base', 'lg', 'xl']}
          type="text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Testimonials</label>
        <div className="space-y-2">
          {section.testimonials.map((testimonial, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quote</label>
                <textarea
                  value={testimonial.quote}
                  onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                  placeholder="Customer testimonial quote"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Author Name</label>
                <input
                  type="text"
                  value={testimonial.authorName}
                  onChange={(e) => updateTestimonial(index, 'authorName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Author Title</label>
                <input
                  type="text"
                  value={testimonial.authorTitle}
                  onChange={(e) => updateTestimonial(index, 'authorTitle', e.target.value)}
                  placeholder="CEO, Company"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1-5)</label>
                <select
                  value={testimonial.rating}
                  onChange={(e) => updateTestimonial(index, 'rating', Number(e.target.value))}
                  className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeTestimonial(index)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addTestimonial}
          className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          + Add Testimonial
        </button>
      </div>
    </div>
  );
}
