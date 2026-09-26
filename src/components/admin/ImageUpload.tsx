'use client';

import { useState, useRef, useCallback } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image', className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'upload' | 'url'>(value && value.startsWith('http') ? 'url' : 'upload');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (file: File) => {
    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok) {
        onChange(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch {
      setError('Upload failed. Try again.');
    }

    setUploading(false);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }, [upload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-text-secondary">{label}</label>
        <div className="flex gap-1">
          <button type="button" onClick={() => setMode('upload')}
            className={`text-[10px] font-bold px-2 py-0.5 rounded ${mode === 'upload' ? 'bg-text-primary text-white' : 'text-text-secondary'}`}>
            Upload
          </button>
          <button type="button" onClick={() => setMode('url')}
            className={`text-[10px] font-bold px-2 py-0.5 rounded ${mode === 'url' ? 'bg-text-primary text-white' : 'text-text-secondary'}`}>
            URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            dragOver ? 'border-accent bg-accent/5' : 'border-border hover:border-border-hover'
          } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          {uploading ? (
            <p className="text-sm text-text-secondary">Uploading...</p>
          ) : (
            <>
              <p className="text-2xl mb-2">📸</p>
              <p className="text-sm text-text-secondary font-medium">Drop image here or click to browse</p>
              <p className="text-[10px] text-text-secondary/50 mt-1">JPG, PNG, WebP, GIF · Max 10MB</p>
            </>
          )}
        </div>
      ) : (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      )}

      {error && <p className="text-red-500 text-xs font-bold mt-2">{error}</p>}

      {/* Preview */}
      {value && (
        <div className="mt-3 relative group">
          <img src={value} alt="Preview" className="w-full max-h-48 object-cover rounded-lg border border-border" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
