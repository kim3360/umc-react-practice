/**
 * Presentational (SRP: 라벨만 표시)
 */
interface InfoLabelProps {
  text: string;
}

export function InfoLabel({ text }: InfoLabelProps) {
  return <span className="text-xs text-slate-500 uppercase tracking-wider">{text}</span>;
}
