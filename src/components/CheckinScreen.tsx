"use client";

import { useState } from "react";

const QUESTIONS = [
  {
    step: "01 / 05",
    title: "이번 분기, 가장 기억에 남는 일이 무엇인가요?",
    sub: "작은 것도 괜찮아요. 내가 직접 해결한 일을 떠올려 보세요.",
    placeholder: "예: 신규 기능 론칭, 팀 내 프로세스 개선, 고객 문제 해결 등",
    defaultVal: "VINAIDA 앱 AI 상담 시스템 1차 론칭을 완료했어요. 기획부터 QA까지 총괄하며 예정보다 1주일 빠르게 배포했습니다.",
    keywords: ["론칭 완료", "일정 단축", "기획 총괄", "QA 리딩"],
  },
  {
    step: "02 / 05",
    title: "팀과 협업하거나 리딩한 경험이 있나요?",
    sub: "동료와 함께한 것, 내가 주도한 것 모두 좋아요.",
    placeholder: "예: 개발팀과 스펙 협의, 디자이너와 UX 개선, 신규 팀원 온보딩 등",
    defaultVal: "개발 3명·디자인 2명과 스프린트를 운영하며 매주 릴리즈 사이클을 정착시켰습니다.",
    keywords: ["팀 리딩", "스프린트 운영", "프로세스 도입", "주간 릴리즈"],
  },
  {
    step: "03 / 05",
    title: "측정 가능한 성과가 있나요?",
    sub: "수치가 있으면 더 좋아요. 예: \"MAU 40% 성장\", \"비용 30% 절감\"",
    placeholder: "예: 전환율 12% 향상, 응답 속도 2초 → 0.8초 등",
    defaultVal: "GPT-4 프롬프트 최적화로 API 비용 30% 절감 + 사용자 응답 만족도 4.2 → 4.7점 향상 달성.",
    keywords: ["AI 고도화", "비용 30% 절감", "만족도 4.7", "프롬프트 최적화"],
  },
  {
    step: "04 / 05",
    title: "어떤 기술이나 도구를 새로 배웠나요?",
    sub: "업무에 직접 써본 것이라면 무엇이든 기록해 두세요.",
    placeholder: "예: Cursor AI, SQL 분석, Figma 프로토타이핑 등",
    defaultVal: "MAKE(Integromat)로 노션-슬랙 자동화 파이프라인을 직접 구축했어요. SQL로 코호트 분석도 처음 해봤습니다.",
    keywords: ["MAKE 자동화", "SQL 분석", "노션 API", "코호트 분석"],
  },
  {
    step: "05 / 05",
    title: "다음 분기에 달성하고 싶은 목표가 있나요?",
    sub: "구체적일수록 시장가치 계산에 도움이 돼요.",
    placeholder: "예: MAU 5만 달성, AI 기능 2개 추가 출시 등",
    defaultVal: "Q2에는 VINAIDA 글로벌 베타를 오픈하고 영어권 MAU 1,000명을 달성하는 게 목표입니다.",
    keywords: ["글로벌 베타", "MAU 목표", "영어 서비스", "Q2 목표"],
  },
];

const CHIP_LABELS = ["AI/ML", "비용 최적화", "사용자 경험", "매출 기여", "팀 리딩"];

export default function CheckinScreen({ navigate }: { navigate?: (id: number) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(QUESTIONS.map(q => q.defaultVal));
  const [chips, setChips] = useState<number[]>([0, 1]);
  const [showSuccess, setShowSuccess] = useState(false);

  const q = QUESTIONS[step];

  const toggleChip = (idx: number) => {
    setChips(prev => prev.includes(idx) ? prev.filter(c => c !== idx) : [...prev, idx]);
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

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-6">

        {/* Step label */}
        <div className="text-[10px] font-black text-[#FE5314] tracking-[0.2em] uppercase mb-3">
          Q1 · {q.step}
        </div>

        {/* Question */}
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

        {/* AI Keywords */}
        <div className="mt-3 border border-[#E0E0E0] rounded p-3.5">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-2.5">
            AI 추출 성과 키워드
          </div>
          <div className="flex flex-wrap gap-1.5">
            {q.keywords.map(kw => (
              <span key={kw} className="text-[12px] font-bold border border-black text-black px-2.5 py-1 rounded">
                {kw}
              </span>
            ))}
          </div>
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
                  chips.includes(i)
                    ? 'bg-black border-black text-white'
                    : 'bg-white border-[#E0E0E0] text-black'
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
            className="w-14 border-[1.5px] border-[#E0E0E0] text-black text-[16px] font-bold py-3.5 rounded cursor-pointer active:bg-[#F5F5F5] transition-colors"
            onClick={() => setStep(step - 1)}
          >
            ←
          </button>
        )}
        <button
          className="flex-1 bg-[#FE5314] text-white text-[15px] font-black py-3.5 rounded cursor-pointer active:opacity-80 transition-opacity tracking-tight"
          onClick={() => {
            if (step < QUESTIONS.length - 1) {
              setStep(step + 1);
              setChips([0, 1]);
            } else {
              setShowSuccess(true);
            }
          }}
        >
          {step < QUESTIONS.length - 1 ? '다음 →' : '완료하기'}
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg w-full max-w-[340px] overflow-hidden">
            <div className="bg-[#FE5314] px-6 pt-8 pb-6">
              <div className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">완료</div>
              <div className="text-[26px] font-black text-white leading-tight tracking-tight">
                Q1 성과가<br />기록됐어요
              </div>
            </div>
            <div className="px-6 py-5">
              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="bg-[#F5F5F5] rounded p-3">
                  <div className="text-[22px] font-black text-black">85%</div>
                  <div className="text-[10px] text-[#AAAAAA] mt-0.5">완성도 (+13%)</div>
                </div>
                <div className="bg-[#FFF1EC] rounded p-3">
                  <div className="text-[22px] font-black text-[#FE5314]">+8%</div>
                  <div className="text-[10px] text-[#AAAAAA] mt-0.5">시장가치 ↑</div>
                </div>
              </div>
              <button
                className="w-full bg-black text-white text-[15px] font-black py-4 rounded mb-2 cursor-pointer active:opacity-80 tracking-tight"
                onClick={() => { setShowSuccess(false); navigate?.(1); }}
              >
                다이어리로 이동 →
              </button>
              <button
                className="w-full border border-[#E0E0E0] text-black text-[14px] font-bold py-3.5 rounded cursor-pointer active:bg-[#F5F5F5]"
                onClick={() => setShowSuccess(false)}
              >
                계속 수정하기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
