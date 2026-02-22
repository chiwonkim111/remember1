"use client";

interface Props {
  navigate?: (id: number) => void;
  marketValue: number;
  checkinDone: boolean;
}

export default function MarketScreen({ navigate, marketValue, checkinDone }: Props) {
  const rangeMin = Math.round(marketValue * 0.85 / 100) * 100;
  const rangeMax = Math.round(marketValue * 1.12 / 100) * 100;

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#F5F5F5]">

      {/* Header */}
      <div className="bg-black px-5 pt-6 pb-10">
        <div className="text-[10px] font-black text-[#FE5314] uppercase tracking-[0.2em] mb-3">
          시장가치 · 2026 Q1{checkinDone ? ' · Q1 반영됨' : ''}
        </div>
        <div className="text-[44px] font-black text-white leading-none tracking-tighter">
          {marketValue.toLocaleString()}<span className="text-[24px] font-bold text-white/60">만원</span>
        </div>
        <div className="text-[13px] text-white/40 mt-2 font-medium">
          예상 범위 {rangeMin.toLocaleString()} — {rangeMax.toLocaleString()}만원
        </div>
        <div className="flex gap-2 mt-4">
          <span className="text-[12px] font-bold border border-white/20 text-white/80 px-3 py-1.5 rounded">
            상위 32%
          </span>
          <span className="text-[12px] font-bold bg-[#FE5314] text-white px-3 py-1.5 rounded">
            채용제안 확률 71%
          </span>
          {checkinDone && (
            <span className="text-[12px] font-bold border border-[#FE5314]/50 text-[#FE5314] px-3 py-1.5 rounded">
              ↑ +8%
            </span>
          )}
        </div>
      </div>

      <div className="pb-6">

        {/* Gauge */}
        <div className="-mt-5 mx-4 bg-white rounded-lg border border-[#E0E0E0] py-5 px-4 relative z-10 flex flex-col items-center">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-4">동일 직무 내 내 위치</div>
          <div className="relative flex justify-center w-[200px] h-[110px]">
            <svg className="w-full h-full" viewBox="0 0 200 110">
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#EBEBEB" strokeWidth="14" strokeLinecap="butt" />
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#FE5314" strokeWidth="14" strokeLinecap="butt" strokeDasharray="251.2" strokeDashoffset="71" />
            </svg>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center">
              <div className="text-[30px] font-black text-[#FE5314] leading-none">71%</div>
              <div className="text-[11px] text-[#AAAAAA] mt-0.5">채용 제안 확률</div>
            </div>
          </div>
          <div className="flex justify-between w-full mt-3">
            {[
              { val: `${rangeMin.toLocaleString()}만`, sub: '최솟값', accent: false },
              { val: `${marketValue.toLocaleString()}만`, sub: '현재 추정', accent: true },
              { val: `${rangeMax.toLocaleString()}만`, sub: '최댓값', accent: false },
            ].map(({ val, sub, accent }) => (
              <div key={sub} className="text-center">
                <div className={`text-[14px] font-black ${accent ? 'text-[#FE5314]' : 'text-black'}`}>{val}</div>
                <div className="text-[10px] text-[#AAAAAA] mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div className="px-4 mt-4">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-3">
            동일 직무 비교 · PM 8년차 서울
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: '6,800만', sub: '하위 25%', highlight: false },
              { val: `${marketValue.toLocaleString()}만`, sub: '나 (상위 32%)', highlight: true },
              { val: '1.1억', sub: '상위 10%', highlight: false },
            ].map(({ val, sub, highlight }) => (
              <div key={sub} className={`rounded p-3 text-center ${highlight ? 'bg-black' : 'bg-white border border-[#E0E0E0]'}`}>
                <div className={`text-[15px] font-black ${highlight ? 'text-[#FE5314]' : 'text-black'}`}>{val}</div>
                <div className={`text-[10px] mt-0.5 ${highlight ? 'text-white/50' : 'text-[#AAAAAA]'}`}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gap */}
        <div className="px-4 mt-4">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-3">연봉 10% 올리려면</div>
          <div className="bg-white rounded-lg border border-[#E0E0E0] p-4">
            {[
              { name: '데이터 분석', pct: 80, accent: false },
              { name: 'AI/ML 이해', pct: 75, accent: false },
              { name: '영어 소통', pct: 45, accent: true },
              { name: '글로벌 서비스', pct: 30, accent: true },
            ].map(({ name, pct, accent }, i, arr) => (
              <div key={name} className={`flex items-center gap-3 py-2.5 ${i < arr.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}>
                <div className="text-[12px] font-semibold text-black w-[76px] shrink-0">{name}</div>
                <div className="flex-1 h-[3px] bg-[#EBEBEB] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${accent ? 'bg-[#FE5314]' : 'bg-black'}`} style={{ width: `${pct}%` }} />
                </div>
                <div className={`text-[12px] font-black w-9 text-right shrink-0 ${accent ? 'text-[#FE5314]' : 'text-black'}`}>{pct}%</div>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-[#EBEBEB] text-[12px] text-[#666666] leading-snug">
              <span className="font-black text-[#FE5314]">영어 커뮤니케이션</span>과{' '}
              <span className="font-black text-[#FE5314]">글로벌 서비스 경험</span> 추가 시 예상 연봉{' '}
              <span className="font-black text-black">+12%</span> 상승 가능
            </div>
          </div>
        </div>

        {/* Nudge */}
        {!checkinDone && (
          <div className="px-4 mt-4">
            <div
              className="bg-black rounded-lg p-4 cursor-pointer active:opacity-80 transition-opacity"
              onClick={() => navigate?.(2)}
            >
              <div className="text-[10px] font-black text-[#FE5314] uppercase tracking-widest mb-2">업데이트 필요</div>
              <div className="text-[15px] font-black text-white leading-tight mb-1">
                Q1 성과 입력하면 시장가치 최대 +8%
              </div>
              <div className="text-[12px] text-white/50 mb-3">지금 바로 Q1 체크인을 완료하세요.</div>
              <div className="inline-flex items-center gap-1 text-[#FE5314] text-[13px] font-black">
                Q1 성과 입력하러 가기 →
              </div>
            </div>
          </div>
        )}
        {checkinDone && (
          <div className="px-4 mt-4">
            <div className="bg-[#FFF1EC] border border-[#FE5314]/30 rounded-lg p-4">
              <div className="text-[13px] font-black text-[#FE5314] mb-1">✓ Q1 체크인 반영 완료</div>
              <div className="text-[12px] text-[#666666]">
                동료 인증을 추가하면 채용 제안 확률이 더 올라가요.
              </div>
              <button
                className="mt-2.5 text-[13px] font-black text-black underline cursor-pointer"
                onClick={() => navigate?.(4)}
              >
                동료 인증 요청하기 →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
