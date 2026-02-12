'use client';

import { useState } from 'react';
import { usePageStore } from '@/store/pageStore';
import { OrderableSectionKey } from '@/lib/types';

const SECTION_LABELS: Record<string, string> = {
  header: 'Header',
  hero: 'Hero',
  socialProofBar: 'Social Proof',
  partnerLogos: 'Partner Logos',
  steps: 'Steps',
  stats: 'Stats',
  features: 'Features',
  testimonials: 'Testimonials',
  comparison: 'Comparison',
  ctaSection: 'CTA',
  faq: 'FAQ',
  footer: 'Footer',
};

export default function SectionNav() {
  const activeSection = usePageStore((s) => s.activeSection);
  const setActiveSection = usePageStore((s) => s.setActiveSection);
  const sectionOrder = usePageStore((s) => s.sectionOrder);
  const setSectionOrder = usePageStore((s) => s.setSectionOrder);

  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
    // Required for Firefox
    e.dataTransfer.setData('text/plain', String(idx));
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setOverIdx(idx);
  };

  const handleDrop = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) {
      setDraggedIdx(null);
      setOverIdx(null);
      return;
    }
    const newOrder = [...sectionOrder];
    const [moved] = newOrder.splice(draggedIdx, 1);
    newOrder.splice(targetIdx, 0, moved);
    setSectionOrder(newOrder as OrderableSectionKey[]);
    setDraggedIdx(null);
    setOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setOverIdx(null);
  };

  return (
    <nav className="flex flex-col gap-0.5 px-2 py-3">
      <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Sections
      </p>

      {/* Draggable page sections */}
      {sectionOrder.map((key, idx) => {
        const isDragged = draggedIdx === idx;
        const isOver = overIdx === idx && draggedIdx !== null && draggedIdx !== idx;
        const isActive = activeSection === key;

        return (
          <div
            key={key}
            draggable
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDrop={(e) => handleDrop(e, idx)}
            onDragEnd={handleDragEnd}
            className={`relative ${isDragged ? 'opacity-40' : ''}`}
          >
            {/* Drop indicator line */}
            {isOver && (
              <div className="absolute -top-[2px] left-2 right-2 h-[3px] rounded-full bg-blue-500 z-10" />
            )}
            <button
              type="button"
              onClick={() => setActiveSection(key)}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {/* Drag handle */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="shrink-0 text-slate-300 cursor-grab active:cursor-grabbing"
              >
                <circle cx="4.5" cy="3" r="1.2" fill="currentColor" />
                <circle cx="9.5" cy="3" r="1.2" fill="currentColor" />
                <circle cx="4.5" cy="7" r="1.2" fill="currentColor" />
                <circle cx="9.5" cy="7" r="1.2" fill="currentColor" />
                <circle cx="4.5" cy="11" r="1.2" fill="currentColor" />
                <circle cx="9.5" cy="11" r="1.2" fill="currentColor" />
              </svg>
              <span className="flex-1">{SECTION_LABELS[key] ?? key}</span>
            </button>
          </div>
        );
      })}

      {/* Design Tokens — pinned at bottom, not draggable */}
      <div className="mt-2 border-t border-slate-200 pt-2">
        <button
          type="button"
          onClick={() => setActiveSection('designTokens')}
          className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
            activeSection === 'designTokens'
              ? 'bg-blue-50 text-blue-600'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
          }`}
        >
          ⚙️ Design Tokens
        </button>
      </div>
    </nav>
  );
}
