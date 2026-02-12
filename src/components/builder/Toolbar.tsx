'use client';

import { Monitor, Tablet, Smartphone, Download, Rocket } from 'lucide-react';
import { usePageStore } from '@/store/pageStore';
import { PreviewDevice } from '@/lib/types';

const DEVICE_OPTIONS: { device: PreviewDevice; icon: typeof Monitor; label: string }[] = [
  { device: 'desktop', icon: Monitor, label: 'Desktop' },
  { device: 'tablet', icon: Tablet, label: 'Tablet' },
  { device: 'mobile', icon: Smartphone, label: 'Mobile' },
];

export default function Toolbar() {
  const pageName = usePageStore((s) => s.pageName);
  const previewDevice = usePageStore((s) => s.previewDevice);
  const updatePageMeta = usePageStore((s) => s.updatePageMeta);
  const setPreviewDevice = usePageStore((s) => s.setPreviewDevice);
  const setShowDeployDialog = usePageStore((s) => s.setShowDeployDialog);
  const getPageData = usePageStore((s) => s.getPageData);

  function handleExportJson() {
    const data = getPageData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.pageSlug || 'landing-page'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex h-14 items-center gap-4 border-b border-slate-200 bg-white px-4">
      {/* Page name input */}
      <input
        type="text"
        value={pageName}
        onChange={(e) => updatePageMeta({ pageName: e.target.value })}
        className="h-8 w-56 rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="Page name..."
      />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Device toggle */}
      <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
        {DEVICE_OPTIONS.map(({ device, icon: Icon, label }) => (
          <button
            key={device}
            type="button"
            title={label}
            onClick={() => setPreviewDevice(device)}
            className={`rounded-md p-1.5 transition-colors ${
              previewDevice === device
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      {/* Export JSON */}
      <button
        type="button"
        onClick={handleExportJson}
        className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
      >
        <Download size={15} />
        Export JSON
      </button>

      {/* Deploy to HubSpot */}
      <button
        type="button"
        onClick={() => setShowDeployDialog(true)}
        className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{
          background: 'linear-gradient(90.37deg, #3963E7 8.45%, #543CE8 98.1%)',
        }}
      >
        <Rocket size={15} />
        Deploy to HubSpot
      </button>
    </div>
  );
}
