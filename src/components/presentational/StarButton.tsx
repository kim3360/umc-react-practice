/**
 * Presentational Component (SRP: 별 버튼 UI만 담당)
 * - 클릭 시 동작은 부모가 전달한 onClick에 위임
 */
interface StarButtonProps {
  value: number;
  filled: boolean;
  onClick: () => void;
}

export function StarButton({ value, filled, onClick }: StarButtonProps) {
  return (
    <button
      type="button"
      className={`w-10 h-10 p-0 text-2xl border-none bg-transparent cursor-pointer transition-all duration-150 hover:scale-110 text-white/25 dark:text-white/25 ${
        filled ? 'text-amber-400 dark:text-amber-400' : 'text-slate-200 dark:text-slate-200'
      }`}
      onClick={onClick}
      aria-label={`${value}점`}
    >
      ★
    </button>
  );
}
