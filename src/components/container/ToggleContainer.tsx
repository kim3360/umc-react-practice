import { useState } from 'react';
import { ToggleSwitch } from '../presentational/ToggleSwitch';

/**
 * Container Component (SRP: 토글 상태/로직만 담당)
 * - 상태 관리, 이벤트 핸들러 보유
 * - Presentational 컴포넌트에 props로 전달
 */
export function ToggleContainer() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleSwitch isOn={isOn} onToggle={() => setIsOn((prev) => !prev)} />
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {isOn ? '켜짐' : '꺼짐'}
      </span>
    </div>
  );
}
