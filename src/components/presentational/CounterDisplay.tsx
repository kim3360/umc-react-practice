/**
 * Presentational Component (SRP: 표시만 담당)
 * - 비즈니스 로직 없음, props로 받은 값만 렌더링
 */
interface CounterDisplayProps {
  count: number;
  label?: string;
}

export function CounterDisplay({ count, label = 'Count' }: CounterDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-4xl font-bold tabular-nums" data-testid="counter-value">{count}</span>
    </div>
  );
}
