import type { ReactNode } from 'react';
import { AccordionProvider, useAccordionContext } from './AccordionContext';

/**
 * Compound Component 패턴 - Accordion
 * - Root: 상태 공유 범위
 * - Item / Trigger / Panel: 함께 사용, 내부 상태 공유
 */

interface RootProps {
  defaultValue?: string | null;
  children: ReactNode;
}

function Root({ defaultValue = null, children }: RootProps) {
  return <AccordionProvider defaultValue={defaultValue}>{children}</AccordionProvider>;
}

interface ItemProps {
  value: string;
  children: ReactNode;
}

function Item({ value, children }: ItemProps) {
  return <div className="border-b border-white/10 last:border-b-0" data-value={value}>{children}</div>;
}

interface TriggerProps {
  value: string;
  children: ReactNode;
}

function Trigger({ value, children }: TriggerProps) {
  const { openId, toggle } = useAccordionContext();
  const isOpen = openId === value;

  return (
    <button
      type="button"
      className={`w-full flex items-center justify-between py-4 text-[0.95rem] font-medium text-left border-none bg-transparent cursor-pointer transition-colors hover:bg-white/5 ${
        isOpen ? 'font-semibold text-indigo-500' : ''
      }`}
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      <span className={`text-xl font-light ${isOpen ? 'text-indigo-500' : 'text-slate-500'}`} aria-hidden>{isOpen ? '−' : '+'}</span>
    </button>
  );
}

interface PanelProps {
  value: string;
  children: ReactNode;
}

function Panel({ value, children }: PanelProps) {
  const { openId } = useAccordionContext();
  if (openId !== value) return null;

  return (
    <div className="pb-4" role="region">
      {children}
    </div>
  );
}

export const Accordion = {
  Root,
  Item,
  Trigger,
  Panel,
};
