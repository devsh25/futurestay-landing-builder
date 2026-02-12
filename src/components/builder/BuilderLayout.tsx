'use client';

import { ReactNode } from 'react';
import Toolbar from './Toolbar';
import SectionNav from './SectionNav';
import PreviewPane from './PreviewPane';

interface BuilderLayoutProps {
  children: ReactNode;
  previewHtml: string;
}

export default function BuilderLayout({ children, previewHtml }: BuilderLayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Top toolbar */}
      <Toolbar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: section nav + form */}
        <aside className="flex w-[380px] shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white">
          <SectionNav />
          <div className="border-t border-slate-100 px-4 py-4">
            {children}
          </div>
        </aside>

        {/* Preview pane */}
        <PreviewPane html={previewHtml} />
      </div>
    </div>
  );
}
