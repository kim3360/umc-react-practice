import {
  useState,
  useReducer,
  createContext,
  useContext,
  useCallback,
} from "react";
import { CodeEditor } from "../components/CodeEditor";

// —— 데모용: 로직/UI 분리 (useCounter + Presentational) ——
function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  const increment = useCallback(() => setCount((c) => c + step), [step]);
  const decrement = useCallback(() => setCount((c) => c - step), [step]);
  const reset = useCallback(() => setCount(initial), [initial]);
  return { count, increment, decrement, reset };
}

function CounterView({
  count,
  onIncrement,
  onDecrement,
  onReset,
}: {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap min-h-[52px]">
      <button
        type="button"
        className="py-2 px-4 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 font-medium transition-colors"
        onClick={onDecrement}
      >
        −
      </button>
      <span className="min-w-[3rem] text-center text-lg font-bold tabular-nums">
        {count}
      </span>
      <button
        type="button"
        className="py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors"
        onClick={onIncrement}
      >
        +
      </button>
      <button
        type="button"
        className="py-2 px-3 rounded-lg border border-slate-300 dark:border-white/20 text-sm hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
        onClick={onReset}
      >
        초기화
      </button>
    </div>
  );
}

// —— 데모용: useReducer + Context ——
type CounterState = { count: number };
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" };
function counterReducer(
  state: CounterState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

const CounterContext = createContext<{
  state: CounterState;
  dispatch: React.Dispatch<CounterAction>;
} | null>(null);

function CounterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

function useCounterContext() {
  const ctx = useContext(CounterContext);
  if (!ctx) throw new Error("CounterProvider 안에서 사용하세요");
  return ctx;
}

function ContextCounterDisplay() {
  const { state } = useCounterContext();
  return (
    <span className="min-w-[3rem] text-center text-lg font-bold tabular-nums">
      {state.count}
    </span>
  );
}

function ContextCounterButtons({ children }: { children?: React.ReactNode }) {
  const { dispatch } = useCounterContext();
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        type="button"
        className="py-2 px-4 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 font-medium"
        onClick={() => dispatch({ type: "DECREMENT" })}
      >
        −
      </button>
      {children}
      <button
        type="button"
        className="py-2 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium"
        onClick={() => dispatch({ type: "INCREMENT" })}
      >
        +
      </button>
      <button
        type="button"
        className="py-2 px-3 rounded-lg border border-slate-300 dark:border-white/20 text-sm"
        onClick={() => dispatch({ type: "RESET" })}
      >
        초기화
      </button>
    </div>
  );
}

// —— 데모용: 훅 합성 (useToggle + useCounter) ——
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((prev) => !prev), []);
  return { on, toggle, setOn };
}

function useCounterWithToggle(initialCount = 0) {
  const counter = useCounter(initialCount);
  const toggle = useToggle(false);
  return {
    ...counter,
    isVisible: toggle.on,
    toggleVisibility: toggle.toggle,
  };
}

// ——— 코드 에디터 스타터 ———
const STEP1_LOGIC_UI_STARTER = `// 로직: 커스텀 훅 (상태 + 액션)
function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  const reset = () => setCount(initial);
  return { count, increment, decrement, reset };
}

// UI: Presentational (props만 받아서 렌더)
function CounterView({ count, onIncrement, onDecrement, onReset }) {
  return (
    <div>
      <button onClick={onDecrement}>−</button>
      <span>{count}</span>
      <button onClick={onIncrement}>+</button>
      <button onClick={onReset}>초기화</button>
    </div>
  );
}

// 사용: 로직은 훅, UI는 컴포넌트
function Page() {
  const { count, increment, decrement, reset } = useCounter(0);
  return (
    <CounterView
      count={count}
      onIncrement={increment}
      onDecrement={decrement}
      onReset={reset}
    />
  );
}`;

const STEP2_REDUCER_CONTEXT_STARTER = `// 1. reducer: 상태 변경 로직 한곳에
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'RESET': return { count: 0 };
    default: return state;
  }
}

// 2. Context: state + dispatch 공유
const CounterContext = createContext(null);
function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

// 3. 훅으로 안전하게 사용
function useCounterContext() {
  const ctx = useContext(CounterContext);
  if (!ctx) throw new Error('CounterProvider 안에서 사용하세요');
  return ctx;
}

// 4. 자식들은 각자 dispatch만 사용
function CountDisplay() {
  const { state } = useCounterContext();
  return <span>{state.count}</span>;
}
function CountButtons() {
  const { dispatch } = useCounterContext();
  return (
    <>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>−</button>
    </>
  );
}`;

const STEP3_HOOK_COMPOSITION_STARTER = `// 작은 훅들을 합성해서 더 큰 훅 만들기
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn(prev => !prev);
  return { on, toggle, setOn };
}

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const inc = () => setCount(c => c + 1);
  const dec = () => setCount(c => c - 1);
  return { count, inc, dec };
}

// 합성: 두 훅을 조합
function useCounterWithVisibility(initialCount = 0) {
  const counter = useCounter(initialCount);
  const visibility = useToggle(false);
  return {
    ...counter,
    isVisible: visibility.on,
    toggleVisible: visibility.toggle,
  };
}

// 사용
function App() {
  const { count, inc, dec, isVisible, toggleVisible } = useCounterWithVisibility(0);
  return (
    <div>
      <button onClick={toggleVisible}>{isVisible ? '숨기기' : '보기'}</button>
      {isVisible && <><span>{count}</span><button onClick={inc}>+</button></>}
    </div>
  );
}`;

/**
 * Week02: 커스텀 훅과 책임 분리
 */
export function Week02() {
  const counterLogic = useCounter(0);
  const [code1, setCode1] = useState(STEP1_LOGIC_UI_STARTER);
  const [code2, setCode2] = useState(STEP2_REDUCER_CONTEXT_STARTER);
  const [code3, setCode3] = useState(STEP3_HOOK_COMPOSITION_STARTER);

  return (
    <div className="max-w-[900px] mx-auto p-4 min-h-screen">
      <header className="mb-10 text-center relative">
        <span className="inline-block py-1 px-3 text-xs font-semibold uppercase tracking-wider bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full mb-3">
          훅 &amp; 책임 분리
        </span>
        <h1 className="text-[1.75rem] font-bold m-0 mb-2 tracking-tight">
          커스텀 훅과 책임 분리
        </h1>
        <p className="m-0 text-slate-500 text-[0.95rem]">
          로직/UI 분리, useReducer + Context, 훅 합성, 훅 구조를 연습해보세요.
        </p>
      </header>

      <main className="flex flex-col gap-10">
        {/* 핵심 개념 */}
        <section className="flex flex-col gap-6 mb-2">
          <h2 className="text-[0.9rem] font-semibold text-slate-500 uppercase tracking-widest m-0 mb-1">
            핵심 개념
          </h2>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-inherit m-0">
              로직 / UI 분리
            </h3>
            <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5 transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10">
              <p className="text-[0.85rem] leading-relaxed text-slate-500 m-0">
                <strong className="text-inherit font-semibold">
                  커스텀 훅
                </strong>
                에 상태와 비즈니스 로직을 두고, 컴포넌트는{" "}
                <strong className="text-inherit font-semibold">
                  props만 받아서 렌더
                </strong>
                하는 Presentational 역할만 하면 테스트·재사용이 쉬워집니다.
              </p>
              <ul className="mt-3 pl-5 text-[0.85rem] leading-relaxed text-slate-500 list-disc">
                <li className="mb-1.5">
                  훅: useState, useEffect, 이벤트 핸들러 로직
                </li>
                <li className="mb-1.5">
                  UI: 훅이 반환한 값과 함수를 props로 전달받아 표시
                </li>
                <li>
                  한 컴포넌트에서 훅만 호출하고, 하위는 순수 Presentational로
                  유지
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-inherit m-0">
              useReducer + Context
            </h3>
            <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5 transition-all hover:border-emerald-500/30">
              <p className="text-[0.85rem] leading-relaxed text-slate-500 m-0">
                복잡한 상태를{" "}
                <strong className="text-inherit font-semibold">reducer</strong>
                로 한곳에서 관리하고,{" "}
                <strong className="text-inherit font-semibold">Context</strong>
                로 트리 깊은 곳까지 state와 dispatch를 공유합니다. Provider 안의
                컴포넌트는 useContext로만 접근해 props drilling을 줄입니다.
              </p>
              <ul className="mt-3 pl-5 text-[0.85rem] leading-relaxed text-slate-500 list-disc">
                <li className="mb-1.5">
                  reducer: (state, action) =&gt; newState 형태로 변경 로직 집약
                </li>
                <li className="mb-1.5">
                  Context.Provider에 value로 &#123; state, dispatch &#125; 전달
                </li>
                <li>useCounterContext 같은 훅으로 감싸서 사용하면 안전</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-inherit m-0">
              훅 합성 (Hook composition)
            </h3>
            <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5 transition-all hover:border-emerald-500/30">
              <p className="text-[0.85rem] leading-relaxed text-slate-500 m-0">
                <strong className="text-inherit font-semibold">작은 훅</strong>
                을 여러 개 만든 뒤, 새 훅 안에서 이들을 조합해 더 큰 기능을
                만드는 방식입니다. useCounter, useToggle 같은 단일 책임 훅을
                합성해 useCounterWithVisibility처럼 확장할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-inherit m-0">
              훅 구조 실습
            </h3>
            <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5 transition-all hover:border-emerald-500/30">
              <p className="text-[0.85rem] leading-relaxed text-slate-500 m-0">
                useState/useEffect/useCallback 등으로 "상태 + 부수효과 + 안정된
                참조"를 한 단위로 묶는 연습을 합니다. useLocalStorage,
                useDebounce 같은 훅을 직접 설계해 보면 훅 구조가 익숙해집니다.
              </p>
            </div>
          </div>
        </section>

        {/* 1단계: 로직/UI 분리 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[0.7rem] font-bold tracking-widest text-emerald-500 bg-emerald-500/10 py-1 px-2 rounded">
              1단계
            </span>
            <h2 className="text-[1.15rem] font-semibold m-0">로직 / UI 분리</h2>
          </div>
          <p className="m-0 text-[0.9rem] text-slate-500 leading-relaxed">
            <strong className="text-inherit font-semibold">useCounter</strong>{" "}
            훅이 count와 increment/decrement/reset을 담당하고,{" "}
            <strong className="text-inherit font-semibold">CounterView</strong>
            는 props만 받아서 버튼과 숫자를 그립니다.
            <span className="block mt-2 text-[0.85rem] text-emerald-500 font-medium">
              → 아래 카운터를 눌러보세요.
            </span>
          </p>
          <div className="mt-2 relative bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl pt-5 pb-6 px-6 border-l-4 border-l-emerald-500">
            <div className="absolute -top-2 left-4 text-[0.7rem] font-semibold text-emerald-500 uppercase tracking-wider bg-white dark:bg-[#242424] px-2 py-0.5 rounded">
              직접 해보기
            </div>
            <CounterView
              count={counterLogic.count}
              onIncrement={counterLogic.increment}
              onDecrement={counterLogic.decrement}
              onReset={counterLogic.reset}
            />
          </div>
          <div className="mt-3 bg-[#1e1e1e] rounded-lg overflow-hidden border border-white/10">
            <div className="flex items-center justify-between py-2 px-4 bg-black/30 border-b border-white/10">
              <span className="text-[0.8rem] text-slate-400 font-mono">
                useCounter + CounterView (로직/UI 분리)
              </span>
              <button
                type="button"
                className="text-[0.75rem] py-1 px-2 rounded border border-white/20 bg-transparent text-slate-400 cursor-pointer transition-colors hover:text-emerald-500 hover:border-emerald-500"
                onClick={() => setCode1(STEP1_LOGIC_UI_STARTER)}
              >
                초기화
              </button>
            </div>
            <CodeEditor
              value={code1}
              onChange={setCode1}
              placeholder="로직/UI 분리 코드를 작성해보세요..."
              minHeight="220px"
            />
          </div>
        </section>

        {/* 2단계: useReducer + Context */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[0.7rem] font-bold tracking-widest text-emerald-500 bg-emerald-500/10 py-1 px-2 rounded">
              2단계
            </span>
            <h2 className="text-[1.15rem] font-semibold m-0">
              useReducer + Context
            </h2>
          </div>
          <p className="m-0 text-[0.9rem] text-slate-500 leading-relaxed">
            Provider가{" "}
            <strong className="text-inherit font-semibold">reducer</strong>로
            상태를 관리하고, 자식 컴포넌트는{" "}
            <strong className="text-inherit font-semibold">
              useCounterContext
            </strong>
            로 state와 dispatch만 가져와 사용합니다.
          </p>
          <div className="mt-2 relative bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl pt-5 pb-6 px-6 border-l-4 border-l-emerald-500">
            <div className="absolute -top-2 left-4 text-[0.7rem] font-semibold text-emerald-500 uppercase tracking-wider bg-white dark:bg-[#242424] px-2 py-0.5 rounded">
              직접 해보기
            </div>
            <CounterProvider>
              <div className="flex items-center justify-center gap-3 flex-wrap min-h-[52px]">
                <ContextCounterButtons>
                  <ContextCounterDisplay />
                </ContextCounterButtons>
              </div>
            </CounterProvider>
          </div>
          <div className="mt-3 bg-[#1e1e1e] rounded-lg overflow-hidden border border-white/10">
            <div className="flex items-center justify-between py-2 px-4 bg-black/30 border-b border-white/10">
              <span className="text-[0.8rem] text-slate-400 font-mono">
                counterReducer + CounterContext
              </span>
              <button
                type="button"
                className="text-[0.75rem] py-1 px-2 rounded border border-white/20 bg-transparent text-slate-400 cursor-pointer transition-colors hover:text-emerald-500 hover:border-emerald-500"
                onClick={() => setCode2(STEP2_REDUCER_CONTEXT_STARTER)}
              >
                초기화
              </button>
            </div>
            <CodeEditor
              value={code2}
              onChange={setCode2}
              placeholder="useReducer + Context 코드..."
              minHeight="240px"
            />
          </div>
        </section>

        {/* 3단계: 훅 합성 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[0.7rem] font-bold tracking-widest text-emerald-500 bg-emerald-500/10 py-1 px-2 rounded">
              3단계
            </span>
            <h2 className="text-[1.15rem] font-semibold m-0">훅 합성</h2>
          </div>
          <p className="m-0 text-[0.9rem] text-slate-500 leading-relaxed">
            <strong className="text-inherit font-semibold">useCounter</strong>와{" "}
            <strong className="text-inherit font-semibold">useToggle</strong>을
            조합한{" "}
            <strong className="text-inherit font-semibold">
              useCounterWithToggle
            </strong>
            으로 "숫자 + 보이기/숨기기"를 한 훅에서 쓸 수 있습니다.
          </p>
          <div className="mt-2 relative bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl pt-5 pb-6 px-6 border-l-4 border-l-emerald-500">
            <div className="absolute -top-2 left-4 text-[0.7rem] font-semibold text-emerald-500 uppercase tracking-wider bg-white dark:bg-[#242424] px-2 py-0.5 rounded">
              합성 훅 데모
            </div>
            <CounterWithToggleDemo />
          </div>
          <div className="mt-3 bg-[#1e1e1e] rounded-lg overflow-hidden border border-white/10">
            <div className="flex items-center justify-between py-2 px-4 bg-black/30 border-b border-white/10">
              <span className="text-[0.8rem] text-slate-400 font-mono">
                useToggle + useCounter 합성 예시
              </span>
              <button
                type="button"
                className="text-[0.75rem] py-1 px-2 rounded border border-white/20 bg-transparent text-slate-400 cursor-pointer transition-colors hover:text-emerald-500 hover:border-emerald-500"
                onClick={() => setCode3(STEP3_HOOK_COMPOSITION_STARTER)}
              >
                초기화
              </button>
            </div>
            <CodeEditor
              value={code3}
              onChange={setCode3}
              placeholder="훅 합성 코드..."
              minHeight="220px"
            />
          </div>
        </section>

        <footer className="mt-4 pt-6 border-t border-white/10 text-center">
          <p className="m-0 text-[0.9rem] text-slate-500">
            로직은 훅에, UI는 Presentational에 두면 유지보수와 테스트가
            쉬워집니다.
          </p>
        </footer>
      </main>
    </div>
  );
}

function CounterWithToggleDemo() {
  const { count, increment, decrement, reset, isVisible, toggleVisibility } =
    useCounterWithToggle(0);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          className="py-1.5 px-3 rounded-lg border border-slate-300 dark:border-white/20 text-sm hover:bg-slate-100 dark:hover:bg-white/10"
          onClick={toggleVisibility}
        >
          {isVisible ? "숨기기" : "보기"}
        </button>
        {isVisible && (
          <>
            <button
              type="button"
              className="py-2 px-4 rounded-lg bg-slate-200 dark:bg-white/10 font-medium"
              onClick={decrement}
            >
              −
            </button>
            <span className="min-w-[2rem] font-bold tabular-nums">{count}</span>
            <button
              type="button"
              className="py-2 px-4 rounded-lg bg-emerald-500 text-white font-medium"
              onClick={increment}
            >
              +
            </button>
            <button
              type="button"
              className="py-1.5 px-2 rounded-lg border border-slate-300 dark:border-white/20 text-sm"
              onClick={reset}
            >
              초기화
            </button>
          </>
        )}
      </div>
      <p className="text-[0.8rem] text-slate-500 m-0">
        useCounterWithToggle = useCounter + useToggle 합성
      </p>
    </div>
  );
}
