import { createContext, useContext, useState, type ReactNode } from 'react';

interface AccordionContextValue {
  openId: string | null;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion compound components must be used within Accordion.Root');
  return ctx;
}

interface AccordionProviderProps {
  defaultValue?: string | null;
  children: ReactNode;
}

export function AccordionProvider({ defaultValue = null, children }: AccordionProviderProps) {
  const [openId, setOpenId] = useState<string | null>(defaultValue);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <AccordionContext.Provider value={{ openId, toggle }}>
      {children}
    </AccordionContext.Provider>
  );
}
