'use client';

import { useState, useRef } from 'react';

interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface GalleryBuilderProps {
  value: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
}

export default function GalleryBuilder({ value, onChange }: GalleryBuilderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if (res.ok) {
      const data = await res.json();
      return data.url;
    }
    return null;
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    const newImages: GalleryImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const url = await uploadFile(files[i]);
      if (url) {
        newImages.push({ src: url, alt: '', caption: '' });
      }
    }

    onChange([...value, ...newImages]);
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const updateImage = (index: number, field: keyof GalleryImage, val: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const updated = [...value];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    onChange(updated);
  };

  return (
    <div>
      <label className="text-xs font-bold text-text-secondary mb-2 block">Gallery Images ({value.length})</label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all border-border hover:border-accent/40 ${uploading ? 'opacity-50' : ''}`}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple onChange={(e) => e.target.files && handleFiles(e.target.files)} className="hidden" />
        {uploading ? (
          <p className="text-sm text-text-secondary">Uploading...</p>
        ) : (
          <>
            <p className="text-2xl mb-1">🖼️</p>
            <p className="text-sm text-text-secondary font-medium">Drop images or click to add</p>
            <p className="text-[10px] text-text-secondary/50 mt-1">You can select multiple files</p>
          </>
        )}
      </div>

      {/* Image list */}
      {value.length > 0 && (
        <div className="space-y-3 mt-4">
          {value.map((img, i) => (
            <div key={i} className="flex gap-3 p-3 bg-white rounded-xl border border-border">
              <img src={img.src} alt={img.alt || ''} className="w-20 h-20 object-cover rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <input
                  value={img.caption || ''}
                  onChange={(e) => updateImage(i, 'caption', e.target.value)}
                  placeholder="Caption"
                  className="w-full px-2 py-1 border border-border rounded text-xs focus:outline-none"
                />
                <input
                  value={img.alt || ''}
                  onChange={(e) => updateImage(i, 'alt', e.target.value)}
                  placeholder="Alt text"
                  className="w-full px-2 py-1 border border-border rounded text-xs focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button type="button" onClick={() => moveImage(i, i - 1)} className="text-text-secondary/40 hover:text-text-primary text-xs" disabled={i === 0}>↑</button>
                <button type="button" onClick={() => moveImage(i, i + 1)} className="text-text-secondary/40 hover:text-text-primary text-xs" disabled={i === value.length - 1}>↓</button>
                <button type="button" onClick={() => removeImage(i)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
