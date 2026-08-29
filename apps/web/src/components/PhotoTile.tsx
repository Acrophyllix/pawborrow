import { useState } from 'react';
import PawTile from './PawTile';

type PhotoTileProps = {
  src: string;
  alt: string;
  tone?: 'coral' | 'peach' | 'sage' | 'sand' | 'ink';
  className?: string;
};

/**
 * Renders a real photo from /public/images. If the file doesn't exist yet
 * (or fails to load), it falls back to the illustrated PawTile so the layout
 * never breaks while you're still adding photos.
 */
export default function PhotoTile({ src, alt, tone = 'sand', className = '' }: PhotoTileProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <PawTile tone={tone} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`photo-tile ${className}`}
      onError={() => setFailed(true)}
    />
  );
}