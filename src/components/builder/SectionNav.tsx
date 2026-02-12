'use client';

import { usePageStore } from '@/store/pageStore';

const SECTIONS = [
  { key: 'header', label: 'Header' },
  { key: 'hero', label: 'Hero' },
  { key: 'socialProofBar', label: 'Social Proof' },
  { key: 'partnerLogos', label: 'Partner Logos' },
  { key: 'steps', label: 'Steps' },
  { key: 'stats', label: 'Stats' },
  { key: 'features', label: 'Features' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'comparison', label: 'Comparison' },
  { key: 'ctaSection', label: 'CTA' },
  { key: 'faq', label: 'FAQ' },
  { key: 'footer', label: 'Footer' },
  { key: 'designTokens', label: 'Design Tokens' },
];

export default function SectionNav() {
  const activeSection = usePageStore((s) => s.activeSection);
  const setActiveSection = usePageStore((s) => s.setActiveSection);

  return (
    <nav className="flex flex-col gap-0.5 px-2 py-3">
      <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Sections
      </p>
      {SECTIONS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => setActiveSection(key)}
          className={`rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
            activeSection === key
              ? 'bg-blue-50 text-blue-600'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
