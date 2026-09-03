interface Props {
  label: string;
  className?: string;
}

export default function PawPlaceholder({ label, className }: Props) {
  return (
    <div className={`paw-placeholder ${className ?? ""}`}>
      <span>{label}</span>
    </div>
  );
}