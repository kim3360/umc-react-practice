/**
 * Presentational Component (SRP: 토글 UI만 담당)
 * - isOn, onToggle을 props로 받아 표시/동작
 */
interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({ isOn, onToggle }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={onToggle}
      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
        isOn
          ? 'border-indigo-500 bg-indigo-500'
          : 'border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition ${
          isOn ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
      <span className="sr-only">{isOn ? '켜짐' : '꺼짐'}</span>
    </button>
  );
}
