'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Link } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  /** Compact mode for use inside repeater lists */
  compact?: boolean;
}

type UploadStatus = 'idle' | 'uploading' | 'error';

export default function ImageUpload({
  value,
  onChange,
  label,
  placeholder = 'Upload image or paste URL',
  compact = false,
}: ImageUploadProps) {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const uploadFile = useCallback(async (file: File) => {
    // Validate client-side
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setStatus('error');
      setErrorMsg('Invalid type. Use PNG, JPG, GIF, SVG, or WebP.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus('error');
      setErrorMsg('File too large (max 10MB).');
      return;
    }

    // Show instant local preview
    const preview = URL.createObjectURL(file);
    setLocalPreview(preview);
    setStatus('uploading');
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/hubspot/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Upload failed (${res.status})`);
      }

      const data = await res.json();
      onChange(data.url);
      setLocalPreview(null);
      URL.revokeObjectURL(preview);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Upload failed');
      // Keep local preview so user can see what they tried to upload
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // Reset so the same file can be re-selected
    e.target.value = '';
  }, [uploadFile]);

  const handleClear = useCallback(() => {
    onChange('');
    setLocalPreview(null);
    setStatus('idle');
    setErrorMsg('');
  }, [onChange]);

  const displayUrl = localPreview || value;
  const hasImage = !!displayUrl;

  // ---- Compact variant (for inside repeater items) ----
  if (compact) {
    return (
      <div className="space-y-1">
        {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
        <div className="flex items-center gap-2">
          {hasImage ? (
            <div className="relative h-10 w-10 shrink-0 rounded border border-slate-200 overflow-hidden bg-slate-50">
              <img src={displayUrl} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={handleClear}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs leading-none hover:bg-red-600"
              >
                <X size={10} />
              </button>
            </div>
          ) : null}

          <div className="flex-1 flex items-center gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={status === 'uploading'}
              className="px-2 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 disabled:opacity-50 flex items-center gap-1"
            >
              <Upload size={12} />
              {status === 'uploading' ? 'Uploading...' : 'Upload'}
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-2 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 flex items-center gap-1"
            >
              <Link size={12} />
              URL
            </button>
          </div>
        </div>

        {showUrlInput && (
          <input
            type="text"
            value={value}
            onChange={(e) => { onChange(e.target.value); setLocalPreview(null); }}
            placeholder="https://example.com/image.png"
            className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )}

        {status === 'error' && (
          <p className="text-xs text-red-500">{errorMsg}</p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif,image/svg+xml,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  }

  // ---- Full variant (standalone image fields) ----
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}

      {/* Preview / Drop Zone */}
      {hasImage ? (
        <div className="relative group rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
          <img
            src={displayUrl}
            alt="Preview"
            className="w-full h-40 object-contain"
          />
          {status === 'uploading' && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                Uploading to HubSpot...
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white rounded-full p-1.5 shadow-md hover:bg-slate-100 border border-slate-200"
              title="Replace image"
            >
              <Upload size={14} className="text-slate-600" />
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 border border-slate-200"
              title="Remove image"
            >
              <X size={14} className="text-red-500" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed
            cursor-pointer transition-colors py-8 px-4
            ${dragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
            }
            ${status === 'uploading' ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          {status === 'uploading' ? (
            <>
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-blue-600 font-medium">Uploading to HubSpot...</span>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                <ImageIcon size={20} className="text-slate-500" />
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-blue-600">Click to upload</span>
                <span className="text-sm text-slate-500"> or drag and drop</span>
              </div>
              <span className="text-xs text-slate-400">PNG, JPG, GIF, SVG, WebP up to 10MB</span>
            </>
          )}
        </div>
      )}

      {/* Error message */}
      {status === 'error' && (
        <p className="text-xs text-red-500">{errorMsg}</p>
      )}

      {/* URL fallback toggle */}
      <button
        type="button"
        onClick={() => setShowUrlInput(!showUrlInput)}
        className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1"
      >
        <Link size={12} />
        {showUrlInput ? 'Hide URL input' : 'Or paste image URL'}
      </button>

      {showUrlInput && (
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setLocalPreview(null); }}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif,image/svg+xml,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
