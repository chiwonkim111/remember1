"use client";

import { useState, useEffect, useRef } from "react";

// ── 텍스트 기반 키워드 추출 시뮬레이션 ────────────────────────
const KEYWORD_PATTERNS: [RegExp, string][] = [
  [/절감|비용|줄이/, "비용 절감"],
  [/출시|론칭|배포|릴리즈/, "론칭 완료"],
  [/MAU|사용자 수|트래픽|방문/, "MAU 성장"],
  [/만족도|NPS|평점|점수/, "만족도 향상"],
  [/팀|리딩|관리|온보딩|멘토/, "팀 리딩"],
  [/스프린트|애자일|사이클|주간/, "스프린트 운영"],
  [/자동화|MAKE|노션|슬랙|연동/, "자동화 구축"],
  [/SQL|데이터|분석|코호트|통계/, "데이터 분석"],
  [/AI|GPT|Claude|LLM|프롬프트|모델/, "AI 활용"],
  [/글로벌|영어|해외|국제|영문/, "글로벌 확장"],
  [/기획|전략|로드맵|계획|기획서/, "전략 기획"],
  [/개선|향상|최적화|고도화|효율/, "성과 최적화"],
  [/수익|매출|revenue|ARR|GMV/, "매출 기여"],
  [/빠르|일정|기간|단축|조기|빠르게/, "일정 단축"],
  [/QA|테스트|버그|품질|검수/, "품질 관리"],
];

function extractKeywords(text: string): string[] {
  if (!text.trim()) return [];
  const found: string[] = [];
  for (const [pattern, label] of KEYWORD_PATTERNS) {
    if (pattern.test(text) && !found.includes(label)) {
      found.push(label);
    }
  }
  return found.slice(0, 5);
}
// ──────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    step: "01 / 05",
    title: "이번 분기, 가장 기억에 남는 일이 무엇인가요?",
    sub: "작은 것도 괜찮아요. 내가 직접 해결한 일을 떠올려 보세요.",
    placeholder: "예: 신규 기능 론칭, 팀 내 프로세스 개선, 고객 문제 해결 등",
    defaultVal: "",
    fallback: ["기억에 남는 성과", "주요 기여", "팀 협업"],
  },
  {
    step: "02 / 05",
    title: "팀과 협업하거나 리딩한 경험이 있나요?",
    sub: "동료와 함께한 것, 내가 주도한 것 모두 좋아요.",
    placeholder: "예: 개발팀과 스펙 협의, 디자이너와 UX 개선, 신규 팀원 온보딩 등",
    defaultVal: "",
    fallback: ["팀 리딩", "협업", "온보딩"],
  },
  {
    step: "03 / 05",
    title: "측정 가능한 성과가 있나요?",
    sub: "수치가 있으면 더 좋아요. 예: \"MAU 40% 성장\", \"비용 30% 절감\"",
    placeholder: "예: 전환율 12% 향상, 응답 속도 2초 → 0.8초 등",
    defaultVal: "",
    fallback: ["성과 수치", "개선 지표"],
  },
  {
    step: "04 / 05",
    title: "어떤 기술이나 도구를 새로 배웠나요?",
    sub: "업무에 직접 써본 것이라면 무엇이든 기록해 두세요.",
    placeholder: "예: Cursor AI, SQL 분석, Figma 프로토타이핑 등",
    defaultVal: "",
    fallback: ["새 기술 습득", "도구 활용"],
  },
  {
    step: "05 / 05",
    title: "이번 분기에서 아쉬웠던 점이나 개선하고 싶은 것이 있나요?",
    sub: "솔직하게 적어도 돼요. 다음 분기 성장의 시작이 됩니다.",
    placeholder: "예: 일정 지연이 잦았다, 데이터 기반 의사결정이 부족했다 등",
    defaultVal: "",
    fallback: ["개선 과제", "회고", "성장 포인트"],
  },
];

const CHIP_LABELS = ["AI/ML", "비용 최적화", "사용자 경험", "매출 기여", "팀 리딩"];

interface Props {
  navigate?: (id: number) => void;
  syncedContent?: string;
  onComplete?: () => void;
}

export default function CheckinScreen({ navigate, syncedContent, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(QUESTIONS.map(() => ""));
  const [chips, setChips] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [aiImported, setAiImported] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = QUESTIONS[step];

  // 텍스트 변경 시 키워드 자동 추출 (디바운스 1.2초)
  useEffect(() => {
    const text = answers[step];
    if (!text.trim()) {
      setKeywords([]);
      setExtracting(false);
      return;
    }
    setExtracting(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const extracted = extractKeywords(text);
      setKeywords(extracted.length > 0 ? extracted : q.fallback);
      setExtracting(false);
    }, 1200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [answers[step]]);

  // 스텝 이동 시 칩 초기화
  useEffect(() => {
    setChips([]);
  }, [step]);

  const toggleChip = (idx: number) => {
    setChips(prev => prev.includes(idx) ? prev.filter(c => c !== idx) : [...prev, idx]);
  };

  const handleImportAI = () => {
    if (!syncedContent) return;
    const updated = [...answers];
    updated[2] = syncedContent; // Q3(측정 가능한 성과)에 삽입
    setAnswers(updated);
    setAiImported(true);
    // Q3로 이동
    setStep(2);
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete?.();
      setShowSuccess(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">

      {/* Progress bar */}
      <div className="flex gap-[3px] px-5 py-3 border-b border-[#EBEBEB] shrink-0">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
              i < step ? 'bg-black' : i === step ? 'bg-[#FE5314]' : 'bg-[#EBEBEB]'
            }`}
          />
        ))}
      </div>

      {/* AI 불러오기 배너 (Q3 이전, 미완료 시) */}
      {!aiImported && step < 3 && syncedContent && (
        <button
          className="mx-5 mt-4 flex items-center gap-3 bg-[#FFF1EC] border border-[#FE5314]/30 rounded p-3 cursor-pointer active:opacity-80 text-left"
          onClick={handleImportAI}
        >
          <div className="text-[18px] shrink-0">🤖</div>
          <div className="flex-1">
            <div className="text-[12px] font-black text-[#FE5314]">AI 동기화 성과 불러오기</div>
            <div className="text-[11px] text-[#666666] mt-0.5 leading-snug">
              추출된 성과를 Q3에 자동 입력할게요. 편집만 하면 완료!
            </div>
          </div>
          <div className="text-[#FE5314] text-[18px] shrink-0">→</div>
        </button>
      )}
      {aiImported && step === 2 && (
        <div className="mx-5 mt-4 flex items-center gap-2 bg-black rounded p-3">
          <div className="text-[12px] font-black text-white">✓ AI 동기화 성과가 입력됐어요</div>
          <div className="text-[11px] text-white/50">편집 후 다음으로 이동하세요</div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">
        <div className="text-[10px] font-black text-[#FE5314] tracking-[0.2em] uppercase mb-3">
          Q1 · {q.step}
        </div>
        <div className="text-[21px] font-black text-black leading-snug tracking-tight mb-2">
          {q.title}
        </div>
        <div className="text-[13px] text-[#666666] mb-5 leading-snug">{q.sub}</div>

        {/* Textarea */}
        <textarea
          key={step}
          className="w-full min-h-[120px] bg-[#F5F5F5] border-[1.5px] border-[#E0E0E0] rounded p-3.5 font-sans font-medium text-[14px] text-black resize-none outline-none focus:border-black focus:bg-white transition-colors leading-relaxed"
          value={answers[step]}
          placeholder={q.placeholder}
          onChange={e => {
            const updated = [...answers];
            updated[step] = e.target.value;
            setAnswers(updated);
          }}
        />

        {/* AI 키워드 박스 */}
        <div className="mt-3 border border-[#E0E0E0] rounded p-3.5">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-2.5 flex items-center gap-2">
            AI 추출 성과 키워드
            {extracting && (
              <span className="text-[10px] font-medium text-[#FE5314] normal-case tracking-normal animate-pulse">
                분석 중...
              </span>
            )}
          </div>
          {!extracting && keywords.length === 0 && (
            <div className="text-[12px] text-[#AAAAAA]">텍스트를 입력하면 키워드를 자동 추출해요</div>
          )}
          {!extracting && keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {keywords.map(kw => (
                <span key={kw} className="text-[12px] font-bold border border-black text-black px-2.5 py-1 rounded">
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Category Chips */}
        <div className="mt-4">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-2.5">카테고리</div>
          <div className="flex flex-wrap gap-2">
            {CHIP_LABELS.map((lbl, i) => (
              <button
                key={lbl}
                onClick={() => toggleChip(i)}
                className={`text-[13px] font-bold py-2 px-3.5 rounded border-[1.5px] cursor-pointer transition-all ${
                  chips.includes(i) ? 'bg-black border-black text-white' : 'bg-white border-[#E0E0E0] text-black'
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="py-4 px-5 border-t border-[#EBEBEB] flex gap-2.5 bg-white shrink-0">
        {step > 0 && (
          <button
            className="w-14 border-[1.5px] border-[#E0E0E0] text-black text-[16px] font-bold py-3.5 rounded cursor-pointer active:bg-[#F5F5F5]"
            onClick={() => setStep(step - 1)}
          >
            ←
          </button>
        )}
        <button
          className={`flex-1 text-white text-[15px] font-black py-3.5 rounded cursor-pointer active:opacity-80 tracking-tight ${
            answers[step].trim() ? 'bg-[#FE5314]' : 'bg-[#CCCCCC]'
          }`}
          onClick={handleNext}
          disabled={!answers[step].trim() && step > 0}
        >
          {step < QUESTIONS.length - 1 ? '다음 →' : '완료하기'}
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg w-full max-w-[340px] overflow-hidden">
            <div className="bg-[#FE5314] px-6 pt-8 pb-6">
              <div className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">Q1 완료</div>
              <div className="text-[26px] font-black text-white leading-tight tracking-tight">
                성과가<br />기록됐어요
              </div>
            </div>
            <div className="px-6 py-5">
              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="bg-[#F5F5F5] rounded p-3">
                  <div className="text-[22px] font-black text-black">85%</div>
                  <div className="text-[10px] text-[#AAAAAA] mt-0.5">프로필 완성도</div>
                </div>
                <div className="bg-[#FFF1EC] rounded p-3">
                  <div className="text-[22px] font-black text-[#FE5314]">+8%</div>
                  <div className="text-[10px] text-[#AAAAAA] mt-0.5">시장가치 ↑</div>
                </div>
              </div>
              <button
                className="w-full bg-black text-white text-[15px] font-black py-4 rounded mb-2 cursor-pointer active:opacity-80"
                onClick={() => { setShowSuccess(false); navigate?.(1); }}
              >
                다이어리에서 확인하기 →
              </button>
              <button
                className="w-full border border-[#E0E0E0] text-black text-[14px] font-bold py-3.5 rounded cursor-pointer active:bg-[#F5F5F5]"
                onClick={() => { setShowSuccess(false); navigate?.(3); }}
              >
                시장가치 변화 보기 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
