import { useState } from 'react';
import { RatingDisplay, StarButton } from '../presentational';

/**
 * Container Component (SRP: 평점 상태/로직만 담당)
 * - 상태 관리, 이벤트 핸들러 보유
 * - Presentational 컴포넌트를 조합해 UI에 전달
 */
interface RatingContainerProps {
  max?: number;
}

export function RatingContainer({ max: maxStars = 5 }: RatingContainerProps) {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <RatingDisplay value={rating} max={maxStars} />
      <div className="flex gap-1.5" role="group" aria-label="평점 선택">
        {Array.from({ length: maxStars }, (_, i) => i + 1).map((value) => (
          <StarButton
            key={value}
            value={value}
            filled={value <= rating}
            onClick={() => setRating(value)}
          />
        ))}
      </div>
      <button
        type="button"
        className="text-sm py-1.5 px-3 rounded-lg border border-white/20 dark:border-white/20 bg-transparent text-slate-500 cursor-pointer transition-colors hover:text-inherit hover:border-inherit"
        onClick={() => setRating(0)}
      >
        초기화
      </button>
    </div>
  );
}
