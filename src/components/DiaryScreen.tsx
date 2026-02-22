"use client";

import { ChevronRight } from "lucide-react";

interface Props {
  navigate: (id: number) => void;
  checkinDone: boolean;
  marketValue: number;
}

export default function DiaryScreen({ navigate, checkinDone, marketValue }: Props) {
  const formattedValue = Math.round(marketValue / 100) * 100;
  const rangeMin = Math.round(formattedValue * 0.85 / 100) * 100;
  const rangeMax = Math.round(formattedValue * 1.12 / 100) * 100;

  return (
    <div className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#F5F5F5]">

      {/* Header */}
      <div className="bg-black px-5 pt-5 pb-6">
        <div className="text-[10px] font-black text-[#FE5314] uppercase tracking-[0.15em] mb-1.5">2026 Q1</div>
        <div className="text-[22px] font-black text-white tracking-tight leading-tight">프로필 다이어리</div>
        <div className="text-[13px] text-white/50 mt-1">커리어를 매일 쌓아가세요</div>
      </div>

      <div className="pt-1 pb-6">

        {/* 1. Q1 체크인 */}
        <DiaryCard
          onClick={() => navigate(2)}
          category="기록하기"
          title="Q1 분기 성과 체크인"
          sub={checkinDone ? "완료됐어요 · 다음 체크인은 Q2" : "AI가 질문을 준비했어요 · 5분이면 충분해요"}
          badge={checkinDone ? "완료 ✓" : "D-7"}
          badgeStyle={checkinDone ? "bg-black text-white" : "bg-[#FE5314] text-white"}
        >
          {checkinDone ? (
            <div className="flex gap-2">
              <div className="flex-1 bg-[#F5F5F5] rounded p-2.5 text-center">
                <div className="text-[16px] font-black text-black">85%</div>
                <div className="text-[10px] text-[#AAAAAA]">프로필 완성도</div>
              </div>
              <div className="flex-1 bg-[#FFF1EC] rounded p-2.5 text-center">
                <div className="text-[16px] font-black text-[#FE5314]">+8%</div>
                <div className="text-[10px] text-[#AAAAAA]">시장가치 상승</div>
              </div>
            </div>
          ) : (
            <div className="text-[13px] font-semibold text-black bg-white p-3 rounded border-l-2 border-[#FE5314] leading-snug">
              "이번 Q1에서 완료하거나 기여한 프로젝트가 있나요?"
            </div>
          )}
        </DiaryCard>

        {/* 2. 시장가치 */}
        <DiaryCard
          onClick={() => navigate(3)}
          category="분석하기"
          title="실시간 시장가치"
          sub="내 연봉 위치 · 채용 제안 가능성"
        >
          <div className="text-[24px] font-black text-[#FE5314] leading-tight tracking-tight">
            {rangeMin.toLocaleString()} ~ {rangeMax.toLocaleString()}
            <span className="text-[14px] font-bold">만원</span>
          </div>
          <div className="text-[11px] text-[#AAAAAA] mt-1 mb-3">PM 8년차 · 서울 기준 · 상위 32%</div>
          <div className="flex items-end gap-1 h-8">
            {[16, 24, 40, 28, 14].map((h, i) => (
              <div key={i} className={`flex-1 rounded-sm ${i === 2 ? 'bg-[#FE5314]' : 'bg-[#EBEBEB]'}`} style={{ height: h }} />
            ))}
          </div>
        </DiaryCard>

        {/* 3. AI 동기화 */}
        <DiaryCard
          onClick={() => navigate(5)}
          category="자동 추출"
          title="AI 채팅 로그 동기화"
          sub="GPT 대화에서 성과를 자동 추출"
        >
          <div className="text-[11px] text-[#AAAAAA] mb-2 font-medium uppercase tracking-wider">최근 추출된 성과</div>
          <div className="flex flex-wrap gap-1.5">
            {['VINAIDA 앱 출시', 'MAU +40%', 'API 비용 30% 절감'].map(tag => (
              <span key={tag} className="text-[11px] font-bold border border-[#E0E0E0] text-black bg-white px-2.5 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-2.5 text-[12px] text-[#FE5314] font-bold">
            체크인 화면에서 바로 불러올 수 있어요 →
          </div>
        </DiaryCard>

        {/* 4. 동료 인증 */}
        <DiaryCard
          onClick={() => navigate(4)}
          category="인증받기"
          title="동료 상호 인증"
          sub="신뢰도를 높이세요 · 1건 대기 중"
          badge="D-3"
          badgeStyle="border border-[#FE5314] text-[#FE5314]"
        >
          <div className="flex flex-col gap-2">
            {[
              { init: '박', name: '박진영 (XOBIS PM)', status: '✓ 인증 완료', ok: true },
              { init: '이', name: '이서연 (전 동료)', status: '⏳ 요청 중', ok: false },
            ].map(row => (
              <div key={row.name} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#F0F0F0] text-[11px] font-black flex items-center justify-center shrink-0">
                  {row.init}
                </div>
                <div className="text-[12px] font-semibold text-black flex-1">{row.name}</div>
                <div className={`text-[11px] font-bold ${row.ok ? 'text-black' : 'text-[#FE5314]'}`}>{row.status}</div>
              </div>
            ))}
          </div>
        </DiaryCard>

      </div>
    </div>
  );
}

function DiaryCard({
  onClick, category, badge, badgeStyle, title, sub, children,
}: {
  onClick: () => void;
  category: string;
  badge?: string;
  badgeStyle?: string;
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mt-2.5 mx-4 bg-white rounded-lg border border-[#E0E0E0] overflow-hidden cursor-pointer active:bg-[#FAFAFA] transition-colors"
      onClick={onClick}
    >
      <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-2 border-b border-[#EBEBEB]">
        <div className="flex-1">
          <div className="text-[10px] font-black text-[#AAAAAA] uppercase tracking-widest mb-1">{category}</div>
          <div className="text-[15px] font-black text-black tracking-tight">{title}</div>
          <div className="text-[12px] text-[#AAAAAA] mt-0.5 font-medium">{sub}</div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
          {badge && (
            <span className={`text-[11px] font-black px-2 py-1 rounded ${badgeStyle}`}>{badge}</span>
          )}
          <ChevronRight className="w-4 h-4 text-[#AAAAAA]" />
        </div>
      </div>
      <div className="px-4 py-3.5">{children}</div>
    </div>
  );
}
