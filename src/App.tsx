import { useState } from 'react';
import { Week01, Week02, Week03, Week04, Week05, Week06, Week07, Week08, Week09, Week10 } from './pages';

const WEEKS = [
  { id: 'week01', label: 'Week 01', Component: Week01 },
  { id: 'week02', label: 'Week 02', Component: Week02 },
  { id: 'week03', label: 'Week 03', Component: Week03 },
  { id: 'week04', label: 'Week 04', Component: Week04 },
  { id: 'week05', label: 'Week 05', Component: Week05 },
  { id: 'week06', label: 'Week 06', Component: Week06 },
  { id: 'week07', label: 'Week 07', Component: Week07 },
  { id: 'week08', label: 'Week 08', Component: Week08 },
  { id: 'week09', label: 'Week 09', Component: Week09 },
  { id: 'week10', label: 'Week 10', Component: Week10 },
] as const;

function App() {
  const [selectedWeek, setSelectedWeek] = useState<string>('week01');
  const current = WEEKS.find((w) => w.id === selectedWeek) ?? WEEKS[0];
  const PageComponent = current.Component;

  return (
    <div className="flex min-h-screen">
      <aside className="w-[200px] shrink-0 py-6 pr-0 bg-slate-50 dark:bg-white/[0.03] border-r border-slate-200 dark:border-white/10">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 m-0 mb-4 ml-4">카테고리</h2>
        <nav className="flex flex-col gap-1">
          {WEEKS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`w-full py-2 px-4 text-sm text-left border-none bg-transparent text-slate-500 cursor-pointer transition-colors duration-150 border-l-[3px] border-l-transparent hover:text-inherit hover:bg-slate-100 dark:hover:bg-white/5 ${
                selectedWeek === id
                  ? '!text-indigo-500 font-semibold bg-indigo-500/10 dark:bg-indigo-500/10 border-l-indigo-500'
                  : ''
              }`}
              onClick={() => setSelectedWeek(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <PageComponent />
      </main>
    </div>
  );
}

export default App;
