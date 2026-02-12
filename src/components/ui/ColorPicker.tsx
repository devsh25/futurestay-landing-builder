'use client';

import { HexColorPicker } from 'react-colorful';
import { useState, useRef, useEffect } from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="relative" ref={popoverRef}>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-slate-300 transition-colors w-full"
          onClick={() => setOpen(!open)}
        >
          <span
            className="inline-block h-5 w-5 rounded border border-slate-200 shrink-0"
            style={{ backgroundColor: value }}
          />
          <span className="font-mono text-slate-600 uppercase">{value}</span>
        </button>
        {open && (
          <div className="absolute left-0 top-full z-50 mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
            <HexColorPicker color={value} onChange={onChange} />
            <input
              type="text"
              value={value}
              onChange={(e) => {
                const v = e.target.value;
                if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) {
                  onChange(v);
                }
              }}
              className="mt-2 w-full rounded-md border border-slate-200 px-2 py-1 text-center font-mono text-sm uppercase"
              maxLength={7}
            />
          </div>
        )}
      </div>
    </div>
  );
}
