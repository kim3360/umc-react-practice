import type { ReactNode } from 'react';
import { TabsProvider, useTabsContext } from './TabsContext';

/**
 * Compound Component 패턴
 * - Tabs.Root: 상태 공유 범위 제공
 * - Tabs.List / Tab / Panel: 함께 사용되며 내부 상태 공유
 * - 유연한 마크업 + 암시적 상태 공유
 */

interface RootProps {
  defaultValue: string;
  children: ReactNode;
}

function Root({ defaultValue, children }: RootProps) {
  return <TabsProvider defaultValue={defaultValue}>{children}</TabsProvider>;
}

function List({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-1 mb-4 pb-2 border-b border-slate-200 dark:border-white/10" role="tablist">
      {children}
    </div>
  );
}

interface TabProps {
  value: string;
  children: ReactNode;
}

function Tab({ value, children }: TabProps) {
  const { activeId, setActiveId } = useTabsContext();
  const isActive = activeId === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={`py-2 px-4 rounded-lg border-none bg-transparent text-slate-500 cursor-pointer transition-colors hover:text-inherit hover:bg-slate-100 dark:hover:bg-white/5 ${
        isActive ? 'text-indigo-500 font-semibold bg-indigo-500/10' : ''
      }`}
      onClick={() => setActiveId(value)}
    >
      {children}
    </button>
  );
}

interface PanelProps {
  value: string;
  children: ReactNode;
}

function Panel({ value, children }: PanelProps) {
  const { activeId } = useTabsContext();
  if (activeId !== value) return null;
  return (
    <div role="tabpanel" className="min-h-[120px]">
      {children}
    </div>
  );
}

export const Tabs = {
  Root,
  List,
  Tab,
  Panel,
};
