import { useState } from 'react';
import { CounterDisplay, CounterButton } from '../presentational';

/**
 * Container Component (SRP: 카운터 상태/로직만 담당)
 * - 상태 관리, 이벤트 핸들러 보유
 * - Presentational 컴포넌트를 조합해 UI에 전달
 */
export function CounterContainer() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount((c) => c + 1);
  const handleDecrement = () => setCount((c) => c - 1);
  const handleReset = () => setCount(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <CounterDisplay count={count} label="값" />
      <div className="flex gap-2 flex-wrap justify-center">
        <CounterButton label="-1" onClick={handleDecrement} variant="secondary" />
        <CounterButton label="+1" onClick={handleIncrement} />
        <CounterButton label="Reset" onClick={handleReset} variant="secondary" />
      </div>
    </div>
  );
}
