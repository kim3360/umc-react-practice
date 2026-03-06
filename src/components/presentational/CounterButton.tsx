/**
 * Presentational Component (SRP: 버튼 UI만 담당)
 * - 클릭 시 동작은 부모가 전달한 onClick에 위임
 */
interface CounterButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function CounterButton({
  label,
  onClick,
  variant = 'primary',
}: CounterButtonProps) {
  const base = "min-w-16 py-2 px-4 rounded-lg border text-sm font-medium cursor-pointer transition-colors";
  const variants = {
    primary: "bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600 hover:border-indigo-600",
    secondary: "bg-transparent text-inherit border-white/20 dark:border-white/20",
  };
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
