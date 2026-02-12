'use client';

import { useEffect, useRef } from 'react';
import { usePageStore } from '@/store/pageStore';

interface PreviewPaneProps {
  html: string;
}

const DEVICE_WIDTHS = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
} as const;

export default function PreviewPane({ html }: PreviewPaneProps) {
  const previewDevice = usePageStore((s) => s.previewDevice);
  const width = DEVICE_WIDTHS[previewDevice];
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Write HTML directly to iframe document to ensure updates are reflected
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !html) return;

    const doc = iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [html]);

  return (
    <div className="flex h-full flex-1 items-start justify-center overflow-auto bg-slate-100 p-6">
      <iframe
        ref={iframeRef}
        title="Page preview"
        className="h-full rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300"
        style={{
          width,
          maxWidth: '100%',
        }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
