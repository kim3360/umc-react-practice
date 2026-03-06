/**
 * Presentational (SRP: 값만 표시)
 */
interface InfoValueProps {
  text: string;
}

export function InfoValue({ text }: InfoValueProps) {
  return <span className="text-lg font-semibold">{text}</span>;
}
