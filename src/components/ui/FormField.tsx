'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  hint?: string;
  className?: string;
}

export default function FormField({ label, children, hint, className }: FormFieldProps) {
  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
