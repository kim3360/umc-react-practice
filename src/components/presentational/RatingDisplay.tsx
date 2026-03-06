/**
 * Presentational Component (SRP: 평점 표시만 담당)
 * - 비즈니스 로직 없음, props로 받은 값만 렌더링
 */
interface RatingDisplayProps {
  value: number;
  max?: number;
  label?: string;
}

export function RatingDisplay({
  value,
  max = 5,
  label = '선택한 평점',
}: RatingDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-2xl font-bold tabular-nums text-indigo-500" data-testid="rating-value">
        {value} / {max}
      </span>
    </div>
  );
}
