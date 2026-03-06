import { createContext, useContext, useState, type ReactNode } from 'react';

interface TabsContextValue {
  activeId: string;
  setActiveId: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be used within Tabs.Root');
  return ctx;
}

interface TabsProviderProps {
  defaultValue: string;
  children: ReactNode;
}

export function TabsProvider({ defaultValue, children }: TabsProviderProps) {
  const [activeId, setActiveId] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </TabsContext.Provider>
  );
}
