"use client";

import { useState } from "react";

const TOOLS = [
  {
    key: 'chatgpt',
    icon: '●',
    iconColor: 'text-black',
    name: 'ChatGPT',
    sub: '마지막 동기화: 2시간 전 · 12건 추출',
    connected: true,
  },
  {
    key: 'claude',
    icon: '◆',
    iconColor: 'text-[#FE5314]',
    name: 'Claude (Anthropic)',
    sub: 'URL 붙여넣기로 연동',
    connected: false,
  },
  {
    key: 'gemini',
    icon: '▲',
    iconColor: 'text-[#AAAAAA]',
    name: 'Gemini / Copilot',
    sub: '대화 내보내기 파일 업로드',
    connected: false,
  },
];

export default function AiSyncScreen() {
  const [synced, setSynced] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const [added, setAdded] = useState<Set<string>>(new Set());

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#F5F5F5]">

      {/* Header */}
      <div className="bg-black px-5 pt-6 pb-8">
        <div className="text-[10px] font-black text-[#FE5314] uppercase tracking-[0.2em] mb-2">AI 로그 동기화</div>
        <div className="text-[22px] font-black text-white tracking-tight leading-tight">
          업무 대화에서<br />성과를 자동 추출해요
        </div>
      </div>

      <div className="pb-6 pt-3">

        {/* Privacy notice */}
        <div className="mx-4 mb-4 border-l-2 border-[#FE5314] pl-3 py-0.5">
          <div className="text-[12px] font-black text-black">개인정보 안내</div>
          <div className="text-[11px] text-[#666666] leading-snug mt-0.5">
            AI 대화 내용은 기기 내에서만 처리되며 서버에 저장되지 않아요. 추출된 성과 키워드만 리멤버에 저장됩니다.
          </div>
        </div>

        {/* AI Tools */}
        <div className="px-4 mb-4">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-2.5">AI 도구 연결</div>
          <div className="flex flex-col gap-2">
            {TOOLS.map(tool => (
              <div
                key={tool.key}
                className={`flex items-center gap-3 p-3.5 rounded border cursor-pointer active:opacity-80 transition-opacity ${
                  tool.connected
                    ? 'bg-white border-black'
                    : 'bg-white border-[#E0E0E0]'
                }`}
              >
                <div className={`text-[20px] font-black w-8 text-center ${tool.iconColor}`}>{tool.icon}</div>
                <div className="flex-1">
                  <div className="text-[14px] font-black text-black">{tool.name}</div>
                  <div className="text-[11px] text-[#AAAAAA] mt-px">{tool.sub}</div>
                </div>
                <div className={`text-[11px] font-black px-2.5 py-1 rounded shrink-0 ${
                  tool.connected
                    ? 'bg-black text-white'
                    : 'border border-[#E0E0E0] text-[#AAAAAA]'
                }`}>
                  {tool.connected ? '연결됨' : '연결하기'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* URL Input */}
        <div className="mx-4 mb-4 bg-white border border-[#E0E0E0] rounded p-4">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-2.5">
            또는 대화 URL 직접 붙여넣기
          </div>
          <input
            type="text"
            value={urlValue}
            onChange={e => setUrlValue(e.target.value)}
            placeholder="https://chatgpt.com/share/..."
            className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded p-2.5 text-[13px] text-black outline-none focus:border-black transition-colors"
          />
          <button
            className="w-full mt-2.5 bg-[#FE5314] text-white text-[14px] font-black py-3 rounded cursor-pointer active:opacity-80 transition-opacity tracking-tight"
            onClick={() => setSynced(true)}
          >
            성과 자동 추출하기 →
          </button>
        </div>

        {/* Results */}
        <div className="px-4 mb-3">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest">
            최근 추출된 성과 · GPT 동기화
          </div>
        </div>

        <ResultCard
          cardKey="vinaida-ai"
          accentColor="[#FE5314]"
          title="VINAIDA AI 상담 시스템 고도화"
          period="2026.01 — 2026.02"
          role="기획 총괄 · AI 프롬프트 엔지니어링"
          result="API 비용 30% 절감, 만족도 4.2 → 4.7"
          tags={["GPT-4", "프롬프트 엔지니어링", "MAKE", "Notion API"]}
          added={added.has("vinaida-ai")}
          onAdd={() => setAdded(prev => new Set(prev).add("vinaida-ai"))}
        />

        {synced && (
          <ResultCard
            cardKey="vinaida-2"
            accentColor="black"
            title="VINAIDA 2호점 확장 기획"
            period="2026.02 — 진행 중"
            role="사업 기획 · 운영 전략"
            result="신규 입지 선정 완료, 예상 월매출 300만원 목표"
            tags={["시장 분석", "사업 기획", "운영 전략"]}
            added={added.has("vinaida-2")}
            onAdd={() => setAdded(prev => new Set(prev).add("vinaida-2"))}
          />
        )}

      </div>
    </div>
  );
}

function ResultCard({
  cardKey, accentColor, title, period, role, result, tags, added, onAdd,
}: {
  cardKey: string; accentColor: string; title: string;
  period: string; role: string; result: string; tags: string[];
  added: boolean; onAdd: () => void;
}) {
  return (
    <div className="mx-4 mb-3 bg-white rounded-lg border border-[#E0E0E0] overflow-hidden">
      <div className={`px-4 py-3 border-b border-[#EBEBEB] flex items-center gap-2`}>
        <div className={`w-[3px] h-5 rounded-full bg-${accentColor} shrink-0`} />
        <div className="text-[13px] font-black text-black tracking-tight">{title}</div>
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        {[
          { label: '기간', val: period },
          { label: '역할', val: role },
          { label: '성과', val: result },
        ].map(row => (
          <div key={row.label} className="flex gap-3 items-start">
            <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest w-[36px] shrink-0 pt-[2px]">{row.label}</div>
            <div className="text-[13px] font-semibold text-black flex-1 leading-snug">{row.val}</div>
          </div>
        ))}
        <div className="flex gap-3 items-start">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest w-[36px] shrink-0 pt-[2px]">기술</div>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {tags.map(tag => (
              <span key={tag} className="text-[11px] font-bold border border-[#E0E0E0] text-black px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 flex gap-2">
        {added ? (
          <div className="flex-1 border border-black text-black text-[13px] font-black py-2.5 rounded text-center">
            ✓ 프로필에 추가됨
          </div>
        ) : (
          <button
            className="flex-1 bg-[#FE5314] text-white text-[13px] font-black py-2.5 rounded cursor-pointer active:opacity-80"
            onClick={onAdd}
          >
            프로필 추가
          </button>
        )}
        <button className="flex-1 border border-[#E0E0E0] text-[#666666] text-[13px] font-semibold py-2.5 rounded cursor-pointer active:bg-[#F5F5F5]">
          수정
        </button>
      </div>
    </div>
  );
}
