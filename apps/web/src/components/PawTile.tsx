type PawTileProps = {
  tone?: 'coral' | 'peach' | 'sage' | 'sand' | 'ink';
  label?: string;
  className?: string;
};

const TONES: Record<string, { bg: string; paw: string }> = {
  coral: { bg: '#FBE4E1', paw: '#EE7B6E' },
  peach: { bg: '#FBE9D7', paw: '#F0A857' },
  sage: { bg: '#E7EFE4', paw: '#8AA37B' },
  sand: { bg: '#F1EDE6', paw: '#C7A97A' },
  ink: { bg: '#E9E9E9', paw: '#1B1B1B' },
};

/**
 * Stand-in artwork for real photography. Swap the <PawTile /> usages below
 * for <img src="/assets/..." /> once real pet & product photos are dropped
 * into src/assets.
 */
export default function PawTile({ tone = 'sand', label, className = '' }: PawTileProps) {
  const { bg, paw } = TONES[tone];
  return (
    <div className={`paw-tile ${className}`} style={{ background: bg }} aria-hidden={label ? undefined : true}>
      <svg viewBox="0 0 64 64" className="paw-tile__icon" style={{ fill: paw }}>
        <ellipse cx="32" cy="40" rx="15" ry="12" />
        <ellipse cx="14" cy="24" rx="6" ry="8" />
        <ellipse cx="27" cy="14" rx="6.5" ry="8.5" />
        <ellipse cx="41" cy="14" rx="6.5" ry="8.5" />
        <ellipse cx="52" cy="26" rx="6" ry="8" />
      </svg>
      {label && <span className="paw-tile__label">{label}</span>}
    </div>
  );
}
