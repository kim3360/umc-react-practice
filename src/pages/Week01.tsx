import { useState } from "react";
import { InfoLabel, InfoValue } from "../components/presentational";
import { RatingContainer } from "../components/container";
import { Accordion } from "../components/compound";
import { CodeEditor } from "../components/CodeEditor";

const STEP3_STARTER = `// Presentational 컴포넌트를 직접 작성해보세요.
// label, value를 props로 받아 화면에 표시합니다.

function GreetingDisplay({ label, value }) {
  return (
    <div>
      {/* 여기에 코드를 작성하세요 */}
    </div>
  );
}`;

const STEP4_SRP_STARTER = `// ① SRP — 한 컴포넌트 = 한 역할 (동작 주석 포함)
function InfoLabel({ text }) {
  return <span>{text}</span>;  // 동작: 라벨만 렌더
}
function InfoValue({ text }) {
  return <span>{text}</span>;  // 동작: 값만 렌더
}
// 사용: 각자 한 가지 일만 함
<InfoLabel text="이름" />
<InfoValue text="홍길동" />`;

const STEP4_PVC_STARTER = `// ② Presentational vs Container (동작 주석 포함)
function RatingContainer({ max = 5 }) {
  const [rating, setRating] = useState(0);  // 동작: 평점 저장
  return (
    <>
      <RatingDisplay value={rating} max={max} />  // 동작: props 전달만
      {[...Array(max)].map((_, i) => (
        <StarButton key={i} value={i+1} filled={i+1<=rating}
          onClick={() => setRating(i+1)} />  // 동작: 클릭 시 rating 업데이트
      ))}
    </>
  );
}
function RatingDisplay({ value, max }) {
  return <span>{value} / {max}</span>;  // 동작: 받은 값만 렌더
}
function StarButton({ filled, onClick }) {
  return <button onClick={onClick}>★</button>;  // 동작: 부모 onClick 실행
}`;

const STEP4_COMPOUND_STARTER = `// ③ Compound Component (동작 주석 포함)
<Accordion.Root defaultValue={null}>  // 동작: openId를 Context로 공유
  <Accordion.Item value="a">
    <Accordion.Trigger value="a">  // 동작: 클릭 시 toggle → openId 변경
      클릭하면 펼쳐져요
    </Accordion.Trigger>
    <Accordion.Panel value="a">  // 동작: openId === value일 때만 표시
      <p>여러 컴포넌트가 함께 동작해요.</p>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`;

/**
 * Week01: React 컴포넌트 패턴 입문
 */
export function Week01() {
  const [code, setCode] = useState(STEP3_STARTER);
  const [code4Srp, setCode4Srp] = useState(STEP4_SRP_STARTER);
  const [code4Pvc, setCode4Pvc] = useState(STEP4_PVC_STARTER);
  const [code4Compound, setCode4Compound] = useState(STEP4_COMPOUND_STARTER);
  return (
    <div className="max-w-[900px] mx-auto p-4 min-h-screen">
      <header className="mb-10 text-center relative">
        <span className="inline-block py-1 px-3 text-xs font-semibold uppercase tracking-wider bg-gradient-to-br from-indigo-500 to-violet-500 text-white rounded-full mb-3">
          입문
        </span>
        <h1 className="text-[1.75rem] font-bold m-0 mb-2 tracking-tight">
          React 컴포넌트 패턴 입문
        </h1>
        <p className="m-0 text-slate-500 text-[0.95rem]">
          처음이시라면 여기서 시작하세요. 아래를 직접 눌러보며 패턴을
          느껴보세요.
        </p>
      </header>

      <main className="flex flex-col gap-10">
        {/* 핵심 개념도 */}
        <section className="flex flex-col gap-6 mb-2">
          <h2 className="text-[0.9rem] font-semibold text-slate-500 uppercase tracking-widest m-0 mb-1">
            핵심 개념
          </h2>

          {/* 1. SRP + 컴포넌트 분리 전략 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-inherit m-0">
              단일 책임 원칙(SRP)과 컴포넌트 분리 전략
            </h3>
            <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10">
              <p className="text-[0.85rem] leading-relaxed text-slate-500 m-0">
                <strong className="text-inherit font-semibold">SRP</strong>: 한
                컴포넌트는 한 가지 일만 담당합니다. "보여주기", "상태 관리",
                "이벤트 처리"를 한 곳에 몰아넣지 말고 분리하세요.
              </p>
              <ul className="mt-3 pl-5 text-[0.85rem] leading-relaxed text-slate-500 list-disc">
                <li className="mb-1.5">
                  분리 전략 1:{" "}
                  <strong className="text-inherit font-semibold">
                    보여주기 vs 관리하기
                  </strong>{" "}
                  — UI 렌더링과 데이터/로직을 나눕니다.
                </li>
                <li className="mb-1.5">
                  분리 전략 2:{" "}
                  <strong className="text-inherit font-semibold">
                    한 컴포넌트 = 한 역할
                  </strong>{" "}
                  — 예: "숫자만 보여주기", "버튼만 그리기".
                </li>
                <li>
                  분리 전략 3:{" "}
                  <strong className="text-inherit font-semibold">
                    재사용 가능한 단위
                  </strong>
                  로 쪼개면 유지보수와 테스트가 쉬워집니다.
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Presentational vs Container 패턴 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-inherit m-0">
              Presentational vs Container 패턴
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5 transition-all hover:border-indigo-500/30">
                <h4 className="text-[0.95rem] font-semibold m-0 mb-2 text-inherit">
                  Presentational (보여주기)
                </h4>
                <p className="text-[0.85rem] leading-relaxed text-slate-500 m-0">
                  <strong className="text-inherit font-semibold">
                    화면에 그리기
                  </strong>
                  만 담당. props로 받은 데이터를 표시합니다. useState, useEffect
                  없이 순수하게 동작해 재사용성이 높습니다.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5 transition-all hover:border-indigo-500/30">
                <h4 className="text-[0.95rem] font-semibold m-0 mb-2 text-inherit">
                  Container (관리하기)
                </h4>
                <p className="text-[0.85rem] leading-relaxed text-slate-500 m-0">
                  <strong className="text-inherit font-semibold">
                    데이터 관리
                  </strong>
                  와 이벤트 처리를 담당. useState, useEffect를 사용하고,
                  Presentational에게 props로 전달합니다.
                </p>
              </div>
            </div>
            <div className="mt-4 p-5 bg-indigo-500/5 rounded-xl border border-dashed border-indigo-500/25">
              <p className="text-[0.8rem] font-semibold text-indigo-500 uppercase tracking-wider m-0">
                데이터 흐름
              </p>
              <div className="flex items-center gap-3 flex-wrap mt-4">
                <span className="py-1.5 px-3 text-[0.85rem] font-medium rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-500">
                  Container
                </span>
                <span className="text-slate-500">→</span>
                <span className="py-1.5 px-3 text-[0.85rem] font-medium rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
                  Presentational
                </span>
                <span className="text-slate-500">→</span>
                <span className="py-1.5 px-3 text-[0.85rem] font-medium rounded-lg bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20">
                  화면 렌더링
                </span>
              </div>
              <p className="text-[0.8rem] text-slate-500 leading-relaxed mt-2">
                Container가 상태를 관리하고, Presentational에게 props로 전달 →
                Presentational은 받은 값만 화면에 표시
              </p>
            </div>
          </div>

          {/* 3. Compound Component 패턴 소개 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-inherit m-0">
              Compound Component 패턴 소개
            </h3>
            <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5 transition-all hover:border-indigo-500/30">
              <p className="text-[0.85rem] leading-relaxed text-slate-500 m-0">
                여러 개의 작은 컴포넌트가{" "}
                <strong className="text-inherit font-semibold">
                  한 덩어리처럼 함께 동작
                </strong>
                하는 패턴입니다. 부모(Root)가 Context로 상태를 공유하고,
                자식들(Item, Trigger, Panel 등)은 각자 역할만 수행합니다.
              </p>
              <p className="text-[0.85rem] leading-relaxed text-slate-500 mt-2 m-0">
                <strong className="text-inherit font-semibold">
                  적합한 UI
                </strong>
                : 탭, 아코디언, 드롭다운처럼 "여러 부분이 함께 움직여야 하는"
                컴포넌트에 사용합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 1. SRP + Presentational vs Container */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[0.7rem] font-bold tracking-widest text-indigo-500 bg-indigo-500/10 py-1 px-2 rounded">
              1단계
            </span>
            <h2 className="text-[1.15rem] font-semibold m-0">
              보여주기 vs 관리하기
            </h2>
          </div>
          <p className="m-0 text-[0.9rem] text-slate-500 leading-relaxed">
            <strong className="text-inherit font-semibold">
              보여주기(Presentational)
            </strong>
            : 별 모양, 숫자처럼 화면에 그리는 역할만 해요.
            <br />
            <strong className="text-inherit font-semibold">
              관리하기(Container)
            </strong>
            : "지금 몇 점인지" 같은 값을 기억하고, 클릭 시 바꿔줘요.
            <span className="block mt-2 text-[0.85rem] text-indigo-500 font-medium">
              → 별을 눌러보세요!
            </span>
          </p>
          <div className="mt-2 relative bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-6 border-l-4 border-l-indigo-500">
            <div className="absolute -top-2 left-4 text-[0.7rem] font-semibold text-indigo-500 uppercase tracking-wider bg-white dark:bg-[#242424] px-2 py-0 rounded">
              직접 해보기
            </div>
            <RatingContainer max={5} />
          </div>
        </section>

        {/* 2. Compound Component */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[0.7rem] font-bold tracking-widest text-indigo-500 bg-indigo-500/10 py-1 px-2 rounded">
              2단계
            </span>
            <h2 className="text-[1.15rem] font-semibold m-0">
              함께 움직이는 컴포넌트들
            </h2>
          </div>
          <p className="m-0 text-[0.9rem] text-slate-500 leading-relaxed">
            여러 개의 작은 컴포넌트가{" "}
            <strong className="text-inherit font-semibold">한 덩어리</strong>
            처럼 동작하는 패턴입니다. 아래 질문을 클릭해 펼쳐보세요.
          </p>
          <div className="mt-2 relative bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-6 border-l-4 border-l-indigo-500">
            <div className="absolute -top-2 left-4 text-[0.7rem] font-semibold text-indigo-500 uppercase tracking-wider bg-white dark:bg-[#242424] px-2 py-0 rounded">
              직접 해보기
            </div>
            <Accordion.Root defaultValue="q1">
              <Accordion.Item value="q1">
                <Accordion.Trigger value="q1">
                  🤔 "단일 책임"이 뭔가요?
                </Accordion.Trigger>
                <Accordion.Panel value="q1">
                  <p className="m-0 text-[0.9rem] leading-relaxed text-slate-500">
                    한 컴포넌트는 한 가지 일만 하자는 뜻이에요. 예: "숫자만
                    보여주기", "버튼만 그리기". 이렇게 나누면 나중에 수정할 때
                    찾기 쉽고, 다른 곳에서도 다시 쓸 수 있어요.
                  </p>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="q2">
                <Accordion.Trigger value="q2">
                  🤔 Presentational이랑 Container 차이는?
                </Accordion.Trigger>
                <Accordion.Panel value="q2">
                  <p className="m-0 text-[0.9rem] leading-relaxed text-slate-500">
                    <strong className="text-inherit font-semibold">
                      Presentational
                    </strong>
                    : "이렇게 그려줘"만 받아서 화면에 그려요. 상태나 로직은
                    없어요.
                    <br />
                    <strong className="text-inherit font-semibold">
                      Container
                    </strong>
                    : 데이터를 기억하고, 클릭 같은 이벤트를 처리한 뒤,
                    Presentational에게 "이 값으로 그려줘"라고 넘겨요.
                  </p>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="q3">
                <Accordion.Trigger value="q3">
                  🤔 Compound Component는 언제 쓰나요?
                </Accordion.Trigger>
                <Accordion.Panel value="q3">
                  <p className="m-0 text-[0.9rem] leading-relaxed text-slate-500">
                    탭, 아코디언처럼 "여러 부분이 함께 움직여야 하는 UI"에
                    적합해요. 부모가 상태를 공유해주면, 자식들은 그걸 받아서
                    각자 역할만 하면 됩니다.
                  </p>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </section>

        {/* 3. 직접 코드 작성 */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[0.7rem] font-bold tracking-widest text-indigo-500 bg-indigo-500/10 py-1 px-2 rounded">
              3단계
            </span>
            <h2 className="text-[1.15rem] font-semibold m-0">
              직접 코드 작성해보기
            </h2>
          </div>
          <p className="m-0 text-[0.9rem] text-slate-500 leading-relaxed">
            아래 에디터에{" "}
            <strong className="text-inherit font-semibold">
              Presentational 컴포넌트
            </strong>
            를 직접 작성해보세요.
            <span className="block mt-2 text-[0.85rem] text-indigo-500 font-medium">
              → label, value를 props로 받아 화면에 표시하는 컴포넌트를
              만들어보세요.
            </span>
          </p>
          <div className="mt-2 relative bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-6 border-l-4 border-l-indigo-500">
            <div className="absolute -top-2 left-4 text-[0.7rem] font-semibold text-indigo-500 uppercase tracking-wider bg-white dark:bg-[#242424] px-2 py-0 rounded">
              코드 작성
            </div>
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-white/10">
              <div className="flex items-center justify-between py-2 px-4 bg-black/30 border-b border-white/10">
                <span className="text-[0.8rem] text-slate-400 font-mono">
                  GreetingDisplay.tsx
                </span>
                <button
                  type="button"
                  className="text-[0.75rem] py-1 px-2 rounded border border-white/20 bg-transparent text-slate-400 cursor-pointer transition-colors hover:text-indigo-500 hover:border-indigo-500"
                  onClick={() => setCode(STEP3_STARTER)}
                >
                  초기화
                </button>
              </div>
              <CodeEditor
                value={code}
                onChange={setCode}
                placeholder="컴포넌트 코드를 작성해보세요..."
                minHeight="200px"
              />
            </div>
          </div>
        </section>

        {/* 4. 세 가지 패턴 UI 예시 (각각 따로) */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[0.7rem] font-bold tracking-widest text-indigo-500 bg-indigo-500/10 py-1 px-2 rounded">
              4단계
            </span>
            <h2 className="text-[1.15rem] font-semibold m-0">패턴별 UI 예시</h2>
          </div>

          {/* 1) SRP UI */}
          <div className="flex flex-col gap-3">
            <p className="m-0 text-sm font-medium text-slate-600 dark:text-slate-400">
              ① SRP — 한 컴포넌트 = 한 역할
            </p>
            <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5">
              <div className="flex flex-col gap-1">
                <InfoLabel text="이름" />
                <InfoValue text="홍길동" />
              </div>
            </div>
            <div className="mt-3 bg-[#1e1e1e] rounded-lg overflow-hidden border border-white/10">
              <div className="flex items-center justify-between py-2 px-4 bg-black/30 border-b border-white/10">
                <span className="text-[0.8rem] text-slate-400 font-mono">
                  InfoLabel.tsx / InfoValue.tsx
                </span>
                <button
                  type="button"
                  className="text-[0.75rem] py-1 px-2 rounded border border-white/20 bg-transparent text-slate-400 cursor-pointer transition-colors hover:text-indigo-500 hover:border-indigo-500"
                  onClick={() => setCode4Srp(STEP4_SRP_STARTER)}
                >
                  초기화
                </button>
              </div>
              <CodeEditor
                value={code4Srp}
                onChange={setCode4Srp}
                placeholder="코드를 작성해보세요..."
                minHeight="200px"
              />
            </div>
          </div>

          {/* 2) Presentational vs Container UI */}
          <div className="flex flex-col gap-3">
            <p className="m-0 text-sm font-medium text-slate-600 dark:text-slate-400">
              ② Presentational vs Container
            </p>
            <div className="flex flex-col gap-2">
              <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5">
                <RatingContainer max={5} />
              </div>
              <div className="mt-2 bg-[#1e1e1e] rounded-lg overflow-hidden border border-white/10">
                <div className="flex items-center justify-between py-2 px-4 bg-black/30 border-b border-white/10">
                  <span className="text-[0.8rem] text-slate-400 font-mono">
                    RatingContainer.tsx
                  </span>
                  <button
                    type="button"
                    className="text-[0.75rem] py-1 px-2 rounded border border-white/20 bg-transparent text-slate-400 cursor-pointer transition-colors hover:text-indigo-500 hover:border-indigo-500"
                    onClick={() => setCode4Pvc(STEP4_PVC_STARTER)}
                  >
                    초기화
                  </button>
                </div>
                <CodeEditor
                  value={code4Pvc}
                  onChange={setCode4Pvc}
                  placeholder="코드를 작성해보세요..."
                  minHeight="200px"
                />
              </div>
            </div>
          </div>

          {/* 3) Compound Component UI */}
          <div className="flex flex-col gap-3">
            <p className="m-0 text-sm font-medium text-slate-600 dark:text-slate-400">
              ③ Compound Component
            </p>
            <div className="flex flex-col gap-2">
              <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl p-5">
                <Accordion.Root defaultValue={null}>
                  <Accordion.Item value="a">
                    <Accordion.Trigger value="a">
                      클릭하면 펼쳐져요
                    </Accordion.Trigger>
                    <Accordion.Panel value="a">
                      <p className="m-0 text-sm text-slate-500">
                        여러 컴포넌트가 함께 동작해요.
                      </p>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="mt-2 bg-[#1e1e1e] rounded-lg overflow-hidden border border-white/10">
                <div className="flex items-center justify-between py-2 px-4 bg-black/30 border-b border-white/10">
                  <span className="text-[0.8rem] text-slate-400 font-mono">
                    Accordion 사용 예시
                  </span>
                  <button
                    type="button"
                    className="text-[0.75rem] py-1 px-2 rounded border border-white/20 bg-transparent text-slate-400 cursor-pointer transition-colors hover:text-indigo-500 hover:border-indigo-500"
                    onClick={() => setCode4Compound(STEP4_COMPOUND_STARTER)}
                  >
                    초기화
                  </button>
                </div>
                <CodeEditor
                  value={code4Compound}
                  onChange={setCode4Compound}
                  placeholder="코드를 작성해보세요..."
                  minHeight="200px"
                />
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-4 pt-6 border-t border-white/10 text-center">
          <p className="m-0 text-[0.9rem] text-slate-500">
            이제{" "}
            <code className="py-0.5 px-1.5 bg-indigo-500/15 rounded text-[0.85em]">
              src/components
            </code>{" "}
            폴더에서 각 컴포넌트 코드를 열어보며 실습해보세요.
          </p>
        </footer>
      </main>
    </div>
  );
}
