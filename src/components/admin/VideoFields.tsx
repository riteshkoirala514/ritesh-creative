'use client';

interface VideoMeta {
  url: string;
  duration?: string;
  platform?: string;
}

interface VideoFieldsProps {
  value: VideoMeta;
  onChange: (video: VideoMeta) => void;
}

function detectPlatform(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('vimeo.com')) return 'vimeo';
  return 'self';
}

function getThumbUrl(url: string, platform: string): string | null {
  if (platform === 'youtube') {
    const id = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1];
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return null;
}

export default function VideoFields({ value, onChange }: VideoFieldsProps) {
  const platform = value.platform || detectPlatform(value.url || '');
  const thumb = getThumbUrl(value.url || '', platform);

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-text-secondary block">Video</label>

      <div>
        <label className="text-[10px] text-text-secondary mb-1 block">Video URL</label>
        <input
          value={value.url || ''}
          onChange={(e) => {
            const url = e.target.value;
            onChange({ ...value, url, platform: detectPlatform(url) });
          }}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-text-secondary mb-1 block">Platform</label>
          <select
            value={platform}
            onChange={(e) => onChange({ ...value, platform: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm"
          >
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="self">Self-hosted</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] text-text-secondary mb-1 block">Duration</label>
          <input
            value={value.duration || ''}
            onChange={(e) => onChange({ ...value, duration: e.target.value })}
            placeholder="8:42"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Preview */}
      {thumb && (
        <div className="mt-2">
          <img src={thumb} alt="Video thumbnail" className="w-full max-h-40 object-cover rounded-lg border border-border" />
        </div>
      )}
    </div>
  );
}
