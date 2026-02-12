'use client';

import { useState, useEffect } from 'react';
import { X, Code2, Rocket, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePageStore } from '@/store/pageStore';

interface DeployResult {
  success: boolean;
  pageId?: string;
  error?: string;
}

interface DeployDialogProps {
  open: boolean;
  onClose: () => void;
  headHtml: string;
  footerHtml: string;
  onDeploy: (action: 'draft' | 'publish', targetPageId?: string) => Promise<void>;
  deployResult: DeployResult | null;
}

type Tab = 'preview' | 'deploy';
type DeployMode = 'create' | 'update';

export default function DeployDialog({
  open,
  onClose,
  headHtml,
  footerHtml,
  onDeploy,
  deployResult,
}: DeployDialogProps) {
  const [activeTab, setActiveTab] = useState<Tab>('preview');
  const [deployMode, setDeployMode] = useState<DeployMode>('create');
  const [existingPageId, setExistingPageId] = useState('');
  const isDeploying = usePageStore((s) => s.isDeploying);

  const pageName = usePageStore((s) => s.pageName);
  const pageSlug = usePageStore((s) => s.pageSlug);
  const updatePageMeta = usePageStore((s) => s.updatePageMeta);

  // Reset result when dialog closes
  useEffect(() => {
    if (!open) {
      setActiveTab('preview');
    }
  }, [open]);

  if (!open) return null;

  const handleDeploy = async (action: 'draft' | 'publish') => {
    const targetPageId = deployMode === 'update' ? existingPageId : undefined;
    await onDeploy(action, targetPageId);
  };

  const canDeploy =
    pageName.trim().length > 0 &&
    pageSlug.trim().length > 0 &&
    (deployMode === 'create' || existingPageId.trim().length > 0);

  const tabs: { key: Tab; label: string; icon: typeof Code2 }[] = [
    { key: 'preview', label: 'Preview Code', icon: Code2 },
    { key: 'deploy', label: 'Deploy', icon: Rocket },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Dialog */}
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Deploy to HubSpot</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-slate-200 px-6">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {activeTab === 'preview' ? (
            <div className="flex flex-col gap-5">
              {/* Head HTML */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">
                  Head HTML (CSS)
                </label>
                <textarea
                  readOnly
                  value={headHtml}
                  className="h-48 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-600 focus:outline-none"
                  onFocus={(e) => e.target.select()}
                />
              </div>

              {/* Footer HTML */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">
                  Footer HTML (Content + JS)
                </label>
                <textarea
                  readOnly
                  value={footerHtml}
                  className="h-48 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-600 focus:outline-none"
                  onFocus={(e) => e.target.select()}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Page name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Page Name</label>
                <input
                  type="text"
                  value={pageName}
                  onChange={(e) => updatePageMeta({ pageName: e.target.value })}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="My Landing Page"
                />
              </div>

              {/* Page slug */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Page Slug</label>
                <input
                  type="text"
                  value={pageSlug}
                  onChange={(e) => updatePageMeta({ pageSlug: e.target.value })}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="direct-booking-website"
                />
              </div>

              {/* Create / Update toggle */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Deploy Mode</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDeployMode('create')}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      deployMode === 'create'
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Create New Page
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeployMode('update')}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      deployMode === 'update'
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    Update Existing
                  </button>
                </div>
              </div>

              {/* Existing page ID (only when update mode) */}
              {deployMode === 'update' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    HubSpot Page ID
                  </label>
                  <input
                    type="text"
                    value={existingPageId}
                    onChange={(e) => setExistingPageId(e.target.value)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    placeholder="206990986552"
                  />
                </div>
              )}

              {/* Result feedback */}
              {deployResult && (
                <div
                  className={`flex items-start gap-3 rounded-lg border p-3 ${
                    deployResult.success
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  {deployResult.success ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-600" />
                  ) : (
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
                  )}
                  <div className="text-sm">
                    {deployResult.success ? (
                      <>
                        <p className="font-medium text-green-800">Deployed successfully!</p>
                        {deployResult.pageId && (
                          <p className="mt-1 text-green-700">
                            Page ID:{' '}
                            <code className="rounded bg-green-100 px-1.5 py-0.5 font-mono text-xs">
                              {deployResult.pageId}
                            </code>
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="font-medium text-red-800">Deploy failed</p>
                        <p className="mt-1 text-red-700">{deployResult.error}</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  disabled={isDeploying || !canDeploy}
                  onClick={() => handleDeploy('draft')}
                  className="flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  {isDeploying ? <Loader2 size={15} className="animate-spin" /> : null}
                  Save as Draft
                </button>
                <button
                  type="button"
                  disabled={isDeploying || !canDeploy}
                  onClick={() => handleDeploy('publish')}
                  className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(90.37deg, #3963E7 8.45%, #543CE8 98.1%)',
                  }}
                >
                  {isDeploying ? <Loader2 size={15} className="animate-spin" /> : <Rocket size={15} />}
                  Publish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
